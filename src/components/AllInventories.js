import React from "react";
import axios from "axios";
import Heading from "./Heading";
import InventoryCard from "./InventoryCard";
import Button from "./shared/Button";

function AllInventories() {
	const [fetchAllData, setFetchAllData] = React.useState([]);
	const [singleProduct, setSingleProduct] = React.useState();
	const [postError, setPostError] = React.useState("");
	const [isTrue, setIsTrue] = React.useState(false);
	// const [imageFile, setImageFile] = React.useState('')

	const togglePassword = () => {
		setIsTrue(!isTrue);
	};

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get("/api/v1/products");
			setFetchAllData(products);
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		let mounted = true;
		if (mounted) fetchProducts();
		return () => (mounted = false);
	}, []);

	const handleInputName = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: e.target.value,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputBrand = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: e.target.value,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputType = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: e.target.value,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: e.target.value,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputAvailableColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: e.target.value,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: e.target.value,
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputAvailableLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: e.target.value,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice14 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: e.target.value,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice16 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: e.target.value,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice18 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: e.target.value,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice20 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: e.target.value,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice22 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: e.target.value,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice24 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: e.target.value,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice26 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: e.target.value,
			price28: singleProduct.price28,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice28 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: e.target.value,
			price30: singleProduct.price30,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputPrice30 = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price14: singleProduct.price14,
			price16: singleProduct.price16,
			price18: singleProduct.price18,
			price20: singleProduct.price20,
			price22: singleProduct.price22,
			price24: singleProduct.price24,
			price26: singleProduct.price26,
			price28: singleProduct.price28,
			price30: e.target.value,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		});
	};
	const handleInputDesc = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			sales: singleProduct.sales,
			description: e.target.value,
		});
	};

	async function updateSingleProduct(e) {
		e.preventDefault();
		const id = singleProduct?.id;
		try {
			const product = {
				name: singleProduct.name,
				brand: singleProduct.brand,
				type: singleProduct.type,
				color: singleProduct.color,
				availablecolor: singleProduct.availablecolor,
				price: singleProduct.price,
				length: singleProduct.length,
				availablelength: singleProduct.availablelength,
				description: singleProduct.description,
				sales: isTrue,
			};
			if (
				product.name === "" ||
				product.brand === "" ||
				product.type === "" ||
				product.color === "" ||
				product.price === null ||
				product.length === null ||
				product.description === "" ||
				product.availablelength === "" ||
				product.availablecolor === ""
			) {
				return setPostError("Missing Credentials");
			}
			await axios.patch(`/api/v1/products/${id}`, product);
			setPostError("");
		} catch (error) {
			setPostError(error.message);
			console.log(error);
		}

		setSingleProduct();

		fetchProducts();
	}

	return (
		<div>
			{!singleProduct ? (
				<div className="tw-flex tw-flex-col tw-items-center tw-w-[100%] tw-mx-auto tw-mt-5">
					<Heading>All Inventories</Heading>
					<div className="tw-grid tw-grid-cols-1 tw-w-full md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-gap-5 tw-pt-2">
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
							<div className="tw-grid md:tw-grid-cols-4 tw-gap-2 tw-w-[100%] lg:tw-w-[70%]">
								<input
									type="text"
									name="title"
									id="title"
									value={singleProduct.name}
									onChange={handleInputName}
									placeholder="Product Name..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>

								<input
									type="text"
									name="brand"
									id="brand"
									value={singleProduct.brand}
									onChange={handleInputBrand}
									placeholder="Product brand..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="type"
									id="type"
									value={singleProduct.type}
									onChange={handleInputType}
									placeholder="Product Type..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="color"
									id="color"
									value={singleProduct.color}
									onChange={handleInputColor}
									placeholder="Product Color..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="availablecolor"
									id="availablecolor"
									value={singleProduct.availablecolor}
									onChange={handleInputAvailableColor}
									placeholder="Available Color..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="length"
									id="length"
									value={singleProduct.length}
									onChange={handleInputLen}
									placeholder="Length..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="availablelength"
									id="availablelength"
									value={singleProduct.availablelength}
									onChange={handleInputAvailableLen}
									placeholder="Available Lengths..."
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
							</div>
							<div className="tw-w-[100%] lg:tw-w-[70%]">
								<div className="tw-bg-slate-200 tw-text-sm tw-text-slate-500 tw-pl-3 tw-pr-10 tw-rounded-md tw-mt-3 tw-text-left tw-w-fit">
									<Heading children="Prices" />
								</div>
							</div>
							<div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-w-[100%] lg:tw-w-[70%]">
								<input
									type="number"
									name="price14"
									id="price14"
									value={singleProduct.price14}
									onChange={handleInputPrice14}
									placeholder="14 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price16"
									id="price16"
									value={singleProduct.price16}
									onChange={handleInputPrice16}
									placeholder="16 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price18"
									id="price18"
									value={singleProduct.price18}
									onChange={handleInputPrice18}
									placeholder="18 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price20"
									id="price20"
									value={singleProduct.price20}
									onChange={handleInputPrice20}
									placeholder="20 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price22"
									id="price22"
									value={singleProduct.price22}
									onChange={handleInputPrice22}
									placeholder="22 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price24"
									id="price24"
									value={singleProduct.price24}
									onChange={handleInputPrice24}
									placeholder="24 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price26"
									id="price26"
									value={singleProduct.price26}
									onChange={handleInputPrice26}
									placeholder="26 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price28"
									id="price28"
									value={singleProduct.price28}
									onChange={handleInputPrice28}
									placeholder="28 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price30"
									id="price30"
									value={singleProduct.price30}
									onChange={handleInputPrice30}
									placeholder="30 inches"
									className="tw-w-full tw-rounded tw-mt-1 tw-block tw-mx-auto tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
							</div>
							<textarea
								value={singleProduct.description}
								name="description"
								onChange={handleInputDesc}
								rows={5}
								cols={50}
								placeholder="Description..."
								className="tw-rounded tw-block tw-mx-auto tw-w-[100%] lg:tw-w-[70%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-my-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-mt-5 tw-shadow-xl tw-p-2">
								<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">
									Sales
								</label>
								<input
									type="checkbox"
									checked={isTrue}
									className={
										isTrue
											? "tw-ml-2 tw-rounded-full tw-bg-violet-400"
											: "tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200"
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
	);
}
export default AllInventories;
