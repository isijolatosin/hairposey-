import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import Heading from '../components/Heading'
import Inventory from '../components/Inventory'
import Layout from '../components/shared/Layout'
import Shippment from '../components/Shippment'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import { RiSendPlaneLine } from 'react-icons/ri'
import AllInventories from '../components/AllInventories'
import { UserContext } from '../context/user-context'

function Management() {
	const database = getDatabase()
	const [sales, setSales] = React.useState(null)
	const [section, setSection] = React.useState('all-inventory')
	const [percentSale, setPercentSale] = React.useState(null)
	const { user } = useContext(UserContext)

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const toggleSection = (e) => {
		setSection(e.target.id)
	}

	const SectionComp = () => {
		if (section === 'all-inventory') {
			return <AllInventories />
		}
		if (section === 'inventory') {
			return <Inventory />
		}
		if (section === 'shipping') {
			return <Shippment />
		}
	}
	const handleSubmit = () => {
		if (percentSale !== null || percentSale !== '') {
			set(ref(database, 'sales'), {
				no: percentSale,
			})
		}
		setPercentSale('')
	}

	return (
		<>
			<Helmet>
				<title>Admin Portal</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={
						sales
							? 'tw-mt-[70px] tw-pt-10 tw-flex tw-flex-col tw-w-[100vw] tw-items-center tw-bg-pink-100'
							: 'tw-mt-[20px] md:tw-mt-[60px] tw-pt-20 md:tw-pt-10 tw-flex tw-flex-col tw-w-[100vw] tw-items-center tw-bg-pink-100'
					}>
					<div className="tw-flex tw-flex-col tw-items-left tw-justify-between tw-w-[90%] md:tw-w-[85%]">
						<div className="tw-mb-2">
							<Heading children="Admin portal" isBold={true} />
						</div>
						<div className="tw-py-[2px] tw-flex tw-items-center tw-justify-end tw-w-[50%] md:tw-w-[30%] tw-px-3 tw-text-sm tw-bg-white">
							<input
								type="number"
								name="percentSale"
								id="number"
								value={percentSale}
								onChange={(e) => setPercentSale(Number(e.target.value))}
								placeholder="sales %"
								className="tw-w-[90%] tw-h-[30px] tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-bg-transparent"
							/>
							<RiSendPlaneLine
								onClick={handleSubmit}
								size={20}
								className="tw-text-pink-800 hover:tw-text-violet-300 tw-ease-in tw-duration-300 tw-w-[10%] tw-mr-2"
							/>
						</div>
					</div>
					<div className="tw-my-5 tw-w-[100%] tw-text-slate-900">
						<ul className="tw-flex tw-text-xs tw-flex-row tw-items-center tw-justify-between tw-w-[90%] lg:tw-w-[50%] tw-mx-auto">
							<li
								id="all-inventory"
								className="hover:tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								All Inventories
							</li>
							<li
								id="inventory"
								className="hover:tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Add to Inventory
							</li>
							<li
								id="shipping"
								className="hover:tw-cursor-pointer tw-bg-white  tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Shipment
							</li>
						</ul>
					</div>
					{user && (
						<div className="tw-w-[100%]">
							<SectionComp />
						</div>
					)}
					{!section && (
						<div className="tw-flex tw-flex-col tw-items-center tw-my-20 ">
							<div className="tw-text-2xl tw-text-stone-600">
								<BsFillArrowUpSquareFill />
							</div>
							<span className="tw-text-stone-600 tw-my-5 tw-capitalize tw-font-light">
								Action Required!
							</span>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Management
