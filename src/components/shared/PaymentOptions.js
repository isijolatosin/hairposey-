import React from 'react'

// const paypal = require('../../assets/paypal.png')
const stripe = require('../../assets/stripe.png')

const PaymentOptions = ({ price }) => {
	return (
		<div className="tw-my-3">
			<p className="tw-text-xs tw-flex tw-items-center tw-text-neutral-600">
				Pay with Credit / Debit Card{' '}
				<img src={stripe} alt="stripe" className="tw-w-[45px] tw-ml-[2px]" />
				{/* /{' '}
				<img src={paypal} alt="paypal" className="tw-w-[45px] tw-mx-1" /> */}
			</p>
			{/* <p className="tw-text-xs tw-flex tw-items-center tw-text-neutral-600">
				or 4 interest-free payment of ${price ? price / 4 : '$$$'} with{' '}
				<img src={paypal} alt="paypal" className="tw-w-[45px] tw-mx-1" />
			</p> */}
			<p className="tw-text-xs tw-text-blue-700">Available @ checkout</p>
		</div>
	)
}

export default PaymentOptions
