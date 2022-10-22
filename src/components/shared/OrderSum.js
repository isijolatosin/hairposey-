import React from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { FaOpencart } from 'react-icons/fa'
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import CartItemsCheckout from '../CartItemsCheckout'

const OrderSum = ({
	sales,
	isBorderBottom,
	isBorder,
	showLoad,
	cartItems,
	discount,
	handleDisount,
	error,
	handleApply,
	generateCode,
	code,
	discountPrice,
	total,
	finalPriceToPayObject,
	setShowInfo,
	showInfo,
	isSuccess,
}) => {
	const [showSum, setShowSum] = React.useState(false)
	console.log(sales)
	return (
		<div>
			<div
				className={`${
					isSuccess ? '' : 'tw-block lg:tw-hidden'
				} tw-text-[#bba371] ${showSum ? 'tw-mb-5' : 'tw-mb-0'} tw-pt-5 ${
					isBorderBottom && 'tw-border-b-[1px]'
				} ${
					isBorder ? ' tw-border-t-[1px] tw-border-neutral-800' : ''
				} tw-flex tw-mx-auto tw-justify-center`}>
				<div className={`tw-flex tw-items-center tw-px-5 tw-text-xs`}>
					<FaOpencart className="tw-mr-2" size={25} />
					<span>
						{showSum ? 'Hide' : 'Show'} order summary{' '}
						{(sales || sales !== 0) && (
							<span className="tw-text-white tw-font-light">
								/ apply discount
							</span>
						)}{' '}
					</span>
					{showSum ? (
						<MdOutlineKeyboardArrowUp
							size={25}
							onClick={() => setShowSum(false)}
							className="tw-cursor-pointer"
						/>
					) : (
						<MdOutlineKeyboardArrowDown
							size={25}
							onClick={() => setShowSum(true)}
							className="tw-cursor-pointer"
						/>
					)}
				</div>
			</div>
			<div
				className={`${
					showSum ? `tw-opacity-1 tw-py-5` : 'tw-h-0 tw-opacity-0'
				} tw-ease-in tw-duration-300 ${
					isSuccess
						? 'lg:tw-px-[220px] xl:tw-px-[320px] 2xl:tw-px-[520px]'
						: 'lg:tw-hidden tw-block lg:tw-w-[30%] md:tw-px-10'
				} tw-w-full tw-p-1 md:tw-py-5 tw-bg-neutral-900 `}>
				{cartItems.map((item) => (
					<CartItemsCheckout
						product={item}
						key={item.id}
						isSuccess={isSuccess}
					/>
				))}
				{sales > 0 && (
					<>
						<div className="tw-w-full tw-py-5 tw-flex tw-items-center">
							<input
								name="discount"
								type="text"
								value={discount}
								onChange={handleDisount}
								placeholder="Discount code"
								className={`${
									error && discount === ''
										? 'tw-border-red-700 tw-border-[1px]'
										: 'tw-border-neutral-400 tw-border-[1px]'
								} tw-text-sm tw-font-light tw-rounded-md tw-w-[70%] tw-py-2 placeholder:tw-text-xs `}
							/>
							<button
								className="tw-w-[30%] tw-bg-neutral-900 tw-text-white tw-ml-2 tw-py-[11px] tw-text-xs tw-rounded-md"
								onClick={handleApply}>
								Apply
							</button>
						</div>
						{error && (
							<div className="tw-pb-5 tw-pt-2 ">
								<p className="tw-text-xs tw-text-red-700 tw-text-center">
									<span className="tw-font-bold tw-text-sm">
										Discount Code Not Valid!
									</span>
									<br />
									<span className="tw-text-neutral-700 tw-font-light tw-tracking-wider">
										Please generate a new code
									</span>
								</p>
								<div className="tw-text-[10px] tw-w-full tw-mx-auto tw-flex tw-items-center tw-justify-center tw-mt-3">
									<button
										disabled={code}
										onClick={generateCode}
										className="tw-bg-neutral-900 tw-text-white tw-p-2 tw-rounded-md hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-ease-in tw-duration-300">
										Generate code
									</button>
								</div>
								<div>
									<p className="yellow tw-text-white tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-4">
										{code}
									</p>
								</div>
							</div>
						)}
					</>
				)}
				<div className="tw-relative">
					<div className="tw-border-b-[1px] tw-border-[#b59248] tw-py-5 tw-text-neutral-400 tw-px-3">
						<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
							<span>Subtotal</span>
							{showLoad ? (
								<div className="circular-loader-small"></div>
							) : (
								<span className="tw-text-[16px]">
									<span className="tw-text-[10px] tw-mr-1 ">CA</span>$
									{discountPrice ? discountPrice : total}
								</span>
							)}
						</div>
						{isSuccess ? (
							<div>
								<div className="tw-flex tw-items-center tw-justify-between tw-text-sm ">
									<div className="tw-relative tw-flex tw-items-center">
										<span>Shipping</span>
										<BsFillQuestionCircleFill
											size={15}
											onMouseOver={() => setShowInfo(true)}
											onMouseLeave={() => setShowInfo(false)}
											className=" tw-mx-1 hover:tw-cursor-pointer"
										/>
										{showInfo && (
											<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[74px] tw-flex tw-items-top">
												<span className="tw-text-left">
													Review shipping policy in help tab
												</span>
												{/* <BsFillHandIndexFill size={30} /> */}
											</div>
										)}
									</div>
									<div>
										<span>
											<span className="tw-text-[10px] tw-mr-1 ">CA</span>$
											{finalPriceToPayObject.shipCostInDollar}.00
										</span>
									</div>
								</div>
								<div className="tw-flex tw-items-center tw-justify-between tw-text-sm ">
									<div className="tw-relative tw-flex tw-items-center">
										<span>Tax</span>
									</div>
									<div>
										<span>
											<span className="tw-text-[10px] tw-mr-1 ">CA</span>$
											{finalPriceToPayObject.taxInDollar}.00
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="tw-flex tw-items-center tw-justify-between tw-text-sm ">
								<div className="tw-relative tw-flex tw-items-center">
									<span>Shipping</span>
									<BsFillQuestionCircleFill
										size={15}
										onMouseOver={() => setShowInfo(true)}
										onMouseLeave={() => setShowInfo(false)}
										className=" tw-mx-1 hover:tw-cursor-pointer"
									/>
									{showInfo && (
										<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[74px] tw-flex tw-items-top">
											<span className="tw-text-left">
												Review shipping policy in help tab
											</span>
											{/* <BsFillHandIndexFill size={30} /> */}
										</div>
									)}
								</div>
								<span>Calculated at next step</span>
							</div>
						)}
					</div>
					<div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-pt-5 tw-px-3 tw-text-neutral-400">
						<span className="tw-text-[16px]">Total</span>
						<div className="tw-flex tw-items-center">
							<span className="tw-text-[12px] tw-mr-2 ">CA</span>
							{showLoad ? (
								<div className="circular-loader-small"></div>
							) : (
								<span className="tw-text-[20px]">
									$
									{discountPrice
										? discountPrice
										: finalPriceToPayObject.priceInDollar +
										  finalPriceToPayObject.shipCostInDollar +
										  finalPriceToPayObject.taxInDollar}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderSum
