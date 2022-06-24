import React from 'react'
import Card from './Card'
import { isInCart } from '../utils/helpers'
import Slideshow from '../utils/Slideshow'
import { AiFillStar } from 'react-icons/ai'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import Add2CartPopup from './shared/Add2CartPopup'
import { useDispatch, useSelector } from 'react-redux'

function Products({ allProducts, sales }) {
	const [singleProducts, setSingleproducts] = React.useState(null)

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}
	const [error, setError] = React.useState(false)
	const [singleCart, setSingleCart] = React.useState(null)
	const [length, setLength] = React.useState(null)
	const [_color, setColor] = React.useState(null)
	const [_hairType, sethairType] = React.useState(null)
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	const MAX_RATING = 5
	const MIN_RATING = 1
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['Straight', 'Bodywave', 'Curly', 'Wavy']

	const sizes = singleProducts?.[0].availablelength.split(', ')

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const width = singleProducts?.[0] && singleProducts?.[0]?.widthlength
	const price = singleProducts?.[0]?.price
	const hairLength = length
	const hairColor = _color || color
	const hairTexture = _hairType && _hairType

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		width,
		hairTexture,
	}

	const addToCart = () => {
		if (length) {
			dispatch(addToCartItem(singleProduct))
			setTimeout(() => {
				setSingleCart(singleProduct)
			}, 1000)
		} else {
			setError(true)
		}
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
	}

	const desc = [
		{ key: 'Hair Texture', value: '' },
		{ key: 'Hair Color', value: '' },
		{
			key: 'Hair Length',
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
	]

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-absolute md:tw-top-[-73px] tw-top-[15px] tw-right-0">
				<Add2CartPopup singleCart={singleCart} setSingleCart={setSingleCart} />
			</div>
			{allProducts ? (
				<div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center tw-justify-center tw-pb-10 tw-t-0">
					{allProducts.map((product) => {
						localStorage.setItem('isSales', product.sales)
						return (
							<div key={product._id} className="tw-mb-2 md:tw-mb-0">
								<Card
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			{/* <div className="tw-mx-auto lg:tw-w-4/5 xl:tw-w-full tw-bg-neutral-50 tw-py-10 tw-mt-10">
				<About />
			</div> */}
			{singleProducts && (
				<div className="single tw-absolute tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[-97px] md:tw-top-[22px] md:tw-pt-20 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 tw-mt-10 md:tw-mt-0">
							<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
								Description: {singleProducts?.[0].description}
							</p>
							<p className="tw-font-medium tw-text-xl tw-my-[10px]">
								Price:{' '}
								{sales !== 0 &&
									singleProducts?.[0].sales &&
									`$${
										singleProducts?.[0].price -
										singleProducts?.[0].price * (sales / 100)
									}${' '}
										USD${' '}`}
								<span
									className={
										sales !== 0 &&
										singleProducts?.[0].sales &&
										'tw-ml-2 tw-line-through tw-text-neutral-400 tw-border-l-[1px] tw-border-neutral-500 tw-pl-3'
									}>
									${singleProducts?.[0].price} USD
								</span>
							</p>
							<div className="tw-flex tw-items-center">
								<span className="tw-mr-2">Review: </span>
								{Array(rating)
									.fill()
									.map((_, i) => (
										<AiFillStar className="tw-text-red-800" size={20} key={i} />
									))}
								<span className="tw-ml-1">{rating + deci}</span>
							</div>
							{singleProducts?.[0]?.sales && (
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									Sales: {sales && `${sales}%`}{' '}
									<span className="tw-text-xs">OFF</span>
								</p>
							)}
							<div className="tw-my-5 tw-border-t-[1px] tw-border-b-[1px] tw-border-red-700 tw-py-5">
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{' '}
										</span>
										<span>{item.value}</span>
									</div>
								))}
							</div>
							{singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
							singleProducts?.[0]?.type.toLowerCase() === 'closure' ? (
								<div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{_hairColor.map((colr, idx) => (
												<span
													onClick={() => {
														setColor(colr)
													}}
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
													key={idx}>
													<span>{colr}</span>
												</span>
											))}
										</div>
									</div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{texture.map((tex, idx) => (
												<span
													onClick={() => {
														sethairType(tex)
													}}
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
													key={idx}>
													<span>{tex}</span>
												</span>
											))}
										</div>
									</div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{sizes.map((size, idx) => (
												<span
													onClick={() => {
														setLength(size)
													}}
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[16px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
													key={idx}>
													{size}inch
												</span>
											))}
										</div>
									</div>
								</div>
							) : (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<div className="tw-flex tw-flex-wrap">
										{sizes.map((size, idx) => (
											<span
												onClick={() => {
													setLength(size)
													setError(false)
												}}
												className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-2 tw-text-[16px] tw-text-neutral-900 tw-p-5 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
												key={idx}>
												{size}inch
											</span>
										))}
									</div>
								</div>
							)}

							{error && (
								<div>
									<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
										Please provide length for {singleProducts?.[0].name}
									</p>
								</div>
							)}

							{isInCart(singleProduct, cartItems) ? (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}

							<div
								onClick={() => setSingleproducts(null)}
								className="tw-text-black tw-text-sm tw-font-normal tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-mt-5 tw-mb-20 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-300 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300  ">
								<span>Close</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Products
