/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
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
	timeSlot,
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
	const [dailyMax, setDailyMax] = React.useState(0);
	const [timeSlotArray, setTimeSlotArray] = React.useState([]);
	const [_timeSlot, setTimeSlot] = React.useState("");
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

	const handleSelectTimeSlot = (t) => {
		setTimeSlot(t);
	};

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

				const timeSlotArr = filterBydate?.map((time) => time?.data?.timeSlot);
				setTimeSlotArray(timeSlotArr);

				let maxDailyBookingHour = 0;
				for (let i = 0; i < filterBydate.length; i++) {
					maxDailyBookingHour += filterBydate?.[i]?.data?.duration;
				}
				if (
					maxDailyBookingHour < REACT_APP_BOOKLIMIT &&
					REACT_APP_BOOKLIMIT - maxDailyBookingHour >= 1 &&
					timeSlotArray?.length < timeSlot?.length
				) {
					setSelectDate(date.toDateString());
					setDailyMax(maxDailyBookingHour);
				} else {
					setBookLimit(true);
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

	// stripe percent logic
	const stripeDeduction = +(
		+process.env.REACT_APP_BOOKING_PRICE * +process.env.REACT_APP_STRIPE_PERCENT
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
	const totalDue = +process.env.REACT_APP_BOOKING_PRICE + stripeDeduction;
	const bookingBalance =
		totalBookingPrice > totalDue
			? totalBookingPrice - +process.env.REACT_APP_BOOKING_PRICE
			: +process.env.REACT_APP_BOOKING_PRICE - totalBookingPrice;

	const messageParams = {
		name: userEmail,
		message: `Hi ${userEmail}. Your hair appointment has been booked for ${selectDate}, ${_timeSlot}. Your details are as follow - Category: ${bookingData.category}, Services: ${bookingData.service}, Add-On-Service: ${bookingData.addOnServices}. Please ensure to come early. Thank you for your patronage!`,
		client: userEmail,
		sender: "Hairposey",
		quantity: 1,
		product: "Hair Appointment",
		payMethod: "Card",
		total: `${process.env.REACT_APP_BOOKING_PRICE}.00`,
		balance: `$${bookingBalance}`,
		orderNo: orderNo,
		date: dateToday.toDateString(),
		link: `${REACT_APP_SITE_URL}${orderNo}`,
		serviceCharge: `$${stripeDeduction}`,
		serviceDuration: `${serviceDuration} hours`,
		timeSlot: _timeSlot,
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
		message: `Hello. Hair appointment for ${userEmail} has been booked for ${selectDate}, ${_timeSlot}. Here are the details of booking: Category: ${bookingData.category}, Services: ${bookingData.service}, add-On-Services: ${bookingData.addOnServices}. Customer's Email: ${userEmail}`,
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
				balance: bookingBalance,
				hour: serviceDuration,
				status: status,
				timeSlot: _timeSlot,
			})
			.then(() => {
				console.log(`SUCCESSFULL`);
			})
			.catch((error) => console.log("Error" + error.message));

		setUserEmail("");
		setSelectDate(false);
		setBookLimit(false);
		setSelectDate("");
		setBookingData({ addOnServices: "", category: "", service: "" });

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail();
			SendMerchantSuccessfulPurchaseEmail();
		}, 1000);
	};

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
		<div className="tw-bg-neutral-200 relative">
			<Helmet>
				<title>my-calendar</title>
			</Helmet>
			<div className="tw-bg-neutral-300 tw-pt-[60px] tw-pb-[80px]">
				<div className="tw-relative tw-w-full md:tw-w-[80%] lg:tw-w-[70%] 2xl:tw-w-[60%] tw-mx-auto">
					{user?.email === REACT_APP_AUTHORIZED_ID_ONE ||
					user?.email === REACT_APP_AUTHORIZED_ID_TWO ? (
						<div>
							<Link to="/">
								<RiHome5Fill className="tw-bg-white tw-absolute -tw-top-8 tw-left-10 md:tw-left-0 tw-shadow-lg tw-w-[40px] tw-h-[40px] tw-text-pink-900 tw-rounded-full tw-p-2 md:hover:tw-bg-pink-900 md:hover:tw-text-white hover:tw-w-[35px] hover:tw-p-4 hover:tw-h-[35px] tw-ease-in tw-duration-300" />
							</Link>
							<div className="tw-w-full tw-text-center">
								<p className="font_cursive tw-text-4xl">My Calendar</p>
							</div>
							<div className="tw-my-10 lg:tw-mt-0 lg:tw-mb-20 tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-justify-center">
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
												}
											>
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
												}
											>
												<span>We are booked for this date</span>
											</div>
										</div>
									)}
									<div className="tw-w-[85%] md:tw-w-full tw-mx-auto">
										<label className="bookLabel">
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
									className="tw-w-[85%] md:tw-w-full tw-mx-auto lg:tw-ml-10 tw-pt-10 md:tw-pt-0 tw-mt-[10px]"
								>
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Category</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Services</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
									<div className="tw-mb-[10px]">
										<div className="tw-text-neutral-900 tw-font-light tw-text-[10px] tw-pl-3 tw-bg-neutral-200 tw-py-[2px]">
											<label>Add-On Services</label>
										</div>
										<select
											className="tw-block tw-w-full tw-px-3 tw-py-2 tw-border-none  tw-text-sm tw-text-neutral-600 tw-font-thin tw-placeholder-gray-200 tw-ring-0"
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
									<div>
										<div className="tw-text-neutral-500 tw-font-light tw-text-xs tw-mb-1">
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
														timeSlotArray?.includes(slot)
															? "tw-border-[0.5px] tw-border-neutral-200 tw-cursor-not-allowed tw-text-neutral-200"
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
												<span className="tw-text-sm">
													We are almost booked up!
												</span>{" "}
												<br />
												We can only accommodate services of one hour 30 minutes
												or less.
											</span>
										</div>
									)}
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
								</form>
							</div>

							<div className="tw-w-full tw-grid md:tw-grid-cols-2 tw-gap-3 tw-border-t-[1px] tw-pt-5">
								{calendarList.length ? (
									<>
										{calendarList.map((list) => (
											<div>
												<div
													className={`tw-mb-[-10] tw-w-[100%] tw-mx-auto tw-flex tw-items-center ${
														showProgress && confirmDel && picked === list.id
															? "tw-opacity-[1]"
															: "tw-opacity-[0]"
													} tw-ease-in tw-duration-300`}
												>
													<Progressbar value={timeleft} max={100} />
												</div>
												<ul
													key={list.id}
													className="tw-bg-white tw-p-2 tw-rounded-b-md"
												>
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
																{list.data.duration > 1
																	? `${list.data.duration} hrs`
																	: `${list.data.duration} hr`}
															</li>
															{(new Date().getTime() >
																new Date(list.data.date).getTime() ||
																list.data.status !== REACT_APP_STATUS) && (
																<>
																	{confirmDel && picked === list.id ? (
																		<button
																			disabled={showProgress}
																			onClick={() => handleDelete(list.id)}
																			className=" tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-mb-1"
																		>
																			<MdDeleteForever
																				size={25}
																				color={
																					showProgress ? "grey" : "darkred"
																				}
																			/>
																		</button>
																	) : (
																		<button
																			disabled={showProgress}
																			onClick={() => {
																				setPicked(list.id);
																				setConfirmDel(true);
																			}}
																			className="tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-relative"
																		>
																			<FaTrash
																				size={19}
																				color={
																					showProgress ? "grey" : "lightgrey"
																				}
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
																} tw-ease-in tw-duration-300 tw-absolute -tw-bottom-5 tw-right-0 tw-text-red-600`}
															>
																<p className="tw- tw-text-[10px]">
																	Are you sure ?
																</p>
															</div>
														</div>
													</div>

													<div className="tw-grid tw-grid-cols-2 tw-text-[11px] tw-gap-x-2 tw-text-neutral-800">
														<li className="tw-text-pink-800 tw-border-b-[0.5px]">
															Appointment Date: {list.data.date}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px] tw-leading-3">
															Service: {list.data.service}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px]">
															Category: {list.data.category}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px]">
															Add-on Service: {list.data.addOnServices}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px]">
															Time Slot: {list.data.timeSlot}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px]">
															Balance: ${list.data.balance}
														</li>
														<li className="tw-font-thin tw-border-b-[0.5px]">
															Status:{" "}
															<span
																className={`${
																	new Date().getTime() <
																		new Date(list.data.date).getTime() &&
																	list.data.status !== REACT_APP_CANCELED &&
																	"tw-text-green-700 tw-font-semibold"
																} ${
																	(new Date().getTime() >
																		new Date(list.data.date).getTime() ||
																		list.data.status === REACT_APP_CANCELED) &&
																	"tw-text-neutral-400 tw-italic tw-line-through"
																} `}
															>
																{new Date().getTime() >
																new Date(list.data.date).getTime()
																	? "Past Appointment Date"
																	: list.data.status}
															</span>
														</li>
													</div>
												</ul>
											</div>
										))}
									</>
								) : (
									<div>
										<span className="tw-text-red-800 tw-text-xs">
											No data to display...
										</span>
									</div>
								)}
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
