import React from 'react'
import Card from './Card'
import { isInCart } from '../utils/helpers'
import Slideshow from '../utils/Slideshow'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import Add2CartPopup from './shared/Add2CartPopup'
import { useDispatch, useSelector } from 'react-redux'
import Rating from './shared/Rating'
import { CgClose } from 'react-icons/cg'

function Products({ allProducts, sales, setImage, setIsSingleImage }) {
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
	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['Straight', 'Bodywave', 'Curly', 'Wavy']

	const sizes = singleProducts?.[0].availablelength.split(', ')

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const _id = singleProducts?.[0] && singleProducts?.[0]?._id
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
		_id,
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
		{ key: 'Material', value: '100% Human Hair' },
		{ key: 'Density', value: '150% - 200%' },
		{ key: 'Cap Size', value: 'Average Size(Head circumference: 54cm - 58cm' },
		{ key: 'Can be bleached.dyed', value: 'Yes' },
		{
			key: 'Delivery time',
			value:
				'We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)',
		},
		{
			key: 'Return policy',
			value:
				'We accept 30-days no reason return exchange with hair not been used',
		},
	]

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-absolute md:tw-top-[-73px] tw-top-[15px] tw-right-0">
				<Add2CartPopup singleCart={singleCart} setSingleCart={setSingleCart} />
			</div>
			{allProducts ? (
				<div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center tw-justify-center tw-pb-10 tw-pt-0">
					{allProducts.map((product) => {
						localStorage.setItem('isSales', product.sales)
						return (
							<div key={product._id} className="tw-mb-2 md:tw-mb-0">
								<Card
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
									setImage={setImage}
									setIsSingleImage={setIsSingleImage}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			{singleProducts && (
				<div className="single tw-fixed tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[-97px] md:tw-top-[0px] md:tw-pt-10 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-[rgba(255,255,255,0.96)]">
					<div className=" tw-relative md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
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
								<div className="tw-flex tw-flex-wrap tw-ml-5 md:tw-ml-0">
									{sizes.map((size, idx) => (
										<span
											onClick={() => {
												setLength(size)
												setError(false)
											}}
											className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-2 tw-text-[16px] tw-text-neutral-900 tw-p-5 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300"
											key={idx}>
											{size}inch
										</span>
									))}
								</div>
							)}
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
							<Rating isNum={true} isReview={true} size={20} />
							{singleProducts?.[0]?.sales && sales !== 0 && (
								<p className="tw-font-bold tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									{sales}% <span className="tw-text-xs">OFF</span>
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
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300 tw-mb-20 md:tw-mb-0"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}

							<div
								onClick={() => {
									setSingleproducts(null)
									setLength(null)
								}}
								className="tw-text-2xl tw-bg-neutral-200 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[120px] tw-right-[20px] md:tw-top-[-20px] md:tw-right-[-70px] tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white">
								<CgClose />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Products
