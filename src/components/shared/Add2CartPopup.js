import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { GrCheckmark } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'

const Add2CartPopup = ({ singleCart, setSingleCart }) => {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)

	function handleCheckout() {
		navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
		setTimeout(() => {
			setTimeout(function () {
				window.scrollTo(0, window.innerHeight)
			}, 500)
		}, 500)
	}

	return (
		<div>
			{singleCart && (
				<div className=" tw-shadow-2xl tw-absolute bg-blur2 tw-border tw-p-10 tw-w-[350px] tw-top-0 md:tw-top-[95px] tw-z-40 tw-right-0 md:tw-right-[40px]">
					<div className="tw-flex tw-items-center">
						<GrCheckmark />
						<span className="tw-text-xs tw-ml-2 tw-text-neutral-700">
							1 Item added to your cart
						</span>
					</div>
					<div className="tw-flex tw-flex-row tw-mb-10 tw-mt-7">
						<img
							id={singleCart._id}
							src={singleCart.image}
							alt={singleCart._id}
							className=" tw-w-[80px] tw-h-[120px] tw-mr-3 tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
						/>
						<div className="tw-flex tw-flex-col tw-text-sm">
							<span>{singleCart.name}</span>
							<span>Color - {singleCart.hairColor}</span>
							{singleCart.hairTexture && (
								<span>Texture - {singleCart.hairTexture}</span>
							)}
							{singleCart.width && <span>Width - {singleCart.width}</span>}
							<span>Length - {singleCart.hairLength}" inches</span>
							<span>Price - ${singleCart.price} USD</span>
						</div>
					</div>
					<div
						onClick={() =>
							navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
						}
						className="hover:tw-cursor-pointer hover:tw-bg-black hover:tw-text-white tw-ease-in tw-duration-300 tw-rounded-2xl tw-border tw-border-black tw-py-2 tw-bg-white tw-text-center tw-mb-3">
						<button>View cart ({itemCount})</button>
					</div>
					<div
						onClick={handleCheckout}
						className="hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300 tw-rounded-2xl tw-bg-black tw-text-white tw-py-2 tw-text-center">
						<button>Check out</button>
					</div>
					<div
						onClick={() => setSingleCart(null)}
						size={25}
						className="tw-text-center tw-mt-5 tw-text-xs hover:tw-text-slate-300 tw-border-b tw-pb-1 hover:tw-cursor-pointer tw-ease-in tw-duration-300">
						<span>Continue shopping</span>
					</div>
					<div className="tw-absolute tw-top-10 tw-right-5 hover:tw-cursor-pointer">
						<CgClose onClick={() => setSingleCart(null)} size={25} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Add2CartPopup
