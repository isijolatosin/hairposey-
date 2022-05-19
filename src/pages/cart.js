import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaOpencart } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItems from '../components/CartItems'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
} from '../slices/appSlices'
import Total from '../components/Total'
import Button from '../components/shared/Button'

const Cart = () => {
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
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
							: 'tw-bg-neutral-200 tw-pt-[150px] md:tw-pt-[100px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center '
					}>
					<div className="tw-flex tw-flex-row tw-items-center tw-mb-5">
						<FaOpencart className="tw-text-2xl tw-text-violet-500" />
						<h2 className="tw-text-2xl tw-ml-2 tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
							Cart
						</h2>
					</div>
					{cartItems.length === 0 ? (
						<>
							<div className="tw-mb-5">Your Cart is Empty</div>
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full tw-px-5 lg:tw-flex-row lg:tw-w-[90%] tw-justify-center tw-items-center lg:tw-items-start">
							<div className="tw-w-full lg:tw-w-[40%] xl:tw-w-[50%]">
								{cartItems.map((item) => (
									<CartItems product={item} key={item.id} />
								))}
							</div>
							<div className="tw-w-full lg:tw-ml-5 xl:tw-ml-5 lg:tw-w-[60%] xl:tw-w-[50%]">
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
