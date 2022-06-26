import React from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import CartItems from '../components/CartItems'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
	clearCartItem,
} from '../slices/appSlices'
import Total from '../components/Total'
import Button from '../components/shared/Button'

const Cart = () => {
	const itemCount = useSelector(selectItemCount)
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
		cartItems.length >= 3 && scrollToTop()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-pt-[170px] tw-bg-neutral-200 md:tw-pt-[120px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center '
							: 'tw-bg-neutral-200 tw-pt-[80px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center '
					}>
					{cartItems.length === 0 ? (
						<>
							<div className="tw-mb-5">Your Cart is Empty</div>
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full tw-px-5 md:tw-w-[60%] lg:tw-w-[50%] tw-justify-center tw-items-center lg:tw-items-start">
							<div className="tw-w-full">
								{cartItems.map((item) => (
									<CartItems product={item} key={item.id} isCart="true" />
								))}
							</div>
							<div className="tw-w-full tw-mb-1 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
								<span
									onClick={() => dispatch(clearCartItem())}
									className="tw-text-white hover:tw-text-slate-900 hover:tw-bg-neutral-300 tw-ease-in tw-duration-500 tw-bg-slate-900 tw-px-5 tw-py-2 hover:tw-cursor-pointer tw-text-sm">
									Clear cart
								</span>
							</div>
							<div className="tw-w-full">
								<Total itemCount={itemCount} total={total} />
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Cart
