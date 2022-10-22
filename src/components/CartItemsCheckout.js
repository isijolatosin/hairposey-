import React from 'react'

const CartItemsCheckout = ({ product }) => {
	const { name, image, price, quantity } = product

	return (
		<div className="tw-relative tw-flex tw-flex-row tw-rounded-full tw-w-full lg:tw-border-[1px] lg:tw-border-neutral-200 tw-bg-neutral-100 tw-max-h-fit">
			<div>
				<img
					className="tw-max-w-[35px] tw-object-cover tw-rounded-l-full tw-shadow-lg"
					src={image}
					alt={name}
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-[100%]">
				<div className="tw-text-black lg:tw-text-neutral-600 tw-font-light tw-text-sm tw-flex tw-items-center tw-justify-between tw-w-full tw-pl-3 tw-pr-5">
					<div className="tw-font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: $${price * quantity}`}</p>
				</div>
				<div className="tw-bg-neutral-100 tw-rounded-full tw-text-neutral-900 tw-w-[17px] tw-h-[17px] tw-mx-auto tw-flex tw-items-center tw-justify-center tw-absolute tw-top-[-10px] tw-right-[20px] tw-font-bold tw-border-[1px] tw-border-neutral-300">
					<span className="tw-text-[10px]">{quantity}</span>
				</div>
			</div>
		</div>
	)
}

export default CartItemsCheckout
