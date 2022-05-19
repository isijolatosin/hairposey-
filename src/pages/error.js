import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import Button from '../components/shared/Button'
import Layout from '../components/shared/Layout'
import CursorText from '../components/shared/CursorText'

function NotFound() {
	const [showText, setShowText] = React.useState(false)
	const handleShow = () => {
		!showText && setShowText(true)
	}
	const handleHide = () => {
		setShowText(false)
	}
	return (
		<>
			<Helmet>
				<title>Error Page</title>
			</Helmet>
			<Layout>
				<div className="tw-flex tw-flex-col tw-items-center tw-my-[100px] tw-rounded-lg tw-w-[90%] md:tw-w-[60%] xl:tw-w-[40%] tw-p-10 tw-text-center tw-mx-auto tw-shadow-2xl tw-bg-neutral-200">
					<h1 className="tw-text-3xl tw-font-bold tw-text-red-900">404</h1>
					<p className="tw-text-neutral-600 tw-mt-2 tw-font-light">
						The page you are about to access does not exist
					</p>
					<div
						onMouseOver={handleShow}
						onMouseOut={handleHide}
						className="tw-flex tw-flex-col tw-mt-6 tw-relative">
						<Link to="/">
							<Button>
								<AiOutlineRollback className="tw-text-lg" />
							</Button>
						</Link>
						<CursorText showText={showText}>Back to Home</CursorText>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default NotFound
