import React from 'react'
import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = React.createContext()

const UserContextProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)
				userRef.onSnapshot((snapShot) => {
					setUser({
						id: snapShot.id,
						...snapShot.data(),
					})
					setLoading(false)
				})
			} else {
				setUser(userAuth)
				setLoading(false)
			}
		})
		return () => unsubscribeFromAuth()
	}, [])

	const userContext = { user, loading }
	if (loading) {
		return (
			<div className="tw-text-gray-600 tw-flex tw-flex-col tw-items-center tw-mt-[50px]">
				Loading...
			</div>
		)
	}
	return (
		<UserContext.Provider value={userContext}>{children}</UserContext.Provider>
	)
}

export default UserContextProvider
