import React from 'react'
import { useNavigate } from 'react-router-dom'
const NavHead = [
	{ name: 'cambodian-Hair', id: '1' },
	{ name: 'vietnamese-Hair', id: '1' },
	{ name: 'brazilian-Hair', id: '1' },
]

const subLinks1 = [
	{
		id: '1',
		name: 'Bundles',
		type: 'bundles',
		brand: 'cambodian-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		type: 'closure-frontal',
		brand: 'cambodian-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		type: 'jet-black-&-blonde',
		brand: 'cambodian-hair',
	},
]
const subLinks2 = [
	{
		id: '1',
		name: 'Bundles',
		type: 'bundles',
		brand: 'vietnamese-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		type: 'closure-frontal',
		brand: 'vietnamese-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		type: 'jet-black-&-blonde',
		brand: 'vietnamese-hair',
	},
]
const subLinks3 = [
	{
		id: '1',
		name: 'Bundles',
		type: 'bundles',
		brand: 'brazilian-hair',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		type: 'closure-frontal',
		brand: 'brazilian-hair',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		type: 'jet-black-&-blonde',
		brand: 'brazilian-hair',
	},
]

function MobileLink() {
	const navigate = useNavigate()

	return (
		<div
			className={`${
				window.location.pathname !== '/' ? 'tw-top-[105px] ' : 'tw-top-[140px] '
			} tw-z-40 wrapper tw-h-[100%] md:tw-w-[450px] tw-w-[300px] md:tw-left-[225px] tw-left-[150px]`}>
			<ul className="mainMenu">
				{NavHead.map((item, idx) => (
					<li key={idx} className="item" id={item.name}>
						<a
							href={`#${item.name}`}
							className="_btn tw-bg-gradient-to-r tw-from-pink-800 tw-to-slate-900">
							{item.name}
						</a>
						{item.name === 'Cambodian-Hair' ? (
							<div className="subMenu">
								{subLinks1.map((item, idx) => (
									<span
										onClick={() => navigate(`/${item.type}/${item.brand}`)}
										key={idx}>
										{item.name}
									</span>
								))}
							</div>
						) : item.name === 'Vietnamese-Hair' ? (
							<div className="subMenu">
								{subLinks2.map((item, idx) => (
									<span
										onClick={() => navigate(`/${item.type}/${item.brand}`)}
										key={idx}>
										{item.name}
									</span>
								))}
							</div>
						) : (
							<div className="subMenu">
								{subLinks3.map((item, idx) => (
									<span
										onClick={() => navigate(`/${item.type}/${item.brand}`)}
										key={idx}>
										{item.name}
									</span>
								))}
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default MobileLink
