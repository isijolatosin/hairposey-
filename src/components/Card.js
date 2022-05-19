import React from 'react'
import axios from 'axios'
import { GrCheckmark } from 'react-icons/gr'

function Card({ product, setSingleproducts, scrollToTop }) {
	const [clickedID, setClickedID] = React.useState('')

	function handleMouseIn(event) {
		setClickedID(event.target.id)
	}

	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter(
				(product) => product._id === event.target.id
			)
			setSingleproducts(result)
		} catch (error) {
			console.log(error)
		}
		scrollToTop()
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[100%] tw-h-[300px] md:tw-w-[300px] tw-shadow-lg md:tw-h-[300px] tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product?.image}
				alt={product._id}
				className=" tw-w-[400px] tw-h-full tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-sm tw-rounded-bl-sm tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						Quick view
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-sm">
				<div className="tw-flex tw-flex-row tw-justify-between">
					<div className="tw-pt-2 tw-w-full">
						<div className="tw-flex tw-justify-between tw-items-center tw-w-full">
							<p
								className={
									product.instock
										? 'tw-flex-[0.7] tw-text-xs tw-font-bold'
										: 'tw-text-xs tw-font-bold'
								}>
								{product.name}
							</p>
							{product.instock && (
								<div className="tw-flex-[0.3] tw-justify-end tw-flex tw-items-center">
									<GrCheckmark />
									<span className="tw-text-[10px] tw-ml-1 tw-font-semibold">
										In Stock
									</span>
								</div>
							)}
						</div>
						<p className=" tw-text-xs tw-text-neutral-600 tw-mb-3">
							{product.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
