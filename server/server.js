require('dotenv').config()
const express = require('express')
// const serverless = require('serverless-http')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const stripeAPI = require('../server/stripe')
const products = require('../server/routes/products')
const connectDB = require('../server/db/connect')
const notFound = require('../server/middleware/not-found')
const errorHandlerMiddleware = require('../server/middleware/error-handler')

// express
const app = express()

app.get('/', (req, res) => {
	res.send('model est app')
})

// middleware
app.use(morgan('tiny'))
app.use(fileUpload())
app.use(express.static('../build'))
app.use(express.static('./public'))
app.use(express.json())
app.use(cors())

// stripe checkout
app.post('/create-checkout-session', async (req, res) => {
	const { line_items, customer_email, shipping_options } = req.body

	const DOMAIN_NAME = process.env.CLIENT_URL

	if (!line_items || !customer_email || !shipping_options) {
		return res
			.status(400)
			.json({ error: 'missing required session parameters' })
	}

	let session

	try {
		session = await stripeAPI.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			customer_email,
			shipping_options,
			mode: 'payment',
			success_url: `${DOMAIN_NAME}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${DOMAIN_NAME}/canceled`,
			shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA'] },
		})
		res.status(200).json({ sessionId: session.id })
	} catch (error) {
		console.log(error)
		res.status(error.statusCode || 400).json({ error: error.message })
	}
})

// routes
app.use('/api/v1/products', products)

// not found
app.use(notFound)
//  error handler
app.use(errorHandlerMiddleware)

// server running
const port = process.env.PORT || 5000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server running on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

// server func invoke
start()
