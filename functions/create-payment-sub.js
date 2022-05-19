require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	const daysFromNow = (n) => {
		let d = new Date()
		return Math.floor(d.setDate(d.getDate() + n) / 1000)
	}

	if (event.body) {
		const { payment_method, email, balance, shippingFee, tax, cartItems } =
			JSON.parse(event.body)

		let totalCartPrice = 0
		// eslint-disable-next-line array-callback-return
		cartItems.map((item) => {
			totalCartPrice += item?.price * item?.quantity * 100
		})

		if (totalCartPrice === balance) {
			const noOfInstallment = 4
			const subAmount = Math.floor(
				(balance + shippingFee + tax) / noOfInstallment
			)

			try {
				// create customer
				const customer = await stripe.customers.create({
					balance: subAmount,
					payment_method: payment_method,
					email: email,
					invoice_settings: {
						default_payment_method: payment_method,
					},
				})

				const subscription = await stripe.subscriptions.create({
					customer: customer.id,
					cancel_at: daysFromNow(42),
					items: [{ plan: 'price_1KdiVMLTIkVkSAcp6fej2hu8' }],
					expand: ['latest_invoice.payment_intent'],
				})
				const status = subscription.latest_invoice.payment_intent.status
				const client_secret =
					subscription.latest_invoice.payment_intent.client_secret

				console.log(status)
				return {
					statusCode: 200,
					body: JSON.stringify({
						client_secret: client_secret,
						status: status,
					}),
				}
			} catch (error) {
				console.log(error)
				return {
					statusCodes: 500,
					body: JSON.stringify({ msg: error.message }),
				}
			}
		}
	}
	return { statusCode: 200, body: 'Please Create Payment Intent' }
}
