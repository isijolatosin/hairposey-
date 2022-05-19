require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	if (event.body) {
		// eslint-disable-next-line no-unused-vars
		const { cartItems, shipping_fee, totalPrice, tax } = JSON.parse(event.body)

		let totalCartPrice = 0
		// eslint-disable-next-line array-callback-return
		cartItems.map((item) => {
			totalCartPrice += item?.price * item?.quantity * 100
		})

		const calculateOrderAmount = () => {
			// Note - Check price compare with mongoDB
			return shipping_fee + totalPrice + tax
		}

		if (totalCartPrice === totalPrice) {
			try {
				const paymentIntent = await stripe.paymentIntents.create({
					amount: calculateOrderAmount(),
					currency: 'usd',
				})

				return {
					statusCode: 200,
					body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
				}
			} catch (error) {
				return {
					statusCodes: 500,
					body: JSON.stringify({ msg: error.message }),
				}
			}
		}
	}
	return { statusCode: 200, body: 'Please Create Payment Intent' }
}
