require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	const { price } = JSON.parse(event.body);
	console.log(price);
	if (event.body) {
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: price * 100,
				currency: "cad",
			});
			console.log(paymentIntent);
			return {
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			console.log(error.message);
			return {
				statusCodes: 500,
				body: JSON.stringify({ msg: error.message }),
			};
		}
	}
	return { statusCode: 200, body: "Please Create Payment Intent" };
};
