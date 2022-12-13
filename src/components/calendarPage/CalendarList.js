import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { REACT_APP_CANCELED, REACT_APP_STATUS } from "../../constant";
import Progressbar from "../shared/Progressbar";

const CalendarList = ({
	calendarList,
	showProgress,
	timeleft,
	handleDelete,
	setPicked,
	setConfirmDel,
	confirmDel,
	picked,
}) => {
	return (
		<>
			{calendarList.map((list) => (
				<div key={list.id}>
					<div
						className={`tw-mb-[-10] tw-w-[100%] tw-mx-auto tw-flex tw-items-center ${
							showProgress && confirmDel && picked === list.id
								? "tw-opacity-[1]"
								: "tw-opacity-[0]"
						} tw-ease-in tw-duration-300`}>
						<Progressbar value={timeleft} max={100} />
					</div>
					<ul className="tw-bg-white tw-h-[100px] tw-overflow-auto tw-p-2 tw-rounded-b-md general-scrollbar-hide">
						<div className="tw-flex tw-items-center tw-justify-between tw-border-b-[1px] tw-pb-1 tw-mb-1">
							{list.data.customer === list.data.email ? (
								<li className="tw-text-xs tw-text-neutral-600">
									Cst: {list.data.customer}
								</li>
							) : (
								<div className="tw-flex tw-flex-col">
									<li className="tw-text-xs tw-text-neutral-600">{`Customer: ${list.data.customer}`}</li>
									<li className="tw-text-xs tw-text-neutral-400">{`Email: ${list.data.email}`}</li>
								</div>
							)}
							<div className="tw-flex tw-items-center tw-justify-center tw-relative">
								<li className="tw-text-xs tw-bg-pink-600 tw-py-1 tw-px-3 tw-rounded-full tw-text-white">
									Duration:{" "}
									{list.data.duration > 1
										? `${list.data.duration} hrs`
										: `${list.data.duration} hr`}
								</li>
								{(new Date().getTime() > new Date(list.data.date).getTime() ||
									list.data.status !== REACT_APP_STATUS) && (
									<>
										{confirmDel && picked === list.id ? (
											<button
												disabled={showProgress}
												onClick={() => handleDelete(list.id)}
												className=" tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-mb-1">
												<MdDeleteForever
													size={25}
													color={showProgress ? "grey" : "darkred"}
												/>
											</button>
										) : (
											<button
												disabled={showProgress}
												onClick={() => {
													setPicked(list.id);
													setConfirmDel(true);
												}}
												className="tw-ml-2 tw-border-l-[1px] tw-max-w-[30px] tw-h-[20px] tw-max-h-[20px] tw-pl-1 tw-w-[30px] tw-relative">
												<FaTrash
													size={19}
													color={showProgress ? "grey" : "lightgrey"}
												/>
												<span className="tw-absolute tw-top-1 tw-right-[12px] tw-font-bold tw-text-xs tw-text-white">
													?
												</span>
											</button>
										)}
									</>
								)}
								<div
									className={`${
										confirmDel && picked === list.id
											? "tw-opacity-1"
											: "tw-opacity-0"
									} tw-ease-in tw-duration-300 tw-absolute -tw-bottom-5 tw-right-0 tw-text-red-600`}>
									<p className="tw- tw-text-[10px]">Are you sure ?</p>
								</div>
							</div>
						</div>

						<div className="tw-grid tw-grid-cols-2 tw-text-[11px] tw-gap-x-2 tw-text-neutral-800">
							<li className="tw-text-pink-800 tw-border-b-[0.5px]">
								Appointment Date: {list.data.date}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px] tw-leading-3">
								Service: {list.data.service}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px]">
								Category: {list.data.category}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px]">
								Add-on Service: {list.data.addOnServices}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px]">
								Time Slot: {list.data.timeSlot.split("-")[0]}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px]">
								Balance: ${list.data.balance}
							</li>
							<li className="tw-font-thin tw-border-b-[0.5px]">
								Status:{" "}
								<span
									className={`${
										new Date().getTime() < new Date(list.data.date).getTime() &&
										list.data.status !== REACT_APP_CANCELED &&
										"tw-text-green-700 tw-font-semibold"
									} ${
										list.data.status === REACT_APP_CANCELED &&
										"tw-text-neutral-400 tw-italic tw-line-through"
									} ${
										new Date().getTime() > new Date(list.data.date).getTime() &&
										"tw-text-blue-800 tw-font-semibold"
									}`}>
									{new Date().getTime() > new Date(list.data.date).getTime()
										? "Appointment is due"
										: list.data.status}
								</span>
							</li>
						</div>
					</ul>
				</div>
			))}
		</>
	);
};

export default CalendarList;
