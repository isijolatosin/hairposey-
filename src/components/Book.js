/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import emailjs from "emailjs-com";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { Calendar } from "react-date-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./shared/Button";
import { UserContext } from "../context/user-context";
import { SiAmericanexpress, SiMastercard } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import axios from "axios";
import { db } from "../firebase";
import {
	information,
	REACT_APP_AUTHORIZED_ID_ONE,
	REACT_APP_BOOKLIMIT,
	REACT_APP_SITE_URL,
	REACT_APP_STATUS,
	timeSlot,
} from "../constant";
import { ValidateEmail } from "../utils/ValidateEmail";
import Progressbar from "./shared/Progressbar";
import { triggerProgress } from "../utils/triggerProgress";

const categories = [];
const services = [];
const addOnServices = [];

information.map((data) => {
	if (data.title === "Category") {
		categories.push(...data.info);
	} else if (data.title === "Services") {
		services.push(...data.info);
	} else if (data.title === "Add On Services") {
		addOnServices.push(...data.info.slice(0, data.info.length - 1));
	}
});

function Book({ logo }) {
	const dateNow = new Date();
	const elements = useElements();
	const stripe = useStripe();
	const { user } = useContext(UserContext);
	const [bookLimit, setBookLimit] = React.useState(false);
	const [selectDate, setSelectDate] = React.useState(null);
	const [succeeded, setSucceeded] = React.useState(false);
	const [processing, setProcessing] = React.useState(false);
	const [emailError, setEmailError] = React.useState(false);
	const [_error, set_Error] = React.useState(null);
	const [disabled, setDisabled] = React.useState(true);
	const [clientSecret, setClientSecret] = React.useState("");
	const [location, setLocation] = React.useState(null);
	const [allowproceed, setAllowProceed] = React.useState(false); //CHANGE BACK TO FALSE
	// const [permission, setPermission] = React.useState(false);
	const [authDate, setAuthDate] = React.useState(false);
	const [noSunMon, setNoSunMon] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [bookingData, setBookingData] = React.useState({});
	const [userEmail, setUserEmail] = React.useState("");
	const [timeleft, setTimeleft] = React.useState(0);
	const [dailyMax, setDailyMax] = React.useState(0);
	const [count, setCount] = React.useState(10);
	const [_timeSlot, setTimeSlot] = React.useState("");
	const [isPicked, setIsPicked] = React.useState("");
	const [blackList, setBlackList] = React.useState([]);
	const [timeSlotArray, setTimeSlotArray] = React.useState([]);
	const orderNo = `Hairposey${Math.random().toString(36).slice(2)}`;
	const isReload = true;
	const status = REACT_APP_STATUS;
	React.useEffect(() => {
		db.collection("location").onSnapshot((snapshot) => {
			const results = snapshot.docs.map((doc) => ({
				data: doc.data(),
			}));
			setLocation(results[0].data.location);
		});

		// if (Notification.permission !== "granted") {
		// 	Notification.requestPermission().then((perm) => {
		// 		if (perm === "granted") {
		// 			setPermission(perm);
		// 		}
		// 	});
		// }

		// Blacklist
		db.collection("blacklist").onSnapshot((snapshot) => {
			const results = snapshot.docs.map((doc) => ({
				data: doc.data(),
				id: doc.id,
			}));

			const arr = [];
			results.map((doc) => {
				const date = doc?.data?.date;
				const twentyFourHours = 86400000;
				const expiredBlockTime = date + twentyFourHours;

				//   if already expired
				if (expiredBlockTime <= Date.now()) {
					db.collection("blacklist")
						.doc(doc?.id)
						.delete()
						.catch((error) => {
							console.error("Error removing document: ", error);
						});
				} else {
					arr.push(doc?.data?.email);
				}
			});
			setBlackList(arr);
		});
	}, []);
	// if (succeeded && permission) {
	// 	new Notification("Payment Notification", {
	// 		body: "Your Payment Was Successful!",
	// 		icon: logo,
	// 		tag: "payment notification",
	// 		requireInteraction: true,
	// 		lang: "en-US",
	// 	});
	// }
	const handleSelect = (date) => {
		if (
			date.toString().toLowerCase().includes("sun") ||
			date.toString().toLowerCase().includes("mon")
		) {
			setSelectDate(false);
			setAuthDate(false);
			setNoSunMon(true);
		} else {
			// if (date?.getTime() >= dateNow?.getTime() + 2 * 24 * 60 * 60) {
			if (selectDate) {
				setSelectDate(null);
			}
			if (bookLimit) {
				setBookLimit(false);
			}
			if (noSunMon) {
				setNoSunMon(false);
			}

			if (date > dateNow) {
				db.collection("all-bookings").onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}));

					const filterBydate = results?.filter(
						(booking) => booking?.data.date === date.toDateString()
					);

					const timeSlotArr = filterBydate?.map((time) => time?.data?.timeSlot);
					setTimeSlotArray(timeSlotArr);

					let maxDailyBookingHour = 0;
					if (filterBydate?.length > 0) {
						for (let i = 0; i < filterBydate.length; i++) {
							maxDailyBookingHour += filterBydate?.[i]?.data?.duration;
						}
						if (
							maxDailyBookingHour < REACT_APP_BOOKLIMIT &&
							REACT_APP_BOOKLIMIT - maxDailyBookingHour >= 1
						) {
							setSelectDate(date.toDateString());
							setDailyMax(maxDailyBookingHour);
							setNoSunMon(false);
						} else {
							setBookLimit(true);
						}
					} else {
						setSelectDate(date.toDateString());
						setDailyMax(maxDailyBookingHour);
						setNoSunMon(false);
					}
				});
			}
			setAuthDate(false);
			// } else {
			// 	setAuthDate(true);
			// 	setNoSunMon(false);
			// 	setSelectDate(false);
			// }
		}
	};

	const handleSelectTimeSlot = (t) => {
		setTimeSlot(t);
		setIsPicked(t);
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

	// stripe percent logic
	const stripeDeduction = +(
		Number(process.env.REACT_APP_BOOKING_PRICE) *
		Number(process.env.REACT_APP_STRIPE_PERCENT)
	).toFixed(2);
	let totalBookingPrice = 0;
	let serviceDuration = 0;
	services.filter((item) => {
		if (item?.desc === bookingData?.service) {
			totalBookingPrice += item?.price;
			serviceDuration += item?.duration;
		}
	});
	addOnServices.filter((item) => {
		if (item?.desc === bookingData?.addOnServices)
			totalBookingPrice += item?.price;
	});
	const totalDue =
		Number(process.env.REACT_APP_BOOKING_PRICE) + stripeDeduction;
	const bookingBalance =
		totalBookingPrice > totalDue
			? totalBookingPrice - Number(process.env.REACT_APP_BOOKING_PRICE)
			: Number(process.env.REACT_APP_BOOKING_PRICE) - totalBookingPrice;

	const createPaymentIntent = async () => {
		const price = totalDue;

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

					db.collection("all-bookings")
						.add({
							date: selectDate,
							customer: user?.displayName || userEmail,
							email: user?.email || userEmail,
							category: bookingData.category,
							service: bookingData.service,
							addOnServices: bookingData.addOnServices,
							orderNo: orderNo,
							quantity: 1,
							transactionDate: dateNow.toDateString(),
							payMethod: "Card",
							product: "Hair Appointment",
							sender: "Hairposey",
							total: `${process.env.REACT_APP_BOOKING_PRICE}.00`,
							balance: bookingBalance,
							duration: serviceDuration,
							status: status,
							timeSlot: _timeSlot,
						})
						.then(() => {
							console.log(`SUCCESSFULL`);
						})
						.catch((error) => console.log("Error" + error.message));

					setUserEmail("");
					setSelectDate("");
					setBookingData({});

					setTimeout(() => {
						SendClientSuccessfulPurchaseEmail();
						SendMerchantSuccessfulPurchaseEmail();
					}, 1000);
				}
			}
		}
	};

	const messageParams = {
		name: user?.displayName || userEmail,
		message: `Hi ${
			user?.displayName || userEmail
		}. Your hair appointment has been booked for ${selectDate}, ${_timeSlot}. Your details are as follow - Category: ${
			bookingData.category
		}, Services: ${bookingData.service}, Add-On-Service: ${
			bookingData.addOnServices
		}. Please ensure to come early. Thank you for your patronage!`,
		client: user?.email || userEmail,
		sender: "Hairposey",
		quantity: 1,
		product: "Hair Appointment",
		payMethod: "Card",
		total: `$${process.env.REACT_APP_BOOKING_PRICE}.00`,
		balance: `$${bookingBalance}`,
		orderNo: orderNo,
		date: dateNow.toDateString(),
		link: `${REACT_APP_SITE_URL}${orderNo}`,
		serviceCharge: `$${stripeDeduction}`,
		serviceDuration: `${serviceDuration} hours`,
		timeSlot: _timeSlot,
	};
	const SendClientSuccessfulPurchaseEmail = () => {
		emailjs
			.send(
				process.env.REACT_APP_EMAILJS_SERVICE,
				process.env.REACT_APP_EMAILJS_CUSTOMER_TEMPLATE,
				messageParams,
				process.env.REACT_APP_EMAILJS_API
			)
			.then((res) => {})
			.catch((err) => console.log(err));
	};

	const ManagementMessage = {
		name: "Management",
		message: `Hello. Hair appointment for ${
			user?.displayName || userEmail
		} has been booked for ${selectDate}, ${_timeSlot}. Here are the details of booking: Category: ${
			bookingData.category
		}, Services: ${bookingData.service}, add-On-Services: ${
			bookingData.addOnServices
		}. Customer's Email: ${user?.email || userEmail}`,
		client: REACT_APP_AUTHORIZED_ID_ONE,
		sender: "Hairposey Bookings",
		customer: user?.displayName || user?.email || userEmail,
	};
	const SendMerchantSuccessfulPurchaseEmail = () => {
		emailjs
			.send(
				process.env.REACT_APP_EMAILJS_SERVICE,
				process.env.REACT_APP_EMAILJS_MERCHANT_TEMPLATE,
				ManagementMessage,
				process.env.REACT_APP_EMAILJS_API
			)
			.then((res) => {})
			.catch((err) => console.log(err));
	};

	React.useEffect(() => {
		if (succeeded) {
			triggerProgress(setTimeleft, setCount, isReload);
		}
	}, [succeeded, isReload]);

	const email = user?.email || userEmail;

	//  filter services option
	const filteredServices = services.filter((service) => {
		if (REACT_APP_BOOKLIMIT - dailyMax >= 2) {
			return service;
		}
		if (REACT_APP_BOOKLIMIT - dailyMax < 2) {
			return service?.duration === 1.5;
		}
	});

	return (
		<div className="bg-blur3 tw-flex tw-flex-col lg:tw-flex-row tw-width-full tw-p-5 lg:tw-pl-0 tw-mx-auto tw-mt-10">
			<div className="tw-flex tw-flex-col tw-items-center lg:tw-mx-auto lg:tw-pl-[10px] lg:tw-flex-1 lg-tw-w-full">
				<div className="tw-text-neutral-300 tw-text-center tw-text-2xl tw-mt-[20px] tw-mb-[70px] tw-px-[10px] tw-py-1">
					<a
						href={`${process.env.REACT_APP_GOOGLESEARCH + location}`}
						target="_blank"
						rel="noreferrer"
						className="tw-flex-col tw-text-neutral-400 tw-text-xs tw-font-light tw-flex tw-items-center tw-justify-center tw-mb-7 hover:tw-text-neutral-600 tw-ease tw-duration-300 "
					>
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
					<div className="tw-flex tw-flex-col tw-items-center tw-mx-auto tw-mt-[-40px] tw-px-5 lg:tw-mr-10 tw-w-[332px]">
						<div className="tw-h-[350px]">
							{noSunMon && (
								<div className="tw-w-full tw-h-[43px] tw-text-[10px] tw-text-center tw-text-red-700 tw-bg-red-200 tw-px-[10px] tw-py-[5px] -tw-mb-5 tw-opacity-1 tw-ease-in tw-duration-300">
									<span>OUR SERVICES ARE CLOSED FOR THIS DAY</span>
								</div>
							)}
							<div className="xl:tw-ml-0">
								{/* <Calendar
									color="rgb(157 23 77)"
									date={new Date()}
									onChange={handleSelect}
									dateDisplayFormat="yyyy-MM-dd"
									showSelectionPreview={true}
								/> */}
								<DatePicker
									minDate={new Date()}
									// filterDate={(date) => date.getDay !== 1}
									isClearable
									clearButtonTitle="clear"
									renderCustomHeader={({
										monthDate,
										customHeaderCount,
										decreaseMonth,
										increaseMonth,
									}) => (
										<div>
											<button
												aria-label="Previous Month"
												className={
													"react-datepicker__navigation react-datepicker__navigation--previous"
												}
												style={
													customHeaderCount === 1
														? { visibility: "hidden" }
														: null
												}
												onClick={decreaseMonth}
											>
												<span
													className={
														"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
													}
												>
													{"<"}
												</span>
											</button>
											<span className="react-datepicker__current-month">
												{monthDate.toLocaleString("en-US", {
													month: "long",
													year: "numeric",
												})}
											</span>
											<button
												aria-label="Next Month"
												className={
													"react-datepicker__navigation react-datepicker__navigation--next"
												}
												style={
													customHeaderCount === 0
														? { visibility: "hidden" }
														: null
												}
												onClick={increaseMonth}
											>
												<span
													className={
														"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
													}
												>
													{">"}
												</span>
											</button>
										</div>
									)}
									selected={new Date()}
									onChange={handleSelect}
									monthsShown={2}
									className={`tw-bg-neutral-800 tw-font-thin tw-w-full ${
										selectDate ? "tw-text-neutral-700" : "tw-text-white"
									}`}
								/>
							</div>

							<div className="tw-w-[332px]">
								{authDate ? (
									<div
										className={
											authDate
												? "tw-w-full tw-mt-[-12px] tw-text-[10px] tw-text-center tw-text-red-700 tw-bg-red-200 tw-mb-0 tw-px-[10px] tw-pb-[5px] tw-pt-[12px] tw-opacity-1 tw-ease-in tw-duration-300"
												: "tw-opacity-0"
										}
									>
										<span>BOOKINGS ARE ALLOWED FOR THIS DAY</span>
									</div>
								) : (
									<div className="tw-mt-[-12px]">
										{selectDate && (
											<div className="tw-w-[332px] tw-mx-auto">
												<div
													className={
														"tw-w-full tw-text-xs tw-text-center tw-text-pink-700 tw-bg-neutral-200 tw-border-b-[2px] tw-border-pink-700 tw-mb-0 tw-pb-[5px] tw-pt-[10px] tw-opacity-1 tw-ease-in tw-duration-300"
													}
												>
													<span>Date selected {selectDate}</span>
												</div>
											</div>
										)}
										{bookLimit && (
											<div className="tw-w-[332px] tw-mx-auto">
												<div
													className={
														"tw-w-full tw-text-xs tw-text-center tw-text-pink-700 tw-bg-neutral-200 tw-border-t-[1px] tw-border-pink-700 tw-mb-0 tw-py-[5px] tw-opacity-1 tw-ease-in tw-duration-300"
													}
												>
													<span>We are booked for this date</span>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
						{!user && (
							<div className="tw-flex tw-justify-center tw-mt-[-270px]">
								<label className="bookLabel">
									<input
										type="text"
										autoComplete="off"
										placeholder=" "
										name="email"
										id="email"
										value={userEmail}
										onChange={(e) => setUserEmail(e.target.value)}
										className={`${
											emailError
												? "tw-border-[1px] tw-border-red-700 tw-bg-red-200"
												: "tw-border-[0px]"
										} tw-w-[332px]`}
									/>
									<p className="tw-top-[33px]">Email Address...</p>
								</label>
							</div>
						)}
					</div>
					<div className="tw-flex tw-flex-col md:tw-mt-10 lg:tw-mt-0 tw-mt-5">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (
									!bookingData.service ||
									!bookingData.category ||
									!bookingData.addOnServices ||
									(!selectDate && (!userEmail || !user?.email))
								) {
									setError(true);
								} else {
									createPaymentIntent();
								}
							}}
							className={`tw-w-[90%] tw-mx-auto tw-pt-10 md:tw-pt-0 lg:tw-w-[500px] xl:tw-w-[350px] 2xl:tw-w-[450px] ${
								user ? "tw-mt-[-300px] lg:tw-mt-[-25px]" : "tw-mt-[-25px]"
							} `}
						>
							<div className="tw-mb-[20px] lg:tw-mt-[-12px] tw-mt-[40px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Category</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="category"
									value={bookingData.category}
									name="category"
								>
									<option value="" disabled selected>
										Select category
									</option>
									{categories?.map((category) => (
										<option key={category.id}>{category.desc}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Services</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="Service"
									value={bookingData.service}
									name="service"
								>
									<option value="" disabled selected>
										Select service
									</option>
									{filteredServices?.map((service) => (
										<option key={service.id}>{service.desc}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs">
									<label>Add-On Services</label>
								</div>
								<select
									className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
									onChange={handleOnChange}
									id="addOnServices"
									value={bookingData.addOnServices}
									name="addOnServices"
								>
									<option value="" disabled selected>
										Select add-on
									</option>
									{addOnServices?.map((ad) => (
										<option key={ad.id}>{ad.desc}</option>
									))}
								</select>
							</div>
							<div className="tw-mb-[20px]">
								<div className="tw-text-neutral-50 tw-font-light tw-text-xs tw-mb-1">
									<span>Time slot</span>
								</div>
								<div className="tw-text-black tw-text-xs tw-flex tw-flex-wrap">
									{timeSlot.map((slot, idx) => (
										<span
											onClick={() =>
												!timeSlotArray?.includes(slot) &&
												handleSelectTimeSlot(slot)
											}
											key={idx}
											className={`${
												timeSlotArray?.includes(slot) || isPicked === slot
													? "tw-border-[0.5px] tw-border-neutral-800 tw-cursor-not-allowed tw-text-neutral-600"
													: "tw-bg-white  tw-cursor-pointer md:hover:tw-bg-neutral-600 md:hover:tw-text-white "
											}  tw-py-1 tw-px-2 tw-rounded-2xl tw-mr-2 tw-mb-2 tw-duration-300 tw-ease-in`}
										>
											{slot}
										</span>
									))}
								</div>
							</div>
							{REACT_APP_BOOKLIMIT - dailyMax < 2 && (
								<div className="tw-text-red-300 tw-font-thin tw-text-[11px] tw-bg-neutral-800 tw-p-2 tw-rounded-lg">
									<span>
										<span className="tw-text-sm">We are almost booked up!</span>{" "}
										<br />
										We can only accommodate services of one hour 30 minutes or
										less.
									</span>
								</div>
							)}
							<div>
								{error && (
									<span className="tw-text-rose-500 tw-text-[14px] tw-w-[100%] tw-mx-auto tw-mb-10">
										Missing Condential: Date...
									</span>
								)}

								{!blackList?.includes(email.toLowerCase()) ? (
									<div className="tw-text-center tw-mt-[30px]">
										{bookingData.service &&
											bookingData.category &&
											bookingData.addOnServices &&
											selectDate &&
											_timeSlot &&
											(userEmail || user?.email) && (
												<Button type="submit">Submit Booking</Button>
											)}
									</div>
								) : (
									<div className=" tw-font-thin tw-uppercase tw-mt-2 tw-text-[10.5px] tw-bg-neutral-800 tw-p-2 tw-rounded-lg">
										<p className="tw-text-red-400 tw-border-b-[0.5px] tw-border-neutral-700 tw-mb-2 tw-pb-2">
											The user is not authorize for booking at this time.
											Contact Hairposey admin for any support.
										</p>
										<span className="tw-text-neutral-400">
											Eligible for booking is after 24 hours of cancelation.
										</span>
									</div>
								)}
							</div>
						</form>
						<form
							className={
								allowproceed
									? "tw-block tw-ease-in tw-duration-300 tw-w-full tw-pt-2"
									: "tw-hidden tw-ease-in tw-duration-300"
							}
							id="payment-form"
							onSubmit={handleSubmit}
						>
							{ValidateEmail(user?.email || userEmail) && (
								<div className="tw-bg-neutral-50 tw-pb-5 tw-rounded-lg">
									<div className="tw-flex tw-items-center tw-justify-between tw-ml-4">
										<div className="tw-mr-10">
											<span className="tw-text-[10px]">
												Due payment + service charge -{" "}
												<span className="tw-text-green-700 tw-text-[10px]">
													CAD ${totalDue}
												</span>
											</span>
										</div>

										<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6">
											<SiMastercard
												size={20}
												className="tw-text-yellow-500 tw-mr-3"
											/>
											<RiVisaLine
												size={30}
												className="tw-mr-3 tw-text-blue-900"
											/>
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
										id="submit"
									>
										<span
											className={
												processing || disabled || succeeded
													? "tw-text-neutral-50 tw-font-light"
													: "tw-text-orange-500 tw-font-light"
											}
										>
											{processing ? (
												<div className="spinner" id="spinner"></div>
											) : (
												"Pay now"
											)}
										</span>
									</button>
								</div>
							)}
							{_error && (
								<div
									className="card-error tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-red-700 "
									// className="tw-flex tw-items-center tw-text-red-700 tw-text-xs tw-justify-center tw-mt-5"
									role="alert"
								>
									<GoAlert className="tw-mr-2" />
									{_error}
								</div>
							)}
							{succeeded && (
								<div className="tw-w-[100%] tw-mx-auto tw-pt-1">
									<p className="tw-text-xs tw-font-light tw-mt-2 tw-mb-[-9px] tw-text-green-500">
										Payment Succeeded.
										{user?.email === "tisijola7@gmail.com" && (
											<span>
												{" "}
												see the result in your
												<a
													className="tw-text-blue-600"
													href={`https://dashboard.stripe.com/test/payments`}
													target="_blank"
													rel="noreferrer"
												>
													{" "}
													Stripe Dashboard.
												</a>
											</span>
										)}{" "}
										Page will refresh in {count}{" "}
										{count === 0 ? "second..." : "seconds..."}
									</p>
									<Progressbar value={timeleft} max={100} />
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
