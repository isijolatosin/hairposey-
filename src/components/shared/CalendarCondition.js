import React from "react";
import {
	BsChevronRight,
	BsFillLockFill,
	BsFillUnlockFill,
} from "react-icons/bs";
import Button from "./Button";

const CalendarCondition = ({ condition, textArray, func }) => {
	const [showSet, setShowSet] = React.useState(false);

	return (
		<div className="tw-h-[36px] tw-w-full tw-flex tw-items-center tw-justify-between tw-border">
			<div className="tw-h-full tw-flex tw-justify-center tw-items-center tw-text-black/60 tw-w-full">
				<div className="tw-mx-2">
					{condition ? (
						<BsFillLockFill size={20} className="tw-text-red-800" />
					) : (
						<BsFillUnlockFill size={20} className="tw-text-green-800" />
					)}
				</div>
				<Button
					children={condition ? textArray[0] : textArray[1]}
					type="button"
					class="tw-font-thin tw-text-start tw-w-full tw-text-xs tw-uppercase"
					handleFunc={() => setShowSet(!showSet)}
				/>
			</div>
			<div
				onClick={func}
				className={`${
					showSet ? "tw-inline-block" : "tw-hidden"
				} tw-h-full tw-border-l tw-text-white tw-w-[50px] tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-neutral-700  tw-ease-in tw-duration-300`}>
				<BsChevronRight className="hover:tw-translate-x-1 tw-w-full tw-h-full tw-ease-in tw-duration-300 " />
			</div>
		</div>
	);
};

export default CalendarCondition;
