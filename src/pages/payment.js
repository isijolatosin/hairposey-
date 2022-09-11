import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaHandPointRight } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItemsCheckout from '../components/CartItemsCheckout'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
} from '../slices/appSlices'
import StripeCheckout from '../components/checkout/stripe-checkout'
import Button from '../components/shared/Button'
import { UserContext } from '../context/user-context'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { fetchSalesPercentage } from '../utils/salesPercentageNumber'
import { BsCreditCard } from 'react-icons/bs'
import Heading from '../components/Heading'
import { RiVisaLine } from 'react-icons/ri'
import { BASE_CURRENCY_CONVERTER_URL } from '../constant'
import { FiSend } from 'react-icons/fi'

const logo = require('../assets/logo.png')
const paypal = require('../assets/paypal.png')
const mastercard = require('../assets/mastercard.png')
const mastercard2 = require('../assets/mastercard2.png')
const americanExpress = require('../assets/american-express.png')

const Cart = () => {
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const [referral, setReferral] = React.useState('')
	const [error, setError] = React.useState(false)
	const [redirect, setRedirect] = React.useState(false)
	const [pageCancel, setPageCancel] = React.useState(false)
	const discountPrice = Number(localStorage.getItem('discountPrice'))
	const userName = localStorage.getItem('username')
	const phone = localStorage.getItem('phone')
	const country = localStorage.getItem('country')
	const orderNo = localStorage.getItem('order no')
	const shippingObj = JSON.parse(localStorage.getItem('shippingCost'))
	const shipMethod = localStorage.getItem('ship')
	const userPostalAddress = localStorage.getItem('address')
	const [showLoad, setShowLoad] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)
	const [selectShippingOption, setSelectShippingOption] = React.useState(false)
	const [showPaypalPayment, setShowPaypalPayment] = React.useState(false)
	const [showCardPayment, setShowCardPayment] = React.useState(false)
	const [warn, setWarn] = React.useState(false)
	const [estimatedTotalPriceNaira, setestimatedTotalPriceNaira] =
		React.useState('')
	const [exchangeRate, setExchangeRate] = React.useState('')
	const shipPrice =
		shipMethod === 'ship' ? `USD $${shippingObj.cost}:00` : 'PICK UP'
	const taxPrice = discountPrice
		? Number(
				(discountPrice * Number(process.env.REACT_APP_TAX_PERCENT)).toFixed(2)
		  )
		: Number((total * Number(process.env.REACT_APP_TAX_PERCENT)).toFixed(2))

	let estimatedTotalPrice
	if (shipMethod === 'ship') {
		if (discountPrice) {
			estimatedTotalPrice = discountPrice + shippingObj.cost + taxPrice
		} else {
			estimatedTotalPrice = total + shippingObj.cost + taxPrice
		}
	} else {
		if (discountPrice) {
			estimatedTotalPrice = discountPrice + taxPrice
		} else {
			estimatedTotalPrice = total + taxPrice
		}
	}
	React.useEffect(() => {
		setSales(fetchSalesPercentage())

		const myHeaders = new Headers()
		myHeaders.append('apikey', process.env.REACT_APP_EXCHANGE_RATE_DATA_API_KEY)

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
			headers: myHeaders,
		}

		country === 'nigeria' &&
			fetch(
				`${BASE_CURRENCY_CONVERTER_URL}to=ngn&from=usd&amount=${estimatedTotalPrice}`,
				requestOptions
			)
				.then((response) => response.json())
				.then((result) => {
					setestimatedTotalPriceNaira(result.result.toFixed(2))
					setExchangeRate(result.info.rate.toFixed(2))
				})
				.catch((error) => console.log('error', error))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (redirect) {
		setTimeout(function () {
			setRedirect(false)

			navigate('/success')
		}, 5000)
	}
	if (pageCancel) {
		setTimeout(function () {
			setPageCancel(false)

			navigate('/canceled')
		}, 5000)
	}
	if (showLoad) {
		setTimeout(function () {
			setShowLoad(false)
		}, 5000)
	}

	const handlePayMethod = (method, event) => {
		if (event) {
			setWarn(false)
			setSelectShippingOption(method)
		}
		if (!localStorage.getItem('referral') && country === 'nigeria') {
			setError(true)
		}
	}

	const placeOrder = function () {
		if (error) {
			setError(false)
		}
		if (selectShippingOption) {
			if (selectShippingOption === 'paypal') {
				setWarn(false)
				setShowPaypalPayment(true)
				setShowCardPayment(false)
			} else if (selectShippingOption === 'card') {
				setWarn(false)
				setShowCardPayment(true)
				setShowPaypalPayment(false)
			}
			localStorage.setItem('payMethod', selectShippingOption)
		} else {
			setWarn(true)
		}
		setSelectShippingOption('')
	}

	const handleReferral = () => {
		setReferral('')
		localStorage.setItem('referral', referral)
		setError(false)
	}

	return (
		<>
			<Helmet>
				<title>Payment</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={
						sales
							? 'tw-pt-[125px] tw-bg-neutral-200 md:tw-pt-[105px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
							: 'tw-bg-neutral-200 tw-pt-[50px] md:tw-pt-[60px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
					}>
					{cartItems.length === 0 ? (
						<div className="tw-flex tw-items-center">
							<div className="tw-mr-5 tw-font-light tw-text-white">
								Your Cart is Empty
							</div>
							<FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</div>
					) : (
						<div className="tw-w-full tw-h-[100%] md:tw-px-10 bg-blur3">
							<div className="tw-flex tw-h-full tw-flex-col te-items-center">
								<div className="tw-w-[200px] tw-mx-auto tw-mb-10">
									<img src={logo} alt="" />
								</div>
								<div className="tw-text-neutral-400 tw-flex tw-items-center tw-border-t-[1px] tw-border-neutral-800 tw-py-3 lg:tw-mt-[-40px] tw-justify-center tw-font-light tw-text-xs tw-mt-[-30px]">
									<Link
										to={`/user-cart/${user?.displayName}`}
										className="tw-flex tw-items-center tw-mr-2">
										<span className="tw-mr-2 tw-text-[#bba371]">Cart</span>
										<MdKeyboardArrowRight size={23} />
									</Link>
									<Link
										to={`/checkout/${user?.displayName}`}
										className="tw-flex tw-items-center tw-mr-2">
										<span
											className={`${
												window.location.pathname.includes('checkout')
													? 'tw-text-white tw-font-bold'
													: 'tw-text-neutral-400'
											} tw-mr-2`}>
											Information
										</span>
										<MdKeyboardArrowRight size={23} />
									</Link>
									<Link to={`/payment/${user?.displayName}`}>
										<span
											className={`${
												window.location.pathname.includes('payment')
													? 'tw-text-white tw-font-bold'
													: 'tw-text-neutral-400'
											}`}>
											Payment
										</span>
									</Link>
								</div>
								<div className="tw-w-full lg:tw-w-[60%] xl:tw-w-[50%] tw-mx-auto tw-h-full tw-bg-neutral-200 tw-p-1 md:tw-p-5 tw-px-3 tw-pt-3">
									{cartItems.map((item) => (
										<CartItemsCheckout product={item} key={item.id} />
									))}
									<div className="tw-relative">
										<div className="tw-p-3 tw-text-xs tw-font-light tw-border-t-[1px] tw-border-b-[1px] tw-border-[#b59248] tw-mt-3">
											<div className=" tw-border-b-[1px] tw-border-[#b59248] tw-pb-3">
												<div className="tw-w-[65%] tw-capitalize">
													<Heading
														children="Billing Address"
														isLight={true}
														size1={true}
														isBold={true}
													/>
													<p>
														{userName} - {phone}
													</p>
													<p>{userPostalAddress}</p>
												</div>
											</div>
											<div className="tw-py-3">
												<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
													<p>Order Number:</p>
													<p>{orderNo}</p>
												</div>
												<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
													<p>Subtotal:</p>
													<p>USD ${discountPrice ? discountPrice : total}</p>
												</div>
												<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
													<div className="tw-flex tw-items-center tw-relative">
														<p>Shipping fee</p>
														<BsFillQuestionCircleFill
															size={15}
															onMouseOver={() => setShowInfo(true)}
															onMouseLeave={() => setShowInfo(false)}
															className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
														/>
														{showInfo && (
															<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-45px] tw-left-[84px]">
																<span>Check shipping policy in help tab</span>
															</div>
														)}
													</div>
													<p>{shipPrice}</p>
												</div>
												<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
													<p>Taxes included:</p>
													<p>USD ${taxPrice}</p>
												</div>
												<div className="tw-flex tw-justify-between tw-items-center">
													<p>Discount:</p>
													<p>
														USD $
														{discountPrice ? total - discountPrice : '0.00'}
													</p>
												</div>
											</div>
										</div>
										<div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-py-5 tw-px-3">
											<span className="tw-text-[16px]">Total:</span>
											<div className="tw-flex tw-flex-col">
												<div className="tw-flex tw-items-center">
													<span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
														USD
													</span>
													{showLoad ? (
														<div className="circular-loader-small"></div>
													) : (
														<span className="tw-text-[20px]">
															${estimatedTotalPrice}
														</span>
													)}
												</div>
											</div>
										</div>
										{country === 'nigeria' && (
											<div className="tw-border-y-[1px] tw-border-[#b59248] tw-p-3  tw-w-full">
												<div className="tw-flex-[0'5] tw-mb-5">
													<Heading
														children="Conversion"
														isLight={true}
														size1={true}
														isBold={true}
													/>
													<div className="tw-flex tw-items-center tw-text-neutral-600 tw-font-thin tw-mt-[-3px]">
														<p className="tw-text-[10px] tw-mr-2">Rate: </p>
														<p className="tw-text-[12px]">#{exchangeRate}</p>
													</div>
													<div className="tw-flex tw-items-center tw-text-neutral-600 tw-font-thin tw-mt-[-5px]">
														<span className="tw-text-[10px] tw-mr-2">
															NAIRA:{' '}
														</span>
														{showLoad ? (
															<div className="circular-loader-small"></div>
														) : (
															<span className="tw-text-[12px]">
																#{estimatedTotalPriceNaira}
															</span>
														)}
													</div>
												</div>
												<div className="tw-flex-[0'5] tw-w-fit">
													<p className="tw-text-xs">Enter referral code</p>
													<div className="tw-flex tw-items-center">
														<input
															name="referral"
															type="text"
															value={referral}
															onChange={(e) => setReferral(e.target.value)}
															placeholder="referral code"
															className={`${
																error && referral === ''
																	? 'tw-border-red-700 tw-border-[1px]'
																	: 'tw-border-[1px] tw-border-[#bba371]'
															} tw-text-sm tw-font-light tw-bg-transparent tw-py-1 placeholder:tw-text-xs focus:tw-ring-0`}
														/>
														<button
															onClick={handleReferral}
															className="tw-text-[#bba371] tw-pl-2">
															<FiSend size={20} />
														</button>
													</div>
													{error && (
														<div className="tw-text-red-700">
															<p className="tw-text-xs">
																Please enter your referral code!
															</p>
														</div>
													)}
												</div>
											</div>
										)}
									</div>
								</div>
								<div className="tw-w-full lg:tw-w-[60%] xl:tw-w-[50%] tw-mx-auto lg:tw-px-0">
									<div className="tw-bg-white ">
										<div className="tw-mb-10 tw-border-b-[1px] tw-z-40">
											<div className="tw-mt-5 tw-mb-2 tw-flex tw-items-center tw-justify-between tw-p-3 tw-border-b-[1px]">
												<Heading
													children="Payment Method"
													isBlack={true}
													isLight={true}
												/>
												{warn && (
													<span className="tw-text-red-500 tw-ml-5 tw-text-sm tw-mr-2">
														Choose your payment method
													</span>
												)}
											</div>
											<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between">
												<div className="tw-w-full md:tw-w-[60%] tw-border-b-[1px] md:tw-border-b-0">
													<div className="tw-px-5 tw-flex tw-items-center tw-border-b-[1px]">
														<label className="radio-container tw-mr-2 tw-mt-[-10px]">
															<input
																onClick={(e) =>
																	handlePayMethod('paypal', e.target.checked)
																}
																type="radio"
																name="radio"
																// checked
															/>
															<span
																className={`checkmark-radio ${
																	warn && 'tw-border-red-500 tw-border-[1px]'
																}`}></span>
														</label>

														<div
															className={`tw-flex tw-items-center ${
																warn ? 'tw-text-red-500' : 'tw-text-black'
															}`}>
															<img
																src={paypal}
																alt="paypal"
																className="tw-w-[45px] tw-border-[1px] tw-border-neutral-700 tw-p-2 tw-rounded-[3px]"
															/>
															<span className="tw-text-[12px] tw-m-3 tw-font-light tw-tracking-wider">
																Pay with PayPal
															</span>
														</div>
													</div>
													<div className="tw-px-5 tw-flex tw-items-top">
														<label className="radio-container tw-mr-2 tw-mt-[10px]">
															<input
																onClick={(e) =>
																	handlePayMethod('card', e.target.checked)
																}
																type="radio"
																name="radio"
															/>
															<span
																className={`checkmark-radio ${
																	warn && 'tw-border-red-500 tw-border-[1px]'
																}`}></span>
														</label>
														<div
															className={`tw-flex tw-items-start ${
																warn ? 'tw-text-red-500' : 'tw-text-black'
															} tw-flex tw-flex-col`}>
															<div className="tw-flex tw-items-center">
																<BsCreditCard size={35} color="black" />
																<span className="tw-text-[12px] tw-m-3 tw-font-light tw-tracking-wider">
																	Credit / Debit Card
																</span>
															</div>
															<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6 tw-mt-[-8px]">
																<img
																	src={mastercard}
																	alt="mastercard"
																	className="tw-w-[30px] tw-p-2 tw-rounded-[3px]"
																/>
																<img
																	src={mastercard2}
																	alt="mastercard2"
																	className="tw-w-[30px] tw-p-2 tw-rounded-[3px]"
																/>
																<RiVisaLine
																	size={25}
																	className="tw-mr-2 tw-mt-[-2px] tw-text-blue-900"
																/>
																<div className="tw-relative tw-mt-[-2px] tw-flex tw-items-center tw-mr-2">
																	<RiVisaLine
																		size={25}
																		className="tw-text-blue-800"
																	/>
																	<span className="tw-absolute tw-bottom-[1px] tw-right-[1px] tw-text-[5px] tw-italic">
																		DEBIT
																	</span>
																</div>
																<img
																	src={americanExpress}
																	alt="americanExpress"
																	className="tw-w-[30px]"
																/>
															</div>
														</div>
													</div>
												</div>
												<div
													onClick={placeOrder}
													className="tw-z-40 tw-flex tw-flex-col tw-items-center tw-w-full tw-my-10 md:tw-my-0 md:tw-w-[40%]">
													<button className="tw-bg-neutral-800 tw-text-white tw-text-xs tw-px-5 tw-py-2 hover:md:tw-bg-neutral-100 hover:md:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-w-[80%] md:tw-w-[50%] tw-mx-auto tw-rounded-[30px]">
														PLACE ORDER
													</button>
													{error && (
														<div className="tw-text-neutral-900">
															<p className="tw-text-[10px]">
																Please enter your referral code in order
																summary! (optional)
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
										{(showPaypalPayment || showCardPayment) && (
											<div className="tw-w-full">
												<StripeCheckout
													itemCount={itemCount}
													total={discountPrice ? discountPrice : total}
													setRedirect={setRedirect}
													setPageCancel={setPageCancel}
													discountPrice={discountPrice}
													sales={sales}
													showPaypalPayment={showPaypalPayment}
													showCardPayment={showCardPayment}
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
					<div
						className={`${
							redirect || pageCancel
								? 'tw-opacity-1 tw-inline tw-ease-in tw-duration-300'
								: 'tw-opacity-0 tw-hidden tw-ease-in tw-duration-300'
						} tw-bg-[rgba(0,0,0,0.9)] tw-flex tw-flex-col tw-items-center tw-justify-center tw-fixed tw-top-[35%] tw-z-50 tw-ease-in tw-duration-300 tw-w-[70%] tw-h-[40%] md:tw-w-[20%] md:tw-h-[20%]`}>
						<div className="circular-loader"></div>
						<div>
							<span className="tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
								{redirect ? (
									<div className="tw-mt-2">
										<span className="tw-text-center tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
											<p className="">Transaction Successfull.</p>
											<p>Redirecting...</p>
										</span>
									</div>
								) : pageCancel ? (
									<div className="tw-mt-2">
										<span className="tw-text-center tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
											<p className="">Transaction Canceled.</p>
											<p>Redirecting...</p>
										</span>
									</div>
								) : (
									''
								)}
							</span>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Cart
