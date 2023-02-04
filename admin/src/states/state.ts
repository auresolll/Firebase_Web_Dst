export interface IInitialState {
	Customer: ICustomer;
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

export const initialState: IInitialState = {
	Customer: {
		email: "",
		name: "",
		password: "",
		address: "",
		phone: "",
		country: "",
	},
};
