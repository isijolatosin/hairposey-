import React, { useContext } from "react";
import emailjs from "emailjs-com";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import Button from "./shared/Button";
import { UserContext } from "../context/user-context";
import { SiAmericanexpress, SiMastercard } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import axios from "axios";
import { db } from "../firebase";
import { AUTHORIZED_ID, googleSearch } from "../constant";
import { ValidateEmail } from "../utils/ValidateEmail";

const categories = [
	{ name: "Category", id: 1 },
	{ name: "cat A", id: 2 },
	{ name: "cat B", id: 3 },
];
const staffs = [
	{ name: "Staff", id: 1 },
	{ name: "staff A", id: 2 },
	{ name: "staff B", id: 3 },
];
const services = [
	{ name: "Services", id: 1 },
	{ name: "service A", id: 2 },
	{ name: "service B", id: 3 },
];
const sessions = [
	{ name: "Sessions", id: 1 },
	{ name: "12pm-2pm", id: 2 },
	{ name: "2pm-4pm", id: 3 },
];

function Book({ logo }) {
	const dateToday = new Date();
	const elements = useElements();
	const stripe = useStripe();
	const { user } = useContext(UserContext);
	const [bookArr, setBookArr] = React.useState([]);
	const [selectDate, setSelectDate] = React.useState(null);
	const [succeeded, setSucceeded] = React.useState(false);
	const [processing, setProcessing] = React.useState(false);
	const [emailError, setEmailError] = React.useState(false);
	const [_error, set_Error] = React.useState(null);
	const [disabled, setDisabled] = React.useState(true);
	const [clientSecret, setClientSecret] = React.useState("");
	const [location, setLocation] = React.useState(null);
	const [allowproceed, setAllowProceed] = React.useState(false); //CHANGE BACK TO FALSE
	const [permission, setPermission] = React.useState(false);
	const [bookingData, setBookingData] = React.useState({
		session: "",
		category: "",
		service: "",
		personnel: "",
	});
	const [userEmail, setUserEmail] = React.useState("");

	React.useEffect(() => {
		db.collection("location").onSnapshot((snapshot) => {
			const results = snapshot.docs.map((doc) => ({
				data: doc.data(),
			}));
			setLocation(results[0].data.location);
		});

		if (Notification.permission !== "granted") {
			Notification.requestPermission().then((perm) => {
				if (perm === "granted") {
					setPermission(perm);
				}
			});
		}
	}, []);

	if (succeeded && permission) {
		new Notification("Payment Notification", {
			body: "Your Payment Was Successful!",
			icon: logo,
			tag: "payment notification",
			requireInteraction: true,
			lang: "en-US",
		});
	}

	const handleSelect = (ranges) => {
		if (selectDate) {
			setSelectDate(null);
		}
		if (ranges > dateToday) {
			db.collection("bookings")
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection(ranges.toDateString())
				.onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}));
					// console.log(results)
					const dt = results?.filter(
						(booking) => booking?.data.date === ranges.toDateString()
					);

					setBookArr(dt);
					if (dt.length === 3) {
						return;
					} else {
						setSelectDate(ranges.toDateString());
					}
				});
		}
	};

	const handleOnChange = (e) => {
		setBookingData({ ...bookingData, [e.target.name]: e.target.value });
	};

	const handleChange = async (event) => {
		setDisabled(event.empty);
		set_Error(event.error ? event.error.message : "");
	};

	const cardStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};

	const createPaymentIntent = async () => {
		const price = Number(process.env.REACT_APP_BOOKING_PRICE);

		if (user) {
			try {
				const { data } = await axios.post(
					"/.netlify/functions/create-payment-intent-book",
					JSON.stringify({ price })
				);
				setClientSecret(data.clientSecret);
				setAllowProceed(true);
			} catch (error) {
				set_Error(
					error?.response?.data ? "Please contact hairposey Admin..." : ""
				);
			}
		} else if (userEmail) {
			if (ValidateEmail(userEmail)) {
				if (emailError) {
					setEmailError(false);
				}
				try {
					const { data } = await axios.post(
						"/.netlify/functions/create-payment-intent-book",
						JSON.stringify({ price })
					);
					setClientSecret(data.clientSecret);
					setAllowProceed(true);
				} catch (error) {
					set_Error(
						error?.response?.data ? "Please contact hairposey Admin..." : ""
					);
				}
			} else {
				setEmailError(true);
			}
		}
	};

	// Proceed function
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		// One time payment
		setProcessing(true);

		if (clientSecret) {
			const payload = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});

			if (payload.error) {
				set_Error(`Payment failed ${payload.error.message}`);
				setProcessing(false);
			} else {
				if (payload?.paymentIntent?.client_secret) {
					set_Error(null);
					setProcessing(false);
					setSucceeded(true);
				}
			}
		}

		db.collection("bookings")
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection(selectDate)
			.add({
				date: selectDate,
				customer: user?.displayName || userEmail,
				email: user?.email || userEmail,
				category: bookingData.category,
				session: bookingData.session,
				service: bookingData.service,
				personnel: bookingData.personnel,
			})
			.then(() => {
				console.log(`SUCCESSFULL`);
			})
			.catch((error) => console.log("Error" + error.message));

		setUserEmail("");
		setSelectDate("");
		setBookingData({
			session: "",
			category: "",
			service: "",
			personnel: "",
		});

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail();
			SendMerchantSuccessfulPurchaseEmail();
		}, 1000);

		setTimeout(() => {
			window.location.reload();
		}, 5000);
	};

	const messageParams = {
		name: user?.displayName || userEmail,
		message: `Hi ${
			user?.displayName || userEmail
		}. Your hair appointment has been booked for ${selectDate}. Your details are as follow - Category: ${
			bookingData.category
		}, Services: ${bookingData.service}, Session: ${
			bookingData.session
		}, Personnel: ${
			bookingData.personnel
		}. Please ensure to come early. Thank you for your patronage!`,
		client: user?.email || userEmail,
		sender: "Hairposey",
	};
	const SendClientSuccessfulPurchaseEmail = () => {
		emailjs
			.send(
				"service_vvie6xo",
				"template_d72ypjk",
				messageParams,
				"gIT1RsNcapyNz6JR2"
			)
			.then((res) => {})
			.catch((err) => console.log(err));
	};

	const ManagementMessage = {
		name: "Hairposey",
		message: `Hello. Hair appointment for ${
			user?.displayName || userEmail
		} has been booked for ${selectDate}. Here are the details of booking: Category: ${
			bookingData.category
		}, Services: ${bookingData.service}, Session: ${
			bookingData.session
		}, Personnel: ${bookingData.personnel} Customer's Email: ${
			user?.email || userEmail
		}`,
		client: AUTHORIZED_ID.id_one,
		sender: "Hairposey Bookings",
	};
	const SendMerchantSuccessfulPurchaseEmail = () => {
		emailjs
			.send(
				"service_vvie6xo",
				"template_d72ypjk",
				ManagementMessage,
				"gIT1RsNcapyNz6JR2"
			)
			.then((res) => {})
			.catch((err) => console.log(err));
	};

	return (
		<div className="bg-blur3 tw-flex tw-flex-col lg:tw-flex-row tw-width-full tw-p-5 lg:tw-pl-0 tw-mx-auto">
			<div className="tw-flex tw-flex-col tw-items-center lg:tw-mx-auto lg:tw-pl-[10px] lg:tw-flex-1 lg-tw-w-full">
				<div className="tw-text-neutral-300 tw-text-center tw-text-2xl tw-mt-[20px] tw-mb-[70px] tw-px-[10px] tw-py-1">
					<a
						href={`${googleSearch + location}`}
						target="_blank"
						rel="noreferrer"
						className="tw-flex-col tw-text-neutral-400 tw-text-xs tw-font-light tw-flex tw-items-center tw-justify-center tw-mb-7 hover:tw-text-neutral-600 tw-ease tw-duration-300 ">
						<MdLocationPin size={35} className="tw-text-yellow-500 tw-mb-2" />
						<span className="navStyleChildWhite">
							<span className="tw-text-green-500">Currently</span>, we are in{" "}
							{location}
						</span>
					</a>
					<h2>
						For Your Hair Appointment, Schedule{" "}
						<span className="tw-text-yellow-500">Now!</span>
					</h2>
				</div>
				<div className=" tw-p-2 lg:tw-p-5 xl:tw-pr-[20px] tw-flex tw-flex-col lg:tw-flex-row  xl:tw-flex-row">
					<div className="tw-flex tw-flex-col tw-items-center tw-mt-[-40px] tw-px-5 lg:tw-mr-10">
						<div className="xl:tw-ml-0">
							<Calendar
								color="rgb(157 23 77)"
								date={new Date()}
								onChange={handleSelect}
								dateDisplayFormat="yyyy-MM-dd"
							/>
						</div>
						{bookArr.length < 3 ? (
							<div
								className={
									selectDate
										? "tw-text-sm tw-text-black tw-bg-gray-100 tw-m-[10px] tw-shadow-gray-300 tw-px-[10px] tw-py-[5px] tw-border-r-4 tw-opacity-1 tw-rounded-lg tw-ease-in tw-duration-300"
										: "tw-opacity-0"
								}>
								<span>- You have selected {selectDate} -</span>
							</div>
						) : (
							<div className="tw-text-sm tw-text-black tw-bg-gray-100 tw-m-[10px] tw-shadow-gray-300 tw-px-[10px] tw-py-[5px] tw-border-r-4 tw-opacity-1 tw-rounded-lg tw-ease-in tw-duration-300">
								<span>We are booked for this date</span>
							</div>
						)}

						{!user && (
							<div className="tw-w-full tw-mt-10 lg:tw-mt-0">
								<label className="bookLabel">
									<input
										type="text"
										autoComplete="off"
										placeholder=" "
										name="email"
										id="email"
										value={userEmail}
										onChange={(e) => setUserEmail(e.target.value)}
										className={
											emailError
												? "tw-border-[1px] tw-border-red-700 tw-bg-red-200"
												: "tw-shadow-xl tw-rounded-[6px] tw-border-[0px]"
										}
									/>
									<p>Email Address...</p>
								</label>
							</div>
						)}
					</div>
					<div className="tw-flex tw-flex-col md:tw-mt-10 lg:tw-mt-0">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								createPaymentIntent();
							}}
							className="tw-w-[90%] tw-mx-auto tw-pt-10 md:tw-pt-0 lg:tw-w-[500px] xl:tw-w-[350px] 2xl:tw-w-[450px] tw-mt-[-25px]">
							<div className="tw-mb-[20px] tw-w-full">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Session</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none tw-rounded-md tw-text-sm tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="Session"
									value={bookingData.session}
									name="session">
									{sessions?.map((session) => (
										<option key={session.id}>{session.name}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Category</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none tw-rounded-md tw-text-sm tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="category"
									value={bookingData.category}
									name="category">
									{categories?.map((category) => (
										<option key={category.id}>{category.name}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Services</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none tw-rounded-md tw-text-sm tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="Service"
									value={bookingData.service}
									name="service">
									{services?.map((service) => (
										<option key={service.id}>{service.name}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Personnel</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none tw-rounded-md tw-text-sm tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="Personnel"
									value={bookingData.personnel}
									name="personnel">
									{staffs?.map((staff) => (
										<option key={staff.id}>{staff.name}</option>
									))}
								</select>
								{bookingData.personnel && !selectDate && (
									<span className="tw-text-rose-600 tw-text-[14px] tw-w-[100%] tw-mx-auto tw-mb-10">
										Missing Condential: Date...
									</span>
								)}
								<div className="tw-text-center tw-mt-[30px]">
									{bookingData.personnel &&
										bookingData.service &&
										bookingData.category &&
										bookingData.session &&
										selectDate &&
										(userEmail || user?.email) && (
											<Button type="submit">Submit Booking</Button>
										)}
								</div>
							</div>
						</form>
						<form
							className={
								allowproceed
									? "tw-block tw-ease-in tw-duration-300 tw-w-full tw-pt-2"
									: "tw-hidden tw-ease-in tw-duration-300"
							}
							id="payment-form"
							onSubmit={handleSubmit}>
							<div className="tw-bg-neutral-50 tw-pb-5 tw-rounded-lg">
								<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6">
									<SiMastercard
										size={20}
										className="tw-text-yellow-500 tw-mr-3"
									/>
									<RiVisaLine size={30} className="tw-mr-3 tw-text-blue-900" />
									<div className="tw-relative tw-flex tw-items-center tw-mr-5">
										<RiVisaLine size={30} className="tw-text-blue-800" />
										<span className="tw-absolute tw-bottom-[0px] tw-right-[1px] tw-text-[7px] tw-italic">
											DEBIT
										</span>
									</div>
									<SiAmericanexpress
										size={20}
										className="tw-text-blue-600 tw-mt-2"
									/>
								</div>
								<CardElement
									id="card-element"
									options={cardStyle}
									onChange={handleChange}
									className="tw-w-[95%] tw-mx-auto tw-border-[1px] tw-border-b-0 tw-p-3 tw-rounded-t-[4px] "
								/>
								<button
									className="tw-bg-neutral-900 tw-w-[95%] tw-flex tw-mx-auto tw-justify-center tw-py-2 tw-rounded-b-md"
									disabled={processing || disabled || succeeded}
									id="submit">
									<span
										className={
											processing || disabled || succeeded
												? "tw-text-neutral-50 tw-font-light"
												: "tw-text-orange-500 tw-font-light"
										}>
										{processing ? (
											<div className="spinner" id="spinner"></div>
										) : (
											"Pay now"
										)}
									</span>
								</button>
							</div>
							{_error && (
								<div
									className="card-error tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-red-700 "
									// className="tw-flex tw-items-center tw-text-red-700 tw-text-xs tw-justify-center tw-mt-5"
									role="alert">
									<GoAlert className="tw-mr-2" />
									{_error}
								</div>
							)}
							{succeeded && (
								<div className="tw-w-[90%] tw-mx-auto tw-pt-1">
									<p className="tw-text-center tw-text-xs tw-font-light tw-mt-2 tw-text-green-500">
										Payment Succeeded.
										{user?.email === "tisijola7@gmail.com" && (
											<span>
												{" "}
												see the result in your
												<a
													className="tw-text-blue-600"
													href={`https://dashboard.stripe.com/test/payments`}
													target="_blank"
													rel="noreferrer">
													{" "}
													Stripe Dashboard.
												</a>
											</span>
										)}{" "}
										Page will refresh in 10 seconds...
									</p>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Book;
