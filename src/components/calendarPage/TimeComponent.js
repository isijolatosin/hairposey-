import React from "react";

const TimeComponent = ({
	data,
	selectDate,
	timeSlotArray,
	handleFunc,
	isPicked,
}) => {
	return (
		<div>
			{data.map(
				(item) =>
					selectDate.toLowerCase()?.includes(item?.day.toLowerCase()) && (
						<div key={item.id}>
							<p className="tw-text-xs tw-absolute tw-top-0 tw-left-16 tw-text-neutral-500">
								{item?.day}
							</p>
							<div className="tw-text-black tw-text-xs tw-flex tw-flex-wrap">
								{item?.time.map((slot, idx) => (
									<span
										onClick={() =>
											!timeSlotArray?.includes(slot) &&
											!slot.includes("-block") &&
											handleFunc(slot)
										}
										key={idx}
										className={`${
											timeSlotArray?.includes(slot) ||
											isPicked === slot ||
											slot.includes("-block")
												? "tw-cursor-not-allowed tw-text-neutral-200"
												: "tw-bg-white  tw-cursor-pointer md:hover:tw-bg-neutral-600 md:hover:tw-text-white "
										}  tw-py-1 tw-px-2 tw-rounded-2xl tw-mr-2 tw-mb-2 tw-duration-300 tw-ease-in`}>
										{slot.split("-")[0]}
									</span>
								))}
							</div>
						</div>
					)
			)}
		</div>
	);
};

export default TimeComponent;
