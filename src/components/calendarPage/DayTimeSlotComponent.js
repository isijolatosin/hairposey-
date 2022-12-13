import React from "react";
import { BsFillLockFill } from "react-icons/bs";
import { BsFillUnlockFill } from "react-icons/bs";

const DayTimeSlotComponent = ({
	timeSlotDB,
	timeSlotArray,
	handleSelectTimeSlot,
	unBlockSlot,
	blockSlot,
}) => {
	return (
		<div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-items-center">
			{timeSlotDB ? (
				timeSlotDB.map((slt) => (
					<div key={slt.id}>
						<p className="tw-text-xs tw-bg-neutral-400 tw-text-neutral-50 tw-pl-2">
							{slt?.day}
						</p>
						<div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-text-black tw-text-xs">
							{slt?.time.map((slot, idx) => (
								<div
									onClick={() =>
										!timeSlotArray?.includes(slot) && handleSelectTimeSlot(slot)
									}
									key={idx}
									className={`tw-py-3 tw-pl-2 tw-border-x-[1px] tw-border-neutral-400 tw-border-b-[1px] tw-flex tw-items-center tw-justify-between tw-h-[30px] ${
										slot?.includes("block")
											? "tw-bg-neutral-300 tw-text-neutral-400 tw-font-thin"
											: "tw-bg-neutral-100 "
									}`}>
									<span className="">{slot.split("-")[0]}</span>

									{slot?.includes("block") ? (
										<div
											onClick={() => unBlockSlot(slot, slt.id, idx)}
											className="tw-flex tw-items-center tw-justify-center tw-h-[30px] tw-rounded-br-md tw-text-[10px] tw-px-2 tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-400">
											<span size={20} className=" tw-text-green-800">
												<BsFillUnlockFill size={15} />
											</span>
										</div>
									) : (
										<div
											onClick={() => blockSlot(slot, slt.id, idx)}
											className="tw-flex tw-items-center tw-justify-center tw-h-[30px] tw-rounded-br-md tw-text-[10px] tw-px-2 tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-400">
											<span size={18} className="tw-text-red-800">
												<BsFillLockFill size={15} />
											</span>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				))
			) : (
				<span>Loading...</span>
			)}
		</div>
	);
};

export default DayTimeSlotComponent;
