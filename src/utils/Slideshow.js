import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Slideshow = ({ images }) => {
	const imageArray = [
		{
			image: images.image && images.image,
			id: 1,
		},
		{
			image: images.image2 && images.image2,
			id: 2,
		},
		{
			image: images.image3 && images.image3,
			id: 3,
		},
		{
			image: images.image4 && images.image4,
			id: 4,
		},
	].filter((x) => x.image)

	const [current, setCurrent] = React.useState(0)
	const length = imageArray.length

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
	}
	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	}

	return (
		<div className="tw-relative ">
			{imageArray.length > 1 && (
				<MdArrowBackIosNew
					className="left-arrow tw-left-3"
					onClick={prevSlide}
				/>
			)}
			{imageArray.length > 1 && (
				<MdArrowForwardIos
					className="right-arrow tw-right-3"
					onClick={nextSlide}
				/>
			)}
			<div className="slider tw-h-[550px]">
				{imageArray.map((item, idx) => (
					<div key={idx} className={idx === current ? 'slide active' : 'slide'}>
						{idx === current && (
							<div className="image">
								<img src={item.image} alt={item.id} />
								<span className="tw-absolute tw-text-gray-600 tw-right-6 tw-bottom-4 tw-italic tw-text-[10px]">
									hairposey...
								</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Slideshow
