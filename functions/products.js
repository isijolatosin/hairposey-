require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const products = require('../server/routes/products')
const connectDB = require('../server/db/connect')
const notFound = require('../server/middleware/not-found')
const errorHandlerMiddleware = require('../server/middleware/error-handler')
const cloudinary = require('cloudinary').v2
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

// express
const app = express()

app.get('/', (req, res) => {
	res.send('model est app')
})

// middleware
app.use(morgan('tiny'))
app.use(fileUpload({ useTempFiles: true }))
// app.use(fileUpload())
app.use(express.static('../build'))
app.use(express.static('../public'))
app.use(express.json())

// routes
app.use('/api/v1/products', products)

// not found
app.use(notFound)
//  error handler
app.use(errorHandlerMiddleware)

const start = async () => {
	await connectDB(process.env.MONGO_URI)
}
// mongodb func invoke
start()

module.exports.handler = serverless(app)
