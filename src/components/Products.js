import React from "react";
import Card from "./Card";
import { selectCartItems } from "../slices/appSlices";
import Add2CartPopup from "./shared/Add2CartPopup";
import { useSelector } from "react-redux";
import HomePageSingleProd from "./shared/HomePageSingleProd";

function Products({ allProducts, sales, setImage, setIsSingleImage }) {
	const [singleProducts, setSingleproducts] = React.useState(null);

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0);
	};
	const [error, setError] = React.useState(false);
	const [singleCart, setSingleCart] = React.useState(null);
	const [length, setLength] = React.useState(null);
	const [_color, setColor] = React.useState(null);
	const [_hairType, sethairType] = React.useState(null);
	const cartItems = useSelector(selectCartItems);
	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === "frontal"
			? ["Natural black"]
			: ["Natural black", "Blonde613"];
	const texture = ["Straight", "Bodywave", "Curly", "Wavy"];

	const sizes = singleProducts?.[0]?.availablelength.split(", ");

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name;
	const _id = singleProducts?.[0] && singleProducts?.[0]?._id;
	const image = singleProducts?.[0] && singleProducts?.[0]?.image;
	const color = singleProducts?.[0] && singleProducts?.[0]?.color;
	const description = singleProducts?.[0] && singleProducts?.[0]?.description;
	const width = singleProducts?.[0] && singleProducts?.[0]?.widthlength;
	const price = singleProducts?.[0][`price${length}`];
	const hairLength = length;
	const hairColor = _color || color;
	const hairTexture = _hairType && _hairType;

	const singleProduct = {
		name,
		_id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		width,
		hairTexture,
	};

	const desc = [
		{ key: "Hair Texture", value: "" },
		{ key: "Hair Color", value: "" },
		{
			key: "Hair Length",
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
		{ key: "Material", value: "100% Human Hair" },
		{ key: "Density", value: "150% - 200%" },
		{ key: "Cap Size", value: "Average Size(Head circumference: 54cm - 58cm" },
		{ key: "Can be bleached.dyed", value: "Yes" },
		{
			key: "Delivery time",
			value:
				"We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)",
		},
		{
			key: "Return policy",
			value:
				"We accept 30-days no reason return exchange with hair not been used",
		},
	];

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-absolute md:tw-top-[-190px] tw-top-[-90px] tw-right-0 md:tw-right-[-40px] xl:tw-right-[-100px] 2xl:tw-right-[-200px]">
				<Add2CartPopup singleCart={singleCart} setSingleCart={setSingleCart} />
			</div>
			{allProducts ? (
				<div className="tw-flex tw-flex-wrap tw-gap-3 tw-items-center tw-justify-center tw-pb-10 tw-pt-0">
					{allProducts.map((product) => {
						return (
							<div key={product._id} className="tw-mb-2 md:tw-mb-0">
								<Card
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
									setImage={setImage}
									setIsSingleImage={setIsSingleImage}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			{singleProducts && (
				<HomePageSingleProd
					singleProducts={singleProducts}
					hairColor={_hairColor}
					setColor={setColor}
					texture={texture}
					sethairType={sethairType}
					sizes={sizes}
					setLength={setLength}
					length={length}
					setError={setError}
					sales={sales}
					desc={desc}
					error={error}
					cartItems={cartItems}
					setSingleproducts={setSingleproducts}
					singleProduct={singleProduct}
					setSingleCart={setSingleCart}
				/>
			)}
		</div>
	);
}

export default Products;
