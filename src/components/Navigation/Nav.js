import React from 'react'
import ImageComponent from './ImageComponent'
import NavIcons from './NavIcons'
import MobileLink from './MobileLink'
import { FaOpencart } from 'react-icons/fa'

function Nav() {
	const [isNav, setIsNav] = React.useState(false)
	return (
		<div>
			<div className="tw-flex tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-w-[100%] tw-grow tw-flex-row tw-items-center tw-justify-between tw-my-0 tw-mx-auto tw-h-[70px]">
				<div className="">
					<ImageComponent />
				</div>
				<div className="font_cursive md:tw-flex tw-text-pink-800 tw-hidden md:tw-text-2xl tw-tracking-widest">
					<span>A whole new you with Hairposey...</span>
					{window.location.pathname.includes('user-cart') && (
						<div className="tw-flex tw-flex-row tw-items-center tw-ml-5">
							<FaOpencart className="tw-text-2xl tw-text-pink-600" />
							<h2 className="tw-text-lg tw-ml-2 tw-text-pink-800">Your Cart</h2>
						</div>
					)}
				</div>
				<div className="">
					<NavIcons setIsNav={setIsNav} isNav={isNav} />
				</div>
			</div>
			{isNav && (
				<div>
					<MobileLink />
				</div>
			)}
		</div>
	)
}

export default Nav
