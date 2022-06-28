import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import Layout from '../components/shared/Layout'
import { UserContext } from '../context/user-context'

function Account() {
	const database = getDatabase()
	const { user } = useContext(UserContext)
	const [sales, setSales] = React.useState(null)
	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Helmet>
				<title>Account</title>
			</Helmet>
			<Layout sales={sales}>
				<div className="tw-py-[100px] tw-px-5 tw-bg-gray-300 tw-flex tw-flex-col tw-items-center">
					<div className=" tw-w-[80%]">
						<div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm tw-mb-1">
							<h1 className="tw-font-light tw-text-xs">
								Account Name: {user?.displayName}
							</h1>
							<h1 className="tw-font-light tw-text-xs">
								Account Email: {user?.email}
							</h1>
						</div>
						<div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm tw-mb-1">
							<h1 className="tw-font-light tw-text-md">Booking History</h1>
						</div>
						<div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm">
							<h1 className="tw-font-light tw-text-md">Cart History</h1>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Account
