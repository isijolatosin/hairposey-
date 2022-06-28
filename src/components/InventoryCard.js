import React from 'react'
import axios from 'axios'
import { MdDeleteOutline } from 'react-icons/md'
import { MdOutlineEditNote } from 'react-icons/md'

function InventoryCard({ product, fetchProducts, setSingleProduct }) {
	async function deleteSingleProduct() {
		const id = product._id
		try {
			await axios.delete(`/api/v1/products/${id}`)
		} catch (error) {
			console.log(error)
		}

		fetchProducts()
	}

	async function getSingleProduct() {
		const id = product._id
		try {
			const {
				data: { product },
			} = await axios.get(`/api/v1/products/${id}`)

			setSingleProduct({
				id: product._id,
				name: product.name,
				brand: product.brand,
				price: product.price,
				description: product.description,
				sales: product.sales,
				type: product.type,
				color: product.color,
				availablecolor: product.availablecolor,
				length: product.length,
				availablelength: product.availablelength,
			})

			// console.log(product)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="tw-flex tw-flex-row tw-bg-pink-200 tw-p-3">
			<div className="tw-mr-3 tw-w-[35%]">
				<img
					alt=""
					loading="lazy"
					src={product.image}
					className="tw-w-[200px] tw-h-[100%] tw-object-cover tw-rounded tw-mr-5"
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-w-[65%]">
				<div>
					<div className="tw-flex tw-flex-col tw-text-xs tw-font-light tw-w-[100%]">
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Name: </span> {product.name}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Brand: </span>
							{product.brand}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Color: </span>
							{product.color}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Price: </span> CA$
							{product.price}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Length: </span> {product.length}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Available Color: </span>
							{product.availablecolor}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Available Length: </span>
							{product.availablelength}
						</span>
						<span className="tw-w-[100%]">
							<span className="tw-font-bold">Description: </span>
							{product.description}
						</span>
						<span className="tw-text-red-800">{product.sales && 'onsale'}</span>
					</div>
					<div className="tw-flex tw-flex-row tw-justify-between tw-w-[40%] tw-pt-[10px] lg:tw-pl-2 xl:tw-pl-[2px]">
						<MdDeleteOutline
							onClick={deleteSingleProduct}
							size={30}
							className="tw-p-[4px] tw-text-neutral-800 hover:tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-border-red-800 hover:tw-border hover:tw-rounded-full tw-ease-in tw-duration-300 tw-mb-3"
						/>
						<MdOutlineEditNote
							onClick={getSingleProduct}
							size={30}
							className="tw-p-[4px] tw-text-neutral-800 hover:tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-border-neutral-800 hover:tw-border hover:tw-rounded-full tw-ease-in tw-duration-300"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InventoryCard
