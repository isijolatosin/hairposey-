function Heading({ children, isBold }) {
	return (
		<div className="">
			<h1
				className={`tw-text-2xl tw-capitalize tw-text-neutral-700 ${
					isBold && ' tw-font-bold'
				}`}>
				{children}
			</h1>
		</div>
	)
}

export default Heading
