import React from 'react'
import StripeCheckout from './checkout/stripe-checkout'
// import { SHIPPING_COST } from '../constant'

const Total = ({ itemCount, total }) => {
	// const canImage = require('../assets/can-image.jpeg')
	// const usaImage = require('../assets/usa-image.jpeg')
	// const lonImage = require('../assets/lon-image.jpeg')

	return (
		<div className="tw-bg-neutral-50 tw-p-5">
			{/* <div className="tw-border-[1px] tw-py-3 tw-px-5 tw-rounded-sm tw-text-slate-600 tw-max-w-[70%] tw-mx-auto tw-flex tw-flex-row tw-justify-between"> */}
			{/* <div>
					<p>Total Items: {itemCount}</p>
					<span>{`Amount to Pay: $${total}`}</span>
				</div> */}
			{/* <ul>
					<li className="tw-flex tw-flex-row tw-items-center tw-text-xs tw-font-medium">
						<img className="tw-h-[8px] tw-mr-3" src={usaImage} alt="usa-flag" />
						USA - ${SHIPPING_COST.usa}:00
					</li>
					<li className="tw-flex tw-flex-row tw-items-center tw-text-xs tw-font-medium">
						<img
							className="tw-h-[8px] tw-mr-3"
							src={canImage}
							alt="canada-flag"
						/>
						CAN - ${SHIPPING_COST.canada}:00
					</li>
					<li className="tw-flex tw-flex-row tw-items-center tw-text-xs tw-font-medium">
						<img
							className="tw-h-[8px] tw-mr-3"
							src={lonImage}
							alt="london-flag"
						/>
						UK - ${SHIPPING_COST.london}:00
					</li>
				</ul> */}
			{/* </div> */}
			<StripeCheckout total={total} itemCount={itemCount} />
		</div>
	)
}

export default Total
