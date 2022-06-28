import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CgMenuLeft, CgClose } from 'react-icons/cg'
import { RiDatabase2Fill, RiHomeFill } from 'react-icons/ri'
import { SUPER_USER1, SUPER_USER2 } from '../../constant'
import { UserContext } from '../../context/user-context'
import CursorText from '../shared/CursorText'
import { BsFillPersonFill } from 'react-icons/bs'

function ImageComponent({ setIsNav, isNav }) {
	const { user } = useContext(UserContext)
	const [showText, setShowText] = React.useState(false)
	const [showOpt, setShowOpt] = React.useState(false)
	const logo = require('../../assets/logo.png')

	const handleShow = () => {
		!showText && setShowText(true)
	}
	const handleHide = () => {
		setShowText(false)
	}
	return (
		<div className="tw-relative tw-flex tw-flex-row tw-items-center -tw-ml-5">
			<div
				onClick={() => setShowOpt(!showOpt)}
				className="tw-text-lg tw-font-extrabold tw-w-[100px] hover:tw-cursor-pointer">
				<img
					src={logo}
					loading="lazy"
					className="tw-w-full"
					alt="company-logo"
				/>
			</div>
			{(SUPER_USER1 === user?.email || SUPER_USER2 === user?.email) && (
				<div className="tw-relative">
					<Link
						to="/admin-portal"
						// className="tw-absolute -tw-right-5 tw-top-[20%]"
						onMouseOver={handleShow}
						onMouseOut={handleHide}>
						<div className="tw-w-30 tw-h-30 tw-p-2 tw-text-slate-900 tw-text-xl hover:tw-cursor-pointer tw-bg-pink-900 tw-rounded-full tw-ease-in tw-duration-300 tw-ml-[-20px] tw-mr-5">
							<RiDatabase2Fill />
						</div>
					</Link>
					<CursorText showText={showText}>Admin</CursorText>
				</div>
			)}
			<div
				className={`tw-text-white tw-text-3xl hover:tw-cursor-pointer hover:tw-text-slate-400 tw-ease-in tw-duration-300 ${
					!user && 'tw-ml-[-15px]'
				}`}>
				{isNav ? (
					<CgClose onClick={() => setIsNav(false)} />
				) : (
					<CgMenuLeft onClick={() => setIsNav(true)} />
				)}
			</div>
			{showOpt && (
				<div className="tw-flex tw-flex-col tw-absolute tw-left-[25px] tw-top-[65px]">
					<Link
						to="/"
						className="tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300">
						<RiHomeFill size={25} />
					</Link>
					<Link
						to={`/user-account/${user?.email || user?.displayName}`}
						className="tw-border-b-[1px] tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300">
						<BsFillPersonFill size={25} />
					</Link>
				</div>
			)}
		</div>
	)
}

export default ImageComponent
