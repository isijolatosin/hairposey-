import React from "react";
import Heading from "./Heading";
import { db } from "../../firebase";
import { FiEdit2 } from "react-icons/fi";
import InputRender from "./InputRender";
import firebase from "firebase/compat/app";
import { MdOutlineDeleteOutline } from "react-icons/md";
import reload from "../../utils/reload";

const CustomPolicyServices = ({ data, title }) => {
	const [id, setId] = React.useState("");
	const [show, setShow] = React.useState(false);
	const [more, setMore] = React.useState(false);
	const [moreText, setMoreText] = React.useState("");
	const [moreTextPrice, setMoreTextPrice] = React.useState(null);
	const [moreTextDuration, setMoreTextDuration] = React.useState(null);
	const [replace, setReplace] = React.useState("");
	const [price, setPrice] = React.useState(null);
	const [duration, setDuration] = React.useState(null);

	function updateCMS(key, text) {
		if (replace === "") return;
		db.collection("admin").onSnapshot((snapshot) => {
			snapshot.docs.map((doc) => {
				const data = doc?.data();
				const edittedArray = data[key];
				const replaceIndex = edittedArray?.findIndex(
					(x) => x?.text === text || x === text
				);
				const replaceObjectServices = {
					text: replace,
					price: price,
					duration: duration,
				};
				const replaceObjectAddOns = {
					text: replace,
					price: price,
				};
				const theReplace =
					title === "services"
						? replaceObjectServices
						: title === "add on services"
						? replaceObjectAddOns
						: replace;
				edittedArray[replaceIndex] = theReplace;

				db.collection("admin")
					.doc(doc?.id || "policy-services")
					.set({ [`${key.toLowerCase()}`]: edittedArray }, { merge: true });

				return null;
			});
		});
		setShow(false);
		setId("");
		setReplace("");
		reload();
	}
	function addMore() {
		if (moreText === "") return;
		const replaceObjectServices = {
			text: moreText,
			price: moreTextPrice,
			duration: moreTextDuration,
		};
		const replaceObjectAddOns = {
			text: moreText,
			price: moreTextPrice,
		};
		const theReplace =
			title === "services"
				? replaceObjectServices
				: title === "add on services"
				? replaceObjectAddOns
				: moreText;

		db.collection("admin")
			.doc("policy-services")
			.set(
				{
					[`${title.toLowerCase()}`]:
						firebase.firestore.FieldValue.arrayUnion(theReplace), //tells the server to union the given elements with any array value that already exists on the server.
				},
				{ merge: true }
			);
		setMoreTextPrice(0);
		setMoreTextDuration(0);
		setMoreText("");
		reload();
	}
	function handleDelete(item) {
		const itm = item?.text || item;
		if (typeof item === "object") {
			db.collection("admin").onSnapshot((snapshot) => {
				snapshot.docs.map((doc) => {
					const data = doc?.data();
					const childData = data[`${title}`];
					const filterChild = childData?.filter((child) => child?.text !== itm);
					db.collection("admin")
						.doc(`${doc?.id}` || "policy-services")
						.set({ [`${title.toLowerCase()}`]: filterChild }, { merge: true });

					return null;
				});
			});
		} else {
			db.collection("admin").onSnapshot((snapshot) => {
				snapshot.docs.map((doc) => {
					const data = doc?.data();
					const childData = data[`${title}`];
					const filterChild = childData?.filter((child) => child !== itm);
					db.collection("admin")
						.doc(`${doc?.id}` || "policy-services")
						.set({ [`${title.toLowerCase()}`]: filterChild }, { merge: true });

					return null;
				});
			});
		}

		reload();
	}
	return (
		<div>
			<div
				className={`${
					more ? "tw-h-[70px]" : "tw-h-[50px]"
				} tw-mb-3 tw-border-b tw-border-neutral-600`}>
				<div className="tw-flex tw-items-center tw-justify-between">
					<Heading children={title} isBold={true} size5={true} isGrey={true} />
					<span
						onClick={() => setMore(!more)}
						className="tw-text-sm hover:tw-text-pink-700 tw-cursor-pointer tw-duration-300 tw-ease-in tw-text-neutral-400 tw-font-thin">
						{more ? "Close" : `+ ${title}`}
					</span>
				</div>
				<div
					className={`tw-flex tw-items-center tw-justify-end ${
						more ? "tw-inline-block" : "tw-hidden"
					}`}>
					<InputRender
						type="text"
						value={moreText}
						holder={`${title}...`}
						setValue={setMoreText}
					/>
					{(title === "services" || title === "add on services") && (
						<InputRender
							type="number"
							value={moreTextPrice}
							holder="price..."
							setValue={setMoreTextPrice}
						/>
					)}
					{title === "services" && (
						<InputRender
							type="number"
							value={moreTextDuration}
							holder="duration..."
							setValue={setMoreTextDuration}
						/>
					)}
					<div
						onClick={() =>
							(moreText || moreTextPrice || moreTextDuration) && addMore()
						}
						size={35}
						className="tw-max-w-[100px] tw-cursor-pointer tw-duration-300 tw-ease-in hover:tw-text-pink-700 tw-bg-pink-400 tw-text-xs tw-p-2 tw-rounded-br-lg">
						<span>Add</span>
					</div>
				</div>
			</div>
			<div
				className={`${
					title === "services"
						? "tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-3"
						: ""
				}`}>
				{data?.map((val, idx) => (
					<div key={idx} className="tw-w-full tw-mb-3">
						<div className="tw-w-full tw-h-fit tw-flex tw-items-center tw-justify-between tw-overflow-y-hidden">
							<span className="general-scrollbar-hide tw-flex tw-items-center tw-text-sm tw-font-thin tw-w-[80%] tw-h-full tw-overflow-y-scroll">
								<div
									dangerouslySetInnerHTML={{
										__html: typeof val === "object" ? val?.text : val,
									}}
								/>
							</span>
							<div
								onClick={() => {
									setShow(!show);
									setId(idx);
								}}
								className="tw-w-[10%] tw-h-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-text-pink-700 tw-duration-300 tw-ease-in">
								<FiEdit2 size={15} />
							</div>
							<div
								onClick={() => handleDelete(val)}
								className="tw-w-[10%] tw-h-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-text-pink-700 tw-duration-300 tw-ease-in">
								<MdOutlineDeleteOutline size={20} />
							</div>
						</div>
						{show && id === idx && (
							<>
								<div className="tw-border-neutral-50 tw-border-2 tw-bg-neutral-200 tw-w-full tw-h-fit tw-flex tw-items-center tw-justify-between">
									<InputRender
										type="text"
										value={replace}
										holder={typeof val === "object" ? val?.text : val}
										setValue={setReplace}
									/>
								</div>
								{(title === "add on services" || title === "services") && (
									<div className="tw-border-neutral-50 tw-border-2 tw-bg-neutral-200 tw-w-full tw-h-fit tw-flex tw-items-center tw-justify-between">
										<InputRender
											type="number"
											value={price}
											holder="price..."
											setValue={setPrice}
										/>
									</div>
								)}
								{title === "services" && (
									<div className="tw-border-neutral-50 tw-border-2 tw-bg-neutral-200 tw-w-full tw-h-fit tw-flex tw-items-center tw-justify-between">
										<InputRender
											type="number"
											value={duration}
											holder="duration..."
											setValue={setDuration}
										/>
									</div>
								)}
								<div
									onClick={() =>
										(replace || price || duration) &&
										updateCMS(title, val?.text || val)
									}
									size={20}
									className="tw-w-1/2 tw-cursor-pointer tw-duration-300 tw-ease-in hover:tw-text-pink-700 tw-text-xs tw-bg-pink-400 tw-p-2 tw-rounded-b-md">
									<span>Update</span>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomPolicyServices;
