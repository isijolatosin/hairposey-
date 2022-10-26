import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { RiDatabase2Fill, RiHomeFill } from "react-icons/ri";
import { SUPER_USER1, SUPER_USER2 } from "../../constant";
import { UserContext } from "../../context/user-context";
import CursorText from "../shared/CursorText";
import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { MdPrivacyTip } from "react-icons/md";

function ImageComponent({ setIsNav, isNav, setSelected }) {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [showText, setShowText] = React.useState(false);
	const [showOpt, setShowOpt] = React.useState(false);
	const [secureRoute, setSecureRoute] = React.useState(false);
	const logo = require("../../assets/logo.png");

	const handleShow = () => {
		!showText && setShowText(true);
	};
	const handleHide = () => {
		setShowText(false);
	};

	return (
		<div className="tw-relative tw-flex tw-flex-row tw-items-center -tw-ml-5">
			<div
				onClick={() => {
					setShowOpt(!showOpt);
					setSecureRoute(false);
				}}
				className="tw-text-lg tw-font-extrabold tw-w-[100px] hover:tw-cursor-pointer"
			>
				<img
					src={logo}
					loading="lazy"
					className="tw-w-full"
					alt="company-logo"
				/>
			</div>
			{(SUPER_USER1 === user?.email || SUPER_USER2 === user?.email) && (
				<div className="tw-relative tw-mr-5 -tw-ml-5">
					<div
						onMouseOver={handleShow}
						onMouseOut={handleHide}
						onClick={() => {
							setSecureRoute(!secureRoute);
							setShowOpt(false);
						}}
						className="tw-text-[25px] tw-text-neutral-50 tw-cursor-pointer hover:tw-text-slate-400 tw-ease-in tw-duration-300"
					>
						<MdPrivacyTip />
					</div>
					<CursorText showText={showText}>Admin</CursorText>
				</div>
			)}
			{secureRoute && (
				<div className="tw-top-[100px] tw-flex tw-flex-col tw-absolute tw-z-40 tw-left-[73px]">
					<Link
						to="/admin-portal"
						// className="tw-absolute -tw-right-5 tw-top-[20%]"
					>
						<div className="tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300 tw-rounded-t-md">
							<RiDatabase2Fill size={25} />
						</div>
					</Link>
					<Link
						to="/calendar"
						// className="tw-absolute -tw-right-5 tw-top-[20%]"
					>
						<div className="tw-border-b-[1px] tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300 tw-rounded-b-md">
							<BiCalendar size={25} />
						</div>
					</Link>
				</div>
			)}
			<div
				className={`tw-text-white tw-text-3xl tw-cursor-pointer hover:tw-text-slate-400 tw-ease-in tw-duration-300 ${
					!user && "tw-ml-[-15px]"
				}`}
			>
				{isNav ? (
					<CgClose onClick={() => setIsNav(false)} />
				) : (
					<CgMenuLeft onClick={() => {}} />
					// <CgMenuLeft onClick={() => setIsNav(true)} />
				)}
			</div>
			{showOpt && (
				<div
					className={`tw-top-[100px] tw-flex tw-flex-col tw-absolute tw-z-40 tw-left-[25px]`}
				>
					{window?.location?.pathname !== "/" && (
						<div
							onClick={() => {
								navigate("/");
								setSelected(false);
								setShowOpt(false);
							}}
							className="tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300 tw-rounded-t-md"
						>
							<RiHomeFill size={25} />
						</div>
					)}
					{user && (
						<div
							onClick={() =>
								navigate(`/user-account/${user?.email || user?.displayName}`)
							}
							className="tw-border-b-[1px] tw-p-2 tw-bg-slate-900 tw-text-pink-800 hover:tw-cursor-pointer hover:tw-bg-pink-800 hover:tw-text-slate-900 tw-ease-in tw-duration-300 tw-rounded-b-md"
						>
							<BsFillPersonFill size={25} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ImageComponent;
