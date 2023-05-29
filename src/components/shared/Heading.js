import React from "react";

const Heading = ({ children, size, isBlue, isGreen, isGrey, isGreyLight }) => {
	return (
		<div
			className={`tw-text-${size} tw-font-bold tw-capitalize ${
				isGreen && "tw-text-green-600"
			} ${isBlue && "tw-text-blue-600"} ${isGrey && "tw-text-neutral-700"} ${
				isGreyLight && "tw-text-neutral-500"
			}`}>
			{children}
		</div>
	);
};

export default Heading;
