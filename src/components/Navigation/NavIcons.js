import React, { useContext } from 'react'
import { BsHandbagFill, BsHandbag } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { FiLogIn } from 'react-icons/fi'
import { MdAssignmentInd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'
import { useSelector } from 'react-redux'

function NavIcons() {
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)
	const navigate = useNavigate()
	const handleSignOut = () => {
		auth.signOut()
		navigate('/')
	}

	return (
		<div className=" tw-flex tw-flex-row tw-w-46 tw-mr-5 tw-justify-center tw-items-center">
			<div
				onClick={() =>
					navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
				}
				className={`${
					itemCount > 0 ? 'tw-mt-5 tw-mr-5' : 'tw-mt-0'
				} tw-w-30 tw-h-30 tw-text-neutral-50 tw-text-xl tw-mb-3 hover:tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-text-neutral-800 hover:tw-p-2 hover:tw-rounded-full hover:tw--mb-[2px] tw-ease-in tw-duration-300 tw-relative`}>
				{itemCount > 0 ? <BsHandbagFill size={25} /> : <BsHandbag size={25} />}
				{itemCount > 0 && (
					<span className="tw-absolute tw--top-[20px] tw-right-[-20px] tw-border-[2px] tw-border-neutral-50 tw-font-bold tw-text-sm bg-blur3 tw-bg-clip-text tw-text-white tw-rounded-full tw-p-4 tw-h-2 tw-w-2 tw-flex tw-mx-auto tw-justify-center tw-items-center">
						{itemCount}
					</span>
				)}
			</div>
			{user && (
				<div className="tw-flex  tw-ml-[20px] tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer  tw-relative">
					<div className="tw-text-neutral-50 tw-text-xl tw-ease-in tw-duration-500">
						<FiLogOut onClick={handleSignOut} />
					</div>
					<span className="tw-text-[7px] tw-text-white tw-uppercase">
						sign out
					</span>
				</div>
			)}
			{!user && (
				<div className="tw-w-[80px] tw-ml-[25px] tw-flex tw-flex-row tw-justify-between tw-items-center">
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer tw-relative">
						<div className="tw-text-neutral-50 tw-text-xl tw-ease-in tw-duration-500">
							<FiLogIn onClick={() => navigate('/login')} />
						</div>
						<span className="tw-text-[7px] tw-text-white tw-uppercase">
							sign in
						</span>
					</div>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer tw-relative">
						<div className="tw-text-neutral-50 tw-text-xl tw-ease-in tw-duration-500">
							<MdAssignmentInd onClick={() => navigate('/register')} />
						</div>
						<span className="tw-text-[7px] tw-text-white tw-uppercase">
							sign up
						</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavIcons
