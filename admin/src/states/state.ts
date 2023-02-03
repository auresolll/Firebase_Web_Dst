export interface IInitialState {
	Customer: ICustomer;
}

export interface ICustomer {
	email: string;
	name: string;
	password: string;
	address: string;
	phone: string;
	country: string;
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
