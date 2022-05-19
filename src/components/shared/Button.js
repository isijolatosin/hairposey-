function Button(props) {
	return (
		<button
			onClick={props.handleFunc}
			type={props.type}
			className="tw-bg-gray-700 tw-text-xs tw-text-white tw-py-1.5 tw-px-6 tw-rounded-full tw-font-light hover:tw-bg-gray-600 tw-ease-in tw-duration-300 tw-shadow-xl tw-shadow-neutral-900">
			{props.children}
		</button>
	)
}
export default Button
