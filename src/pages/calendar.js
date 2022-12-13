/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";
import { GoAlert } from "react-icons/go";
import { RiHome5Fill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import {
	information,
	REACT_APP_AUTHORIZED_ID_ONE,
	REACT_APP_AUTHORIZED_ID_TWO,
	REACT_APP_BOOKLIMIT,
	REACT_APP_SITE_URL,
	REACT_APP_STATUS,
} from "../constant";
import { db } from "../firebase";
import Button from "../components/shared/Button";
import { UserContext } from "../context/user-context";
import DatePickerComp from "../components/shared/DatePickerComp";
import { triggerProgress } from "../utils/triggerProgress";
import TimeComponent from "../components/calendarPage/TimeComponent";
import CalendarList from "../components/calendarPage/CalendarList";
import DayTimeSlotComponent from "../components/calendarPage/DayTimeSlotComponent";
import { BsFillUnlockFill } from "react-icons/bs";

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
	const [blockDate, setBlockDate] = React.useState(null);
	const [bookLimit, setBookLimit] = React.useState(false);
	const [timeleft, setTimeleft] = React.useState(0);
	const { user } = useContext(UserContext);
	const [userEmail, setUserEmail] = React.useState("");
	const [bookingData, setBookingData] = React.useState({});
	const [error, setError] = React.useState(false);
	const orderNo = `Hairposey${Math.random().toString(36).slice(2)}`;
	const [calendarList, setCalendarList] = React.useState([]);
	const [timeSlotDB, setTimeSlotsDB] = React.useState([]);
	const [showProgress, setShowProgress] = React.useState(false);
	const [confirmDel, setConfirmDel] = React.useState(false);
	const [dailyMax, setDailyMax] = React.useState(0);
	const [timeSlotArray, setTimeSlotArray] = React.useState([]);
	const [_timeSlot, setTimeSlot] = React.useState("");
	const [isPicked, setIsPicked] = React.useState("");
	const [picked, setPicked] = React.useState("");
	const [blockedDatesDB, setBlockedDatesDB] = React.useState([]);
	const [blockedDatesList, setBlockedDatesList] = React.useState([]);
	const status = REACT_APP_STATUS;

	React.useEffect(() => {
		db.collection("all-bookings").onSnapshot((snapshot) => {
			const arr = [];
			snapshot.docs.map((doc) => {
				arr.push({ id: doc.id, data: doc.data() });
			});
			setCalendarList(arr);
		});

		db.collection("timeSlot").onSnapshot((snapshot) => {
			const arr = [];
			snapshot.docs.map((doc) => {
				const day = doc.data().day;
				const time = doc.data().time;
				const order = doc.data().order;
				arr.push({ id: doc.id, day: day, time: time, order: order });
			});
			arr.sort(function (a, b) {
				return a.order - b.order;
			});
			setTimeSlotsDB(arr);
		});

		db.collection("block-dates").onSnapshot((snapshot) => {
			const array1 = [];
			const array2 = [];
			snapshot.docs.map((doc) => {
				array1.push(new Date(doc.data().blockDate.seconds * 1000));
				array2.push({
					id: doc.id,
					day: new Date(doc.data().blockDate.seconds * 1000),
				});
			});
			setBlockedDatesDB(array1);
			setBlockedDatesList(array2);
		});
	}, []);
	React.useEffect(() => {
		if (showProgress) {
			triggerProgress(setTimeleft);
		}
	}, [showProgress]);

	const unBlockSlot = (slot, id, idx) => {
		db.collection("timeSlot").onSnapshot((snapshot) => {
			const res = snapshot.docs
				.map((doc) => {
					if (doc.id === id) {
						return {
							id: doc.id,
							data: doc.data(),
						};
					}
				})
				.filter((x) => x);
			const time = res?.[0]?.data?.time;
			time[idx] = slot.split("-")[0];
			db.collection("timeSlot").doc(id).set({ time: time }, { merge: true });
		});
	};
	const blockSlot = (slot, id, idx) => {
		db.collection("timeSlot").onSnapshot((snapshot) => {
			const res = snapshot.docs
				.map((doc) => {
					if (doc.id === id) {
						return {
							id: doc.id,
							data: doc.data(),
						};
					}
				})
				.filter((x) => x);
			const time = res?.[0]?.data?.time;
			time[idx] = `${slot}-block`;
			db.collection("timeSlot").doc(id).set({ time: time }, { merge: true });
		});
	};

	const submitBlockDate = () => {
		// add block date to db
		db.collection("block-dates").add({ blockDate });
		setBlockDate("");
	};
	const submitUnblockDate = (id) => {
		// remove block date from db
		db.collection("block-dates").doc(id).delete();
	};

	const handleSelectTimeSlot = (t) => {
		setTimeSlot(t);
		setIsPicked(t);
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
					timeSlotArray?.length < timeSlotDB?.length
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
				duration: serviceDuration,
				status: status,
				timeSlot: _timeSlot,
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
						<div className="tw-w-[95%] tw-mx-auto md:tw-w-full">
							<Link to="/">
								<RiHome5Fill className="tw-bg-white tw-absolute -tw-top-8 tw-left-10 md:tw-left-0 tw-shadow-lg tw-w-[40px] tw-h-[40px] tw-text-pink-900 tw-rounded-full tw-p-2 md:hover:tw-bg-pink-900 md:hover:tw-text-white hover:tw-w-[35px] hover:tw-p-4 hover:tw-h-[35px] tw-ease-in tw-duration-300" />
							</Link>
							<div className="tw-w-full tw-text-center">
								<p className="font_cursive tw-text-4xl">My Calendar</p>
							</div>
							<div className="tw-mt-10 lg:tw-mt-0 lg:tw-mb-10 tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-justify-center">
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
									<div className="">
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
									className="lg:tw-ml-10 tw-pt-2 md:tw-pt-0 tw-mt-[10px]">
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
											name="addOnServices">
											<option value="" disabled selected>
												Select add-on
											</option>
											{addOnServices?.map((ad) => (
												<option key={ad.id}>{ad.desc}</option>
											))}
										</select>
									</div>
									<div className="tw-relative">
										<div className="tw-text-neutral-500 tw-font-light tw-text-xs tw-mb-1">
											<span>Time slot -</span>
										</div>
										{selectDate ? (
											<TimeComponent
												data={timeSlotDB}
												selectDate={selectDate}
												timeSlotArray={timeSlotArray}
												handleFunc={handleSelectTimeSlot}
												isPicked
											/>
										) : (
											<span className="tw-text-[10px] tw-font-thin tw-text-neutral-500">
												Select date to display daily time slot...
											</span>
										)}
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

							<div className="tw-grid md:tw-grid-cols-2 tw-gap-3 tw-border-t-[1px] tw-pt-5">
								{calendarList.length ? (
									<CalendarList
										calendarList={calendarList}
										showProgress={showProgress}
										timeleft={timeleft}
										handleDelete={handleSelect}
										setPicked={setPicked}
										setConfirmDel={setConfirmDel}
										confirmDel={confirmDel}
										picked={picked}
									/>
								) : (
									<div>
										<span className="tw-text-red-800 tw-text-xs">
											No data to display...
										</span>
									</div>
								)}
							</div>
							<div className=" tw-mt-10 tw-border-t-[0.5px] tw-pt-5">
								<div className="tw-max-w-full md:tw-max-w-[60%] lg:tw-max-w-[50%] tw-pb-10 tw-mb-5 tw-border-b-[1px]">
									<div className="tw-mb-2 tw-text-pink-600">
										<p>Date Blocker</p>
									</div>
									<div>
										<div className="tw-bg-neutral-200">
											<DatePickerComp
												excludeDates={blockedDatesDB && blockedDatesDB}
												handleSelect={(date) => setBlockDate(date)}
												date={blockDate}
												isLight={true}
											/>
										</div>
										{blockDate && (
											<div className="tw-w-full tw-mx-auto tw-flex tw-flex-row tw-items-center tw-text-[10px] tw-text-red-800 tw-uppercase tw-mb-0 tw-pb-[5px] tw-pt-[10px]">
												<div className="tw-flex-[0.9] tw-w-full tw-text-center tw-flex tw-flex-row tw-items-center">
													<div className="tw-mr-2 tw-text-red-800">
														<GoAlert />
													</div>
													<span>
														{blockDate.toDateString()}. You have chosen to block
														this date
													</span>
												</div>
												<div className="tw-flex-[0.1] tw-px-2 tw-text-center tw-border-[1px] tw-border-red-800 tw-rounded-sm">
													<button
														onClick={submitBlockDate}
														className="tw-uppercase tw-text-red-800">
														Block
													</button>
												</div>
											</div>
										)}
									</div>
									{blockedDatesList.length > 0 && (
										<div className="tw-grid tw-grid-cols-2 tw-gap-1">
											{blockedDatesList.map((block) => (
												<ul
													key={block.id}
													className="tw-flex tw-items-center tw- tw-text-xs tw-text-red-700 tw-font-thin tw-p-2 tw-pr-0 tw-rounded-b-md tw-bg-neutral-100 tw-h-[30px]">
													<li className="tw-flex-[0.7]">
														{block.day.toDateString()}
													</li>
													<button
														onClick={() => submitUnblockDate(block.id)}
														className="tw-rounded-br-md tw-text-green-800 tw-h-[30px] tw-flex tw-flex-[0.3] tw-justify-center tw-items-center">
														<BsFillUnlockFill size={15} />
													</button>
												</ul>
											))}
										</div>
									)}
								</div>
								<div className="tw-mb-2 tw-text-pink-600">
									<p>Time slot blocker</p>
								</div>
								<DayTimeSlotComponent
									timeSlotDB={timeSlotDB}
									timeSlotArray={timeSlotArray}
									handleSelectTimeSlot={handleSelectTimeSlot}
									unBlockSlot={unBlockSlot}
									blockSlot={blockSlot}
								/>
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
