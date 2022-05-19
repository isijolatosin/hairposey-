import React from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { CgClose } from 'react-icons/cg'
import { GrCheckmark } from 'react-icons/gr'
import Layout from '../components/shared/Layout'
import Card from '../components/Card2'
import { selectItemCount } from '../slices/appSlices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HairBundles() {
	const itemCount = useSelector(selectItemCount)
	const [hairBundles, setHairBundles] = React.useState([])
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const [show, setShow] = React.useState(false)
	const [sales, setSales] = React.useState(false)
	const navigate = useNavigate()

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter(
				(product) => product.color.toLowerCase() === 'natural black'
			)
			setHairBundles(filtered.sort((a, b) => a.name.localeCompare(b.name)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		setTimeout(() => {
			fetchProducts()
			setShow(true)
		}, 3000)
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}
	const sizes = singleProducts?.[0].availablelength.split(', ')

	function handleCheckout() {
		navigate('/user-cart')
		setTimeout(() => {
			setTimeout(function () {
				window.scrollTo(0, window.innerHeight)
			}, 500)
		}, 500)
	}

	return (
		<>
			<Helmet>
				<title>Hair Bundles</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `${
									hairBundles.length === 0 && !show
										? 'tw-pt-[230px]'
										: 'tw-pt-[170px]'
							  } tw-pb-10 md:tw-pt-[150px] tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto`
							: 'tw-pb-10 md:tw-pt-24 tw-pt-32 tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto'
					}>
					{singleCart && (
						<div className="tw-absolute bg-blur2 tw-border tw-border-neutral-300 tw-p-10 tw-w-[350px] tw-top-[130px] md:tw-top-[95px] tw-z-10 tw-right-0 md:tw-right-[40px]">
							<div className="tw-flex tw-items-center">
								<GrCheckmark />
								<span className="tw-text-xs tw-ml-2 tw-text-neutral-700">
									Item added to your cart
								</span>
							</div>
							<div className="tw-flex tw-flex-row tw-mb-10 tw-mt-7">
								<img
									id={singleCart._id}
									src={singleCart.image}
									alt={singleCart._id}
									className=" tw-w-[80px] tw-h-[120px] tw-mr-3 tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
								/>
								<div className="tw-flex tw-flex-col tw-text-sm">
									<span>{singleCart.name}</span>
									<span>Length - {singleCart.hairLength}"</span>
								</div>
							</div>
							<div
								onClick={() => navigate('/user-cart')}
								className="tw-border tw-border-black tw-py-2 tw-bg-white tw-text-center tw-mb-3">
								<button>View cart ({itemCount})</button>
							</div>
							<div
								onClick={handleCheckout}
								className="tw-bg-black tw-text-white tw-py-2 tw-text-center">
								<button>Check out</button>
							</div>
							<div
								onClick={() => setSingleCart(null)}
								size={25}
								className="tw-text-center tw-mt-2 tw-border-b tw-pb-1 hover:tw-cursor-pointer">
								<span>Continue shopping</span>
							</div>
							<div className="tw-absolute tw-top-10 tw-right-5 hover:tw-cursor-pointer">
								<CgClose onClick={() => setSingleCart(null)} size={25} />
							</div>
						</div>
					)}
					{show && hairBundles && (
						<div className="tw-grid tw-grid-cols-2 tw-w-full tw-px-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 xl:tw-w-[85%] 2xl:tw-w-[70%] tw-gap-2 md:tw-gap-5">
							{hairBundles.map((item) => (
								<div
									className="tw-justify-center tw-items-center tw-flex tw-flex-row"
									key={item._id}>
									<Card
										key={item._id}
										product={item}
										setSingleproducts={setSingleproducts}
										setSingleCart={setSingleCart}
										scrollToTop={scrollToTop}
									/>
								</div>
							))}
						</div>
					)}
					{!show && (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}

					{singleProducts && (
						<div className="tw-absolute tw-z-30 tw-h-[100vh] tw-w-[100%] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-row tw-items-start tw-justify-center bg-blur3">
							<div className="tw-w-[600px] tw-h-[600px]">
								<img
									id={singleProducts?.[0]._id}
									src={singleProducts?.[0].image}
									alt={singleProducts?.[0]._id}
									className="tw-w-[90%] tw-mt-20 tw-mx-auto tw-h-full tw-object-cover tw-mb-1"
								/>
								<div className="tw-max-w-[90%] tw-mx-auto">
									<p className="tw-text-xs tw-font-200 tw-tracking-tight tw-text-neutral-900 tw-mb-[1px] bg-blur tw-px-2 tw-leading-6 lg:tw-mt-[150px]">
										{singleProducts?.[0].name}
									</p>
									<p className="tw-font-medium tw-text-slate-900 tw-text-xs tw-mb-[1px] bg-blur tw-px-2 tw-mt-0">
										{singleProducts?.[0].description}
									</p>
									<div className="tw-flex tw-flex-col">
										<p className="tw-font-medium tw-text-white tw-text-xs tw-mt-2 tw-mr-2">
											Length
										</p>
										<div>
											{sizes.map((size, idx) => (
												<span
													className="bg-blur tw-text-slate-900 tw-rounded-full tw-mr-2 tw-border-[1px] tw-border-neutral-600 tw-px-2 tw-text-xs"
													key={idx}>
													{size}
												</span>
											))}
										</div>
									</div>
								</div>
								<CgClose
									onClick={() => setSingleproducts(null)}
									className="tw-absolute tw-top-[100px] tw-right-10 tw-w-10 tw-h-10 tw-p-3 tw-bg-gray-100 tw-rounded-full hover:tw-cursor-pointer"
								/>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default HairBundles
