import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import emailjs from 'emailjs-com'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { GoAlert } from 'react-icons/go'
import { SiMinutemailer } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItem, selectCartItems } from '../slices/appSlices'
import { db } from '../firebase'
import Layout from '../components/shared/Layout'
import { UserContext } from '../context/user-context'
import Button from '../components/shared/Button'
import { AUTHORIZED_ID } from '../constant'
import CartItems from '../components/CartItems'

const Success = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const userAddress = localStorage.getItem('address')
	const [sales, setSales] = React.useState(false)
	const payload = localStorage.getItem('payload')
	const userEmail = user?.email || localStorage.getItem('altEmail')
	const database = getDatabase()

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const orderNo = `hairposey${Math.random().toString(36).slice(2)}`

	let nameArray = []
	let quantity = 0
	let id = []
	let price = 0

	// eslint-disable-next-line array-callback-return
	cartItems.map((item) => {
		nameArray.push(
			`${item.quantity} ${item.name} - ${item.hairLength}inches ..... $${item.price}`
		)
		quantity += item.quantity
		id.push(`${item._id}-${item.name}`)
		price += item.price * item.quantity
	})

	React.useEffect(() => {
		// Send a purchase mail to client
		const a = userAddress?.split(' ')
		const cntry = a[a?.length - 1]
		const tax = Number((price * 0.13).toFixed(2))
		const shipping = cntry.toLowerCase() === 'canada' ? 9 : 20
		const total = Number((price + tax + shipping).toFixed(2))

		const messageParams = {
			name: (user && user?.displayName) || userEmail,
			id: id.join(', '),
			orderNo: orderNo,
			date: new Date().toDateString(),
			product: nameArray.join(', '),
			price: price,
			quantity: quantity,
			discount: '00.00',
			subtotal: price,
			shipping: shipping,
			tax: tax,
			total: total,
			address: userAddress,
			client: userEmail,
		}

		const SendClientSuccessfulPurchaseEmail = () => {
			emailjs
				.send(
					'service_czeioxp',
					'template_doi2qb7',
					messageParams,
					'user_VORMh20QoM0GcnDrVoVnj'
				)
				.then((res) => {})
				.catch((err) => console.log(err))
		}

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail()
		}, 1000)

		userEmail &&
			cartItems.length !== 0 &&
			payload &&
			// eslint-disable-next-line array-callback-return
			cartItems.map((item) => {
				// shopping path
				db.collection('purchased')
					.doc(`${userEmail}/`)
					.collection('shoppings')
					.add({
						id: item._id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
						color: item?.hairColor,
						length: item?.hairLength,
						orderNo: orderNo,
					})
					.then(() => {
						console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error ' + error.message))

				// admin path
				db.collection('admin')
					.doc(`${AUTHORIZED_ID.id_one}/`)
					.collection('all-purchased')
					.add({
						id: item._id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
						color: item?.hairColor,
						length: item?.hairLength,
						orderNo: orderNo,
					})
					.then(() => {
						console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error ' + error.message))
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleBackToShopping = () => {
		dispatch(clearCartItem())
		localStorage.removeItem('payload', '')
		localStorage.removeItem('address', '')
		localStorage.removeItem('altEmail', '')
		navigate('/')
	}

	return (
		<>
			<Helmet>
				<title>Success</title>
			</Helmet>
			<Layout>
				{payload ? (
					<div
						className={
							sales
								? 'tw-pt-[230px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
								: 'tw-pt-[150px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
						}>
						<h1 className="tw-text-md tw-text-neutral-600 tw-uppercase tw-mb-1">
							{user ? `Hey ${user?.displayName}` : 'Hey!'}
						</h1>
						<h1 className="tw-text-xl tw-uppercase">
							Thank you for your purchase
						</h1>
						<div className="tw-w-[100%] md:tw-w-[60%]">
							{cartItems.map((item) => (
								<CartItems product={item} key={item.id} isCart="false" />
							))}
						</div>
						<div className="tw-flex tw-flex-col tw-items-center tw-mt-10 tw-text-neutral-600 tw-font-light tw-text-center">
							<div className="tw-bg-neutral-100 tw-p-2 tw-rounded-full tw-text-blue-500">
								<SiMinutemailer size={25} />
							</div>
							<span>
								We are currently processing your order and your confirmation
								email will arrive shortly
							</span>
						</div>
						<div className="tw-my-10">
							<Button handleFunc={handleBackToShopping}>
								Continue Shopping
							</Button>
						</div>
					</div>
				) : (
					<div className="tw-text-red-700 tw-flex tw-flex-col tw-items-center tw-justify-center tw-my-10 tw-uppercase tw-font-bold tw-mt-[250px] tw-mb-20">
						<GoAlert className="tw-mr-5 tw-text-3xl tw-mb-5" />
						<p className="tw-text-red-700">You do not have any transactions</p>
					</div>
				)}
			</Layout>
		</>
	)
}

export default Success
