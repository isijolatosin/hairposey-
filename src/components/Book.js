import React, { useContext } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Calendar } from 'react-date-range'
import Button from './shared/Button'
import { categories, staffs, services, sessions } from './formData'
import { UserContext } from '../context/user-context'

const bookImg = require('../assets/book.jpeg')

function Book() {
	const dateToday = new Date()
	const { user } = useContext(UserContext)
	const [selectDate, setSelectDate] = React.useState(null)
	const [bookingData, setBookingData] = React.useState({
		session: '',
		category: '',
		service: '',
		personnel: '',
	})
	const [userEmail, setUserEmail] = React.useState('')

	const handleSelect = (ranges) => {
		if (ranges > dateToday) {
			setSelectDate(ranges.toDateString())
		}
		// cartItems.length > 0 && dispatch(clearCartItem())
	}

	const handleOnChange = (e) => {
		setBookingData({ ...bookingData, [e.target.name]: e.target.value })
	}

	// Proceed function
	function handleCheckoutSession(e) {
		e.preventDefault()
		const body = JSON.stringify({
			shipping_options: [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: 0,
							currency: 'cad',
						},
						display_name: 'Free shipping',
						// Delivers between 5-7 business days
						delivery_estimate: {
							minimum: {
								unit: 'business_day',
								value: 5,
							},
							maximum: {
								unit: 'business_day',
								value: 7,
							},
						},
					},
				},
			],
			line_items: [
				{
					price_data: {
						currency: 'cad',
						product_data: {
							name: `Hair Appointment for ${selectDate}`,
						},
						unit_amount: 50 * 100,
					},
					quantity: 1,
				},
			],
			customer_email: user?.email ?? userEmail,
		})
		fetch('/create-checkout-session', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body,
		})
			.then((res) => {
				if (res.ok) return res.json()
				return res.json().then((json) => Promise.reject(json))
			})
			.then(({ url }) => {
				// console.log(url)
				window.location = url
			})
			.catch((e) => {
				console.log(e.message)
			})
	}

	return (
		<div className="tw-flex tw-flex-col lg:tw-flex-row tw-width-full tw-border-t tw-border-b tw-p-5 lg:tw-pl-0 tw-mx-auto">
			<div className="tw-hidden lg:tw-block tw-relative tw-flex-shrink-0 tw-overflow-x-hidden lg:tw-w-[250px] tw-mx-auto lg:tw-flex-none">
				<img
					src={bookImg}
					alt=""
					className="tw-absolute tw-inset-0 tw-w-[250px] tw-h-[100%] tw-object-cover tw-object-left-top lg:tw-object-center lg:tw-shadow-xl lg:tw-shadow-slate-300"
				/>
				{/* <div className="tw-relative tw-h-[250px] tw-w-[250px] tw-p-12 tw-flex tw-flex-row tw-justify-between tw-items-start tw-m-0!important"></div> */}
			</div>
			<div className="tw-flex tw-flex-col tw-items-center lg:tw-border-l-2 lg:tw-mx-auto lg:tw-pl-[10px] lg:tw-flex-1 lg-tw-w-full">
				<div className="tw-text-gray-700 tw-text-2xl tw-mt-[30px] tw-mb-[50px] tw-border-b-[1px] tw-px-[10px] tw-py-1 tw-shadow-xl tw-shadow-slate-300 ">
					<h2>
						For Your Hair Appointment, Schedule{' '}
						<span className="tw-text-red-700">Now!</span>
					</h2>
				</div>
				<div className=" tw-p-2 tw-shadow-lg lg:tw-p-5 xl:tw-pr-[20px] tw-flex tw-flex-col lg:tw-flex-col xl:tw-flex-row">
					<div className="tw-flex tw-flex-col tw-items-center tw-mt-[-40px] tw-px-5 lg:tw-mr-10">
						<div className="xl:tw-ml-0">
							<Calendar
								color="pink"
								date={new Date()}
								onChange={handleSelect}
								dateDisplayFormat="yyyy-MM-dd"
							/>
						</div>
						<div
							className={
								selectDate
									? 'tw-text-sm tw-text-black tw-bg-gray-100 tw-m-[10px] tw-shadow-lg tw-shadow-gray-300 tw-px-[10px] tw-py-[5px] tw-border-r-4 tw-opacity-1 tw-rounded-lg tw-ease-in tw-duration-300'
									: 'tw-opacity-0'
							}>
							<span>- You have selected {selectDate} -</span>
						</div>
						{!user && (
							<label
							// className="tw-relative"
							>
								<input
									type="text"
									autoComplete="off"
									placeholder=" "
									name="email"
									id="email"
									value={userEmail}
									onChange={(e) => setUserEmail(e.target.value)}
									className="tw-shadow-xl"
								/>
								<p>Email Address...</p>
							</label>
						)}
					</div>
					<div className="tw-width-full tw-mx-auto">
						<div className="tw-flex tw-flex-col">
							<form
								onSubmit={handleCheckoutSession}
								className="sm:tw-w-[500px] lg:tw-w-[500px] xl:tw-w-[350px] 2xl:tw-w-[450px] xl:tw-mt-[-25px]">
								<div className="tw-mb-[50px]">
									<div className="tw-text-neutral-500 tw-font-light tw-text-xs">
										<label>Session</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-sm tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
										onChange={handleOnChange}
										id="Session"
										value={bookingData.session}
										name="session">
										{sessions.map((session) => (
											<option key={session.id}>{session.name}</option>
										))}
									</select>
								</div>
								<div className="tw-mb-[50px]">
									<div className="tw-text-neutral-500 tw-font-light tw-text-xs">
										<label>Category</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-sm tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
										onChange={handleOnChange}
										id="category"
										value={bookingData.category}
										name="category">
										{categories.map((category) => (
											<option key={category.id}>{category.name}</option>
										))}
									</select>
								</div>
								<div className="tw-mb-[50px]">
									<div className="tw-text-neutral-500 tw-font-light tw-text-xs">
										<label>Services</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-sm tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-noneinvalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
										onChange={handleOnChange}
										id="Service"
										value={bookingData.service}
										name="service">
										{services.map((service) => (
											<option key={service.id}>{service.name}</option>
										))}
									</select>
								</div>
								<div className="tw-mb-[50px]">
									<div className="tw-text-neutral-500 tw-font-light tw-text-xs">
										<label>Personnel</label>
									</div>
									<select
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-sm tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-noneinvalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
										onChange={handleOnChange}
										id="Personnel"
										value={bookingData.personnel}
										name="personnel">
										{staffs.map((staff) => (
											<option key={staff.id}>{staff.name}</option>
										))}
									</select>
									{bookingData.personnel && !selectDate && (
										<span className="tw-text-rose-600 tw-text-[14px] tw-w-[100%] tw-mx-auto tw-mb-10">
											Missing Condential: Date...
										</span>
									)}
									<div className="tw-text-center tw-my-[50px]">
										{bookingData.personnel &&
											bookingData.service &&
											bookingData.category &&
											bookingData.session &&
											selectDate &&
											userEmail && (
												<Button type="submit">Submit Booking</Button>
											)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Book
