import React from "react";

const Progressbar = ({ value, max }) => {
	return (
		<progress
			className="tw-w-full"
			value={value}
			max={max}
			id="progressBar"></progress>
	);
};

export default Progressbar;
