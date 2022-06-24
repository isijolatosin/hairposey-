import React from 'react'
import { Link } from 'react-router-dom'

const subLinks = [
	{
		id: '1',
		name: 'Bundles (Indian)',
		route: '/indian-bundles',
	},
	{
		id: '2',
		name: 'Closure / Frontal (Indian)',
		route: '/indian-closure-frontal',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde (Indian)',
		route: '/indian-jet-black-&-blonde',
	},
]

function LinksComponent() {
	const [list1, setList1] = React.useState(false)
	const [list2, setList2] = React.useState(false)
	const [list3, setList3] = React.useState(false)

	const handleMousein1 = () => {
		setList1(true)
		setList2(false)
		setList3(false)
	}
	const handleMousein2 = () => {
		setList2(true)
		setList1(false)
		setList3(false)
	}
	const handleMousein3 = () => {
		setList3(true)
		setList1(false)
		setList2(false)
	}
	return (
		<div className="tw-grid tw-grid-cols-3 tw-w-full">
			<div
				onMouseOver={handleMousein1}
				onMouseLeave={() => setList1(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-white hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4 tw-text-center">
					Indian - hair
				</p>

				{list1 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-left-[-12px] md:tw-left-[-11px] tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{subLinks.map((item) => (
							<Link
								to={item.route}
								className="md:tw-text-center tw-px-3 tw-rounded-lg md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-400 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>
			<div
				onMouseOver={handleMousein2}
				onMouseLeave={() => setList2(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-white  tw-text-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4">
					Vietnamese - hair
				</p>

				{list2 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-left-[-35px] md:tw-left-[-9px] tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-text-center md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-center md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-center md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
					</div>
				)}
			</div>
			<div
				onMouseOver={handleMousein3}
				onMouseLeave={() => setList3(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-white tw-text-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Brazillian - hair
				</p>

				{list3 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-right-[-10px] md:tw-left-[-10px] tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-text-right md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-right md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-right md:tw-text-center tw-px-3 tw-rounded-lg tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						{/* {subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-lg tw-pl-5 tw-w-[250px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
								key={item.id}>
								{item.name}
							</Link>
						))} */}
					</div>
				)}
			</div>
		</div>
	)
}

export default LinksComponent
