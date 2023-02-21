function Button(props) {
	return (
		<button
			disabled={props.isCancel}
			onClick={props.handleFunc}
			type={props.type}
			className={props.class}>
			{props.children}
		</button>
	);
}
export default Button;
