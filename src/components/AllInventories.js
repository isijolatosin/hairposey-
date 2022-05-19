import React from 'react'
import axios from 'axios'
import Heading from './Heading'
import InventoryCard from './InventoryCard'
import Button from './shared/Button'

function AllInventories() {
	const [fetchAllData, setFetchAllData] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState()
	const [postError, setPostError] = React.useState('')
	const [isTrue, setIsTrue] = React.useState(false)
	// const [imageFile, setImageFile] = React.useState('')

	const togglePassword = () => {
		setIsTrue(!isTrue)
	}

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setFetchAllData(products)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	const handleInputName = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: e.target.value,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputType = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: e.target.value,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: e.target.value,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputAvailableColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: e.target.value,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: e.target.value,
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputAvailableLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: e.target.value,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputPrice = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: e.target.value,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputDesc = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			sales: singleProduct.sales,
			description: e.target.value,
		})
	}

	async function updateSingleProduct(e) {
		e.preventDefault()
		const id = singleProduct?.id
		try {
			const product = {
				name: singleProduct.name,
				type: singleProduct.type,
				color: singleProduct.color,
				availablecolor: singleProduct.availablecolor,
				price: singleProduct.price,
				length: singleProduct.length,
				availablelength: singleProduct.availablelength,
				description: singleProduct.description,
				sales: isTrue,
				// image: imageFile,
			}
			if (
				product.name === '' ||
				product.type === '' ||
				product.color === '' ||
				product.price === null ||
				product.length === null ||
				product.description === ''
			) {
				return setPostError('Missing Credentials')
			}
			await axios.patch(`/api/v1/products/${id}`, product)
			setPostError('')
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setSingleProduct()

		fetchProducts()
	}

	// 	const uploadFile = async (e) => {
	// 		e.preventDefault()
	// 		const imageFile = e.target.files[0]
	// 		const formData = new FormData()
	// 		formData.append('image', imageFile)
	// 		try {
	// 			const {
	// 				data: {
	// 					image: { src },
	// 				},
	// 			} = await axios.post('/api/v1/products/uploads', formData, {
	// 				headers: {
	// 					'Content-Type': 'multipart/form-data',
	// 				},
	// 			})
	//
	// 			setImageFile(src)
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}

	return (
		<div>
			{!singleProduct ? (
				<div className="tw-flex tw-flex-col tw-items-center tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[85%] tw-mx-auto tw-mt-5">
					<Heading>All Inventories</Heading>
					<div className="tw-grid tw-grid-cols-1 tw-w-full md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-gap-5 tw-p-5 lg:tw-p-10">
						{fetchAllData.map((product) => (
							<InventoryCard
								key={product._id}
								product={product}
								fetchProducts={fetchProducts}
								setSingleProduct={setSingleProduct}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="tw-w-[100%]">
					<span className=" tw-text-xl tw-text-neutral-800 tw-flex tw-flex-col tw-items-center tw-mt-10">
						Edit Product
					</span>
					<span className="tw-text-neutral-500 tw-text-xs tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2">{`ProductID: ${singleProduct.id}`}</span>
					<span className="tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2 tw-capitalize tw-text-xs tw-text-red-800">
						Please ensure to edit all field for better performance
					</span>
					<form onSubmit={updateSingleProduct}>
						<div className="tw-flex tw-flex-col tw-items-center">
							<input
								type="text"
								name="title"
								id="title"
								value={singleProduct.name}
								onChange={handleInputName}
								placeholder="Product Name..."
								className="tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="text"
								name="type"
								id="type"
								value={singleProduct.type}
								onChange={handleInputType}
								placeholder="Product Type..."
								className="tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="text"
								name="color"
								id="color"
								value={singleProduct.color}
								onChange={handleInputColor}
								placeholder="Product Color..."
								className="tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="text"
								name="availablecolor"
								id="availablecolor"
								value={singleProduct.availablecolor}
								onChange={handleInputAvailableColor}
								placeholder="Available Color..."
								className="tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="number"
								name="length"
								id="length"
								value={singleProduct.length}
								onChange={handleInputLen}
								placeholder="Length..."
								className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="text"
								name="availablelength"
								id="availablelength"
								value={singleProduct.availablelength}
								onChange={handleInputAvailableLen}
								placeholder="Available Lengths..."
								className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<input
								type="number"
								name="price"
								id="price"
								value={singleProduct.price}
								onChange={handleInputPrice}
								placeholder="Price..."
								className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<textarea
								value={singleProduct.description}
								name="description"
								onChange={handleInputDesc}
								rows={5}
								cols={50}
								placeholder="Description..."
								className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							{/* <div className="tw-text-red-800 tw-text-sm tw-mb-2 ">
								<span>
									Rename Image and substitute space with a dash ( e.g abc-def )
								</span>
							</div>
							<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-shadow-xl tw-pl-3 tw-pb-1">
								<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">
									Image
								</label>
								<input
									onChange={uploadFile}
									type="file"
									className="tw-block tw-w-full tw-text-sm tw-text-gray-500 file:tw-mr-4 file:tw-py-1 file:tw-px-4 file:tw-rounded file:tw-border-0 file:tw-text-sm file:tw-bg-gray-200 file:tw-text-violet-700 hover:file:tw-bg-violet-100 tw-ease-in tw-duration-300"
								/>
							</div> */}
							<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-mt-5 tw-shadow-xl tw-p-2">
								<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">
									Sales
								</label>
								<input
									type="checkbox"
									checked={isTrue}
									className={
										isTrue
											? 'tw-ml-2 tw-rounded-full tw-bg-violet-400'
											: 'tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200'
									}
									onChange={togglePassword}
								/>
							</div>
							{postError && (
								<span className="tw-text-xs tw-text-red-700 tw-mt-5">{`Error: ${postError}`}</span>
							)}
							<div className="tw-my-10">
								<Button type="submit">Update Inventory</Button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}
export default AllInventories
