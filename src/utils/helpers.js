import { HTTPS_LINK } from '../constant'

export const isInCart = (singleProduct, cartItems) => {
	return cartItems.find(
		(item) => item.id === singleProduct._id || singleProduct.id
	)
}

// This is where the server is running. When we deploy the app, this will be the hosting url
const API = HTTPS_LINK

export async function fetchFromAPI(endpoint, opts) {
	const { method, body } = { method: 'POST', body: null, ...opts }

	const res = await fetch(`${API}/${endpoint}`, {
		method,
		...(body && { body: JSON.stringify(body) }),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
	return res.json()
}
