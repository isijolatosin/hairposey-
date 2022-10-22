export const SUPER_USER1 = "hairposey@gmail.com";
export const SUPER_USER2 = "tisijola7@gmail.com";
export const SHIPPING_COST = {
	canada: 9,
	usa: 20,
	london: 20,
};
export const CANADA = "canada";
export const USERS = "users";
export const BOOKINGS = "bookings";
export const CURRENCY = "cad";
export const REACT_APP_BOOK = "/hairposey/booking";
export const REACT_APP_SHOP = "/hairposey/shopping";
export const CLIENT_URL = "http://localhost:3001";
export const REACT_APP_ISBOOKING = "booking";
export const REACT_APP_BOOKLIMIT = 5;
export const REACT_APP_ISSHOPPING = "shopping";
export const REACT_APP_STATUS = "pending";
export const REACT_APP_CANCELED = "canceled";
// dev
// export const REACT_APP_SITE_URL = "http://localhost:8888/customer/";
// dev
// export const REACT_APP_HTTPS_LINK = "http://localhost:5000";
// Prod
export const REACT_APP_SITE_URL = "https://www.hairposey.com/customer/";
// // prod
export const REACT_APP_HTTPS_LINK = "https://www.hairposey.com";
export const REACT_APP_AUTHORIZED_ID_ONE = "hairposey@gmail.com";
export const REACT_APP_AUTHORIZED_ID_TWO = "tisijola7@gmail.com";

export const sizes = {
	small: "xs",
	medium: "md",
	large: "xl",
	xlarge: "2xl",
	xxlarge: "3xl",
};
export const Policy = [
	{
		id: 1,
		policy:
			"A $30 Nonrefundable deposit Is required for all Appointment confirmation which will be paid on completion of booking. Booking must be done through the booking app.",
	},
	{
		id: 2,
		policy:
			"No extra guest allowed during your appointment due to limited space",
	},
	{
		id: 3,
		policy:
			"Please call if your running late for your appointment ( a fee may apply)",
	},
	{ id: 4, policy: "No redo or fixing of other stylist work" },
	{
		id: 5,
		policy:
			"Any additional service not booked in advance don't have to be honoured",
	},
	{
		id: 6,
		policy: "For Last min Booking there will be a extra charge of $60",
	},
];

export const information = [
	{
		id: 1,
		title: "Category",
		info: [
			{ id: "1", desc: "Ponytail" },
			{ id: "2", desc: "Sew In" },
			{ id: "3", desc: "Wig Installs" },
			{ id: "4", desc: "Relaxer" },
			{ id: "5", desc: "Additional services " },
		],
	},
	{
		id: 2,
		title: "Services",
		info: [
			{ id: "1", desc: "Quick Weave $140", price: 140 },
			{ id: "2", desc: "Frontal Sew In $205", price: 205 },
			{ id: "3", desc: "Clousure Sew In $195", price: 195 },
			{ id: "4", desc: "Frontal Wig Install $140", price: 140 },
			{
				id: "5",
				desc: "Cut & Style $70",
				price: 70,
			},
			{
				id: "6",
				desc: "Frontal Ponytail $130",
				price: 130,
			},
			{
				id: "7",
				desc: "Pixie Cut starting at $80",
				price: 80,
			},
			{
				id: "8",
				desc: "Relaxer retouch starting at $85",
				price: 85,
			},
			{
				id: "9",
				desc: "Half up and half down Ponytail $140",
				price: 140,
			},
			{ id: "10", desc: "Traditional sew In w/ Leave out $185", price: 185 },
			{
				id: "11",
				desc: "New Relaxer starting at $135 (Includes a Treatment)",
				price: 135,
			},
			{
				id: "12",
				desc: "Sleek Ponytails starting at $90 *Add w/ Shampoo $30",
				price: 30,
			},
			{
				id: "13",
				desc: "Shampoo + Treatment + Silk Press $110  *Please Note: All Silk Press come w/ Treatment.",
				price: 110,
			},
		],
	},
	{
		id: 3,
		title: "Add On Services",
		info: [
			{ id: "0", desc: "No Add-ons", price: 0 },
			{ id: "1", desc: "Treatment w/ any Service starting at $30", price: 30 },
			{ id: "2", desc: "Trim w/ any Service starting at $20", price: 20 },
			{ id: "3", desc: "Shampoo starting at $30", price: 30 },
			{
				id: "4",
				desc: "For Colouring please contact Hair Posey Directly before booking",
				price: 0,
			},
		],
	},
];
