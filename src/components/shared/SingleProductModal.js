import React from 'react'
import { CgClose } from 'react-icons/cg'
import { isInCart } from '../../utils/helpers'
import Slideshow from '../../utils/Slideshow'
import Rating from './Rating'

const SingleProductModal = ({
	category,
	singleProducts,
	setSingleproducts,
	sales,
	desc,
	sizes,
	setLength,
	setError,
	error,
	singleProduct,
	cartItems,
	IncreaseItem,
	addToCart,
	_hairColor,
	texture,
	sethairType,
	setColor,
}) => {
	return (
		<div>
			{singleProducts && (
				<div className="single tw-fixed tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[0px] md:tw-pt-10 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-pink-100">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
							{_hairColor && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
									<div className="tw-flex tw-flex-wrap">
										{_hairColor.map((colr, idx) => (
											<span
												onClick={() => {
													setColor(colr)
													setError(false)
												}}
												className="tw-flex tw-flex-wrap tw-bg-white tw-rounded-md tw-mr-2  tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300"
												key={idx}>
												<span>{colr}</span>
											</span>
										))}
									</div>
								</div>
							)}
							{texture && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
									<div className="tw-flex tw-flex-wrap">
										{texture.map((tex, idx) => (
											<span
												onClick={() => {
													sethairType(tex)
												}}
												className="tw-flex tw-flex-wrap tw-bg-white tw-rounded-md tw-mr-2  tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300"
												key={idx}>
												<span>{tex}</span>
											</span>
										))}
									</div>
								</div>
							)}
							<div className="tw-flex tw-flex-col tw-mb-5 tw-ml-5 md:tw-ml-0">
								<div className="tw-flex tw-flex-wrap">
									{sizes.map((size, idx) => (
										<span
											onClick={() => {
												setLength(size)
												setError(false)
											}}
											className="tw-flex tw-flex-wrap tw-bg-white tw-rounded-md tw-mr-2 tw-mb-2  tw-px-2 tw-text-[16px] tw-text-neutral-900 tw-p-5 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300"
											key={idx}>
											{size}inch
										</span>
									))}
								</div>
							</div>
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900">
							<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
								Description: {singleProducts?.[0].description}
							</p>
							<div className="tw-flex tw-flex-col">
								<p className="tw-font-medium tw-text-xl tw-my-[10px]">
									Price:{' '}
									{sales !== 0 &&
										singleProducts?.[0]?.sales &&
										`$${
											singleProducts?.[0].price -
											singleProducts?.[0].price * (sales / 100)
										}${' '}
										USD${' '}`}
									<span
										className={
											sales !== 0 &&
											singleProducts?.[0]?.sales &&
											'tw-ml-2 tw-line-through tw-text-neutral-400 tw-border-l-[1px] tw-border-neutral-500 tw-pl-3'
										}>
										${singleProducts?.[0].price} USD
									</span>
								</p>
								<div className="tw-flex tw-items-center">
									<span className="tw-mr-2">Review: </span>
									<Rating isNum={true} />
								</div>
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

							{error && (
								<div>
									<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
										{singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
										singleProducts?.[0]?.type.toLowerCase() === 'closure'
											? `Please provide color, texture and length for ${singleProducts?.[0].name}`
											: `Please provide length for ${singleProducts?.[0].name}`}
									</p>
								</div>
							)}
							{isInCart(singleProduct, cartItems) ? (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 tw-mb-40"
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 tw-mb-40"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}
							<div
								onClick={() => setSingleproducts(null)}
								className="tw-text-2xl tw-bg-white tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] tw-right-[20px] tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white">
								<CgClose />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SingleProductModal
