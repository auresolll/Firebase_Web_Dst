export interface IInitialState {
	Customer: ICustomer;
	Product: IProduct;
}

export interface ICustomer {
	docId?: string;
	email: string;
	name: string;
	password: string;
	address: string;
	phone: string;
	country: string;
	timestamp?: string;
}

export interface IProduct {
	docId?: string;
	title: string;
	category: string;
	type: string;
	sale: number;
	cost: string;
	desc: string;
	thumbnail: string;
	timestamp?: Date;
	rating: number;
}

export const initialState: IInitialState = {
	Customer: {
		email: "",
		name: "",
		password: "",
		address: "",
		phone: "",
		country: "",
	},

	Product: {
		title: "",
		category: "",
		type: "",
		sale: 0,
		cost: "",
		desc: "",
		thumbnail: "",
		rating: 0,
	},
};
