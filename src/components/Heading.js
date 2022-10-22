function Heading({
	children,
	isBold,
	isBold2,
	size1,
	size2,
	size3,
	size4,
	size5,
	size6,
	isLead,
	isWhite,
	isBlack,
	isGrey,
	isLight,
	isUndeline,
}) {
	return (
		<h1
			className={`tw-capitalize ${isLight && 'tw-font-light'} ${
				isWhite && 'tw-text-white'
			} ${isBlack && 'tw-text-black'} ${isBold && 'tw-font-bold'} ${
				isBold2 && 'tw-font-normal'
			} ${size1 && 'tw-text-xs'} ${isUndeline && 'tw-text-[10px]'} ${
				size2 && 'tw-text-sm'
			} ${size3 && 'tw-text-[18px]'} ${size4 && 'tw-text-lg'} ${
				size5 && 'tw-text-xl'
			} ${size6 && 'tw-text-2xl'} ${isLead && 'tw-leading-8'} ${
				isGrey && 'tw-text-neutral-500'
			} ${isUndeline && 'tw-underline'} 'tw-text-neutral-700'`}>
			{children}
		</h1>
	)
}

export default Heading
