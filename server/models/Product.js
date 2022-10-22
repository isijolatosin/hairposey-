const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	brand: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	type: {
		type: String,
		required: [true, 'must provide a type'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	color: {
		type: String,
		required: [true, 'must provide a color'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	availablecolor: {
		type: String,
		required: [true, 'must provide a available color'],
		trim: true,
		maxlength: [100, 'name maximum character exceeded!'],
	},
	length: {
		type: Number,
		required: [true, 'must provide a length'],
		trim: true,
	},
	availablelength: {
		type: String,
		required: [true, 'must provide a available length'],
		trim: true,
		maxlength: [100, 'name maximum character exceeded!'],
	},
	price: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price14: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price16: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price18: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price22: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price24: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price26: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price28: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	price30: {
		type: Number,
		// required: [true, 'must provide a price'],
		// trim: true,
	},
	description: {
		type: String,
		required: [true, 'must provide description'],
		trim: true,
	},
	image: {
		type: String,
		// required: [true, 'must provide image url'],
		// trim: true,
	},
	sales: {
		type: Boolean,
		default: false,
	},
	instock: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('Product', ProductSchema)
