import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/app-check'

const firebaseConfig = {
	// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	// appId: process.env.REACT_APP_FIREBASE_APP_ID,
	// measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	apiKey: 'AIzaSyDVMKJCCIZVTmAGC1M2tPKZYK0bNWh67pQ',
	authDomain: 'hairposey-1e3f6.firebaseapp.com',
	databaseURL: 'https://hairposey-1e3f6-default-rtdb.firebaseio.com',
	projectId: 'hairposey-1e3f6',
	storageBucket: 'hairposey-1e3f6.appspot.com',
	messagingSenderId: '793265692561',
	appId: '1:793265692561:web:422f7f4a82d3437a398430',
	measurementId: 'G-K261TM9PEZ',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const appCheck = firebase.appCheck()
appCheck.activate('AIzaSyDVMKJCCIZVTmAGC1M2tPKZYK0bNWh67pQ', true)

const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()

async function createUserProfileDocument(userAuth, additionalData) {
	if (!userAuth) {
		return
	}
	const userRef = db.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}

	return userRef
}
export { db, storage, auth, createUserProfileDocument, firebase as default }
