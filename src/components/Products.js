import React from 'react'
import Card from './Card'
import { CgClose } from 'react-icons/cg'
import { GrCheckmark } from 'react-icons/gr'
import About from './About'

function Products({ allProducts }) {
	const [singleProducts, setSingleproducts] = React.useState(null)

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	const sizes = singleProducts?.[0].availablelength.split(', ')

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			{allProducts ? (
				<div className="tw-grid tw-grid-cols-2 tw-w-full tw-px-2 md:tw-w-[90%] md:tw-grid-cols-4 lg:tw-grid-cols-5 2xl:tw-grid-cols-6 3xl:tw-grid-cols-7 tw-gap-2 md:tw-gap-5 ">
					{allProducts.map((product) => {
						localStorage.setItem('isSales', product.sales)
						return (
							<div
								key={product._id}
								className="tw-justify-center tw-items-center tw-flex tw-flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			<div className="tw-mx-auto lg:tw-w-4/5 xl:tw-w-full tw-bg-neutral-50 tw-py-10 tw-mt-10">
				<About />
			</div>
			{singleProducts && (
				<div className="tw-absolute tw-z-10 tw-h-[100vh] tw-w-[100%] tw-right-0 tw-left-0 tw-top-[-140px] tw-flex tw-flex-row tw-items-start tw-justify-center bg-blur3">
					<div className="tw-w-[600px] tw-h-[600px]">
						<img
							id={singleProducts?.[0]._id}
							src={singleProducts?.[0].image}
							alt={singleProducts?.[0]._id}
							className="tw-w-[90%] tw-mt-20 tw-mx-auto tw-h-full tw-object-cover tw-mb-1"
						/>
						<div className="tw-max-w-[90%] tw-mx-auto">
							<p className="tw-text-md tw-font-200 tw-tracking-tight tw-text-neutral-900 tw-mb-[1px] bg-blur tw-px-2 tw-leading-6 lg:tw-mt-[150px]">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-slate-900 tw-text-xs tw-mb-[1px] bg-blur tw-px-2 tw-mt-0">
								{singleProducts?.[0].description}
							</p>
							{singleProducts?.[0].instock && (
								<div className="bg-blur tw-px-2 tw-flex tw-items-center">
									<GrCheckmark />
									<span className="tw-text-[10px] tw-ml-1 tw-font-semibold">
										In Stock
									</span>
								</div>
							)}
							<div className="tw-flex tw-flex-col">
								<span className="tw-font-medium tw-text-white tw-text-xs tw-mt-2 tw-mr-2">
									Length
								</span>
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
	)
}

export default Products
