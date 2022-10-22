import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaTiktok } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { MdLocationPin, MdOutlineConstruction } from "react-icons/md";
import { SiTreyarch } from "react-icons/si";
import Products from "../Products";

const logo = require("../../assets/logo.png");

const ShopPage = ({ isShop, allProducts, sales, location, handBack }) => {
	const notReady = false;
	const [_image, setImage] = React.useState(null);
	const [isSingleImage, setIsSingleImage] = React.useState(false);

	return (
		<div>
			{isShop === "shop" && (
				<div>
					<div
						className={`tw-flex tw-flex-col tw-items-center lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto tw-mt-5`}>
						<div className="tw-text-neutral-700 tw-shadow-lg tw-rounded-full tw-text-lg md:tw-text-2xl tw-p-3 hover:md:tw-bg-neutral-900 hover:md:tw-text-white tw-ease-in tw-duration-300 tw-cursor-pointer tw-absolute tw-right-10 tw-top-[70px] md:tw-top-20 tw-z-10">
							<BiArrowBack onClick={handBack} />
						</div>
						{allProducts.length !== 0 ? (
							<Products
								sales={sales}
								allProducts={allProducts}
								setImage={setImage}
								setIsSingleImage={setIsSingleImage}
							/>
						) : (
							<div className="tw-rounded-full tw-mt-4 progress">
								<div className="inner tw-bg-slate-900"></div>
							</div>
						)}
					</div>
					{isSingleImage && (
						<div className="tw-relative">
							<div className="tw-fixed tw-top-[70px] tw-z-20 md:tw-bg-[rgba(255,255,255,0.9)] tw-h-[100vh] md:tw-h-[95vh] tw-w-[100vw] tw-flex tw-items-center tw-justify-center">
								<img
									src={_image?.[0].image}
									alt={_image?.[0]._id}
									className="tw-object-cover tw-h-[100%] md:tw-h-[90%] md:tw-rounded-3xl"
								/>
								<div
									onClick={() => {
										setImage(null);
										setIsSingleImage(false);
									}}
									className="tw-text-2xl tw-bg-neutral-200 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] md:tw-right-[150px] tw-right-[20px] tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white">
									<CgClose />
								</div>
							</div>
						</div>
					)}
					{notReady && (
						<div className="tw-z-40 tw-h-[2700px] md:tw-h-[1550px] lg:tw-h-[1650px] 2xl:tw-h-[1200px] tw-mt-[-70px] tw-w-[100%] bg-blur3 tw-fixed tw-top-0 tw-bottom-0 z-10 tw-items-center tw-flex tw-flex-col">
							<div className="tw-w-[300px] tw-ml-5 tw-mt-[100px]">
								<img src={logo} alt="company logo" />
							</div>
							<div className="tw-relative tw-text-neutral-50 tw-text-[40px] md:tw-text-[50px] tw-flex tw-flex-col tw-items-center">
								<span className="-tw-mb-8">UNDER</span>
								<span>CONSTRUCTION</span>
								<MdOutlineConstruction className="tw-mb-5" />
							</div>
							<span className="tw-font-light tw-ml-5 tw-text-center tw-text-white tw-tracking-[12px] md:tw-tracking-[20px] tw-text-[10px]">
								SITE ALMOST READY
							</span>
							<div className="load-wrapper tw-mt-10 tw-top-[17%] md:tw-top-[31%] lg:tw-top-[30%] xl:tw-top-[30%] 2xl:tw-top-[40%] tw-left-[50%]">
								<div className="circle"></div>
								<div className="circle"></div>
								<div className="circle"></div>
							</div>
							<a
								href={`${process.env.REACT_APP_GOOGLESEARCH + location}`}
								target="_blank"
								rel="noreferrer"
								className="tw-flex-col tw-text-neutral-400 tw-text-xs tw-mt-[100px] tw-font-light tw-flex tw-items-center tw-justify-center tw-mb-7 hover:tw-text-neutral-600 tw-ease tw-duration-300 ">
								<MdLocationPin
									size={35}
									className="tw-text-yellow-500 tw-mb-2"
								/>
								<span className="navStyleChild tw-pb-1">
									<span className="tw-text-green-500">Currently</span>, we are
									in {location}
								</span>
							</a>
							<div className="social-media-list tw-mt-[50px]">
								<a
									href="https://www.instagram.com/hairposey/"
									target="_blank"
									rel="noopener noreferrer">
									<AiOutlineInstagram size={20} />
								</a>
								<a
									href="https://www.tiktok.com/search?q=hairposey&t=1652981534762"
									target="_blank"
									rel="noopener noreferrer">
									<FaTiktok size={20} />
								</a>
							</div>
							<div className="tw-flex tw-text-xs tw-text-neutral-500 tw-font-light tw-mt-[50px] tw-mb-[30px]">
								<div className="tw-pr-1 tw-border-r-2 tw-border-r-neutral-800 md:tw-flex">
									<p className="">
										&copy; {new Date().getUTCFullYear()} <span>hairposey</span>
										<span> • All right reserved</span>
									</p>
								</div>
								<div className="md:tw-flex tw-ml-1">
									<p className="tw-flex tw-items-center">
										Designed by{" "}
										<span className="rose-gold tw-ml-1">
											<a
												href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
												target="_blank"
												rel="noopener noreferrer">
												<SiTreyarch size={15} />
											</a>
										</span>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ShopPage;
