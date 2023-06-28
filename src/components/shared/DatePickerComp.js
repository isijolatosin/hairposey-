import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComp({
	_30DaysMax,
	handleSelect,
	date,
	excludeDates,
	isLight,
}) {
	return (
		<DatePicker
			minDate={new Date()}
			maxDate={
				_30DaysMax
					? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
					: ""
			}
			filterDate={(date) => date.getDay() !== 1 && date.getDay() !== 0}
			isClearable
			excludeDates={excludeDates}
			clearButtonTitle="clear"
			renderCustomHeader={({
				monthDate,
				customHeaderCount,
				decreaseMonth,
				increaseMonth,
			}) => (
				<div>
					<button
						disabled={_30DaysMax}
						aria-label="Previous Month"
						className={
							"react-datepicker__navigation react-datepicker__navigation--previous"
						}
						style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
						onClick={decreaseMonth}>
						<span
							className={
								"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
							}>
							{"<"}
						</span>
					</button>
					<span className="react-datepicker__current-month">
						{monthDate.toLocaleString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<button
						disabled={_30DaysMax}
						aria-label="Next Month"
						className={
							"react-datepicker__navigation react-datepicker__navigation--next"
						}
						style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
						onClick={increaseMonth}>
						<span
							className={
								"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
							}>
							{">"}
						</span>
					</button>
				</div>
			)}
			selected={new Date()}
			onChange={handleSelect}
			monthsShown={1}
			calendarClassName="tw-bg-neutral-200 tw-w-[100%]"
			className={`${
				isLight
					? `tw-bg-neutral-200 tw-border-[0] focus:tw-ring-0 tw-w-[50%] ${
							date ? "tw-text-white" : "tw-text-neutral-700"
					  }`
					: `tw-bg-neutral-800 ${
							date ? "tw-text-neutral-700" : "tw-text-white"
					  }`
			} tw-font-thin tw-text-sm`}
		/>
	);
}

export default DatePickerComp;
