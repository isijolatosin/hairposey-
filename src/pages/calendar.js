/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import { Calendar } from "react-date-range";
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";
import {
	information,
	REACT_APP_AUTHORIZED_ID_ONE,
	REACT_APP_AUTHORIZED_ID_TWO,
	REACT_APP_BOOKLIMIT,
	REACT_APP_CANCELED,
	REACT_APP_SITE_URL,
	REACT_APP_STATUS,
} from "../constant";
import { db } from "../firebase";
import Button from "../components/shared/Button";
import { RiHome5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { MdDeleteForever, MdKeyboardBackspace } from "react-icons/md";
import Progressbar from "../components/shared/Progressbar";
import { triggerProgress } from "../utils/triggerProgress";
import { FaTrash } from "react-icons/fa";

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

const CalendarPage = () => {
	const dateToday = new Date();
	const [selectDate, setSelectDate] = React.useState(null);
	const [bookLimit, setBookLimit] = React.useState(false);
	const [timeleft, setTimeleft] = React.useState(0);
	const { user } = useContext(UserContext);
	const [userEmail, setUserEmail] = React.useState("");
	const [bookingData, setBookingData] = React.useState({});
	const [error, setError] = React.useState(false);
	const orderNo = `Hairposey${Math.random().toString(36).slice(2)}`;
	const [calendarList, setCalendarList] = React.useState([]);
	const [showProgress, setShowProgress] = React.useState(false);
	const [confirmDel, setConfirmDel] = React.useState(false);
	const [picked, setPicked] = React.useState("");
	const status = REACT_APP_STATUS;

	React.useEffect(() => {
		db.collection("all-bookings").onSnapshot((snapshot) => {
			const arr = [];
			snapshot.docs.map((doc) => {
				arr.push({ id: doc.id, data: doc.data() });
			});
			setCalendarList(arr);
		});
	}, []);

	React.useEffect(() => {
		if (showProgress) {
			triggerProgress(setTimeleft);
		}
	}, [showProgress]);

	const handleSelect = (date) => {
		if (selectDate) {
			setSelectDate(null);
		}

		if (bookLimit) {
			setBookLimit(false);
		}

		if (date > dateToday) {
			db.collection("all-bookings").onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}));
				const filterBydate = results?.filter(
					(booking) => booking?.data.date === date.toDateString()
				);

				if (filterBydate.length > 0) {
					if (filterBydate.length < Number(REACT_APP_BOOKLIMIT)) {
						setSelectDate(date.toDateString());
					} else {
						setBookLimit(true);
					}
				} else {
					setBookLimit(false);
					setSelectDate(date.toDateString());
				}
			});
		}
		setSelectDate(false);
	};

	const handleDelete = (id) => {
		setShowProgress(true);

		setTimeout(() => {
			db.collection("all-bookings")
				.doc(id)
				.delete()
				.catch((error) => {
					console.error("Error removing document: ", error);
				});
			setShowProgress(false);
			setTimeleft(0);
		}, 10000);
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
		link: `${REACT_APP_SITE_URL}${orderNo}`,
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
		client: REACT_APP_AUTHORIZED_ID_ONE,
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
		db.collection("all-bookings")
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
				hour: 3,
				status: status,
			})
			.then(() => {
				console.log(`SUCCESSFULL`);
			})
			.catch((error) => console.log("Error" + error.message));

		setUserEmail("");
		setBookLimit(false);
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
			<div className="tw-bg-neutral-300 tw-pt-[60px] tw-pb-[80px]">
				<div className="tw-relative tw-w-full tw-px-10 md:tw-px-0 md:tw-w-[80%] lg:tw-w-[70%] 2xl:tw-w-[60%] tw-mx-auto">
					{user?.email === REACT_APP_AUTHORIZED_ID_ONE ||
					user?.email === REACT_APP_AUTHORIZED_ID_TWO ? (
						<div>
							<Link to="/">
								<RiHome5Fill className="tw-bg-white tw-absolute -tw-top-8 tw-left-10 md:tw-left-0 tw-shadow-lg tw-w-[40px] tw-h-[40px] tw-text-pink-900 tw-rounded-full tw-p-2 md:hover:tw-bg-pink-900 md:hover:tw-text-white hover:tw-w-[35px] hover:tw-p-4 hover:tw-h-[35px] tw-ease-in tw-duration-300" />
							</Link>
							<div className="tw-w-full tw-text-center tw-mb-5">
								<p className="font_cursive tw-text-4xl">My Calendar</p>
							</div>
							<div className="tw-h-[400px] tw-my-40 lg:tw-mt-0 lg:tw-mb-20 tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-justify-center">
								<div>
									<div className="tw-w-full tw-flex tw-justify-center">
										<Calendar
											color="rgb(157 23 77)"
											date={new Date()}
											onChange={handleSelect}
											dateDisplayFormat="yyyy-MM-dd"
											showSelectionPreview={true}
										/>
									</div>
									{!bookLimit && (
										<div className="tw-w-[332px] tw-mx-auto">
											<div
												className={
													"tw-w-full tw-text-xs tw-text-center tw-text-pink-700 tw-bg-neutral-200 tw-border-t-[1px] tw-border-pink-700 tw-mb-0 tw-py-[5px] tw-opacity-1 tw-ease-in tw-duration-300"
												}>
												<span>
													{selectDate
														? `Date selected ${selectDate}`
														: "Select a date"}
												</span>
											</div>
										</div>
									)}
									{bookLimit && (
										<div className="tw-w-[332px] tw-mx-auto">
											<div
												className={
													"tw-w-full tw-text-xs tw-text-center tw-text-pink-700 tw-bg-neutral-200 tw-border-t-[1px] tw-border-pink-700 tw-mb-0 tw-py-[5px] tw-opacity-1 tw-ease-in tw-duration-300"
												}>
												<span>We are booked for this date</span>
											</div>
										</div>
									)}
									<label className="bookLabel tw-w-full">
										<input
											type="text"
											autoComplete="off"
											placeholder=" "
											name="email"
											id="email"
											value={userEmail}
											onChange={(e) => setUserEmail(e.target.value)}
											className={`tw-outline-0 focus:tw-outline-none focus:tw-ring-0 tw-w-full tw-border-[0px] tw-text-sm`}
										/>
										<p className="tw-top-[0px]">Customer email address...</p>
									</label>
								</div>
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
									className="tw-w-full lg:tw-ml-10 tw-pt-10 md:tw-pt-0 tw-mt-[10px]">
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Category</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Services</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Add-On Services</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
							</div>

							<div className="tw-w-full tw-grid md:tw-grid-cols-2 tw-gap-3 tw-border-t-[1px] tw-pt-5">
								{calendarList.map((list) => (
									<div>
										<div
											className={`tw-mb-[-10] tw-w-[100%] tw-mx-auto tw-flex tw-items-center ${
												showProgress && confirmDel && picked === list.id
													? "tw-opacity-[1]"
													: "tw-opacity-[0]"
											} tw-ease-in tw-duration-300`}>
											<Progressbar value={timeleft} max={100} />
										</div>
										<ul
											key={list.id}
											className="tw-bg-white tw-p-2 tw-rounded-b-md">
											<div className="tw-flex tw-items-center tw-justify-between tw-border-b-[1px] tw-pb-1 tw-mb-1">
												{list.data.customer === list.data.email ? (
													<li className="tw-text-xs tw-text-neutral-600">
														Customer: {list.data.customer}
													</li>
												) : (
													<div clasName="tw-flex tw-flex-col">
														<li className="tw-text-xs tw-text-neutral-600">{`Customer: ${list.data.customer}`}</li>
														<li className="tw-text-xs tw-text-neutral-400">{`Email: ${list.data.email}`}</li>
													</div>
												)}
												<div className="tw-flex tw-items-center tw-justify-center tw-relative">
													<li className="tw-text-xs tw-bg-pink-600 tw-py-1 tw-px-3 tw-rounded-full tw-text-white">
														Duration:{" "}
														{list.data.hour > 1
															? `${list.data.hour}hrs`
															: `${list.data.hour}hr`}
													</li>
													{(new Date().getDate() >
														new Date(list.data.date).getDate() ||
														list.data.status !== REACT_APP_STATUS) && (
														<>
															{confirmDel && picked === list.id ? (
																<button
																	disabled={showProgress}
																	onClick={() => handleDelete(list.id)}
																	className=" tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-mb-1">
																	<MdDeleteForever
																		size={25}
																		color={showProgress ? "grey" : "darkred"}
																	/>
																</button>
															) : (
																<button
																	disabled={showProgress}
																	onClick={() => {
																		setPicked(list.id);
																		setConfirmDel(true);
																	}}
																	className="tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-relative">
																	<FaTrash
																		size={19}
																		color={showProgress ? "grey" : "lightgrey"}
																	/>
																	<span className="tw-absolute tw-top-1 tw-right-[12px] tw-font-bold tw-text-xs tw-text-white">
																		?
																	</span>
																</button>
															)}
														</>
													)}
													<div
														className={`${
															confirmDel && picked === list.id
																? "tw-opacity-1"
																: "tw-opacity-0"
														} tw-ease-in tw-duration-300 tw-absolute -tw-bottom-5 tw-right-0 tw-text-red-600`}>
														<p className="tw- tw-text-[10px]">Are you sure ?</p>
													</div>
												</div>
											</div>

											<li className="tw-text-xs tw-text-pink-800">
												Appointment Date: {list.data.date}
											</li>
											<li className="tw-text-xs tw-font-thin tw-text-neutral-600">
												Service: {list.data.service}
											</li>
											<li className="tw-text-xs tw-font-thin tw-text-neutral-600">
												Category: {list.data.category}
											</li>
											<li className="tw-text-xs tw-font-thin tw-text-neutral-600">
												Add-on Service: {list.data.addOnServices}
											</li>
											<li className="tw-text-xs tw-font-thin tw-text-neutral-600">
												Status:{" "}
												<span
													className={`${
														new Date().getDate() <
															new Date(list.data.date).getDate() &&
														list.data.status !== REACT_APP_CANCELED &&
														"tw-text-green-700"
													} ${
														(new Date().getDate() >
															new Date(list.data.date).getDate() ||
															list.data.status === REACT_APP_CANCELED) &&
														"tw-text-neutral-400 tw-italic tw-line-through"
													} `}>
													{new Date().getDate() >
													new Date(list.data.date).getDate()
														? "Past Appointment Date"
														: list.data.status}
												</span>
											</li>
										</ul>
									</div>
								))}
							</div>
						</div>
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
