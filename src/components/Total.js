import React from 'react'
import StripeCheckout from './checkout/stripe-checkout'

const Total = ({ itemCount, total }) => {
	return (
		<div className="tw-bg-neutral-300 tw-p-5 tw-rounded-lg">
			<StripeCheckout total={total} itemCount={itemCount} />
		</div>
	)
}

export default Total
