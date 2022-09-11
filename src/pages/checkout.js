import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaHandPointRight } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItemsCheckout from '../components/CartItemsCheckout'
import { selectCartItems, selectTotal } from '../slices/appSlices'
import Total from '../components/Total'
import Button from '../components/shared/Button'
import { UserContext } from '../context/user-context'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { HiTruck } from 'react-icons/hi'
import { GiCardPickup } from 'react-icons/gi'
import Heading from '../components/Heading'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { db } from '../firebase'
import { AUTHORIZED_ID } from '../constant'
import { fetchSalesPercentage } from '../utils/salesPercentageNumber'

const logo = require('../assets/logo.png')

const Cart = () => {
	const { user } = useContext(UserContext)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const [redirect, setRedirect] = React.useState(false)
	const [pageCancel, setPageCancel] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [discount, setDiscount] = React.useState('')
	const [discountPrice, setDiscountPrice] = React.useState('')
	const [shippingMethod, setShippingMethod] = React.useState('')
	const [warn, setWarn] = React.useState(false)
	const [showLoad, setShowLoad] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)
	const [pickupNote, setPickupNote] = React.useState(false)
	const [resultArry, setResultArray] = React.useState([])
	const [code, setCode] = React.useState('')

	const generateCode = () => {
		const genCode = `ModelEst${Math.random().toString(18).slice(2)}`
		setCode(genCode)
		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('discount-code')
			.add({
				code: genCode,
			})
			.then(() => {
				console.log(`SUCCESSFULL ADDED CODE`)
			})
			.catch((error) => console.log('Error ' + error.message))
	}

	React.useEffect(() => {
		localStorage.removeItem('discountPrice')
		localStorage.removeItem('ship')
		localStorage.removeItem('address')
		localStorage.removeItem('altEmail')
		localStorage.removeItem('shippingCost')
		localStorage.removeItem('payload')
		localStorage.removeItem('finalPriceToPayObject')
		localStorage.removeItem('finalPriceToPay')
		localStorage.removeItem('order no')
		localStorage.removeItem('username')
		localStorage.removeItem('payMethod')
		localStorage.removeItem('country')
		localStorage.removeItem('referral')
		localStorage.removeItem('phone')

		setSales(fetchSalesPercentage())

		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('discount-code')
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))

				const resultArry = []
				for (const result of results) {
					resultArry.push(result?.data?.code)
				}
				setResultArray(resultArry)
			})

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

	const handleDisount = (e) => {
		setDiscount(e.target.value)
	}

	const handleApply = () => {
		if (error) {
			setTimeout(function () {
				setError(false)
			}, 5000)
		}
		if (code) {
			setTimeout(function () {
				setCode('')
			}, 3000)
		}
		if (resultArry.includes(discount)) {
			if (discount === '') {
				setError(true)
			} else {
				if (sales > 0) {
					const salesPrice = total * (sales / 100)
					setDiscountPrice(total - salesPrice)

					localStorage.setItem('discountPrice', total - salesPrice)
					setShowLoad(true)
				}
				setDiscount('')
			}

			db.collection('admin')
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection('discount-code')
				.onSnapshot((snapshot) => {
					snapshot.docs.map(
						// eslint-disable-next-line array-callback-return
						(doc) => {
							if (doc.data().code === discount) {
								db.collection('admin')
									.doc(`${AUTHORIZED_ID.id_one}/`)
									.collection('discount-code')
									.doc(doc.id)
									.delete()
							}
						}
					)
				})
		} else {
			setError(true)
		}
	}

	const handleShipMethod = (method, event) => {
		if (event) {
			setShippingMethod(method)
			localStorage.setItem('ship', method)
			setWarn(false)
		} else {
			setShippingMethod('')
			localStorage.removeItem('ship', '')
			setWarn(true)
		}
	}

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={
						sales
							? 'tw-pt-[125px] tw-bg-neutral-200 md:tw-pt-[105px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
							: 'tw-bg-neutral-200 tw-pt-[57px] md:tw-pt-[60px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
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
						<div className="tw-w-full tw-h-[100%] md:tw-pr-5 tw-bg-neutral-900">
							<div className="tw-flex tw-h-full tw-flex-col">
								<div className="tw-w-[200px] tw-mx-auto tw-mb-10">
									<img src={logo} alt="" />
								</div>
								<div className="tw-text-neutral-400 tw-flex tw-items-center tw-border-t-[1px] tw-border-neutral-800 tw-py-3 lg:tw-mt-[-40px] tw-justify-center tw-font-light tw-text-xs tw-mt-[-30px]">
									<Link
										to={`/user-cart/${user?.displayName}`}
										className="tw-flex tw-items-center tw-mr-2">
										<span className="tw-mr-2 tw-text-neutral-600">Cart</span>
										<MdKeyboardArrowRight size={23} />
									</Link>
									<Link
										to={`/checkout/${user?.displayName}`}
										className="tw-flex tw-items-center tw-mr-2">
										<span
											className={`${
												window.location.pathname.includes('checkout')
													? 'tw-text-[#bba371] tw-font-bold'
													: 'tw-text-neutral-400'
											} tw-mr-2`}>
											Information
										</span>
										<MdKeyboardArrowRight size={23} />
									</Link>
									<Link to={`/payment`} className="tw-text-neutral-300">
										<span>Payment</span>
									</Link>
								</div>
								<div className="tw-w-full lg:tw-w-[60%] xl:tw-w-[50%] tw-mx-auto tw-h-full tw-bg-neutral-200 tw-p-1 md:tw-p-5 tw-px-3 tw-pt-3">
									<div className="tw-grid md:tw-grid-cols-2 2xl:tw-grid-cols-3 tw-gap-2">
										{cartItems.map((item) => (
											<CartItemsCheckout product={item} key={item.id} />
										))}
									</div>
									{sales > 0 && (
										<>
											<div className="tw-w-full tw-pt-5 tw-flex tw-items-center">
												<input
													name="discount"
													type="text"
													value={discount}
													onChange={handleDisount}
													placeholder="Discount code"
													className={`${
														error && discount === ''
															? 'tw-border-red-700 tw-border-[1px]'
															: 'tw-border-neutral-400 tw-border-[1px]'
													} tw-text-sm tw-font-light tw-rounded-md tw-w-[70%] tw-py-2 placeholder:tw-text-xs `}
												/>
												<button
													className="tw-w-[30%] tw-bg-neutral-900 tw-text-white tw-ml-2 tw-py-[11px] tw-text-xs tw-rounded-md"
													onClick={handleApply}>
													Apply
												</button>
											</div>
											{error && (
												<div className="tw-pb-5 tw-pt-2 ">
													<p className="tw-text-[10px] tw-text-red-700 tw-text-center">
														<span className="tw-font-bold tw-text-xs">
															Discount Code Not Valid!
														</span>
														<br />
														<span className="tw-text-neutral-700 tw-font-light tw-tracking-wider">
															Please generate a new code
														</span>
													</p>
													<div className="tw-text-[10px] tw-w-full tw-mx-auto tw-flex tw-items-center tw-justify-center tw-mt-3">
														<button
															disabled={code}
															onClick={generateCode}
															className="tw-bg-neutral-900 tw-text-white tw-p-2 tw-rounded-md hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-ease-in tw-duration-300">
															Generate code
														</button>
													</div>
													<div>
														<p className="yellow tw-text-neutral-400 tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-4">
															{code}
														</p>
													</div>
												</div>
											)}
										</>
									)}
									<div className="tw-relative">
										<div
											className={`${
												error ? 'tw-border-t-[1px]' : 'tw-border-t-0'
											} tw-border-b-[1px] tw-border-[#b59248] tw-py-5 tw-text-neutral-700`}>
											<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
												<span>Subtotal</span>
												{showLoad ? (
													<div className="circular-loader-small"></div>
												) : (
													<span className="tw-text-[16px]">
														${discountPrice ? discountPrice : total}
													</span>
												)}
											</div>
											<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
												<div className="tw-relative tw-flex tw-items-center">
													<span>Shipping</span>
													<BsFillQuestionCircleFill
														size={17}
														onMouseOver={() => setShowInfo(true)}
														onMouseLeave={() => setShowInfo(false)}
														className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
													/>
													{showInfo && (
														<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[74px] tw-font-light tw-text-sm tw-flex tw-items-top">
															<span className="tw-text-left">
																Review shipping policy in help tab
															</span>
														</div>
													)}
												</div>
												<span>Calculated at next step</span>
											</div>
										</div>
										<div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-pt-5">
											<span className="tw-text-[16px]">Total</span>
											<div className="tw-flex tw-items-center">
												<span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
													CAD
												</span>
												{showLoad ? (
													<div className="circular-loader-small"></div>
												) : (
													<span className="tw-text-[20px]">
														${discountPrice ? discountPrice : total}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="tw-w-full lg:tw-w-[60%] xl:tw-w-[50%] tw-mx-auto tw-px-3 lg:tw-px-0">
									<div className="tw-mt-5 tw-mb-2 tw-flex tw-items-center tw-justify-between">
										<Heading
											children="Delivery method"
											isWhite={true}
											size3={true}
										/>
										{warn && (
											<span className="tw-text-red-500 tw-ml-5 tw-text-sm tw-mr-2">
												Choose a shipping / delivery method
											</span>
										)}
									</div>
									<div className="tw-bg-slate-400 tw-rounded-lg tw-mb-5 tw-flex tw-items-center">
										<div className="tw-py-3 tw-px-5 tw-flex tw-items-center">
											<label className="radio-container tw-mr-2 tw-mt-[-10px]">
												<input
													onClick={(e) =>
														handleShipMethod('ship', e.target.checked)
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
													warn ? 'tw-text-red-500' : 'tw-text-slate-900'
												}`}>
												<HiTruck size={25} />
												<span className="tw-text-[16px] tw-m-3">Ship</span>
											</div>
										</div>
										<div className="tw-py-3 tw-px-5 tw-flex tw-items-center">
											<label className="radio-container tw-mr-2 tw-mt-[-10px]">
												<input
													onClick={(e) =>
														handleShipMethod('pick up', e.target.checked)
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
												className={`tw-flex tw-items-center ${
													warn ? 'tw-text-red-500' : 'tw-text-slate-900'
												}`}>
												<GiCardPickup size={20} />
												<span className="tw-text-[16px] tw-m-3">Pick up</span>
											</div>
										</div>
									</div>
									<div className="tw-text-xs tw-mb-2 tw-flex tw-items-center tw-relative">
										<Heading
											children="Shipping Address"
											isWhite={true}
											size3={true}
										/>
										{shippingMethod === 'pick up' && (
											<>
												<BsFillQuestionCircleFill
													size={20}
													onMouseOver={() => setPickupNote(true)}
													onMouseLeave={() => setPickupNote(false)}
													className="tw-text-white tw-mx-3 hover:tw-cursor-pointer"
												/>
												{pickupNote && (
													<div className="tw-absolute tw-max-w-[200px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-45px] tw-left-[185px]">
														<span>
															Shipping information maybe needed to complete
															order
														</span>
													</div>
												)}
											</>
										)}
									</div>
									<div className="tw-w-full tw-mb-10">
										<Total shippingMethod={shippingMethod} setWarn={setWarn} />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Cart
