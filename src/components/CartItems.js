import React from 'react'
import { useDispatch } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsCartDash } from 'react-icons/bs'
import { GiTrashCan } from 'react-icons/gi'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import {
	decreaseCartItem,
	increaseCartItem,
	removeCartItem,
} from '../slices/appSlices'

const CartItems = ({ product }) => {
	const {
		name,
		image,
		price,
		quantity,
		hairLength,
		hairColor,
		description,
		id,
	} = product
	const [expand, setExpand] = React.useState(false)
	const dispatch = useDispatch()

	const prdct = { name, id, image, price, hairLength, hairColor, description }
	const increaseItem = () => {
		dispatch(increaseCartItem(prdct))
	}
	const decreaseItem = () => {
		dispatch(decreaseCartItem(prdct))
	}
	const removeItem = () => {
		dispatch(removeCartItem(prdct))
	}

	return (
		<div className="tw-flex tw-flex-row tw-p-5 tw-w-full tw-bg-gray-50 tw-mb-1">
			<div className="tw-mr-5">
				<img
					className="tw-w-[100px] tw-h-[100px] tw-shadow-lg"
					src={image}
					alt={name}
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-[100%] tw-pr-5">
				<div className="tw-text-neutral-600 tw-font-light tw-text-sm">
					<div className="tw-font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: $${price}`}</p>
					<p>{`Length: ${hairLength}`}</p>
					{hairColor && <p>{`Color: ${hairColor}`}</p>}
					<p>{`Quantity: ${quantity}`}</p>
					<div className="">
						{!expand && description?.length >= 100 ? (
							<span>{description.substring(0, 50)}...</span>
						) : (
							<span>{description}</span>
						)}
						{description?.length >= 100 && (
							<span
								onClick={() => setExpand(!expand)}
								className="tw-cursor-pointer">
								{expand ? (
									<div className="tw-flex tw-flex-row tw-text-xs tw-font-bold">
										<span>Read Less</span> <MdOutlineKeyboardArrowUp />
									</div>
								) : (
									<div className="tw-flex tw-flex-row tw-text-xs tw-font-bold">
										<span>Read More</span> <MdOutlineKeyboardArrowDown />
									</div>
								)}
							</span>
						)}
					</div>
				</div>
				<div className="tw-flex tw-flex-col tw-justify-between tw-h-[70%]">
					<div
						className="tw-text-2xl tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300"
						onClick={increaseItem}>
						<MdAddShoppingCart />
						{/* <span>Add</span> */}
					</div>
					{quantity === 1 && (
						<div
							className="tw-text-2xl tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300"
							onClick={removeItem}>
							<GiTrashCan />
							{/* <span>Delete</span> */}
						</div>
					)}
					{quantity > 1 && (
						<div
							className="tw-text-2xl tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300"
							onClick={decreaseItem}>
							<BsCartDash />
							{/* <span>Remove</span> */}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CartItems
