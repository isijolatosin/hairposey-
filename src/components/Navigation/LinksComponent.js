import React from 'react'
import { Link } from 'react-router-dom'

const links = [
	{
		id: '1',
		name: 'Hair Bundles',
		route: '/hair-bundles',
	},
	{
		id: '2',
		name: 'Closure Frontal',
		route: '/closure-frontal',
	},
	{
		id: '3',
		name: 'Jet Black & Blonde Hairs',
		route: '/jet-black-&-blonde-hair',
	},
]

function LinksComponent() {
	return (
		<div className="tw-flex tw-flex-row tw-w-full tw-justify-between tw-relative">
			{links.map((item) => (
				<div
					className="tw-px-3 tw-text-neutral-50 tw-uppercase tw-font-bold tw-text-[10px] hover:tw-text-zinc-400 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-text-center"
					key={item.id}>
					<Link to={item.route}>{item.name}</Link>
				</div>
			))}
		</div>
	)
}

export default LinksComponent
