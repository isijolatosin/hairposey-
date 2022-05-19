function CursorText({ showText, id, children, commonId }) {
	return (
		<span
			id={id}
			className={
				'tw-absolute tw-bottom-[-20px] tw-flex tw-flex-row tw-text-center tw-px-2 tw-py-[2px] tw-text-[10px] tw-font-bold tw-mt-2 tw-bg-zinc-100 tw-rounded tw-text-slate-800 tw-ease-in tw-duration-300' +
				(commonId === id && showText ? ' tw-opacity-60' : ' tw-opacity-0')
			}>
			{children}
		</span>
	)
}

export default CursorText
