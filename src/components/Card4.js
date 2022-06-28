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
		widthlength: product.type.toLowerCase() === 'frontal' ? '13x4' : '5x4',
		length: '14',
		color: 'Natural black',
		hairType: 'Straight',
	})
	const lengthArr = product.availablelength.split(',')
	const colorArr = product?.availablecolor?.split(', ')
	const widthlength = product?.widthlength?.split(', ')
	const hairType = ['Straight', 'Bodywave', 'Wavy', 'Curly']

	function handleMouseIn(event) {
		setClickedID(event.target.id)
	}

	const handleOnChange = (e) => {
		setBundles({ ...bundles, [e.target.name]: e.target.value })
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

	let cardPrice1 = product.price
	let salesAmount1 = Number(product.price - product.price * 0.15)

	//  Actual price1
	if (bundles.length === '14') {
		cardPrice1 = product.price
	} else if (bundles.length === '16') {
		cardPrice1 = product.price + 10
	} else if (bundles.length === '18') {
		cardPrice1 = product.price + 20
	} else if (bundles.length === '20') {
		cardPrice1 = product.price + 30
	} else if (bundles.length === '22') {
		cardPrice1 = product.price + 40
	}
	// Sales Price1
	if (bundles.length === '14') {
		salesAmount1 = product.price - product.price * 0.15
	} else if (bundles.length === '16') {
		salesAmount1 = salesAmount1 + 10
	} else if (bundles.length === '18') {
		salesAmount1 = salesAmount1 + 20
	} else if (bundles.length === '20') {
		salesAmount1 = salesAmount1 + 30
	} else if (bundles.length === '22') {
		salesAmount1 = salesAmount1 + 40
	}

	let cardPrice2 = product.price
	let salesAmount2 = Number(product.price - product.price * 0.15)
	// Actual Price2
	if (bundles.length === '14') {
		cardPrice2 = product.price
	} else if (bundles.length === '16') {
		cardPrice2 = product.price + 10
	} else if (bundles.length === '18') {
		cardPrice2 = product.price + 20
	} else if (bundles.length === '20') {
		cardPrice2 = product.price + 30
	} else if (bundles.length === '22') {
		cardPrice2 = product.price + 40
	}
	// Sales Price2
	if (bundles.length === '14') {
		salesAmount2 = product.price - product.price * 0.15
	} else if (bundles.length === '16') {
		salesAmount2 = salesAmount2 + 10
	} else if (bundles.length === '18') {
		salesAmount2 = salesAmount2 + 20
	} else if (bundles.length === '20') {
		salesAmount2 = salesAmount2 + 30
	} else if (bundles.length === '22') {
		salesAmount2 = salesAmount2 + 40
	}

	// Adding to cart items
	const { name, _id, image, description } = product
	const price =
		// checking for frontal
		product.type.toLowerCase() === 'frontal'
			? bundles.color.includes('Blonde613')
				? product.sales
					? ((cardPrice2 += 10), (salesAmount2 += 10))
					: (cardPrice2 += 10)
				: product.sales
				? bundles.hairType.includes('Bodywave') ||
				  bundles.hairType.includes('Wavy') ||
				  bundles.hairType.includes('Curly')
					? ((cardPrice2 += 5), (salesAmount2 += 5))
					: cardPrice2
				: cardPrice2
			: // checking for closure
			bundles.color.includes('Natural black') &&
			  (bundles.hairType.includes('Bodywave') ||
					bundles.hairType.includes('Wavy') ||
					bundles.hairType.includes('Curly'))
			? ((cardPrice1 += 5), product.sales && (salesAmount1 += 5))
			: bundles.color.includes('Natural black') &&
			  bundles.hairType.includes('Straight')
			? product.sales && (cardPrice1, salesAmount1)
			: bundles.color.includes('Blonde613') &&
			  (bundles.hairType.includes('Bodywave') ||
					bundles.hairType.includes('Wavy'))
			? product.sales && ((cardPrice1 += 15), (salesAmount1 += 15))
			: ((cardPrice1 += 10), (salesAmount1 += 10))

	const hairLength = bundles.length
	const hairColor = bundles.color

	const singleProduct = {
		name,
		id: _id,
		image,
		price,
		hairLength,
		hairColor,
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

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[100%] tw-h-[300px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product.image}
				alt={product._id}
				className=" tw-w-full tw-h-full tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-lg tw-rounded-bl-lg tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						View Image
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-lg">
				<div className="tw-pt-2 tw-flex tw-items-center tw-justify-between tw-w-full">
					<p className="tw-text-sm">{product.name}</p>
					{/* <p className=" tw-text-xs tw-text-neutral-600">
							{product.description}
						</p> */}
					<div className="tw-text-xs">
						{product.sales && (
							<span className="tw-mr-2 tw-tracking-wider tw-font-semibold">
								$
								{product.type.toLowerCase() === 'frontal'
									? salesAmount2.toFixed(2)
									: salesAmount1.toFixed(2)}
							</span>
						)}
						<span
							className={
								product.sales
									? 'tw-line-through tw-tracking-wider  tw-font-light'
									: 'tw-tracking-wider'
							}>
							$
							{product.type.toLowerCase() === 'frontal'
								? cardPrice2.toFixed(2)
								: cardPrice1.toFixed(2)}
						</span>
					</div>
				</div>
				<div className="tw-flex tw-items-center tw-justify-between tw-w-full">
					<select
						className="tw-flex-[0.5] tw-text-gray-500 tw-mt-1 tw-block tw-w-full tw-mr-2 tw-px-1 tw-py-1 tw-border tw-border-gray-100 tw-rounded-sm tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						onChange={handleOnChange}
						id="length"
						value={bundles.length}
						name="length">
						{lengthArr?.map((len, idx) => (
							<option key={idx}>{len}</option>
						))}
					</select>
					<select
						className="tw-flex-[0.5] tw-text-gray-500 tw-mt-1 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-gray-100 tw-rounded-sm tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						onChange={handleOnChange}
						id="widthlength"
						value={bundles?.widthlength}
						name="widthlength">
						{widthlength?.map((len, idx) => (
							<option key={idx}>{len}</option>
						))}
					</select>
				</div>
				<div className="tw-flex tw-items-center tw-justify-between tw-w-full">
					<select
						className="tw-text-gray-500 tw-mt-1 tw-mr-2 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-gray-100 tw-rounded-sm tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="color"
						value={bundles.color}
						name="color">
						{colorArr?.map((colo, idx) => (
							<option key={idx}>{colo}</option>
						))}
					</select>
					<select
						className="tw-text-gray-500 tw-mt-1 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-gray-100 tw-rounded-sm tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="hairType"
						value={bundles.hairType}
						name="hairType">
						{hairType?.map((type, idx) => (
							<option key={idx}>{type}</option>
						))}
					</select>
				</div>
				<div className="tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-sm tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[100%] tw-mx-auto tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-5">
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
	)
}

export default Card
