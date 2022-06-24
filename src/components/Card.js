import React from 'react'
import axios from 'axios'
import {
	MdOutlineViewInAr,
	MdOutlineInventory,
	MdMoneyOff,
} from 'react-icons/md'
import { isInCart } from '../utils/helpers'
import { GiMoneyStack } from 'react-icons/gi'
import { selectCartItems } from '../slices/appSlices'
import { useSelector } from 'react-redux'

function Card({ product, setSingleproducts, scrollToTop, sales }) {
	const cartItems = useSelector(selectCartItems)
	async function handleViewImage(event) {
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

	return (
		<div className="card tw-w-[90%] tw-mx-auto md:tw-w-[300px] tw-rounded-[30px]">
			<ul className="ul">
				<li
					onClick={() => handleViewImage(product._id)}
					className="tw-relative">
					<span className="tw-absolute tw-left-[-45px] tw-text-white tw-text-xs">
						Expand
					</span>
					<MdOutlineViewInAr />
				</li>
				<li>
					<span
						className={`${
							product.instock
								? 'tw-text-white'
								: 'tw-text-white tw-left-[-65px]'
						} tw-absolute tw-left-[-45px] tw-text-xs`}>
						{product.instock ? 'Instock' : 'Not Instock'}
					</span>
					<MdOutlineInventory
						className={`${!product.instock && 'tw-text-red-800'}`}
					/>
				</li>
				<li>
					<span className="tw-absolute tw-left-[-80px] tw-text-white tw-text-md tw-font-bold">
						${product.price} CAD
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
				className="tw-w-full"
			/>
			<div className="con-text">
				<h2>{product.name}</h2>
				<p className="">{product.description}</p>
				{isInCart(product, cartItems) ? (
					<button
						className="tw-bg-white tw-text-black"
						onClick={() => handleViewImage(product._id)}>
						Add More
					</button>
				) : (
					<button onClick={() => handleViewImage(product._id)}>
						Add to cart
					</button>
				)}
			</div>
		</div>
	)
}

export default Card
