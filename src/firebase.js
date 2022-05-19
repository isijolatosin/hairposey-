import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/app-check'

const firebaseConfig = {
	apiKey: 'AIzaSyCLLAOzIV1VDBcE_vyFx0ivy3MjDCJMYyc',
	authDomain: 'modelest-ead46.firebaseapp.com',
	projectId: 'modelest-ead46',
	storageBucket: 'modelest-ead46.appspot.com',
	messagingSenderId: '305781315708',
	appId: '1:305781315708:web:fdc351ee737e1300d051f9',
	measurementId: 'G-M6VVE1FV97',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const appCheck = firebase.appCheck()
appCheck.activate('AIzaSyCLLAOzIV1VDBcE_vyFx0ivy3MjDCJMYyc', true)

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
