import React from 'react'
import ImageComponent from './ImageComponent'
import LinksComponent from './LinksComponent'
import NavIcons from './NavIcons'

function Nav() {
	return (
		<div>
			<div className="tw-flex bg-blur3 tw-w-[100%] tw-grow tw-flex-row tw-items-center tw-justify-between tw-my-0 tw-mx-auto tw-h-[70px]">
				<div>
					<ImageComponent />
				</div>
				<div className="tw-hidden md:tw-inline tw-flex-0.8">
					<LinksComponent />
				</div>
				<div className="tw-flex-0.1">
					<NavIcons />
				</div>
			</div>
			<div className="tw-in-line tw-px-3 md:tw-hidden tw-flex-0.8 tw-border-t-[1px] tw-border-neutral-300 tw-bg-neutral-300 tw-py-2">
				<LinksComponent />
			</div>
		</div>
	)
}

export default Nav
