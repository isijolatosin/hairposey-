import React, { useContext } from 'react'
import { UserContext } from '../../context/user-context'
import { SHIPPING_COST } from '../../constant'
import { ValidateEmail } from '../../utils/ValidateEmail'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
// import { countries } from '../../country'

const CheckoutForm = ({ shippingMethod, setWarn }) => {
	const navigate = useNavigate()
	const [email, setEmail] = React.useState('')
	const [showInfo, setShowInfo] = React.useState(false)

	const [address, setAddress] = React.useState({
		country: '',
		firstname: '',
		lastname: '',
		street: '',
		apartment: '',
		city: '',
		province: '',
		postalcode: '',
		phonenumber: '',
	})
	const [error, setError] = React.useState(false)
	const { user } = useContext(UserContext)
	const countries = [
		{ id: 0, name: '...' },
		{ id: 1, name: 'canada' },
		{ id: 2, name: 'united kingdom' },
		{ id: 3, name: 'united states' },
		{ id: 4, name: 'nigeria' },
	]

	const inputOnchangeHandler = (e) => {
		let value = e.target.value

		setAddress({ ...address, [e.target.name]: value })
		// setAlert(false)
	}

	// Submit address
	const handleSubmitAddress = () => {
		if (shippingMethod === '') {
			setWarn(true)
		} else {
			const orderNo = `ModelEst${Math.random().toString(36).slice(2)}`
			const userName = `${address.firstname} ${address.lastname}`
			const shippingAd = `${address.street}, ${
				address.apartment && address.apartment
			}, ${address.city}. ${address.province}. ${address.postalcode}. ${
				address.country
			}`

			if (
				!user ||
				!email ||
				!address.country ||
				!address.firstname ||
				!address.lastname ||
				!address.street ||
				!address.city ||
				!address.province ||
				!address.postalcode ||
				!address.phonenumber
			) {
				setError(true)
			}
			if (!ValidateEmail(email)) {
				setError(true)
			}
			if (
				(user &&
					address?.street &&
					address?.firstname &&
					address?.lastname &&
					address?.city &&
					address?.province &&
					address?.postalcode &&
					address.phonenumber &&
					address?.country) ||
				(email &&
					ValidateEmail(email) &&
					address?.street &&
					address?.firstname &&
					address?.lastname &&
					address?.city &&
					address?.province &&
					address?.postalcode &&
					address.phonenumber &&
					address?.country)
			) {
				localStorage.setItem('country', address.country)
				localStorage.setItem('address', shippingAd)
				localStorage.setItem('phone', address.phonenumber)
				localStorage.setItem('order no', orderNo)
				localStorage.setItem('username', userName)
				email && localStorage.setItem('altEmail', email)
				setAddress({
					street: '',
					firstname: '',
					lastname: '',
					apartment: '',
					phonenumber: '',
					city: '',
					province: '',
					postalcode: '',
					country: '',
				})
				setError(false)
			}
			// eslint-disable-next-line array-callback-return
			Object.keys(SHIPPING_COST).filter((cntry) => {
				const add =
					address.country.toLowerCase() === 'united states' ||
					address.country.toLowerCase() === 'usa' ||
					address.country.toLowerCase() === 'united states of america' ||
					address.country.toLowerCase() === 'america'
						? 'usa'
						: address.country.toLowerCase() === 'united kingdom' ||
						  address.country.toLowerCase() === 'uk' ||
						  address.country.toLowerCase() === 'london'
						? 'london'
						: address.country
				cntry.toLowerCase() === add &&
					localStorage.setItem(
						'shippingCost',
						JSON.stringify({
							country: cntry,
							cost: SHIPPING_COST[cntry],
						})
					)
			})
			setEmail('')
			navigate('/payment')
		}
	}

	return (
		<div>
			<div className="tw-flex tw-flex-col tw-max-w-[100%] lg:tw-max-w-[70%] tw-mx-auto tw-text-sm tw-mt-5">
				{!user && (
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						value={email}
						className={
							error && !ValidateEmail(email)
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-border-neutral-400'
						}
					/>
				)}
				<div className="tw-relative">
					<label className="tw-absolute tw-text-[11px] tw-bg-white tw-px-1 tw-top-[-12px] tw-left-[8px] tw-font-light tw-text-neutral-600">
						Country / Region
					</label>
					<select
						className={`${
							error && !address.country
								? 'user-email-input tw-border-red-700'
								: 'tw-border-neutral-400'
						} user-email-input tw-font-light tw-border-[1px] tw-rounded-[6px] tw-mb-[10px] tw-py-[9px] tw-text-sm focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400 tw-capitalize`}
						onChange={inputOnchangeHandler}
						id="country"
						value={address.country}
						name="country">
						{countries.map((plan) => (
							<option key={plan.id}>{plan.name}</option>
						))}
						{/* {countries.map((item, idx) => (
							<option key={idx}>{item.countryName}</option>
						))} */}
					</select>
				</div>
				<div className="tw-grid tw-grid-cols-2 tw-gap-x-[7px]">
					<input
						name="firstname"
						type="text"
						value={address.firstname}
						onChange={inputOnchangeHandler}
						placeholder="First name"
						className={
							error && !address.firstname
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
						}
					/>
					<input
						name="lastname"
						type="text"
						value={address.lastname}
						onChange={inputOnchangeHandler}
						placeholder="Last name"
						className={
							error && !address.lastname
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
						}
					/>
				</div>
				<input
					name="street"
					type="text"
					value={address.street}
					onChange={inputOnchangeHandler}
					placeholder="Address"
					className={
						error && !address.street
							? 'user-email-input tw-border-red-700'
							: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
					}
				/>
				<input
					name="apartment"
					type="text"
					value={address.apartment}
					onChange={inputOnchangeHandler}
					placeholder="Apartment, suite, etc. (optional)"
					className={
						error && !address.apartment
							? 'user-email-input tw-border-red-700'
							: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
					}
				/>
				<div className="tw-grid tw-grid-cols-3 tw-gap-x-[7px]">
					<input
						name="city"
						type="text"
						value={address.city}
						onChange={inputOnchangeHandler}
						placeholder="City"
						className={
							error && !address.city
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
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
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400'
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
								? 'user-email-input tw-border-red-700'
								: 'user-email-input tw-text-sm tw-font-light tw-border-neutral-400 focus:tw-border-neutral-400 focus:tw-ring-0 focus:tw-ring-neutral-400 '
						}
					/>
				</div>
				<div
					className={`${
						error && !address.phonenumber
							? 'tw-border-red-700'
							: 'tw-border-neutral-400'
					} tw-text-sm tw-font-light tw-border-[1px] tw-rounded-[6px] tw-flex tw-items-center tw-relative`}>
					<input
						name="phonenumber"
						type="text"
						value={address.phonenumber}
						onChange={inputOnchangeHandler}
						placeholder="Phone"
						className={`tw-bg-transparent tw-mb-0 tw-border-0 focus:tw-border-neutral-400 focus:tw-rounded-l-[6px] focus:tw-ring-1 focus:tw-ring-neutral-400 placeholder:tw-text-[12px] tw-text-sm tw-font-light tw-w-full`}
					/>
					<BsFillQuestionCircleFill
						size={20}
						onMouseOver={() => setShowInfo(true)}
						onMouseLeave={() => setShowInfo(false)}
						className="tw-text-neutral-700 tw-mx-3 hover:tw-cursor-pointer"
					/>
					{showInfo && (
						<div className="tw-absolute tw-max-w-[200px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-br-none tw-text-white tw-text-center tw-top-[-40px] tw-right-[25px]">
							<span className="tw-text-xs">
								Incase we need to contact you about your order
							</span>
						</div>
					)}
				</div>
			</div>
			{email.substr(email.length - 3) === 'com' && (
				<div className="email-verify tw-text-center tw-text-xs">
					<span>Please verify you have the correct email and address</span>
				</div>
			)}
			{error && (
				<div className="user-email-input-error tw-text-center">
					<span className="tw-text-xs">Hey! You have missing credentials!</span>
				</div>
			)}
			<div className="total-button tw-text-sm tw-mx-auto tw-flex tw-items-center tw-w-full md:tw-w-[70%] tw-justify-center">
				<button
					onClick={handleSubmitAddress}
					className="tw-bg-slate-900 tw-w-fit tw-text-white tw-px-5 tw-py-2 tw-rounded-[5px] hover:tw-text-slate-900 hover:tw-bg-slate-300 tw-ease-in tw-duration-500 tw-mr-2"
					type="submit">
					continue to payment
				</button>
				<button
					onClick={() => navigate(`/user-cart/${user.displayName}`)}
					className="tw-bg-slate-300 tw-w-fit tw-text-slate-900 tw-px-5 tw-py-2 tw-rounded-[5px] hover:tw-text-white hover:tw-bg-slate-900 tw-ease-in tw-duration-500 tw-text-center"
					type="submit">
					return to cart
				</button>
			</div>
		</div>
	)
}

export default CheckoutForm
