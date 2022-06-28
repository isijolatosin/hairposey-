import React from 'react'
const NavHead = [
	{ name: 'Cambodian-Hair', id: '1' },
	{ name: 'Vietnamese-Hair', id: '1' },
	{ name: 'Brazilian-Hair', id: '1' },
]

const subLinks1 = [
	{
		id: '1',
		name: 'Bundles (cambodian)',
		route: '/bundles/cambodian-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal (cambodian)',
		route: '/closure-frontal/cambodian-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde (cambodian)',
		route: '/jet-black-&-blonde/cambodian-hair',
	},
]
const subLinks2 = [
	{
		id: '1',
		name: 'Bundles (vietnamese)',
		route: '/bundles/vietnamese-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal (vietnamese)',
		route: '/closure-frontal/vietnamese-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde (vietnamese)',
		route: '/jet-black-&-blonde/vietnamese-hair',
	},
]
const subLinks3 = [
	{
		id: '1',
		name: 'Bundles (brazilian)',
		route: '/bundles/brazilian-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal (brazilian)',
		route: '/closure-frontal/brazilian-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde (brazilian)',
		route: '/jet-black-&-blonde/brazilian-hair',
	},
]

function MobileLink() {
	return (
		<div className="tw-z-40 wrapper tw-h-[100vh] bg-blur md:tw-bg-[rgba(255,255,255,0.9)] md:tw-w-[450px] tw-w-[300px] tw-top-[486px] md:tw-top-[543px] md:tw-left-[225px] tw-left-[150px]">
			<ui className="mainMenu">
				{NavHead.map((item) => (
					<li className="item" id={item.name}>
						<a
							href={`#${item.name}`}
							className="_btn tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900">
							{item.name}
						</a>
						{item.name === 'Cambodian-Hair' ? (
							<div className="subMenu">
								{subLinks1.map((item) => (
									<a href={item.route}>{item.name}</a>
								))}
							</div>
						) : item.name === 'Vietnamese-Hair' ? (
							<div className="subMenu">
								{subLinks2.map((item) => (
									<a href={item.route}>{item.name}</a>
								))}
							</div>
						) : (
							<div className="subMenu">
								{subLinks3.map((item) => (
									<a href={item.route}>{item.name}</a>
								))}
							</div>
						)}
					</li>
				))}
			</ui>
		</div>
	)
}

export default MobileLink
