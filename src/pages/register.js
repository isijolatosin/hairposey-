import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import { auth, createUserProfileDocument } from '../firebase'
import Button from '../components/shared/Button'

const Register = () => {
	const navigate = useNavigate()
	const [authUser, setAuthUser] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		error: null,
	})

	// const validate = (values) => {
	// 	const errors = {}
	// 	if (!values.email) {
	// 		errors.email = 'Required'
	// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
	// 		errors.email = 'Invalid email Address'
	// 	}
	// 	if (!values.name) {
	// 		errors.name = 'Required'
	// 	}
	// 	if (!values.password) {
	// 		errors.password = 'Required'
	// 	}
	// 	return errors
	// }

	const handleChangeAuthUser = (e) => {
		setAuthUser({ ...authUser, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				authUser.email,
				authUser.password
			)
			await createUserProfileDocument(user, {
				displayName: authUser.name,
				Phone: authUser.phone,
			})
			navigate('/')
		} catch (error) {
			console.log(error)
			setAuthUser({ ...authUser, error: error.message })
		}
	}

	return (
		<div>
			<Helmet>
				<title>Sign Up</title>
			</Helmet>
			<Layout>
				<section className="tw-flex tw-flex-col tw-items-center tw-mt-[150px] lg:tw-mt-[100px]">
					<div className="tw-text-center">
						<h1 className="tw-text-2xl tw-font-bold">Sign Up</h1>
						<p className="tw-w-[55%] tw-mx-auto tw-my-10">
							By creating account with us, you consent to receiving newsletters
							or promotions from{' '}
							<Link to="/">
								<span className="tw-text-rose-800">modelEst.</span>
							</Link>
						</p>
					</div>
					<article className="tw-w-full">
						<form onSubmit={handleSubmit}>
							<div>
								<input
									type="text"
									name="name"
									id="name"
									value={authUser.name}
									onChange={handleChangeAuthUser}
									placeholder="Full Name"
									className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
								/>
							</div>
							<div>
								<input
									type="text"
									name="email"
									id="email"
									value={authUser.email}
									onChange={handleChangeAuthUser}
									placeholder="Email"
									className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
								/>
							</div>
							<div>
								<input
									type="password"
									name="password"
									id="password"
									value={authUser.password}
									onChange={handleChangeAuthUser}
									placeholder="Password"
									className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
								/>
							</div>
							<div>
								<input
									type="number"
									name="phone"
									id="number"
									value={authUser.phone}
									onChange={handleChangeAuthUser}
									placeholder="Phone-Number (optional)"
									className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
								/>
							</div>
							<div className="tw-text-center tw-text-xs tw-text-red-800">
								{authUser.error ? <p>Error message: {authUser.error}</p> : null}
							</div>
							<div className="tw-flex tw-flex-row tw-my-10 tw-justify-center">
								<Button onClick={handleSubmit} type="submit">
									Create Account
								</Button>
							</div>
						</form>
					</article>
					<div>
						<p className="tw-text-neutral-500 tw-font-light">
							Already have an account with us?{' '}
							<Link to="/login">
								<button className="tw-text-pink-800 tw-mb-10">Login</button>
							</Link>{' '}
						</p>
					</div>
					<div>
						<p className="tw-font-light tw-mb-10 tw-w-[70%] tw-mx-auto tw-text-center">
							This site is protected by Google{' '}
							<a
								href="https://policies.google.com/privacy"
								rel="noopener noreferrer">
								<span className="tw-text-pink-800 tw-mb-10 tw-text-sm tw-underline">
									Privacy Policy
								</span>
							</a>{' '}
							and{' '}
							<a
								href="https://policies.google.com/terms"
								rel="noopener noreferrer">
								<span className="tw-text-pink-800 tw-mb-10 tw-text-sm tw-underline">
									Terms of Service
								</span>
							</a>{' '}
							apply
						</p>
					</div>
				</section>
			</Layout>
		</div>
	)
}

export default Register
