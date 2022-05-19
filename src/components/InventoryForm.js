import Button from './shared/Button'

function InventoryForm({
	handleSubmit,
	inputTypes,
	handleformDataChange,
	formData,
	isTrue,
	togglePassword,
	postError,
	buttonText,
	uploadFile,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<div className="tw-flex tw-flex-col tw-items-center">
				{inputTypes.map((inputType) => (
					<input
						key={inputType.id}
						type={inputType.type}
						name={inputType.name}
						id={inputType.id}
						value={inputType.value}
						onChange={handleformDataChange}
						placeholder={inputType.placeholder}
						className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
					/>
				))}
				<textarea
					value={formData.description}
					name="description"
					onChange={handleformDataChange}
					rows={10}
					cols={50}
					placeholder="Description..."
					className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
				/>
				<div className="tw-text-red-800 tw-text-sm ">
					<span>
						Rename Image and substitute space with a dash ( e.g abc-def )
					</span>
				</div>
				<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-shadow-xl tw-pl-3 tw-py-2">
					<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">Image</label>
					<input
						type="file"
						onChange={uploadFile}
						className="tw-block tw-w-full tw-text-sm tw-text-gray-500 file:tw-mr-4 file:tw-py-1 file:tw-px-4 file:tw-rounded file:tw-border-0 file:tw-text-sm file:tw-bg-gray-200 file:tw-text-violet-700 hover:file:tw-bg-violet-100 tw-ease-in tw-duration-300"
					/>
				</div>
				<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-mt-5 tw-shadow-xl tw-p-2">
					<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">Sales</label>
					<input
						type="checkbox"
						checked={isTrue}
						className={
							isTrue
								? 'tw-ml-2 tw-rounded-full tw-bg-violet-400'
								: 'tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200'
						}
						onChange={togglePassword}
					/>
				</div>
				{postError && (
					<span className="tw-text-xs tw-text-red-700 tw-mt-5">{`Error: ${postError}`}</span>
				)}
				<div className="tw-my-10">
					<Button type="submit">{buttonText}</Button>
				</div>
			</div>
		</form>
	)
}

export default InventoryForm
