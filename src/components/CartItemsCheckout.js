import React from 'react'

const CartItemsCheckout = ({ product }) => {
	const { name, image, price, quantity } = product

	return (
		<div className="tw-flex tw-flex-row tw-rounded-full tw-w-full lg:tw-border-[1px] lg:tw-border-neutral-200 tw-bg-neutral-100">
			<div className="tw-mr-5">
				<img
					className="tw-max-w-[50px] tw-max-h-[50px] tw-object-cover tw-rounded-full tw-shadow-lg"
					src={image}
					alt={name}
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-[100%]">
				<div className="tw-text-black lg:tw-text-neutral-600 tw-font-light tw-text-sm">
					<div className="tw-font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: $${price * quantity}`}</p>
				</div>
				<div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-full tw-w-[15%] tw-py-3 tw-px-2 tw-rounded-r-md">
					<div>
						<span className="tw-text-sm tw-mr-5">{quantity}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItemsCheckout
