import React from 'react'
import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = React.createContext()

const UserContextProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [changeInfo, setChangeInfo] = React.useState(false)

	React.useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)
				userRef.onSnapshot((snapShot) => {
					setUser({
						id: snapShot.id,
						...snapShot.data(),
					})
					setTimeout(() => {
						setLoading(false)
					}, 5000)
				})
			} else {
				setTimeout(() => {
					setLoading(false)
					setUser(userAuth)
				}, 5000)
			}
		})
		return () => unsubscribeFromAuth()
	}, [])

	if (!user) {
		setTimeout(() => {
			setChangeInfo(true)
		}, 3000)
	}

	const userContext = { user, loading }
	if (loading) {
		return (
			<div className="tw-py-[100px] tw-flex tw-justify-center">
				{user ? (
					<div className="tw-text-slate-900 tw-flex tw-flex-col tw-items-center tw-mt-[10px]">
						Authenticating User...
					</div>
				) : (
					<div className="tw-text-slate-900 tw-flex tw-flex-col tw-items-center tw-mt-[10px]">
						{changeInfo ? 'No User Detected!' : 'Authenticating User...'}
					</div>
				)}

				<div className="tw-rounded-full progress2">
					<div className="inner2 tw-bg-slate-900"></div>
				</div>
			</div>
		)
	}
	return (
		<UserContext.Provider value={userContext}>{children}</UserContext.Provider>
	)
}

export default UserContextProvider
