import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	const [sales, setSales] = React.useState(false)
	const [allProducts, setAllproducts] = React.useState([])

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

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])
	return (
		<div className="tw-bg-neutral-200 relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-mt-[150px]' : 'tw-mt-[70px]'
							  } tw-pt-[70px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
							: `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-pt-[180px]' : 'tw-pt-[100px]'
							  } md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
					}>
					{allProducts.length !== 0 ? (
						<Products allProducts={allProducts} />
					) : (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
