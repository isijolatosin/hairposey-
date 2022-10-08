import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { GoAlert } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCartItem,
	selectCartItems,
	selectTotal,
} from "../slices/appSlices";
import { db } from "../firebase";
import Layout from "../components/shared/Layout";
import { UserContext } from "../context/user-context";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Heading from "../components/Heading";
import OrderSum from "../components/shared/OrderSum";
import { REACT_APP_AUTHORIZED_ID_ONE } from "../constant";

const logo = require("../assets/logo.png");

const Success = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const totalPriceFromCart = useSelector(selectTotal);
	const [sales, setSales] = React.useState(false);
	const userAddss = localStorage.getItem("address");
	const referral = localStorage.getItem("referral");
	const username = localStorage.getItem("username");
	const [showSum, setShowSum] = React.useState(false);
	const userphone =
		localStorage.getItem("phone").length === 10
			? `(${localStorage.getItem("phone").slice(0, 3)}) ${localStorage
					.getItem("phone")
					.slice(3, 6)}-${localStorage
					.getItem("phone")
					.slice(6, localStorage.getItem("phone").length)}`
			: localStorage.getItem("phone");
	const shippingCost = JSON.parse(localStorage.getItem("shippingCost"));
	const finalPriceToPay = Number(localStorage.getItem("finalPriceToPay"));
	const finalPriceToPayObject = JSON.parse(
		localStorage.getItem("finalPriceToPayObject")
	);
	const finalTax = finalPriceToPayObject?.taxInDollar;
	const finalShipCost = finalPriceToPayObject?.shipCostInDollar;
	const PriceInDollar = finalPriceToPayObject?.priceInDollar;
	const discountPrice = Number(localStorage.getItem("discountPrice"));

	const addressFromPP = JSON.parse(localStorage.getItem("addressFromPaypal"));

	const addressFromPaypal =
		addressFromPP &&
		`${addressFromPP.address_line_1}, ${addressFromPP.admin_area_2}, ${addressFromPP.admin_area_1}. ${addressFromPP.country_code}. Postal_code: ${addressFromPP.postal_code}`;
	const userAddress = addressFromPaypal ? addressFromPaypal : userAddss;

	const payload = localStorage.getItem("payload");
	const shipMethod = localStorage.getItem("ship");
	const paymentName = localStorage.getItem("paymentName");
	const payMethod = localStorage.getItem("payMethod");
	const orderNo = localStorage.getItem("order no");
	const userEmail = user?.email || localStorage.getItem("altEmail");
	const [showInfo, setShowInfo] = React.useState(false);
	const discountedAmount = Number(
		(totalPriceFromCart - discountPrice).toFixed(2)
	);

	React.useEffect(() => {
		setSales(fetchSalesPercentage());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let nameArray = [];
	let quantity = 0;
	let id = [];

	// eslint-disable-next-line array-callback-return
	cartItems.map((item) => {
		nameArray.push(
			`${item.quantity} ${item.name} - ${item.hairLength}inches ..... $${item.price}`
		);
		quantity += item.quantity;
		id.push(`${item.id}-${item.name}`);
	});

	const myCurrentDate = new Date();
	const timestampA = myCurrentDate.setDate(myCurrentDate.getDate() + 14);
	const timestampB = myCurrentDate.setDate(myCurrentDate.getDate() + 7);
	var futureDate1 = new Date(timestampA).toDateString();
	var futureDate2 = new Date(timestampB).toDateString();

	React.useEffect(() => {
		// Send a purchase mail to client
		const messageParams = {
			name: (user && user?.displayName) || userEmail,
			id: id.join(", "),
			orderNo: orderNo,
			date: new Date().toDateString(),
			product: nameArray.join(", "),
			price: PriceInDollar,
			quantity: quantity,
			discount: (discountPrice && discountedAmount) || "00.00",
			subtotal: PriceInDollar,
			shipping: shipMethod === "ship" ? finalShipCost : "0",
			shipMethod: shipMethod,
			tax: finalTax,
			total: finalPriceToPay,
			address: userAddress,
			client: userEmail,
			payMethod: payMethod,
			estShipTime: `${futureDate1} - ${futureDate2}`,
		};

		const SendClientSuccessfulPurchaseEmail = () => {
			emailjs
				.send(
					"service_czeioxp",
					"template_doi2qb7",
					messageParams,
					"user_VORMh20QoM0GcnDrVoVnj"
				)
				.then((res) => {})
				.catch((err) => console.log(err));
		};

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail();
		}, 1000);

		userEmail &&
			cartItems.length !== 0 &&
			payload &&
			// eslint-disable-next-line array-callback-return
			cartItems.map((item) => {
				// shopping path
				db.collection("purchased")
					.doc(`${userEmail}/`)
					.collection("shoppings")
					.add({
						id: item.id + orderNo,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item?.price || finalPriceToPay,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
						color: item?.hairColor ? item?.hairColor : "",
						length: item?.hairLength,
						orderNo: orderNo,
						timestamp: new Date().valueOf(),
						image: item?.image ? item?.image : "",
						shipMethod: shipMethod,
						cardHolder: paymentName,
						referral: referral ? referral : "",
					})
					.then(() => {
						console.log(`SUCCESSFULL`);
					})
					.catch((error) => console.log("Error " + error.message));

				// admin path
				db.collection("admin")
					.doc(`${REACT_APP_AUTHORIZED_ID_ONE}/`)
					.collection("all-purchased")
					.add({
						id: item.id + orderNo,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item?.price || finalPriceToPay,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
						color: item?.hairColor ? item?.hairColor : "",
						length: item?.hairLength,
						orderNo: orderNo,
						timestamp: new Date().valueOf(),
						image: item?.image ? item?.image : "",
						shipMethod: shipMethod,
						cardHolder: paymentName,
						referral: referral ? referral : "",
					})
					.then(() => {
						console.log(`SUCCESSFULL`);
					})
					.catch((error) => console.log("Error " + error.message));
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleBackToShopping = () => {
		dispatch(clearCartItem());
		localStorage.removeItem("payload");
		localStorage.removeItem("address");
		localStorage.removeItem("altEmail");
		localStorage.removeItem("discountPrice");
		localStorage.removeItem("ship");
		localStorage.removeItem("shippingCost");
		localStorage.removeItem("paymentName");
		localStorage.removeItem("addressFromPaypal");
		localStorage.removeItem("finalPriceToPay");
		localStorage.removeItem("finalPriceToPayObject");
		localStorage.removeItem("username");
		localStorage.removeItem("order no");
		localStorage.removeItem("payMethod");
		localStorage.removeItem("country");
		localStorage.removeItem("referral");
		localStorage.removeItem("phone");
		navigate("/");
	};
	const customerName = username
		? `Thank you ${username}`
		: user
		? `Thank you ${user?.displayName}`
		: "Thank you!";

	return (
		<>
			<Helmet>
				<title>Success</title>
			</Helmet>
			<Layout>
				{payload ? (
					<div
						className={
							sales
								? "tw-pt-[230px] md:tw-pt-[100px] tw-flex tw-flex-col tw-items-left tw-text-neutral-600 tw-font-thin tw-bg-neutral-900"
								: "tw-pt-[60px] md:tw-pt-[70px] tw-flex tw-flex-col tw-items-left tw-text-neutral-600 tw-font-thin tw-bg-neutral-900"
						}>
						<div className="tw-w-full tw-flex tw-justify-center tw-mx-auto">
							<img src={logo} alt="" className="tw-w-[100px]" />
						</div>
						<div className="tw-border-t-[1px] tw-border-b-[1px] tw-border-neutral-800 tw-w-full tw-mt-0 md:tw-mt-5">
							<OrderSum
								showSum={showSum}
								sales={sales}
								setShowSum={setShowSum}
								isBorder={false}
								cartItems={cartItems}
								discountPrice={discountPrice}
								total={totalPriceFromCart}
								finalPriceToPayObject={finalPriceToPayObject}
								setShowInfo={setShowInfo}
								showInfo={showInfo}
								isSuccess={true}
							/>
						</div>
						<div className={`tw-px-5 tw-pt-5 tw-bg-neutral-200`}>
							<div className="tw-w-full lg:tw-w-[60%] xl:tw-w-[50%] tw-mx-auto">
								<div className="tw-text-md 0 tw-mb-1 tw-flex tw-items-center">
									<AiOutlineCheckCircle className="tw-mr-1" color="green" />{" "}
									<Heading children={customerName} size3={true} />
								</div>
								<p className="tw-text-xs">{`Order: ${orderNo}`}</p>
								<div className="tw-mt-5 tw-font-light tw-text-xs tw-border-[1px] tw-border-neutral-300 tw-rounded-[6px] tw-p-3">
									<Heading
										children="Your order is confirmed"
										size2={true}
										isBold2={true}
									/>
									<p>You'll receive an email when your order is ready.</p>
								</div>
								<div className="tw-mt-3 tw-font-light tw-text-xs tw-border-[1px] tw-border-neutral-300 tw-rounded-[6px] tw-p-3">
									<div className="tw-mb-5">
										<Heading
											children="Customer information"
											size2={true}
											isBold2={true}
										/>
									</div>
									<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
										<div className="tw-mb-5">
											<Heading
												children="Contact information"
												size1={true}
												isBold2={true}
											/>
											<p className="tw-text-[10px]">
												{user?.email || userEmail}
											</p>
										</div>
										<div className="tw-mb-5">
											<Heading
												children="Payment method"
												size1={true}
												isBold2={true}
											/>
											<p className="tw-text-[10px]">
												{payMethod} - ${finalPriceToPay}
											</p>
										</div>
										<div className="tw-mb-5">
											<Heading
												children="Shipping address"
												size1={true}
												isBold2={true}
											/>
											<p className="tw-text-[10px]">{username}</p>
											<p className="tw-text-[10px] tw-w-[35%]">{userAddss}</p>
											<p className="tw-text-[10px] tw-w-[35%]">
												{shippingCost["country"] === "usa" ||
												shippingCost["country"] === "canada"
													? `+1 ${userphone}`
													: userphone}
											</p>
										</div>
										<div className="tw-mb-5">
											<Heading
												children="Billing address"
												size1={true}
												isBold2={true}
											/>
											<p className="tw-text-[10px]">{username}</p>
											<p className="tw-text-[10px] tw-w-[35%]">{userAddss}</p>
											<p className="tw-text-[10px] tw-w-[35%]">
												{shippingCost["country"] === "usa" ||
												shippingCost["country"] === "canada"
													? `+1 ${userphone}`
													: userphone}
											</p>
										</div>
										<div className="tw-mb-5">
											<Heading
												children="Shipping method"
												size1={true}
												isBold2={true}
											/>
											<p className="tw-text-[10px]">
												{shipMethod === "ship"
													? "Standard Shipping"
													: "Pick up"}
											</p>
										</div>
									</div>
								</div>
								<div className="tw-my-10 tw-w-[100%] tw-bg-neutral-900 tw-text-center tw-text-xs tw-text-white tw-py-4 tw-cursor-pointer tw-rounded-[6px] md:hover:tw-bg-neutral-300 md:hover:tw-text-neutral-900 tw-ease-in tw-duration-300">
									<span onClick={handleBackToShopping}>Continue shopping</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="tw-text-red-700 tw-flex tw-flex-col tw-items-center tw-justify-center tw-my-10 tw-uppercase tw-font-bold tw-mt-[250px] tw-mb-20">
						<GoAlert className="tw-mr-5 tw-text-3xl tw-mb-5" />
						<p className="tw-text-red-700">You do not have any transactions</p>
					</div>
				)}
			</Layout>
		</>
	);
};

export default Success;
