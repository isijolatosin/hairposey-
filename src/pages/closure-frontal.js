import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
import Layout from '../components/shared/Layout'
import { CgClose } from 'react-icons/cg'
import Card from '../components/Card'
import axios from 'axios'
import { GrCheckmark } from 'react-icons/gr'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
	selectItemCount,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user-context'
import SingleProductModal from '../components/shared/SingleProductModal'

function ClosureFrontal() {
	const itemCount = useSelector(selectItemCount)
	const { user } = useContext(UserContext)
	const [length, setLength] = React.useState(null)
	const [error, setError] = React.useState(false)
	const cartItems = useSelector(selectCartItems)
	const [_image, setImage] = React.useState(null)
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [closureFrontal, setClosureFrontal] = React.useState([])
	const [isSingleImage, setIsSingleImage] = React.useState(false)
	const [show, setShow] = React.useState(false)
	const [sales, setSales] = React.useState(false)
	const [singleCart, setSingleCart] = React.useState(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const database = getDatabase()

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter((product) => {
				if (window.location.pathname.toLowerCase().includes('cambodian-hair')) {
					return (
						product.brand.toLowerCase() === 'cambodian' &&
						(product.type.toLowerCase() === 'closure' ||
							product.type.toLowerCase() === 'frontal')
					)
				} else if (
					window.location.pathname.toLowerCase().includes('vietnamese-hair')
				) {
					return (
						product.brand.toLowerCase() === 'vietnamese' &&
						(product.type.toLowerCase() === 'closure' ||
							product.type.toLowerCase() === 'frontal')
					)
				} else {
					return (
						product.brand.toLowerCase() === 'brazilian' &&
						(product.type.toLowerCase() === 'closure' ||
							product.type.toLowerCase() === 'frontal')
					)
				}
			})
			setClosureFrontal(filtered.sort((a, b) => a.name.localeCompare(b.name)))
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
		navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
		setTimeout(() => {
			setTimeout(function () {
				window.scrollTo(0, window.innerHeight)
			}, 500)
		}, 500)
	}

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const price = singleProducts?.[0] && singleProducts?.[0]?.price
	const hairLength = length
	const hairColor = color
	const hairTexture = singleProducts?.[0] && singleProducts?.[0]?.name

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		hairTexture,
	}

	const addToCart = () => {
		if (length) {
			dispatch(addToCartItem(singleProduct))
			setTimeout(() => {
				setSingleCart(singleProduct)
			}, 1000)
		} else {
			setError(true)
		}
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
		setTimeout(() => {
			setSingleCart(singleProduct)
		}, 1000)
	}

	const desc = [
		{ key: 'Hair Texture', value: name },
		{ key: 'Hair Color', value: color },
		{
			key: 'Hair Length',
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
		{ key: 'Material', value: '100% Human Hair' },
		{ key: 'Density', value: '150% - 200%' },
		{ key: 'Cap Size', value: 'Average Size(Head circumference: 54cm - 58cm' },
		{ key: 'Can be bleached.dyed', value: 'Yes' },
		{
			key: 'Delivery time',
			value:
				'We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)',
		},
		{
			key: 'Return policy',
			value:
				'We accept 10-days no reason return exchange with hair not been used',
		},
	]

	return (
		<>
			<Helmet>
				<title>Closure & Frontal</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={
						sales
							? `${
									closureFrontal.length === 0 && !show
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
								onClick={() =>
									navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
								}
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
					{show && closureFrontal && (
						<div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center tw-justify-center tw-pb-10 tw-pt-0">
							{closureFrontal.map((product) => (
								<div key={product._id} className="tw-mb-2 md:tw-mb-0">
									<Card
										key={product._id}
										product={product}
										setSingleproducts={setSingleproducts}
										scrollToTop={scrollToTop}
										setImage={setImage}
										setIsSingleImage={setIsSingleImage}
									/>
								</div>
							))}
						</div>
					)}
					{!show && (
						<div className="tw-rounded-full progress">
							<div className="inner tw-bg-slate-900"></div>
						</div>
					)}
					{isSingleImage && (
						<div className="tw-relative">
							<div className="tw-fixed tw-top-[70px] tw-left-0 tw-z-20 md:tw-bg-[rgba(255,255,255,0.9)] tw-h-[100vh] md:tw-h-[95vh] tw-w-[100vw] tw-flex tw-items-center tw-justify-center">
								<img
									src={_image?.[0].image}
									alt={_image?.[0]._id}
									className="tw-object-cover tw-h-[100%] md:tw-h-[90%] md:tw-rounded-3xl"
								/>
								<div
									onClick={() => {
										setImage(null)
										setIsSingleImage(false)
									}}
									className="tw-text-2xl tw-bg-neutral-200 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] md:tw-right-[150px] tw-right-[20px] tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white">
									<CgClose />
								</div>
							</div>
						</div>
					)}

					{singleProducts && (
						<SingleProductModal
							category={singleProducts?.[0]?.name}
							singleProducts={singleProducts}
							setSingleproducts={setSingleproducts}
							sales={sales}
							desc={desc}
							sizes={sizes}
							setLength={setLength}
							setError={setError}
							error={error}
							singleProduct={singleProduct}
							cartItems={cartItems}
							IncreaseItem={IncreaseItem}
							addToCart={addToCart}
						/>
					)}
				</div>
			</Layout>
		</>
	)
}

export default ClosureFrontal
