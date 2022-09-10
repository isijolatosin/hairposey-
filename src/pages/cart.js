import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import CartItems from '../components/CartItems'
import {
	selectCartItems,
	selectTotal,
	clearCartItem,
} from '../slices/appSlices'
import Button from '../components/shared/Button'
import { UserContext } from '../context/user-context'

const Cart = () => {
	const { user } = useContext(UserContext)
	const [agree, setAgree] = React.useState(false)
	const [warn, setWarn] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const database = getDatabase()
	const dispatch = useDispatch()

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, window.innerHeight)
	}
	React.useEffect(() => {
		cartItems.length >= 10 && scrollToTop()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function handleCheckout() {
		if (!agree) {
			setWarn(true)
		}
		if (agree) {
			navigate(`/checkout/${user?.displayName || 'new-customer'}`)
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
							? 'tw-pt-[170px] tw-bg-neutral-200 md:tw-pt-[120px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center '
							: 'tw-bg-neutral-200 tw-pt-[80px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center'
					}>
					{cartItems.length === 0 ? (
						<>
							<div className="tw-mb-5">Your Cart is Empty</div>
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full tw-px-5 md:tw-w-[80%] lg:tw-w-[70%] 2xl:tw-w-[50%] tw-justify-center tw-items-center lg:tw-items-start">
							<div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
								{cartItems.map((item) => (
									<CartItems product={item} key={item._id} />
								))}
							</div>
							<div className="tw-w-full tw-mb-1 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
								<span
									onClick={() => dispatch(clearCartItem())}
									className="tw-text-white hover:tw-text-slate-900 hover:tw-bg-neutral-300 tw-ease-in tw-duration-500 tw-bg-slate-900 tw-px-5 tw-py-2 hover:tw-cursor-pointer tw-text-sm">
									Clear cart
								</span>
							</div>
							<div className="tw-bg-white tw-p-5 tw-rounded-lg tw-w-fit">
								<p>Subtotal - ${Number(total.toFixed(2))} CAD</p>
								<p className="tw-text-neutral-600 tw-text-sm">
									Tax and shipping cost calculated at checkout
								</p>
								<div className="tw-flex tw-items-center tw-relative tw-mb-5">
									<label className="check-container">
										<input
											onChange={(e) => {
												setAgree(e.target.checked)
												setWarn(false)
											}}
											type="checkbox"
										/>
										<span
											className={`${
												warn && 'tw-border-red-700'
											} checkmark`}></span>
									</label>
									<div className="tw-flex tw-items-center">
										<p
											className={`${
												warn ? 'tw-text-red-600' : 'tw-text-neutral-900'
											} tw-text-sm`}>
											I have read and agreed with{' '}
										</p>
										<div className="tw-relative tw-ml-2 tw-text-xs">
											<button
												className={`${
													warn
														? 'tw-text-red-600 tw-border-b-[1px] tw-border-red-600'
														: 'tw-text-blue-500 tw-border-b-[1px] tw-border-blue-500'
												}`}
												onMouseOver={() => setShowInfo(true)}
												onMouseLeave={() => setShowInfo(false)}>
												Terms and Conditions
											</button>
											{showInfo && (
												<div className="tw-absolute tw-max-w-[150px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-br-none tw-text-white tw-text-center tw-top-[-45px] tw-right-[3px] tw-flex tw-items-top">
													<span className="tw-text-left tw-text-[10px] tw-tracking-wiser tw-font-light">
														Review terms and condition in help tab{' '}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="tw-w-fit tw-flex tw-items-center">
									<button
										onClick={handleCheckout}
										className="tw-bg-slate-900 tw-text-white tw-py-2 tw-px-5 tw-text-center tw-text-xs md:tw-text-sm hover:tw-bg-white hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-w-full">
										<button>Proceed</button>
									</button>
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
