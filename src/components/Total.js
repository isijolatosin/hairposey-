import React from 'react'
import CheckoutForm from './checkout/CheckoutForm'

const Total = ({ shippingMethod, setWarn }) => {
	return (
		<div className="tw-bg-white tw-p-5">
			<CheckoutForm shippingMethod={shippingMethod} setWarn={setWarn} />
		</div>
	)
}

export default Total
