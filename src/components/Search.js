import React from 'react'
import { RiSearch2Fill } from 'react-icons/ri'
import { RiSearch2Line } from 'react-icons/ri'

const Search = ({ onChange, search, onSearch, data1, data2 }) => {
	return (
		<div className="search lg:tw-w-[60%]">
			<form onSubmit={onSearch}>
				<div className="input">
					<input
						type="text"
						onChange={onChange}
						value={search}
						name="search"
						placeholder="Search..."
					/>
					{data1?.length || data2?.length ? (
						<RiSearch2Fill onClick={onSearch} />
					) : (
						<RiSearch2Line onClick={onSearch} />
					)}
				</div>
			</form>
		</div>
	)
}

export default Search
