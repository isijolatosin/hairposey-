/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import { Calendar } from "react-date-range";
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";
import { AUTHORIZED_ID, information } from "../constant";
import { db } from "../firebase";
import Button from "../components/shared/Button";
import { RiHome5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { MdKeyboardBackspace } from "react-icons/md";

const categories = [];
const services = [];
const addOnServices = [];

information.map((data) => {
	if (data.title === "Category") {
		categories.push(...data.info);
	} else if (data.title === "Services") {
		services.push(...data.info);
	} else if (data.title === "Add On Services") {
		addOnServices.push(...data.info);
	}
});

const CalendarPage = () => {
	const dateToday = new Date();
	const [selectDate, setSelectDate] = React.useState(null);
	const [bookArr, setBookArr] = React.useState([]);
	const { user } = useContext(UserContext);
	const [userEmail, setUserEmail] = React.useState("");
	const [bookingData, setBookingData] = React.useState({});
	const [error, setError] = React.useState(false);
	const orderNo = `Hairposey${Math.random().toString(36).slice(2)}`;

	const handleSelect = (date) => {
		if (selectDate) {
			setSelectDate(null);
		}
		if (date > dateToday) {
			db.collection("bookings")
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection(date.toDateString())
				.onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}));
					// console.log(results)
					const dt = results?.filter(
						(booking) => booking?.data.date === date.toDateString()
					);

					setBookArr(dt);
					if (dt.length === 10) {
						return;
					} else {
						setSelectDate(date.toDateString());
					}
				});
		}
		setSelectDate(false);
	};

	const handleOnChange = (e) => {
		setBookingData({ ...bookingData, [e.target.name]: e.target.value });
	};

	const messageParams = {
		name: userEmail,
		message: `Hi ${userEmail}. Your hair appointment has been booked for ${selectDate}. Your details are as follow - Category: ${bookingData.category}, Services: ${bookingData.service}, Add-On-Service: ${bookingData.addOnServices}. Please ensure to come early. Thank you for your patronage!`,
		client: userEmail,
		sender: "Hairposey",
		quantity: 1,
		product: "Hair Appointment",
		payMethod: "Card",
		total: `${process.env.REACT_APP_BOOKING_PRICE}.00`,
		orderNo: orderNo,
		date: dateToday.toDateString(),
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
		message: `Hello. Hair appointment for ${userEmail} has been booked for ${selectDate}. Here are the details of booking: Category: ${bookingData.category}, Services: ${bookingData.service}, add-On-Services: ${bookingData.addOnServices}. Customer's Email: ${userEmail}`,
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

	const handleSubmit = () => {
		db.collection("bookings")
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection(selectDate)
			.add({
				date: selectDate,
				customer: userEmail,
				email: userEmail,
				category: bookingData.category,
				service: bookingData.service,
				addOnServices: bookingData.addOnServices,
				orderNo: orderNo,
				quantity: 1,
				transactionDate: dateToday.toDateString(),
				payMethod: "Card",
				product: "Hair Appointment",
				sender: "Hairposey",
				total: `$${process.env.REACT_APP_BOOKING_PRICE}.00`,
			})
			.then(() => {
				console.log(`SUCCESSFULL`);
			})
			.catch((error) => console.log("Error" + error.message));

		setUserEmail("");
		setSelectDate("");
		setBookingData({ addOnServices: "", category: "", service: "" });

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail();
			SendMerchantSuccessfulPurchaseEmail();
		}, 1000);
	};

	return (
		<div className="tw-bg-neutral-200 relative">
			<Helmet>
				<title>my-calendar</title>
			</Helmet>
			<div className="tw-bg-neutral-300 tw-h-[100vh] tw-flex tw-flex-col tw-items-center tw-justify-center">
				<div className="tw-relative tw-w-full tw-mt-10 tw-px-10 md:tw-px-0 md:tw-w-[60%] lg:tw-w-[40%]">
					{user?.email === AUTHORIZED_ID.id_one ||
					user?.email === AUTHORIZED_ID.id_two ? (
						<>
							<Link to="/">
								<RiHome5Fill className="tw-bg-white tw-absolute -tw-top-6 tw-left-10 md:tw-left-0 tw-shadow-lg tw-w-[40px] tw-h-[40px] tw-text-pink-900 tw-rounded-full tw-p-2 md:hover:tw-bg-pink-900 md:hover:tw-text-white hover:tw-w-[35px] hover:tw-p-4 hover:tw-h-[35px] tw-ease-in tw-duration-300" />
							</Link>
							<div className="tw-w-full tw-text-center tw-mb-5">
								<p className="font_cursive tw-text-4xl">My Calendar</p>
							</div>
							<div className="tw-h-[350px]">
								<div className="tw-w-full tw-flex tw-justify-center">
									<Calendar
										color="rgb(157 23 77)"
										date={new Date()}
										onChange={handleSelect}
										dateDisplayFormat="yyyy-MM-dd"
										showSelectionPreview={true}
									/>
								</div>
								<div className="tw-w-[332px] tw-mx-auto">
									<>
										{bookArr.length <= 10 ? (
											<div
												className={
													selectDate
														? "tw-w-full tw-text-xs tw-text-center tw-text-pink-700 tw-bg-neutral-200 tw-border-t-[1px] tw-border-pink-700 tw-mb-0 tw-py-[5px] tw-opacity-1 tw-ease-in tw-duration-300"
														: "tw-opacity-0"
												}>
												<span>Date selected {selectDate}</span>
											</div>
										) : (
											<div className="tw-text-sm tw-text-black tw-bg-gray-100 tw-m-[10px] tw-px-[10px] tw-py-[5px] tw-border-r-4 tw-opacity-1 tw-rounded-lg tw-ease-in tw-duration-300">
												<span>We are booked for this date</span>
											</div>
										)}
									</>
								</div>
							</div>

							<label className="bookLabel tw-w-full">
								<input
									type="text"
									autoComplete="off"
									placeholder=" "
									name="email"
									id="email"
									value={userEmail}
									onChange={(e) => setUserEmail(e.target.value)}
									className={`tw-outline-0 focus:tw-outline-none focus:tw-ring-0 tw-w-full tw-border-[0px]`}
								/>
								<p className="tw-top-[0px]">Email Address...</p>
							</label>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (
										!bookingData.service &&
										!bookingData.category &&
										!bookingData.addOnServices &&
										!selectDate &&
										!userEmail
									) {
										setError(true);
									} else {
										handleSubmit();
									}
								}}
								className="tw-w-full tw-pt-10 md:tw-pt-0 tw-mt-[10px]">
								<div className="tw-mb-[5px]">
									<div className="tw-text-neutral-900 tw-font-light tw-text-xs">
										<label>Category</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
										onChange={handleOnChange}
										id="category"
										value={bookingData.category}
										name="category">
										<option value="" disabled selected>
											Select category
										</option>
										{categories?.map((category) => (
											<option key={category.id}>{category.desc}</option>
										))}
									</select>
								</div>
								<div className="tw-mb-[5px]">
									<div className="tw-text-neutral-900 tw-font-light tw-text-xs">
										<label>Services</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
										onChange={handleOnChange}
										id="Service"
										value={bookingData.service}
										name="service">
										<option value="" disabled selected>
											Select service
										</option>
										{services?.map((service) => (
											<option key={service.id}>{service.desc}</option>
										))}
									</select>
								</div>
								<div className="tw-mb-[5px]">
									<div className="tw-text-neutral-900 tw-font-light tw-text-xs">
										<label>Add-On Services</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
										onChange={handleOnChange}
										id="addOnServices"
										value={bookingData.addOnServices}
										name="addOnServices">
										<option value="" disabled selected>
											Select add-on
										</option>
										{addOnServices?.map((ad) => (
											<option key={ad.id}>{ad.desc}</option>
										))}
									</select>
									{error && (
										<span className="tw-text-rose-600 tw-text-[14px] tw-w-[100%] tw-mx-auto tw-mb-10">
											Missing Condential: Date...
										</span>
									)}
									<div className="tw-text-center tw-mt-[30px]">
										{bookingData.service &&
											bookingData.category &&
											bookingData.addOnServices &&
											selectDate &&
											userEmail && (
												<Button type="submit" isTrans={true}>
													Submit Booking
												</Button>
											)}
									</div>
								</div>
							</form>
						</>
					) : (
						<div className="tw-text-red-800">
							<p>Unauthorized Path Please exit page !!</p>
							<Link to="/" className="tw-flex tw-items-center">
								<MdKeyboardBackspace className="tw-text-yellow-900" />
								<span className="tw-text-yellow-900 tw-text-sm navStyleChild tw-italic">
									Back to home
								</span>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CalendarPage;
