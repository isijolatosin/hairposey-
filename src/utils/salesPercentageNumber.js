import { getDatabase, ref, onValue } from 'firebase/database'
const database = getDatabase()

export const fetchSalesPercentage = () => {
	const starCountRef = ref(database, 'sales')
	let data
	onValue(starCountRef, (snapshot) => {
		data = snapshot.val().no
	})
	return data
}
export const fetchBundlePercentage = () => {
	const bundleDealsPercentage = ref(database, 'bundle deals')
	let data
	onValue(bundleDealsPercentage, (snapshot) => {
		data = snapshot.val().on
	})
	return data
}
