import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { getDatabase, ref, set } from "firebase/database";
import Heading from "../components/Heading";
import Inventory from "../components/Inventory";
import Layout from "../components/shared/Layout";
import Shippment from "../components/Shippment";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import AllInventories from "../components/AllInventories";
import { UserContext } from "../context/user-context";
import { db } from "../firebase";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";
import { REACT_APP_AUTHORIZED_ID_ONE } from "../constant";
import CustomPolicyServices from "../components/shared/CustomPolicyServices";

const Management = React.memo(() => {
	const database = getDatabase();
	const [sales, setSales] = React.useState(null);
	const [section, setSection] = React.useState("all-inventory");
	const [percentSale, setPercentSale] = React.useState(null);
	const { user } = useContext(UserContext);
	const [location, setLocation] = React.useState("");
	const [retrieveLocation, setRetrieveLocation] = React.useState("");
	const [policyService, setPolicyService] = React.useState({});
	const addOns = policyService["add on services"];
	const services = policyService["services"];
	const policy = policyService["policy"];
	const category = policyService["category"];

	React.useEffect(() => {
		let mounted = true;
		if (mounted) {
			setSales(fetchSalesPercentage());
			// admin path
			db.collection("admin").onSnapshot((snapshot) => {
				setPolicyService(snapshot.docs.map((doc) => doc.data())[0]);
			});
			db.collection("location").onSnapshot((snapshot) => {
				setRetrieveLocation(snapshot.docs.map((doc) => doc.data())[0].location);
			});
		}

		return () => (mounted = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const toggleSection = (e) => {
		setSection(e.target.id);
	};

	const SectionComp = () => {
		if (section === "all-inventory") {
			return <AllInventories />;
		}
		if (section === "inventory") {
			return <Inventory />;
		}
		if (section === "shipping") {
			return <Shippment />;
		}
	};
	const handleSubmit = () => {
		if (percentSale !== null || percentSale !== "") {
			set(ref(database, "sales"), {
				no: percentSale,
			});
		}
		setPercentSale("");
	};

	const handleLocation = (e) => {
		e.preventDefault();
		setLocation(e.target.value);
	};
	const handleSubmitLoc = (e) => {
		e.preventDefault();
		db.collection("location")
			.doc(`${REACT_APP_AUTHORIZED_ID_ONE}/`)
			.set({ location: location }, { merge: true });
		setLocation("");
	};

	return (
		<>
			<Helmet>
				<title>Admin Portal</title>
			</Helmet>
			<Layout sales={sales}>
				<div
					className={`${
						sales
							? "tw-mt-[70px] tw-pt-10 tw-flex tw-flex-col tw-w-full tw-items-center tw-bg-slate-100"
							: "tw-mt-[20px] md:tw-mt-[60px] tw-pt-20 md:tw-pt-10 tw-flex tw-flex-col tw-w-[100%] tw-items-center tw-bg-slate-100"
					} tw-max-w-max-content-width tw-mx-auto`}>
					<div className="tw-flex tw-flex-col  tw-items-left tw-justify-between tw-w-[100%] lg:tw-w-[70%] tw-px-3">
						<div className="tw-mb-2">
							<Heading children="Admin portal" isBold={true} />
						</div>
						<div className="tw-py-[2px] tw-flex tw-items-center tw-justify-end tw-w-fit tw-px-3 tw-text-sm tw-bg-white ">
							<>
								<input
									type="number"
									name="percentSale"
									id="number"
									value={percentSale}
									onChange={(e) => setPercentSale(Number(e.target.value))}
									placeholder="sales %"
									className="tw-w-[90%] tw-h-[30px] tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-gray-200 focus:tw-ring-0 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-bg-transparent"
								/>
								<RiSendPlaneLine
									onClick={handleSubmit}
									size={20}
									className="tw-text-pink-800 hover:tw-text-violet-300 tw-ease-in tw-duration-300 tw-w-[10%] tw-mr-2"
								/>
							</>
						</div>
						<div className="tw-mt-2 tw-flex tw-flex-col lg:tw-flex-row lg:tw-gap-x-5 tw-w-fit">
							<div className="tw-flex tw-items-center tw-h-[40px]">
								<input
									type="text"
									autoComplete="off"
									placeholder="set location"
									name="location"
									id="location"
									value={location}
									onChange={(e) => handleLocation(e)}
									className="focus:tw-ring-0 tw-mr-3 tw-h-full"
								/>
								<button
									onClick={handleSubmitLoc}
									type="button"
									className="tw-duration-300 tw-ease-in tw-bg-neutral-900 tw-text-sm tw-text-white hover:tw-bg-neutral-400 tw-h-full tw-px-3">
									Lock-in Location
								</button>
							</div>
							<a
								href={`${
									process.env.REACT_APP_GOOGLESEARCH + retrieveLocation
								}`}
								target="_blank"
								rel="noreferrer"
								className="tw-flex-col tw-text-neutral-400 tw-text-sm tw-font-light tw-flex tw-items-start tw-justify-center hover:tw-text-neutral-600 tw-ease tw-duration-300 tw-py-2">
								<div className="tw-flex tw-items-center tw-justify-center">
									<MdLocationPin /> <span>{retrieveLocation}</span>
								</div>
							</a>
						</div>
					</div>
					<div className="tw-mt-5 tw-px-3 tw-w-[100%] tw-text-slate-900">
						<ul className="tw-flex tw-text-xs tw-flex-row tw-items-center tw-justify-between tw-w-[100%] lg:tw-w-[50%] tw-mx-auto">
							<li
								id="all-inventory"
								className="hover:tw-cursor-pointer tw-bg-black/20 tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								All Inventories
							</li>
							<li
								id="inventory"
								className="hover:tw-cursor-pointer tw-bg-black/20 tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Add to Inventory
							</li>
							<li
								id="shipping"
								className="hover:tw-cursor-pointer tw-bg-black/20 tw-px-4 tw-py-2 hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Shipment
							</li>
						</ul>
					</div>
					{user && (
						<div className="tw-w-[100%] tw-px-3">
							<SectionComp />
						</div>
					)}
					{!section && (
						<div className="tw-flex tw-flex-col tw-items-center tw-my-20 ">
							<div className="tw-text-2xl tw-text-stone-600">
								<BsFillArrowUpSquareFill />
							</div>
							<span className="tw-text-stone-600 tw-my-5 tw-capitalize tw-font-light">
								Action Required!
							</span>
						</div>
					)}
					<div className="tw-bg-neutral-200 tw-my-20 tw-w-full tw-px-10 tw-py-5">
						<div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-gap-5">
							<CustomPolicyServices data={addOns} title="add on services" />
							<CustomPolicyServices data={category} title="category" />
							<CustomPolicyServices data={policy} title="policy" />
							<CustomPolicyServices data={services} title="services" />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
});

export default Management;
