import React from "react";

const Progressbar = ({ value, max }) => {
	return <progress value={value} max={max} id="progressBar"></progress>;
};

export default Progressbar;
