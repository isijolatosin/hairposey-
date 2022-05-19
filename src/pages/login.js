import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../firebase'
import Layout from '../components/shared/Layout'
import { auth } from '../firebase'
import Button from '../components/shared/Button'
import { Helmet } from 'react-helmet'

const Login = () => {
	const navigate = useNavigate()
	const [isReset, setIsReset] = React.useState(false)
	const [authUser, setAuthUser] = useState({
		email: '',
		password: '',
		error: null,
	})
	const [showpswd, setShowpswd] = useState(false)

	const handleChangeAuthUser = (e) => {
		setAuthUser({ ...authUser, [e.target.name]: e.target.value })
	}

	const togglePassword = () => {
		setShowpswd(!showpswd)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await auth.signInWithEmailAndPassword(authUser.email, authUser.password)
			navigate('/')
		} catch (error) {
			console.log(error)
			setAuthUser({ ...authUser, error: error.message })
		}
	}

	const resetPassword = (email) => {
		firebase
			.auth()
			.sendPasswordResetEmail(authUser.email)
			.then(() => {
				try {
					setIsReset(true)
				} catch (error) {
					console.log(`error message - ${error.message}`)
				}
			})
	}

	return (
		<div>
			<Helmet>
				<title>Sign In</title>
			</Helmet>
			<Layout>
				<main className="">
					<section className="tw-flex tw-flex-col tw-items-center tw-mt-[150px] lg:tw-mt-[100px]">
						<div className="tw-text-center">
							<h1 className="tw-text-2xl tw-font-bold tw-mb-10">Sign In</h1>
							{/* <p className="tw-w-[55%] tw-mx-auto tw-my-10">
								Fill in your login credentials to gain access to your personal
								and cart history page.
							</p> */}
						</div>
						<article className="tw-w-full">
							<form onSubmit={handleSubmit}>
								<div>
									<input
										type="text"
										name="email"
										id="email"
										value={authUser.email}
										onChange={handleChangeAuthUser}
										placeholder="Email"
										className="tw-mt-1 tw-block lg:tw-w-[30%] tw-mx-auto tw-w-[70%] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-neutral-500 invalid:tw-text-neutral-600 focus:invalid:tw-border-neutral-500 focus:invalid:tw-ring-neutral-500 tw-outline-0 tw-mb-5"
									/>
								</div>
								<div className="tw-relative tw-h-[38.4px] lg:tw-w-[30%] tw-w-[70%] tw-mx-auto tw-shadow-xl">
									<input
										type={showpswd ? 'text' : 'password'}
										name="password"
										id="password"
										value={authUser.password}
										onChange={handleChangeAuthUser}
										placeholder="Password"
										className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm  tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-neutral-500 invalid:tw-text-neutral-600 focus:invalid:tw-border-neutral-500 focus:invalid:tw-ring-neutral-500 tw-outline-0 tw-mb-5"
									/>
									<div className="tw-text-neutral-500 tw-font-light tw-flex tw-flex-row tw-justify-center tw-items-center tw-absolute tw-top-0 tw-bg-neutral-900 tw-pr-2 tw-h-full tw-right-0 tw-w-[50px] tw-text-center tw-border tw-border-neutral-900">
										<input
											className="tw-border-gray-300 tw-ml-2 tw-rounded-full"
											type="checkbox"
											onClick={togglePassword}
										/>
									</div>
								</div>
								<div className="tw-text-red-800 tw-text-xs tw-mt-5 tw-text-center">
									{authUser.error ? <p>{authUser.error}</p> : null}
								</div>
								<div className="tw-flex tw-flex-row tw-my-10 tw-justify-center">
									<Button onClick={handleSubmit} type="submit">
										Sign In
									</Button>
								</div>
							</form>
						</article>
						<div className="tw-text-neutral-700 tw-items-center tw-text-sm tw-flex tw-flex-col tw-font-light ">
							<span>
								Forgot Password? |{' '}
								<button
									onClick={() => resetPassword(authUser.email)}
									className="tw-text-yellow-800 navStyleChild">
									Reset
								</button>
							</span>
							{isReset && (
								<div className=" tw-text-blue-800 tw-mt-5">
									<span>{`A password reset link has been sent to this email - ${authUser.email}`}</span>
								</div>
							)}
							<p className="tw-mt-5 tw-mb-10">
								Not a Member? |{' '}
								<Link to="/register">
									<button className="tw-text-yellow-800 navStyleChild">
										Create Account
									</button>
								</Link>
							</p>
						</div>
					</section>
				</main>
			</Layout>
		</div>
	)
}

export default Login
