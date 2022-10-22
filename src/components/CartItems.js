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
import Truncate from '../utils/truncate'

const CartItems = ({ product }) => {
	const {
		name,
		image,
		price,
		quantity,
		hairLength,
		hairColor,
		description,
		_id,
	} = product
	const [expand, setExpand] = React.useState(false)
	const dispatch = useDispatch()

	const prdct = { name, _id, image, price, hairLength, hairColor, description }
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
		<div className="tw-flex tw-flex-row tw-p-5 tw-w-full tw-h-fit tw-bg-neutral-300 tw-rounded-lg tw-mb-1 tw-text-black">
			<div className="tw-mr-5">
				<img
					className="tw-w-[300px] tw-rounded-lg tw-max-h-[170px] tw-shadow-lg tw-object-cover"
					src={image}
					alt={name}
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-[100%] tw-pr-5">
				<div className="tw-font-light tw-text-sm">
					<div className="tw-font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: CA$${price}`}</p>
					<p>{`Length: ${hairLength}`}</p>
					{hairColor && <p>{`Color: ${hairColor}`}</p>}
					<div className="">
						{!expand && description?.length >= 100 ? (
							<span>{Truncate(description, 6)}</span>
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
					{window.location.pathname.includes('/user-cart/') && (
						<div className="tw-bg-white tw-py-1 tw-px-2 tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-fit tw-mt-5 tw-rounded-lg tw-text-neutral-900">
							{quantity === 1 && (
								<div
									className="tw-flex tw-flex-row tw-tw-text-2xl hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-mr-3"
									onClick={removeItem}>
									<GiTrashCan size={15} />
									<span className="tw-text-[10px] tw-ml-1">Delete</span>
								</div>
							)}

							{quantity > 1 && (
								<div
									className="tw-flex tw-flex-row tw-items-center tw-tw-text-2xl hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-mr-3"
									onClick={decreaseItem}>
									<BsCartDash size={15} />
									<span className="tw-text-[10px] tw-ml-1">Remove</span>
								</div>
							)}
							<div className="tw-border-x-[1px] tw-border-neutral-300 tw-px-3">
								<span>{quantity}</span>
							</div>

							<div
								className="tw-flex tw-flex-row tw-items-center tw-tw-text-2xl hover:tw-cursor-pointer hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-ml-3"
								onClick={increaseItem}>
								<MdAddShoppingCart size={15} />
								<span className="tw-text-[10px] tw-ml-1">Add</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CartItems
