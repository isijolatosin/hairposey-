function Button(props) {
	return (
		<button
			onClick={props.handleFunc}
			type={props.type}
			className={`tw-bg-neutral-900 tw-text-xs tw-text-white tw-py-1.5 tw-px-6 tw-rounded-sm tw-font-light hover:tw-bg-white hover:tw-text-black tw-ease-in tw-duration-300`}>
			{props.children}
		</button>
	)
}
export default Button
