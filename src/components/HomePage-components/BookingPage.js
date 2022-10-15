import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Book from "../../components/Book";
import { scrollToTop } from "../../utils/scrollTop";
import { BiArrowBack } from "react-icons/bi";
import Heading from "../shared/Heading";
import { information, Policy, sizes } from "../../constant";
import { Link } from "react-router-dom";
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const logo = require("../../assets/logo.png");

const BookingPage = ({ isBooking, handBack }) => {
	const [toggleBookBtn, setToggleBookBtn] = React.useState(false);
	const [isAccept, setIsAccept] = React.useState(false);
	const [isDecline, setIsDecline] = React.useState(false);
	const [info, setInfo] = React.useState(true);

	if (isDecline) {
		setTimeout(() => {
			setIsDecline(false);
			handBack();
		}, 3000);
	}

	return (
		<div>
			{isBooking === "book" && (
				<div>
					<div className="tw-fixed tw-top-[70px] tw-left-0 tw-right-0 tw-z-20 tw-w-full tw-bg-white tw-h-fit tw-text-black tw-font-thin  tw-py-2 tw-text-xs">
						<Link
							to="/"
							className="tw-text-black tw-bg-white tw-shadow-lg tw-rounded-full tw-text-lg md:tw-text-2xl tw-p-3 hover:md:tw-bg-neutral-900 hover:md:tw-text-white tw-ease-in tw-duration-300 tw-cursor-pointer tw-absolute tw-right-5 md:tw-right-10 2xl:tw-right-16 tw-top-[40px] md:tw-top-[50px] tw-z-10">
							<BiArrowBack
								onClick={() => {
									handBack();
									setIsAccept(false);
									setToggleBookBtn(false);
								}}
							/>
						</Link>
						<div className="tw-flex tw-items-center tw-justify-start lg:tw-justify-center tw-ml-3 lg:tw-ml-0 tw-font-bold">
							<p>For your hair appointment, book now !</p>
							{toggleBookBtn ? (
								<button
									onClick={() => {
										if (isAccept) {
											setInfo(false);
											setToggleBookBtn(false);
										}
									}}
									className="tw-ml-2 tw-bg-black tw-text-white tw-rounded-full hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300">
									<MdOutlineKeyboardArrowUp size={20} />
								</button>
							) : (
								<button
									onClick={() => {
										if (isAccept) {
											setToggleBookBtn(true);
											scrollToTop();
											setInfo(false);
										}
									}}
									className="tw-ml-2 tw-bg-black tw-text-white tw-rounded-full hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300">
									<MdOutlineKeyboardArrowDown size={20} />
								</button>
							)}
						</div>
						<div className="tw-absolute tw-right-0 tw-top-[25%] tw-border-l-[1px] tw-border-pink-800 tw-pl-3">
							<div className="tw-flex tw-justify-evenly tw-items-center tw-text-pink-800">
								<a
									href="https://www.instagram.com/hairposey/"
									target="_blank"
									rel="noopener noreferrer">
									<AiOutlineInstagram
										size={18}
										className="hover:tw-text-pink-300 tw-mr-5 tw-ease-in tw-duration-300"
									/>
								</a>
								<a
									href="https://www.tiktok.com/search?q=hairposey&t=1652981834762"
									target="_blank"
									rel="noopener noreferrer">
									<FaTiktok
										size={15}
										className="hover:tw-text-pink-300 tw-mr-5 tw-ease-in tw-duration-300"
									/>
								</a>
							</div>
						</div>
					</div>
					<div
						className={`${
							toggleBookBtn ? "tw-opacity-1 tw-h-fit" : "tw-opacity-0 tw-h-0"
						} tw-ease-in tw-duration-300`}>
						<Wrapper>
							<Elements stripe={promise}>
								<Book logo={logo} />
							</Elements>
						</Wrapper>
					</div>
					<div className="tw-relative tw-bg-white tw-my-20 tw-w-[90%] tw-mx-auto tw-py-10 md:tw-p-10 tw-rounded-lg">
						<div
							className={`tw-bg-red-200 tw-px-5 tw-pt-10  md:tw-rounded-lg tw-ease-in tw-duration-300`}>
							<div className="tw-border-b-[1px] tw-border-red-300 tw-mb-5 tw-pb-2 tw-flex tw-items-center tw-justify-between">
								<Heading
									size={sizes.medium}
									children="Booking Policy"
									// isGreen={true}
									// isBlue={true}
									isGreyLight={true}
								/>
							</div>
							<div className="">
								{Policy.map((child) => (
									<p
										className="tw-text-[16px] tw-tracking-light tw-font-[500] tw-mb-2 "
										key={child.id}>
										<span className="tw-mr-5">&#x2022;</span> {child.policy}
									</p>
								))}
							</div>
							<div className="tw-font-light tw-text-sm tw-border-t-[1px] tw-border-red-300 tw-mt-5 tw-pt-5">
								<span
									onClick={() => {
										if (!isAccept) {
											setIsAccept(true);
											setIsDecline(false);
											setInfo(true);
										}
									}}
									className={`${
										isAccept
											? "tw-cursor-not-allowed tw-text-neutral-400 tw-font-thin"
											: "tw-cursor-pointer tw-text-blue-600 tw-font-[400]"
									} tw-border-r-[1px] tw-pr-3 tw-border-blue-600`}>
									Accept
								</span>
								<span
									onClick={() => {
										if (!isDecline) {
											setInfo(false);
											setIsDecline(true);
											setIsAccept(false);
											setToggleBookBtn(false);
										}
									}}
									className={`${
										isDecline
											? "tw-cursor-not-allowed tw-text-neutral-400 tw-font-thin"
											: "tw-cursor-pointer tw-text-blue-600 tw-font-[400]"
									}  tw-pl-3 tw-border-blue-600`}>
									Decline
								</span>
							</div>
							<div
								className={`tw-text-pink-900 tw-text-[11px] tw-italic tw-ease-in tw-duration-300  ${
									isDecline
										? "tw-opacity-1 tw-mt-3 tw-pb-3"
										: "tw-opacity-0 tw-mt-6"
								}`}>
								<span>Routing back to home page...</span>
							</div>
							<div
								className={`tw-text-pink-900 tw-text-[11px] tw-italic tw-ease-in tw-duration-300 tw-flex tw-items-center tw-flex-col md:tw-flex-row  ${
									isAccept && info
										? "tw-opacity-1 -tw-mt-7 tw-pb-3"
										: "tw-opacity-0 -tw-mt-4"
								}`}>
								<span>
									Continue your experience. Click the down button at the top or{" "}
								</span>
								<button
									onClick={() => {
										if (isAccept) {
											setToggleBookBtn(true);
											scrollToTop();
											setInfo(false);
											console.log("first");
										}
									}}
									className="tw-text-white tw-font-bold tw-ml-1 tw-mt-2 md:tw-mt-0 tw-bg-red-300 tw-px-2 tw-rounded-full">
									click...
								</button>
							</div>
						</div>
						<div className="tw-grid lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-2 lg:tw-gap-5 tw-border-t-[1px] tw-pt-5 tw-mt-5 tw-text-sm">
							{information.map((inform) => (
								<div
									key={inform.id}
									className="tw-shadow-lg tw-px-5 tw-pb-5 tw-rounded-md">
									<div className="tw-mt-8 tw-mb-2 tw-border-b-[1px]">
										<Heading isGreyLight={true} children={inform.title} />
									</div>
									<div
										className={`tw-grid ${
											inform.info.length > 5 && "md:tw-grid-cols-2 tw-gap-x-5"
										}`}>
										{inform.info.map((inf) => (
											<div key={inf.id}>
												<p className="tw-font-thin tw-text-neutral-600 tw-mb-1">
													<span className="tw-mr-5 tw-font-bold">&#x2022;</span>
													{inf.desc}
												</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const Wrapper = styled.section`
	form {
		width: 30vw;
		align-self: center;
		box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
			0px 2px 5px 0px rgba(50, 50, 93, 0.1),
			0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
		border-radius: 7px;
		padding-left: 10px;
		padding-right: 10px;
		/* padding-top: 30px; */
		padding-bottom: 30px;
	}

	input {
		border-radius: 6px;
		margin-bottom: 6px;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		font-size: 16px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	.result-message {
		line-height: 22px;
		font-size: 16px;
	}

	.result-message a {
		color: rgb(89, 111, 214);
		font-weight: 600;
		text-decoration: none;
	}

	.hidden {
		display: none;
	}

	#card-error {
		color: rgb(105, 115, 134);
		font-size: 16px;
		line-height: 20px;
		margin-top: 12px;
		text-align: center;
	}

	#card-element {
		border-radius: 4px 4px 0 0;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	#payment-request-button {
		margin-bottom: 32px;
	}

	button:hover {
		filter: contrast(115%);
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	/* spinner/processing state, errors */
	.spinner,
	.spinner:before,
	.spinner:after {
		border-radius: 50%;
	}

	.spinner {
		color: #ffffff;
		font-size: 22px;
		text-indent: -99999px;
		margin: 0px auto;
		position: relative;
		width: 20px;
		height: 20px;
		box-shadow: inset 0 0 0 2px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
	}

	.spinner:before,
	.spinner:after {
		position: absolute;
		content: "";
	}

	.spinner:before {
		width: 10.4px;
		height: 20.4px;
		background: undefined;
		border-radius: 20.4px 0 0 20.4px;
		top: -0.2px;
		left: -0.2px;
		-webkit-transform-origin: 10.4px 10.2px;
		transform-origin: 10.4px 10.2px;
		-webkit-animation: loading 2s infinite ease 1.5s;
		animation: loading 2s infinite ease 1.5s;
	}

	.spinner:after {
		width: 10.4px;
		height: 10.2px;
		background: undefined;
		border-radius: 0 10.2px 10.2px 0;
		top: -0.1px;
		left: 10.2px;
		-webkit-transform-origin: 0px 10.2px;
		transform-origin: 0px 10.2px;
		-webkit-animation: loading 2s infinite ease;
		animation: loading 2s infinite ease;
	}

	@keyframes loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@media only screen and (max-width: 600px) {
		form {
			width: 80vw;
		}
	}
`;

export default BookingPage;
