import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const Rating = ({ isNum, isReview, size }) => {
	const MAX_RATING = 5
	const MIN_RATING = 3
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))
	return (
		<div className="tw-flex tw-items-center">
			{isReview && <span className="tw-mr-2">Review: </span>}
			{Array(rating)
				.fill()
				.map((_, i) => (
					<AiFillStar className="tw-text-red-800" size={size} key={i} />
				))}
			{isNum && <span className="tw-ml-1">{rating + deci}</span>}
		</div>
	)
}

export default Rating
