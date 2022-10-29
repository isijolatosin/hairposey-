import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import { db } from "../firebase";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";
import BookingPage from "../components/HomePage-components/BookingPage";
import ShopPage from "../components/HomePage-components/ShopPage";
import Button from "../components/shared/Button";
import {
	REACT_APP_BOOK,
	REACT_APP_ISBOOKING,
	REACT_APP_ISSHOPPING,
	REACT_APP_SHOP,
	sizes,
} from "../constant";
import { Link, useNavigate } from "react-router-dom";

const logo = require("../assets/logo.png");

function HomePage() {
	const navigate = useNavigate();
	const [allProducts, setAllproducts] = React.useState([]);
	const [sales, setSales] = React.useState(null);
	const [selected, setSelected] = React.useState(false);
	const [location, setLocation] = React.useState("");

	async function fetchProducts() {
		try {
			const {
				data: {
					products,
					//  curUser
				},
			} = await axios.get("/api/v1/products");

			setTimeout(() => {
				setAllproducts(products.sort((a, b) => a.name.localeCompare(b.name)));
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		setSales(fetchSalesPercentage());

		db.collection("location").onSnapshot((snapshot) => {
			const results = snapshot.docs.map((doc) => ({
				data: doc.data(),
			}));
			setLocation(results[0].data.location);
		});

		fetchProducts();
		if (window.location.pathname.split("/")[2] === REACT_APP_ISBOOKING) {
			setSelected("book");
		}
		// change the logic when shop is ready
		if (window.location.pathname.split("/")[2] === REACT_APP_ISSHOPPING) return;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePath = (id) => {
		// change the logic when shop is ready
		if (id === "shop") {
			return;
		} else {
			setSelected(id);
		}
	};

	const handBack = () => {
		setSelected(false);
		navigate("/");
	};

	return (
		<div className="tw-bg-neutral-200 tw-relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout sales={sales} setSelected={setSelected}>
				<div
					className={`tw-relative ${
						allProducts.length === 0 ? "tw-mt-[70px]" : "tw-pt-[60px]"
					} `}
				>
					{!selected && (
						<div
							className={`tw-relative tw-h-[700px] lg:tw-h-[900px] home tw-flex tw-flex-col tw-items-center tw-pt-[55%] md:tw-pt-[35%] lg:tw-pt-[22%] 2xl:tw-pt-[18%]`}
						>
							<div className="tw-absolute tw-mt-10 tw-shadow-md tw-w-full tw-flex tw-justify-center">
								<img src={logo} alt="" />
							</div>
							<span className="tw-hidden md:tw-inline-block md:tw-text-[80px] lg:tw-text-[100px] xl:tw-text-[150px] 2xl:tw-text-[170px] tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-slate-900 tw-to-pink-900 tw-opacity-[1] font_cursive tw-absolute md:tw-top-40 lg:tw-top-[90px] 2xl:tw-top-20">
								Welcome to Hairposey
							</span>
							<span className="md:tw-hidden tw-w-full tw-text-center tw-text-4xl tw-inline-block tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-slate-900 tw-to-pink-900 tw-opacity-[1] font_cursive tw-absolute tw-top-[20%]">
								Welcome to Hairposey
							</span>
							<div className="tw-flex tw-flex-row tw-z-20">
								<Link to={`${REACT_APP_SHOP}`} className="tw-mx-5">
									<Button
										handleFunc={() => handlePath("shop")}
										type="button"
										children="Shop"
										size={sizes.medium}
										isgradBG={false}
										isBorder={true}
									/>
								</Link>
								<Link to={`${REACT_APP_BOOK}`} className="tw-mx-5">
									<Button
										handleFunc={() => handlePath("book")}
										type="button"
										children="Booking"
										size={sizes.medium}
										isgradBG={false}
										isBorder={true}
									/>
								</Link>
							</div>
						</div>
					)}
					<BookingPage isBooking={selected} handBack={handBack} />
					<ShopPage
						allProducts={allProducts}
						isShop={selected}
						sales={sales}
						location={location}
						handBack={handBack}
					/>
				</div>
			</Layout>
		</div>
	);
}

export default HomePage;
