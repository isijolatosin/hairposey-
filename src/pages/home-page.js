import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'
import { FaTiktok } from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai'
import {
	MdLocationPin,
	MdOutlineConstruction,
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { googleSearch } from '../constant'
import { SiTreyarch } from 'react-icons/si'
import { CgClose } from 'react-icons/cg'
import Book from '../components/Book'
import { db } from '../firebase'
import { scrollToTop } from '../utils/scrollTop'

const logo = require('../assets/logo.png')
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function HomePage() {
	const [allProducts, setAllproducts] = React.useState([])
	const [sales, setSales] = React.useState(null)
	const [_image, setImage] = React.useState(null)
	const [isSingleImage, setIsSingleImage] = React.useState(false)
	const [toggleBookBtn, setToggleBookBtn] = React.useState(false)
	const notReady = true
	const [location, setLocation] = React.useState('')
	const database = getDatabase()

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})

		db.collection('location').onSnapshot((snapshot) => {
			const results = snapshot.docs.map((doc) => ({
				data: doc.data(),
			}))
			setLocation(results[0].data.location)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: {
					products,
					//  curUser
				},
			} = await axios.get('/api/v1/products')

			setTimeout(() => {
				setAllproducts(products.sort((a, b) => a.name.localeCompare(b.name)))
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div className="tw-bg-neutral-200 relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={`tw-relative ${
						allProducts.length === 0 ? 'tw-mt-[70px]' : 'tw-pt-[60px]'
					} `}>
					<div className="tw-fixed tw-top-[70px] tw-left-0 tw-right-0 tw-z-20 tw-w-full tw-bg-white tw-h-fit tw-text-black tw-font-thin  tw-py-2 tw-text-xs">
						<div className="tw-flex tw-items-center tw-justify-start lg:tw-justify-center tw-ml-3 lg:tw-ml-0 tw-font-bold">
							<p>For your hair appointment, book now !</p>
							{toggleBookBtn ? (
								<button
									onClick={() => setToggleBookBtn(false)}
									className="tw-ml-2 tw-bg-black tw-text-white tw-rounded-full hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300">
									<MdOutlineKeyboardArrowUp size={20} />
								</button>
							) : (
								<button
									onClick={() => {
										setToggleBookBtn(true)
										scrollToTop()
									}}
									className="tw-ml-2 tw-bg-black tw-text-white tw-rounded-full hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300">
									<MdOutlineKeyboardArrowDown size={20} />
								</button>
							)}
						</div>
						<div className="tw-absolute tw-right-0 tw-top-[25%] tw-border-l-[1px] tw-border-pink-800 tw-pl-3">
							<div className="tw-flex tw-justify-evenly tw-items-center tw-text-pink-800">
								<a
									href="https://www.instagram.com/hairposey/"
									target="_blank"
									rel="noopener noreferrer">
									<AiOutlineInstagram
										size={18}
										className="hover:tw-text-pink-300 tw-mr-5 tw-ease-in tw-duration-300"
									/>
								</a>
								<a
									href="https://www.tiktok.com/search?q=hairposey&t=1652981834762"
									target="_blank"
									rel="noopener noreferrer">
									<FaTiktok
										size={15}
										className="hover:tw-text-pink-300 tw-mr-5 tw-ease-in tw-duration-300"
									/>
								</a>
							</div>
						</div>
					</div>
					<div
						className={`${
							toggleBookBtn ? 'tw-opacity-1 tw-h-fit' : 'tw-opacity-0 tw-h-0'
						} tw-ease-in tw-duration-300`}>
						<Wrapper>
							<Elements stripe={promise}>
								<Book />
							</Elements>
						</Wrapper>
					</div>
					<div
						className={`tw-flex tw-flex-col tw-items-center lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto tw-mt-5`}>
						{allProducts.length !== 0 ? (
							<Products
								sales={sales}
								allProducts={allProducts}
								setImage={setImage}
								setIsSingleImage={setIsSingleImage}
							/>
						) : (
							<div className="tw-rounded-full tw-mt-4 progress">
								<div className="inner tw-bg-slate-900"></div>
							</div>
						)}
					</div>
					{isSingleImage && (
						<div className="tw-relative">
							<div className="tw-fixed tw-top-[70px] tw-z-20 md:tw-bg-[rgba(255,255,255,0.9)] tw-h-[100vh] md:tw-h-[95vh] tw-w-[100vw] tw-flex tw-items-center tw-justify-center">
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
					{notReady && (
						<div className="tw-z-40 tw-h-[2700px] md:tw-h-[1550px] lg:tw-h-[1650px] 2xl:tw-h-[1200px] tw-mt-[-70px] tw-w-[100%] bg-blur3 tw-fixed tw-top-0 tw-bottom-0 z-10 tw-items-center tw-flex tw-flex-col">
							<div className="tw-w-[300px] tw-ml-5 tw-mt-[100px]">
								<img src={logo} alt="company logo" />
							</div>
							<div className="tw-relative tw-text-neutral-50 tw-text-[40px] md:tw-text-[50px] tw-flex tw-flex-col tw-items-center">
								<span className="-tw-mb-8">UNDER</span>
								<span>CONSTRUCTION</span>
								<MdOutlineConstruction className="tw-mb-5" />
							</div>
							<span className="tw-font-light tw-ml-5 tw-text-center tw-text-white tw-tracking-[12px] md:tw-tracking-[20px] tw-text-[10px]">
								SITE ALMOST READY
							</span>
							<div className="load-wrapper tw-mt-10 tw-top-[17%] md:tw-top-[31%] lg:tw-top-[30%] xl:tw-top-[30%] 2xl:tw-top-[40%] tw-left-[50%]">
								<div className="circle"></div>
								<div className="circle"></div>
								<div className="circle"></div>
							</div>
							<a
								href={`${googleSearch + location}`}
								target="_blank"
								rel="noreferrer"
								className="tw-flex-col tw-text-neutral-400 tw-text-xs tw-mt-[100px] tw-font-light tw-flex tw-items-center tw-justify-center tw-mb-7 hover:tw-text-neutral-600 tw-ease tw-duration-300 ">
								<MdLocationPin
									size={35}
									className="tw-text-yellow-500 tw-mb-2"
								/>
								<span className="navStyleChild tw-pb-1">
									<span className="tw-text-green-500">Currently</span>, we are
									in {location}
								</span>
							</a>
							<div className="social-media-list tw-mt-[50px]">
								<a
									href="https://www.instagram.com/hairposey/"
									target="_blank"
									rel="noopener noreferrer">
									<AiOutlineInstagram size={20} />
								</a>
								<a
									href="https://www.tiktok.com/search?q=hairposey&t=1652981534762"
									target="_blank"
									rel="noopener noreferrer">
									<FaTiktok size={20} />
								</a>
							</div>
							<div className="tw-flex tw-text-xs tw-text-neutral-500 tw-font-light tw-mt-[50px] tw-mb-[30px]">
								<div className="tw-pr-1 tw-border-r-2 tw-border-r-neutral-800 md:tw-flex">
									<p className="">
										&copy; {new Date().getUTCFullYear()} <span>hairposey</span>
										<span> • All right reserved</span>
									</p>
								</div>
								<div className="md:tw-flex tw-ml-1">
									<p className="tw-flex tw-items-center">
										Designed by{' '}
										<span className="rose-gold tw-ml-1">
											<a
												href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
												target="_blank"
												rel="noopener noreferrer">
												<SiTreyarch size={15} />
											</a>
										</span>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	)
}

const Wrapper = styled.section`
	form {
		width: 30vw;
		align-self: center;
		box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
			0px 2px 5px 0px rgba(50, 50, 93, 0.1),
			0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
		border-radius: 7px;
		padding-left: 10px;
		padding-right: 10px;
		/* padding-top: 30px; */
		padding-bottom: 30px;
	}

	input {
		border-radius: 6px;
		margin-bottom: 6px;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		font-size: 16px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	.result-message {
		line-height: 22px;
		font-size: 16px;
	}

	.result-message a {
		color: rgb(89, 111, 214);
		font-weight: 600;
		text-decoration: none;
	}

	.hidden {
		display: none;
	}

	#card-error {
		color: rgb(105, 115, 134);
		font-size: 16px;
		line-height: 20px;
		margin-top: 12px;
		text-align: center;
	}

	#card-element {
		border-radius: 4px 4px 0 0;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	#payment-request-button {
		margin-bottom: 32px;
	}

	button:hover {
		filter: contrast(115%);
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	/* spinner/processing state, errors */
	.spinner,
	.spinner:before,
	.spinner:after {
		border-radius: 50%;
	}

	.spinner {
		color: #ffffff;
		font-size: 22px;
		text-indent: -99999px;
		margin: 0px auto;
		position: relative;
		width: 20px;
		height: 20px;
		box-shadow: inset 0 0 0 2px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
	}

	.spinner:before,
	.spinner:after {
		position: absolute;
		content: '';
	}

	.spinner:before {
		width: 10.4px;
		height: 20.4px;
		background: undefined;
		border-radius: 20.4px 0 0 20.4px;
		top: -0.2px;
		left: -0.2px;
		-webkit-transform-origin: 10.4px 10.2px;
		transform-origin: 10.4px 10.2px;
		-webkit-animation: loading 2s infinite ease 1.5s;
		animation: loading 2s infinite ease 1.5s;
	}

	.spinner:after {
		width: 10.4px;
		height: 10.2px;
		background: undefined;
		border-radius: 0 10.2px 10.2px 0;
		top: -0.1px;
		left: 10.2px;
		-webkit-transform-origin: 0px 10.2px;
		transform-origin: 0px 10.2px;
		-webkit-animation: loading 2s infinite ease;
		animation: loading 2s infinite ease;
	}

	@keyframes loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@media only screen and (max-width: 600px) {
		form {
			width: 80vw;
		}
	}
`

export default HomePage
