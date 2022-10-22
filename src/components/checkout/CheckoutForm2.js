import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { GoAlert } from 'react-icons/go'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { UserContext } from '../../context/user-context'
import PaypalCheckoutButton from '../PaypalCheckoutButton'
import { selectCartItems } from '../../slices/appSlices'

const mastercard = require('../../assets/mastercard.png')
const mastercard2 = require('../../assets/mastercard2.png')
const americanExpress = require('../../assets/american-express.png')

const CheckoutForm = ({
	sales,
	total,
	itemCount,
	setRedirect,
	setPageCancel,
	discountPrice,
	showCardPayment,
	showPaypalPayment,
}) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const cartItems = useSelector(selectCartItems)
	const email =
		localStorage.getItem('altEmail') && localStorage.getItem('altEmail')
	const shippingCost = JSON.parse(localStorage.getItem('shippingCost'))
	const shipMethod = localStorage.getItem('ship')
	const [succeeded, setSucceeded] = React.useState(false)
	const [paymentWarn, setPaymentWarn] = React.useState(false)
	const [_error, set_Error] = React.useState(null)
	const [processing, setProcessing] = React.useState('')
	const [disabled, setDisabled] = React.useState(true)
	const { user } = useContext(UserContext)
	const [paywithStripe, setPaywithStripe] = React.useState(false)

	const shipCostInCent = Number((shippingCost?.cost * 100).toFixed(2))
	const shipCostInDollar = shipCostInCent / 100
	const taxInDollar = Number(
		(Number(total) * Number(process.env.REACT_APP_TAX_PERCENT)).toFixed(2)
	)
	const taxInCent = taxInDollar * 100
	const priceInDollar = total
	const priceInCent = total * 100
	const finalPriceToPay =
		shipMethod === 'ship'
			? discountPrice
				? discountPrice + shipCostInDollar + taxInDollar
				: shipCostInDollar + priceInDollar + taxInDollar
			: discountPrice
			? discountPrice + taxInDollar
			: priceInDollar + taxInDollar

	localStorage.setItem('finalPriceToPay', finalPriceToPay)
	localStorage.setItem(
		'finalPriceToPayObject',
		JSON.stringify({
			priceInDollar: priceInDollar,
			shipCostInDollar: shipCostInDollar,
			taxInDollar: taxInDollar,
		})
	)

	const handlePayWithStripe = () => {
		setPaywithStripe(true)
	}

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}

	const handleChange = async (event) => {
		setDisabled(event.empty)
		set_Error(event.error ? event.error.message : '')
	}

	const handleSubmit = async (ev) => {
		ev.preventDefault()

		if (!paywithStripe) {
			setPaymentWarn(true)
		}

		// if (total_amount >= installmentStartPrice) {
		if (paywithStripe) {
			// One time payment
			setProcessing(true)

			let clientSecret

			try {
				const { data } = await axios.post(
					'/.netlify/functions/create-payment-intent',
					JSON.stringify({
						cartItems,
						shipCostInCent,
						priceInCent,
						taxInCent,
						sales,
						shipMethod,
						itemCount,
					})
				)

				clientSecret = data.clientSecret.split("'")?.[0]
			} catch (error) {
				set_Error(
					error?.response?.data ? 'Please contact modelEst Admin...' : ''
				)
			}

			if (clientSecret) {
				const payload = await stripe.confirmCardPayment(clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement),
						billing_details: {
							email: user?.email || email,
						},
					},
				})

				localStorage.setItem('payload', payload?.paymentIntent?.client_secret)

				if (payload.error) {
					set_Error(`Payment failed ${payload.error.message}`)
					setProcessing(false)
					setTimeout(() => {
						navigate('/canceled')
					}, 5000)
				} else {
					set_Error(null)
					setProcessing(false)
					setSucceeded(true)
					payload?.paymentIntent?.client_secret &&
						setTimeout(() => {
							navigate('/success')
						}, 5000)
				}
			}
		}
	}

	return (
		<div>
			<div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-top tw-w-[100%] tw-bg-white">
				{showCardPayment && (
					<div className="tw-w-[80%] md:tw-w-[50%] tw-flex tw-flex-col tw-items-center tw-my-10 tw-mx-auto">
						<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-center tw-mt-[-8px]">
							<img
								src={mastercard}
								alt="mastercard"
								className="tw-w-[55px] tw-p-2 tw-rounded-[3px]"
							/>
							<img
								src={mastercard2}
								alt="mastercard2"
								className="tw-w-[55px] tw-p-2 tw-rounded-[3px]"
							/>
							<RiVisaLine
								size={55}
								className="tw-mr-3 tw-ml-1 tw-text-blue-900 tw-mt-[-10px]"
							/>
							<div className="tw-relative tw-flex tw-items-center tw-mr-4 tw-mt-[-10px]">
								<RiVisaLine size={55} className="tw-text-blue-800" />
								<span className="tw-absolute tw-bottom-[2px] tw-right-[1px] tw-text-[13px] tw-italic">
									DEBIT
								</span>
							</div>
							<img
								src={americanExpress}
								alt="americanExpress"
								className="tw-w-[55px] tw-mt-[-8px]"
							/>
						</div>
						<div
							onClick={handlePayWithStripe}
							className="tw-w-full tw-text-center tw-bg-neutral-800 tw-text-white tw-text-xs tw-mt-2 tw-px-10 tw-py-3 tw-rounded-[50px] hover:md:tw-bg-neutral-100 tw-ease-in tw-duration-300 hover:md:tw-text-neutral-900">
							<button>PROCEED TO PAYMENT</button>
						</div>
					</div>
				)}
				{showPaypalPayment && (
					<div className="tw-w-full md:tw-w-[50%] tw-mx-auto tw-pb-8 tw-mb-5 tw-p-5 md:tw-p-0">
						<div className=" tw-text-center tw-mb-2">
							<span className="tw-text-[12px] tw-font-bold">
								PAY WITH PAYPAL
							</span>
						</div>
						<div className="tw-w-full">
							<PaypalCheckoutButton
								sales={sales}
								tax={taxInDollar}
								price={priceInDollar}
								cartItems={cartItems}
								itemCount={itemCount}
								shipMethod={shipMethod}
								setRedirect={setRedirect}
								shipCost={shipCostInDollar}
								setPageCancel={setPageCancel}
								discountPrice={discountPrice}
							/>
						</div>
					</div>
				)}
			</div>
			{paywithStripe && (
				<div className="tw-flex tw-flex-col">
					{succeeded ? (
						<article className="tw-text-center tw-mt-2">
							<h4>Thank you. Your payment was successful!</h4>
							<h4 className="tw-text-xs tw-text-green-700 tw-mb-2">
								Redirecting to {succeeded ? 'success' : 'canceled'} page...
							</h4>
						</article>
					) : (
						<article className="tw-flex tw-items-center tw-text-[12px] tw-p-1 tw-mt-1 tw-max-w-[100%] tw-text-black tw-mx-auto">
							<span className="tw-underline">
								Hello, {user && user?.displayName}, your total is $
								{shipMethod === 'ship'
									? discountPrice
										? discountPrice + shipCostInDollar + taxInDollar
										: shipCostInDollar + priceInDollar + taxInDollar
									: discountPrice
									? discountPrice + taxInDollar
									: priceInDollar + taxInDollar}{' '}
								-{' '}
								<span className="tw-text-neutral-400">
									(tax
									{shipMethod === 'pick up' ? '' : ' & shipping'} inclusive)
								</span>
							</span>
						</article>
					)}
				</div>
			)}
			<form
				className={`${
					paywithStripe
						? 'tw-block tw-ease-in tw-duration-300 tw-w-full tw-pt-2 tw-bg-white'
						: 'tw-hidden tw-ease-in tw-duration-300'
				} tw-mb-10`}
				id="payment-form"
				onSubmit={handleSubmit}>
				<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6">
					<SiMastercard size={20} className="tw-text-yellow-500 tw-mr-3" />
					<RiVisaLine size={30} className="tw-mr-3 tw-text-blue-900" />
					<div className="tw-relative tw-flex tw-items-center tw-mr-5">
						<RiVisaLine size={30} className="tw-text-blue-800" />
						<span className="tw-absolute tw-bottom-[0px] tw-right-[1px] tw-text-[7px] tw-italic">
							DEBIT
						</span>
					</div>
					<SiAmericanexpress size={20} className="tw-text-blue-600 tw-mt-2" />
				</div>
				<CardElement
					id="card-element"
					options={cardStyle}
					onChange={handleChange}
					className="tw-w-[95%] tw-mx-auto tw-border-[1px] tw-border-b-0 tw-p-3 tw-rounded-t-[4px] "
				/>
				<button
					className="tw-bg-neutral-900 tw-w-[95%] tw-flex tw-mx-auto tw-justify-center tw-py-2 tw-rounded-b-md"
					disabled={processing || disabled || succeeded || !paywithStripe}
					id="submit">
					<span
						className={
							processing || disabled || succeeded || paywithStripe
								? 'tw-text-neutral-50 tw-font-light'
								: 'tw-text-orange-500 tw-font-light'
						}>
						{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
					</span>
				</button>
				{paymentWarn && (
					<span className="tw-text-red-700 tw-text-xs tw-flex tw-items-center tw-justify-center tw-mt-2 tw-capitalize">
						<GoAlert className="tw-mr-2" />
						Please set your payment plan
					</span>
				)}
				{_error && (
					<div
						className="card-error tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-red-700 "
						role="alert">
						<GoAlert className="tw-mr-2" />
						{_error}
					</div>
				)}
				<div className="tw-w-[90%] tw-mx-auto tw-pt-1">
					<p className={succeeded ? 'result-message' : 'result-message hidden'}>
						Payment Succeeded,
						{user?.email === 'tisijola7@gmail.com' && (
							<span>
								{' '}
								see the result in your
								<a
									className="tw-text-blue-600"
									href={`https://dashboard.stripe.com/test/payments`}
									target="_blank"
									rel="noreferrer">
									{' '}
									Stripe Dashboard
								</a>
							</span>
						)}{' '}
						Refresh the page to pay again
					</p>
				</div>
			</form>
		</div>
	)
}

export default CheckoutForm
