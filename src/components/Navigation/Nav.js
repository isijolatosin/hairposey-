import React from 'react'
import ImageComponent from './ImageComponent'
import NavIcons from './NavIcons'
import MobileLink from './MobileLink'

function Nav() {
	const [isNav, setIsNav] = React.useState(false)
	return (
		<div>
			<div className="tw-flex tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-w-[100%] tw-grow tw-flex-row tw-items-center tw-justify-between tw-my-0 tw-mx-auto tw-h-[70px]">
				<div>
					<ImageComponent />
				</div>
				<div className="tw-flex-0.1">
					<NavIcons setIsNav={setIsNav} isNav={isNav} />
				</div>
			</div>
			{isNav && (
				<div className="">
					<MobileLink />
				</div>
			)}
		</div>
	)
}

export default Nav
