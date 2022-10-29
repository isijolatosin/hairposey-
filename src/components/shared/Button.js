function Button(props) {
	return (
		<button
			disabled={props.isCancel}
			onClick={props.handleFunc}
			type={props.type}
			className={`tw-py-1.5 tw-px-10 tw-font-light tw-ease-in tw-duration-300 tw-rounded-lg ${
				props.isTrans && "tw-bg-transparent"
			} ${props.isgradBG && "tw-bg-neutral-900"} tw-text-${props.sizes} ${
				props.isSmallTxt ? "tw-text-[12px]" : "tw-text-md"
			} ${props.isBlackTxt ? "tw-text-black" : "tw-text-white"} ${
				props.isCancel && "tw-cursor-not-allowed tw-line-through"
			} ${
				props.isBorder ? "tw-border-white" : "tw-border-pink-900"
			} hover:tw-text-pink-900 hover:tw-border-pink-900 tw-border-[1px] tw-shadow-lg
			`}
		>
			{props.children}
		</button>
	);
}
export default Button;
