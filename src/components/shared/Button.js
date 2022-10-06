function Button(props) {
	return (
		<button
			onClick={props.handleFunc}
			type={props.type}
			className={`${
				props.isTrans && "tw-bg-transparent tw-border-[1px] tw-border-pink-900"
			} ${
				props.isgradBG &&
				'"tw-bg-gradient-to-r tw-from-slate-900 tw-to-pink-800"'
			} tw-text-${
				props.sizes
			} tw-text-white tw-py-1.5 tw-px-12 tw-font-light  tw-shadow-lg tw-ease-in tw-duration-300 tw-rounded-lg hover:tw-text-pink-900`}>
			{props.children}
		</button>
	);
}
export default Button;
