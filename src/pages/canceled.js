import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import Button from '../components/shared/Button'
import Heading from '../components/Heading'

const Canceled = () => {
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])
	return (
		<Layout>
			<div
				className={
					sales
						? 'tw-pt-[230px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
						: 'tw-pt-[150px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
				}>
				<Heading>payment failed</Heading>
				<div className="tw-my-5">
					<span className="tw-font-semibold tw-text-red-800">
						Payment was not successful
					</span>
				</div>
				<Link className="tw-mb-10" to="/">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		</Layout>
	)
}

export default Canceled
