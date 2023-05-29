import React from "react";

const InputRender = ({ type, value, holder, setValue }) => {
	return (
		<>
			<input
				type={type}
				value={value}
				placeholder={holder}
				onChange={(e) => {
					e.preventDefault();
					setValue(e.target.value);
				}}
				className="tw-border-0 tw-w-full tw-h-full tw-text-sm tw-bg-transparent focus:tw-ring-0"
			/>
		</>
	);
};

export default InputRender;
