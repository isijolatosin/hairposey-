import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CgMenuLeft, CgClose } from 'react-icons/cg'
import { RiDatabase2Fill } from 'react-icons/ri'
import { SUPER_USER1, SUPER_USER2 } from '../../constant'
import { UserContext } from '../../context/user-context'
import CursorText from '../shared/CursorText'

function ImageComponent({ setIsNav, isNav }) {
	const { user } = useContext(UserContext)
	const [showText, setShowText] = React.useState(false)
	const logo = require('../../assets/logo.png')

	const handleShow = () => {
		!showText && setShowText(true)
	}
	const handleHide = () => {
		setShowText(false)
	}
	return (
		<div className="tw-relative tw-flex tw-flex-row tw-items-center -tw-ml-5">
			<Link to="/">
				<div className="tw-text-lg tw-font-extrabold tw-w-[100px]">
					<img
						src={logo}
						loading="lazy"
						className="tw-w-full"
						alt="company-logo"
					/>
				</div>
			</Link>
			{(SUPER_USER1 === user?.email || SUPER_USER2 === user?.email) && (
				<Link
					to="/admin-portal"
					// className="tw-absolute -tw-right-5 tw-top-[20%]"
					onMouseOver={handleShow}
					onMouseOut={handleHide}>
					<div className="tw-w-30 tw-h-30 tw-p-2 tw-text-slate-900 tw-text-xl hover:tw-cursor-pointer tw-bg-pink-900 tw-rounded-full tw-ease-in tw-duration-300 tw-ml-[-20px] tw-mr-5">
						<RiDatabase2Fill />
					</div>
					<CursorText showText={showText}>Admin</CursorText>
				</Link>
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
		</div>
	)
}

export default ImageComponent
