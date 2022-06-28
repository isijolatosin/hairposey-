import React from 'react'
import axios from 'axios'
import { MdOutlineInventory, MdMoneyOff } from 'react-icons/md'
import { GiMoneyStack } from 'react-icons/gi'
import { RiSearch2Fill } from 'react-icons/ri'
import { isInCart } from '../utils/helpers'
import { selectCartItems } from '../slices/appSlices'
import { useSelector } from 'react-redux'
import Rating from './shared/Rating'
import truncate from '../utils/truncate'

function Card({
	product,
	setSingleproducts,
	scrollToTop,
	sales,
	setImage,
	setIsSingleImage,
}) {
	const cartItems = useSelector(selectCartItems)
	async function routeToSingleProductPage(event) {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter((product) => product._id === event)
			setSingleproducts(result)
		} catch (error) {
			console.log(error)
		}
		scrollToTop()
	}

	const handleView = async (event) => {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter((product) => product._id === event)
			setImage(result)
		} catch (error) {
			console.log(error)
		}
		setIsSingleImage(true)
	}

	return (
		<div className="card tw-w-[90%] tw-mx-auto md:tw-w-[300px] tw-rounded-[30px]">
			<ul className="ul">
				<li onClick={() => handleView(product._id)} className="tw-relative">
					<span className="tw-absolute tw-left-[-80px] tw-text-white tw-text-xs">
						Expand Photo
					</span>
					<RiSearch2Fill />
				</li>
				<li>
					<span
						className={`${
							product.instock
								? 'tw-text-white  tw-left-[-45px]'
								: 'tw-text-white tw-left-[-65px]'
						} tw-absolute tw-text-xs`}>
						{product.instock ? 'Instock' : 'Not Instock'}
					</span>
					<MdOutlineInventory
						className={`${!product.instock && 'tw-text-red-800'}`}
					/>
				</li>
				<li>
					<span className="tw-absolute tw-left-[-95px] tw-text-white tw-text-md tw-font-bold">
						<span className="tw-text-xs tw-font-light">From</span> CA$
						{product.price}
					</span>
					<GiMoneyStack />
				</li>
				<li>
					<span
						className={`${
							product.sales && sales !== 0
								? 'tw-text-white  tw-left-[-35px]'
								: 'tw-text-white tw-left-[-73px]'
						} tw-absolute tw-text-xs`}>
						{product.sales ? 'Sales' : 'Not on Sales'}
					</span>
					<MdMoneyOff className={`${!product.sales && 'tw-text-red-800'}`} />
				</li>
			</ul>
			<img
				id={product._id}
				src={product?.image}
				alt={product._id}
				className="tw-w-full md:tw-w-[400px] tw-object-cover"
			/>
			<div className="con-text">
				<h2 className="font_cursive tw-text-4xl">{product.name}</h2>
				<div className="tw-mb-[10px]">
					<Rating isNum={false} />
				</div>
				<h1 className="tw-text-sm tw-uppercase tw-font-bold tw-text-red-700">
					{product.brand} - Hair
				</h1>
				<p className="">{truncate(product.description, 15)}</p>
			</div>
			{isInCart(product, cartItems) ? (
				<button
					className=""
					onClick={() => routeToSingleProductPage(product._id)}>
					Add More
				</button>
			) : (
				<button
					className="tw-absolute tw-bottom-[20px] tw-right-[20px] tw-z-30"
					onClick={() => routeToSingleProductPage(product._id)}>
					Add to cart
				</button>
			)}
		</div>
	)
}

export default Card
