import React from 'react'
import axios from 'axios'
import { FaOpencart } from 'react-icons/fa'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { isInCart } from '../utils/helpers'

function Card({ product, setSingleproducts, setSingleCart, scrollToTop }) {
	const [clickedID, setClickedID] = React.useState('')
	// const [ID, setID] = React.useState('')
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()
	const [bundles, setBundles] = React.useState({
		length: '14',
		quantity: '',
	})
	const lengthArr = product.availablelength.split(',')

	function handleMouseIn(event) {
		setClickedID(event.target.id)
	}

	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter(
				(product) => product._id === event.target.id
			)
			setSingleproducts(result)
		} catch (error) {
			console.log(error)
		}

		scrollToTop()
	}

	let salesAmount = Number(product.price - product.price * 0.15)
	let cardPrice = product.price

	// Actual price
	if (bundles.length === '14') {
		cardPrice = product.price
	} else if (bundles.length === '16') {
		cardPrice = product.price + 10
	} else if (bundles.length === '18') {
		cardPrice = product.price + 20
	} else if (bundles.length === '20') {
		cardPrice = product.price + 30
	} else if (bundles.length === '22') {
		cardPrice = product.price + 40
	} else if (bundles.length === '24') {
		cardPrice = product.price + 50
	} else if (bundles.length === '26') {
		cardPrice = product.price + 60
	} else if (bundles.length === '28') {
		cardPrice = product.price + 70
	} else if (bundles.length === '30') {
		cardPrice = product.price + 80
	}
	// Sales Price

	if (bundles.length === '14') {
		salesAmount = product.price - product.price * 0.15
	} else if (bundles.length === '16') {
		salesAmount = salesAmount + 10
	} else if (bundles.length === '18') {
		salesAmount = salesAmount + 20
	} else if (bundles.length === '20') {
		salesAmount = salesAmount + 30
	} else if (bundles.length === '22') {
		salesAmount = salesAmount + 40
	} else if (bundles.length === '24') {
		salesAmount = salesAmount + 50
	} else if (bundles.length === '26') {
		salesAmount = salesAmount + 60
	} else if (bundles.length === '28') {
		salesAmount = salesAmount + 70
	} else if (bundles.length === '30') {
		salesAmount = salesAmount + 80
	}

	// Adding to cart items
	const { name, _id, image, color, description } = product
	const price = product.sales ? salesAmount : cardPrice
	const hairLength = bundles.length
	const hairColor = color

	const singleProduct = {
		name,
		id: _id,
		image,
		hairColor,
		price,
		hairLength,
		description,
	}
	const addToCart = () => {
		dispatch(addToCartItem(singleProduct))
		setTimeout(() => {
			setSingleCart(singleProduct)
		}, 1000)
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
		setTimeout(() => {
			setSingleCart(singleProduct)
		}, 1000)
	}

	const handleOnChange = (e) => {
		setBundles({ ...bundles, [e.target.name]: e.target.value })
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[100%] tw-mx-auto tw-h-[300px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product.image}
				alt={product._id}
				className=" tw-w-[400px] tw-h-full tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-sm tw-rounded-bl-sm tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						View Image
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-sm">
				<div className="tw-pt-2 tw-flex tw-justify-between tw-w-full">
					<p className=" tw-text-xs">{product.name}</p>
					<div className="tw-pb-2 tw-text-xs">
						{product.sales && (
							<span className="tw-mr-2 tw-tracking-wider tw-font-semibold">
								${salesAmount.toFixed(2)}
							</span>
						)}
						<span
							className={
								product.sales
									? 'tw-line-through tw-tracking-wider  tw-font-light'
									: 'tw-tracking-wider'
							}>
							${cardPrice.toFixed(2)}
						</span>
					</div>
				</div>
				<div className="tw-flex tw-items-center tw-mb-5 tw-justify-between">
					<select
						className="tw-flex-[0.2] tw-text-gray-500 tw-block tw-w-full tw-mr-5 tw-px-3 tw-py-1 tw-border tw-border-gray-100 tw-rounded-sm tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-noneinvalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						onChange={handleOnChange}
						id="length"
						value={bundles.length}
						name="length"
						placeholder="Length">
						{lengthArr.map((len, idx) => (
							<option key={idx}>{len}</option>
						))}
					</select>
					<div className="tw-flex-[0.8] tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-sm tw-bg-neutral-900 tw-px-1 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[110px] tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500">
						{isInCart(singleProduct, cartItems) ? (
							<div
								className="tw-flex tw-flex-row tw-items-center"
								onClick={cartItems.length !== 0 ? IncreaseItem : null}>
								<span className="tw-mr-3">Add More</span>
								<BsFillCartPlusFill />
							</div>
						) : (
							<div
								className="tw-flex tw-flex-row tw-items-center"
								onClick={addToCart}>
								<span className="tw-mr-3">Add to cart</span>
								<FaOpencart />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
