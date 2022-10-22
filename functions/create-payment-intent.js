require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	if (event.body) {
		// eslint-disable-next-line no-unused-vars
		const {
			cartItems,
			shipCostInCent,
			priceInCent,
			taxInCent,
			sales,
			shipMethod,
		} = JSON.parse(event.body)

		const totalCartPriceInCent =
			cartItems.reduce((total, prod) => total + prod.price * prod.quantity, 0) *
			100

		const calculateOrderAmount = () => {
			// Note - Check price compare with mongoDB
			let finalPrice
			if (shipMethod === 'ship') {
				finalPrice = shipCostInCent + priceInCent + taxInCent
			} else {
				finalPrice = priceInCent + taxInCent
			}
			return finalPrice
		}
		const discountedPrice =
			sales && totalCartPriceInCent - totalCartPriceInCent * (sales / 100)

		if (
			discountedPrice === priceInCent ||
			totalCartPriceInCent === priceInCent
		) {
			try {
				const paymentIntent = await stripe.paymentIntents.create({
					amount: calculateOrderAmount(),
					currency: 'usd',
					automatic_payment_methods: {
						enabled: true,
					},
				})

				return {
					statusCode: 200,
					body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
				}
			} catch (error) {
				return {
					statusCode: 500,
					body: JSON.stringify({ msg: error.message }),
				}
			}
		} else {
			return { statusCode: 500, body: 'Please Create Payment Intent' }
		}
	}
}
