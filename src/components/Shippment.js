import React, { useContext, useState } from 'react'
import emailjs from 'emailjs-com'
import { UserContext } from '../context/user-context'
import Heading from './Heading'
import { db } from '../firebase'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Button from './shared/Button'
import { AUTHORIZED_ID } from '../constant'

function Shippment() {
	const { user } = useContext(UserContext)
	const [readMore, setReadMore] = React.useState(false)
	const [trackingInput, setShowTrackingInput] = React.useState(false)
	const [modal, setModal] = React.useState(false)
	const [_id, setId] = React.useState('')
	const [matchIdx, setMatchIdx] = React.useState('')
	const [custmr, setCustmr] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(true)
	const [shippingInfo, setShippingInfo] = React.useState({
		shippingHeader: [],
		shippingData: [],
	})
	const [trackingNum, setTrackingNum] = useState({
		number: '',
		courier: '',
	})

	const itemObj = []
	// eslint-disable-next-line array-callback-return
	shippingInfo?.shippingData?.filter((item) => {
		const obj = {
			name: item.title,
			quantity: item.quantity,
			description: item.description,
			id: item.id,
		}
		if (item.id === _id) {
			itemObj.push(obj)
		}
	})

	const messageParams = {
		name: user.displayName,
		message: `Thank you for your patronage. Your order of ${itemObj?.[0]?.quantity} ${itemObj?.[0]?.name}, is being processed and your tracking information is: Tracking No - ${trackingNum.number}, Courier - ${trackingNum.courier}.`,
		client: user?.email,
	}

	const handleChangeAuthUser = (e) => {
		setTrackingNum({ ...trackingNum, [e.target.name]: e.target.value })
	}

	const getObjectHeader = (object) => {
		let objectKeys = []
		if (object) {
			for (let i = 0; i < object.length; i++) {
				objectKeys.push(Object?.keys(object?.[i]?.data || []))
			}
		}
		objectKeys.map((item) => item.sort())
		return objectKeys
	}

	React.useEffect(() => {
		// getting address and details for shipping
		user &&
			db
				.collection('admin')
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection('all-purchased')
				.orderBy('title', 'asc')
				.onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}))
					if (results) {
						let data = []
						for (const result of results) {
							data.push({
								address: result?.data.address,
								color: result?.data.color,
								customer: result?.data.customer,
								description: result?.data.description,
								email: result?.data.email,
								id: result?.data.id,
								price: `$${result?.data.price}`,
								quantity: result?.data.quantity,
								title: result?.data.title,
							})
						}

						setTimeout(() => {
							setShippingInfo({
								shippingHeader: getObjectHeader(results),
								shippingData: data,
							})
						}, 5000)
					}
				})
	}, [user])

	if (isLoading) {
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
	}
	const toggleRead = (idx) => {
		setMatchIdx(idx)
		setReadMore(!readMore)
	}
	const toggleModal = (idx, customer) => {
		setCustmr(customer)
		setMatchIdx(idx)
		setModal(true)
	}

	const hideShipped = (id) => {
		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('all-purchased')
			.onSnapshot((snapshot) => {
				snapshot.docs.map(
					(doc) =>
						doc.data().id === id &&
						db
							.collection('admin')
							.doc(`${AUTHORIZED_ID.id_one}/`)
							.collection('all-purchased')
							.doc(doc.id)
							.delete()
				)
			})

		// generate automated email to client
		const SendClientSuccessfulPurchaseEmail = () => {
			emailjs
				.send(
					'service_2yc5daa',
					'template_kxtdmr3',
					messageParams,
					'user_VORMh20QoM0GcnDrVoVnj'
				)
				.then((res) => {})
				.catch((err) => console.log(err))
		}

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail()
		}, 1000)

		setShowTrackingInput(false)
		setModal(false)
	}

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	return (
		<div className="tw-flex tw-flex-col tw-items-center tw-my-5">
			<Heading>Shipment</Heading>
			{user?.email === AUTHORIZED_ID.id_one || AUTHORIZED_ID.id_two ? (
				<div>
					{trackingInput && (
						<div className="tw-mt-10 tw-w-full">
							<input
								type="text"
								name="number"
								id="number"
								value={trackingNum.number}
								onChange={handleChangeAuthUser}
								placeholder="Tracking Number"
								className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-blue-600 focus:tw-ring-0 focus:tw-ring-blue-600 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
							/>
							<input
								type="text"
								name="courier"
								id="courier"
								value={trackingNum.courier}
								onChange={handleChangeAuthUser}
								placeholder="Courier Name"
								className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-blue-600 focus:tw-ring-0 focus:tw-ring-blue-600 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
							/>
							<div
								className={
									trackingNum.number === '' || trackingNum.courier === ''
										? 'tw-flex tw-flex-col tw-justify-center tw-text-sm tw-text-gray-200'
										: 'tw-flex tw-flex-col tw-justify-center tw-text-sm tw-text-green-700 hover:tw-text-gray-400'
								}>
								<button
									disabled={
										trackingNum.number === '' || trackingNum.courier === ''
									}
									onClick={() => hideShipped(_id)}>
									Submit Tracking
								</button>
							</div>
						</div>
					)}
					<main className="history-page">
						{shippingInfo?.shippingHeader?.length === 0 &&
						shippingInfo?.shippingHeader?.length === 0 ? (
							isLoading ? (
								<div className="tw-rounded-full progress">
									<div className="inner"></div>
								</div>
							) : (
								<div className="tw-inline">
									<span>Not Found</span>
								</div>
							)
						) : (
							<>
								<div className="tw-max-w-[90%] tw-mr-[50px] md:tw-px-[50px] md:tw-max-w-[80%] lg:tw-max-w-[100%] md:tw-overflow-x-auto">
									<table>
										<thead>
											<tr className="table-head-row">
												{shippingInfo?.shippingHeader?.[0]?.map((head, idx) => (
													<th key={idx} className="table-head-item">
														{head}{' '}
														{head === 'appointment' || head === 'reservation'
															? ' - date'
															: ''}
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{shippingInfo?.shippingData?.map((item, idx) => (
												<tr className="table-item-row" key={idx}>
													{Object?.values(item)?.map((itm, index) => (
														<td
															className={
																itm?.length >= 200
																	? 'table-items align-left'
																	: 'table-items'
															}
															key={index}
															onClick={() =>
																toggleModal(item?.id, item?.customer)
															}>
															{typeof itm === 'string'
																? itm?.length >= 200
																	? readMore && matchIdx === item?.id
																		? itm
																		: `${itm.substring(0, 70)}...`
																	: itm
																: itm}
															{itm?.length >= 200 && (
																<>
																	<span onClick={() => toggleRead(item?.id)}>
																		{readMore && matchIdx === item?.id ? (
																			<>
																				<span>Read Less</span>{' '}
																				<MdOutlineKeyboardArrowUp />
																			</>
																		) : (
																			<>
																				<span>Read More</span>{' '}
																				<MdOutlineKeyboardArrowDown />
																			</>
																		)}
																	</span>
																</>
															)}
														</td>
													))}
													{modal &&
														matchIdx === item.id &&
														custmr === item?.customer && (
															<div className="been-shipped">
																<div className="tw-mt-[30px] tw-text-xs ">
																	Has this product been shipped ? <br />
																	<span className="been-shipped-textsm tw-text-green-700 tw-text-sm">
																		Click YES to add tracking number
																	</span>
																</div>
																<div className="tw-flex tw-flex-row tw-justify-center">
																	<button
																		className="tw-mx-2 tw-flex tw-flex-row tw-text-sm tw-items-center hover:tw-text-green-700"
																		onClick={() => {
																			setId(item.id)
																			setShowTrackingInput(true)
																			scrollToTop()
																		}}>
																		<GiCheckMark className="tw-mr-1" />
																		Yes
																	</button>
																	<button
																		className="tw-mx-2 tw-flex tw-flex-row tw-text-sm tw-items-center hover:tw-text-red-800"
																		onClick={() => {
																			setShowTrackingInput(false)
																			setModal(false)
																		}}>
																		<MdClose size={20} className="tw-mr-1" />
																		No
																	</button>
																</div>
															</div>
														)}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						)}
					</main>
				</div>
			) : (
				<div className="history-page">
					<p className="danger">UNAUTHORIZED PATH!</p>
					<Button to="/" className="btn block total_btn">
						Back to Home
					</Button>
				</div>
			)}
		</div>
	)
}
export default Shippment
