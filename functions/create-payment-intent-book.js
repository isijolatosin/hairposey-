require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	const stripeDeduction = +(
		Number(process.env.REACT_APP_BOOKING_PRICE) *
		Number(process.env.REACT_APP_STRIPE_PERCENT)
	).toFixed(2);

	const data = JSON.parse(event.body);
	const price = +data.price.toFixed() * 100;

	if (event.body) {
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount:
					price ||
					stripeDeduction + Number(process.env.REACT_APP_BOOKING_PRICE),
				currency: "cad",
			});

			return {
				statusCode: StatusCodes.OK,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: `ERROR - ${error.message}` }),
			};
		}
	}
	return { statusCode: 405, body: "Not Allowed! Please Create Payment Intent" };
};
