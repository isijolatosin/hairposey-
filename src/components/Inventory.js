import React from 'react'
import axios from 'axios'
import InventoryForm from './InventoryForm'

function Inventory() {
	const [isTrue, setIsTrue] = React.useState(false)
	const [postError, setPostError] = React.useState('')
	const [formData, setFormData] = React.useState({
		title: '',
		brand: '',
		type: '',
		price: '',
		length: '',
		availablelength: '',
		description: '',
	})
	const [imageFile, setImageFile] = React.useState('')

	const handleformDataChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const togglePassword = () => {
		setIsTrue(!isTrue)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const product = {
				name: formData.title,
				brand: formData.brand,
				type: formData.type,
				color: formData.color,
				price: formData.price,
				length: formData.length,
				availablelength: formData.availablelength,
				availablecolor: formData.availablecolor,
				description: formData.description,
				sales: isTrue,
				image: imageFile,
			}
			await axios.post('/api/v1/products', product)
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setFormData({
			title: '',
			brand: '',
			type: '',
			color: '',
			price: '',
			length: '',
			availablelength: '',
			availablecolor: '',
			description: '',
		})
		setIsTrue(false)
	}

	const inputTypes = [
		{
			id: '1',
			name: 'title',
			type: 'text',
			value: formData.title,
			placeholder: 'Product Name...',
		},
		{
			id: '2',
			name: 'brand',
			type: 'text',
			value: formData.brand,
			placeholder: 'Product Brand...',
		},
		{
			id: '3',
			name: 'type',
			type: 'text',
			value: formData.type,
			placeholder: 'Product Type...',
		},
		{
			id: '4',
			name: 'color',
			type: 'text',
			value: formData.color,
			placeholder: 'Product Color...',
		},
		{
			id: '5',
			name: 'availablecolor',
			type: 'text',
			value: formData.availablecolor,
			placeholder: 'Available Color...',
		},
		{
			id: '6',
			name: 'length',
			type: 'number',
			value: formData.length,
			placeholder: 'Length...',
		},
		{
			id: '7',
			name: 'availablelength',
			type: 'text',
			value: formData.availablelength,
			placeholder: 'Available Lengths...',
		},
		{
			id: '8',
			name: 'price',
			type: 'number',
			value: formData.price,
			placeholder: 'Price CA($)...',
		},
	]

	const uploadFile = async (e) => {
		const imageFile = e.target.files[0]
		const formData = new FormData()
		formData.append('image', imageFile)
		try {
			const {
				data: {
					image: { src },
				},
			} = await axios.post('/api/v1/products/uploads', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			setImageFile(src)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<InventoryForm
			handleSubmit={handleSubmit}
			inputTypes={inputTypes}
			handleformDataChange={handleformDataChange}
			formData={formData}
			isTrue={isTrue}
			togglePassword={togglePassword}
			postError={postError}
			buttonText="Add to Inventory"
			uploadFile={uploadFile}
		/>
	)
}

export default Inventory
