import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { GoAlert } from 'react-icons/go'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { selectCartItems } from '../../slices/appSlices'
import { UserContext } from '../../context/user-context'
import { SHIPPING_COST } from '../../constant'
import { ValidateEmail } from '../../utils/ValidateEmail'

const CheckoutForm = ({ total, itemCount }) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const cartItems = useSelector(selectCartItems)
	const [email, setEmail] = React.useState('')
	const [succeeded, setSucceeded] = React.useState(false)
	const [isProceed, setIsProceed] = React.useState(false)
	const [paymentPlanWarn, setPaymentPlanWarn] = React.useState(false)
	const [alert, setAlert] = React.useState(false)
	const [_error, set_Error] = React.useState(null)
	const [processing, setProcessing] = React.useState('')
	const [disabled, setDisabled] = React.useState(true)
	const [clientSecret, setClientSecret] = React.useState('')
	const [allowproceed, setAllowProceed] = React.useState(false)

	const localStorageCountry = localStorage
		?.getItem('country')
		?.toLowerCase()
		?.split(' - ')[0]
	const region =
		((localStorageCountry === 'united states of america' ||
			localStorageCountry === 'united states') &&
			'usa') ||
		((localStorageCountry === 'united kingdom' ||
			localStorageCountry === 'london') &&
			'uk') ||
		localStorageCountry
	const [address, setAddress] = React.useState({
		street: '',
		city: '',
		province: '',
		postalcode: '',
		country: localStorage.getItem('country') ? region : '',
	})
	const [shippingCost, setShippingCost] = React.useState({
		country: '',
		cost: '',
	})
	const [error, setError] = React.useState(false)
	const { user } = useContext(UserContext)
	const [payPlan, setPlan] = React.useState('')
	const paymentPlan = [
		{ id: 1, name: 'Payment Plan' },
		{ id: 2, name: 'One-Time' },
		{ id: 3, name: 'Bi-Weekly' },
	]
	const handleOnChange = (e) => {
		setPlan(e.target.value)
	}
	const inputOnchangeHandler = (e) => {
		let value = e.target.value
		if (
			e.target.value.toLowerCase() === 'united states of america' ||
			e.target.value.toLowerCase() === 'united states' ||
			e.target.value.toLowerCase() === 'america'
		) {
			value = 'usa'
		}
		if (
			e.target.value.toLowerCase() === 'united kingdom' ||
			e.target.value.toLowerCase() === 'london'
		) {
			value = 'uk'
		}
		setAddress({ ...address, [e.target.name]: value })
		setAlert(false)
	}

	// Submit address
	const handleSubmitAddress = () => {
		if (
			address?.country.toLowerCase() === 'usa' ||
			address?.country.toLowerCase() === 'uk' ||
			address?.country.toLowerCase() === 'canada'
		) {
			const shippingAd = `${address.street}, ${address.city}. ${address.province}. ${address.postalcode}. ${address.country}`

			if (
				!user ||
				!email ||
				!address.street ||
				!address.city ||
				!address.province ||
				!address.postalcode ||
				!address.country
			) {
				setError(true)
			}
			if (!ValidateEmail(email)) {
				setError(true)
			}
			if (
				(user &&
					address?.street &&
					address?.city &&
					address?.province &&
					address?.postalcode &&
					address?.country) ||
				(email &&
					ValidateEmail(email) &&
					address?.street &&
					address?.city &&
					address?.province &&
					address?.postalcode &&
					address?.country)
			) {
				localStorage.setItem('address', shippingAd)
				localStorage.setItem('altEmail', email)
				setAllowProceed(true)
				setAddress({
					street: '',
					city: '',
					province: '',
					postalcode: '',
					country: '',
				})
				setError(false)
			}
			Object.keys(SHIPPING_COST).filter(
				(cntry) =>
					cntry.toLowerCase() === address.country.toLowerCase() &&
					setShippingCost({
						country: cntry,
						cost: SHIPPING_COST[cntry],
					})
			)
			setEmail('')
			setIsProceed(true)
		} else {
			setAlert(true)
		}
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
	const shipping_fee = Math.floor(shippingCost.cost * 100)
	const taxPercentage = total * Number(process.env.REACT_APP_TAX_PERCENT)
	const tax = Math.floor(taxPercentage * 100)
	const price = Math.floor((total + taxPercentage) * 100)
	const total_amount = price
	const totalPrice = Math.floor(total * 100)

	const createPaymentIntent = async () => {
		try {
			const { data } = await axios.post(
				'/.netlify/functions/create-payment-intent',
				JSON.stringify({ cartItems, shipping_fee, totalPrice, tax })
			)

			setClientSecret(data.clientSecret.split("'")?.[0])
		} catch (error) {
			set_Error(error?.response?.data ? 'Please contact modelEst Admin...' : '')
		}
	}

	React.useEffect(() => {
		if (shipping_fee !== 0) {
			createPaymentIntent()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipping_fee])

	const handleChange = async (event) => {
		setDisabled(event.empty)
		set_Error(event.error ? event.error.message : '')
	}

	const handleSubmit = async (ev) => {
		ev.preventDefault()

		if (payPlan === 'Payment Plan') {
			setPaymentPlanWarn(true)
		}

		if (payPlan.includes('One-Time')) {
			// One time payment
			setProcessing(true)

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
		// recurring payment
		else {
			if (
				total_amount > Number(process.env.REACT_APP_INSTALLMENT_START_PRICE)
			) {
				setProcessing(true)
				const result = await stripe.createPaymentMethod({
					type: 'card',
					card: elements.getElement(CardElement),
					billing_details: {
						email: user?.email || email,
					},
				})

				if (result.error) {
					console.log(result.error)
					set_Error(`Payment failed ${result.error.message}`)
					setProcessing(false)
					setTimeout(() => {
						navigate('/canceled')
					}, 5000)
				} else {
					const res = await axios.post(
						'/.netlify/functions/create-payment-sub',
						{
							payment_method: result.paymentMethod.id,
							email: user?.email || email,
							balance: totalPrice,
							shippingFee: shipping_fee,
							tax: tax,
							cartItems: cartItems,
						}
					)

					const { client_secret, status } = res.data

					if (status === 'requires_action') {
						stripe.confirmCardPayment(client_secret).then(function (result) {
							if (result.error) {
								console.log(result.error)
								set_Error(`Payment failed ${result.error.message}`)
								setProcessing(false)
								setTimeout(() => {
									navigate('/canceled')
								}, 5000)
							} else {
								set_Error(null)
								setProcessing(false)
								setSucceeded(true)
								localStorage.setItem('payload', client_secret)
								setTimeout(() => {
									navigate('/success')
								}, 5000)
							}
						})
					} else {
						set_Error(null)
						setProcessing(false)
						setSucceeded(true)
						localStorage.setItem('payload', client_secret)
						setTimeout(() => {
							navigate('/success')
						}, 5000)
					}
				}
			}
		}
	}

	return (
		<div>
			<div className="tw-flex tw-flex-col tw-max-w-[100%] lg:tw-max-w-[70%] tw-mx-auto ">
				{!user && (
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						value={email}
						className={
							error && !ValidateEmail(email)
								? 'user-email-input input-error tw-bg-transparent'
								: 'user-email-input tw-text-sm tw-bg-transparent'
						}
					/>
				)}
				<input
					name="street"
					type="text"
					value={address.street}
					onChange={inputOnchangeHandler}
					placeholder="Address"
					className={
						error && !address.street
							? 'user-email-input input-error tw-bg-transparent'
							: 'user-email-input tw-text-sm tw-font-light tw-bg-transparent'
					}
				/>
				<input
					name="city"
					type="text"
					value={address.city}
					onChange={inputOnchangeHandler}
					placeholder="City"
					className={
						error && !address.city
							? 'user-email-input input-error tw-bg-transparent'
							: 'user-email-input tw-text-sm tw-font-light tw-bg-transparent'
					}
				/>
				<input
					name="province"
					type="text"
					value={address.province}
					onChange={inputOnchangeHandler}
					placeholder="State / Province"
					className={
						error && !address.province
							? 'user-email-input input-error tw-bg-transparent'
							: 'user-email-input tw-text-sm tw-font-light tw-bg-transparent'
					}
				/>
				<input
					name="postalcode"
					type="text"
					value={address.postalcode}
					onChange={inputOnchangeHandler}
					placeholder="Postal Code"
					className={
						error && !address.postalcode
							? 'user-email-input input-error tw-bg-transparent'
							: 'user-email-input tw-text-sm tw-font-light tw-bg-transparent'
					}
				/>
				<input
					name="country"
					type="text"
					value={address.country}
					onChange={inputOnchangeHandler}
					placeholder="Country"
					className={
						error && !address.country
							? 'user-email-input input-error tw-bg-transparent'
							: 'user-email-input tw-text-sm tw-font-light tw-bg-transparent'
					}
				/>
			</div>
			{email.substr(email.length - 3) === 'com' && (
				<div className="email-verify tw-text-center tw-text-xs tw-text-slate-900">
					<span>Please verify you have the correct email and address</span>
				</div>
			)}
			{error && (
				<div className="user-email-input-error tw-text-center">
					<span className="tw-text-xs">Hey! You have missing credentials!</span>
				</div>
			)}
			{alert && (
				<div className="tw-text-red-800 tw-text-xs tw-flex tw-flex-row tw-items-center tw-justify-center tw-mt-5">
					<GoAlert className="tw-mr-2" />
					<span>
						You are not authorize to make purchase from this region/country
					</span>
				</div>
			)}
			<div className="total-button tw-text-sm tw-mx-auto tw-flex tw-flex-row tw-items-center">
				<button
					disabled={allowproceed}
					onClick={handleSubmitAddress}
					className="tw-text-white hover:tw-text-slate-900 hover:tw-bg-neutral-300 tw-ease-in tw-duration-500 tw-bg-slate-900 tw-px-5 tw-py-2"
					type="submit">
					Proceed to payment
				</button>
			</div>
			{isProceed && (
				<div className="tw-flex tw-flex-col tw-items-center tw-my-10 tw-w-[80%] tw-mx-auto">
					<select
						className="tw-w-[150px] tw-text-neutral-500 tw-font-light tw-bg-neutral-50 tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[4px] tw-text-xs tw-border-[1px] tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						onChange={handleOnChange}
						id="payPlan"
						value={payPlan}
						name="payPlan">
						{paymentPlan.map((plan) => (
							<option key={plan.id}>{plan.name}</option>
						))}
					</select>
					<span className="tw-text-sm tw-font-light tw-text-neutral-600 tw-mt-2">
						Please select payment plan before payment
					</span>
				</div>
			)}
			{payPlan !== '' && payPlan !== 'Payment Plan' && (
				<div className="tw-flex tw-flex-col">
					{succeeded ? (
						<article className="tw-text-center tw-mt-2">
							<h4>Thank you. Your payment was successful!</h4>
							<h4 className="tw-text-xs tw-text-green-700 tw-mb-2">
								Redirecting to {succeeded ? 'success' : 'canceled'} page...
							</h4>
						</article>
					) : (
						<article className="tw-flex tw-justify-between tw-text-[11px] tw-p-1 tw-mt-1 tw-max-w-[100%] tw-text-neutral-500">
							<span className="tw-underline tw-flex-[0.4]">
								Hello, {user && user?.displayName}, your total is $
								{((total_amount + shipping_fee) / 100).toFixed(2)} - (tax &
								shipping inclusive)
							</span>
							{total_amount <
								Number(process.env.REACT_APP_INSTALLMENT_START_PRICE) && (
								<span className="tw-text-blue-700 tw-flex-[0.4]">
									You are only elligible for one-time payment
								</span>
							)}
						</article>
					)}
				</div>
			)}
			<form
				className={
					payPlan !== '' && payPlan !== 'Payment Plan'
						? 'tw-block tw-ease-in tw-duration-300 tw-w-full tw-pt-2'
						: 'tw-hidden tw-ease-in tw-duration-300'
				}
				id="payment-form"
				onSubmit={
					payPlan === '' || payPlan === 'Payment Plan' ? null : handleSubmit
				}>
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
					disabled={
						processing ||
						disabled ||
						succeeded ||
						payPlan === '' ||
						payPlan === 'Payment Plan'
					}
					id="submit">
					<span
						className={
							processing ||
							disabled ||
							succeeded ||
							payPlan === '' ||
							payPlan === 'Payment Plan'
								? 'tw-text-neutral-50 tw-font-light'
								: 'tw-text-orange-500 tw-font-light'
						}>
						{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
					</span>
				</button>
				{paymentPlanWarn && (
					<span className="tw-text-red-700 tw-text-xs tw-flex tw-items-center tw-justify-center tw-mt-2 tw-capitalize">
						<GoAlert className="tw-mr-2" />
						Please set your payment plan
					</span>
				)}
				{_error && (
					<div
						className="card-error tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-red-700 "
						// className="tw-flex tw-items-center tw-text-red-700 tw-text-xs tw-justify-center tw-mt-5"
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
