import { IExtra, IProduct } from "../constants/type";

export interface StoreState {
	customer: Customer;
	baskets: Baskets;
	order: Order;
}

export enum Status {
	newAccount = "New Account",
	signIn = "Account Sign In",
	signOut = "Sign Out success",
}

export interface Customer {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | undefined;
	providerId: string;
	uid: string;
	status: Status;
}

export interface NewCustomer {
	fullname?: string;
	email?: string;
	password?: string;
}

export interface Order {
	fullname: string;
	email: string;
	address: string;
	phone: string;
}

export interface Basket {
	quantity: number;
	product: IProduct;
	extra: IExtra[];
}

export interface Baskets {
	basket: Basket[];
	total: number;
}

export const initialStoreState: StoreState = {
	customer: {
		displayName: "",
		email: "",
		phoneNumber: "",
		photoURL: "",
		providerId: "",
		uid: "",
		status: Status.signIn,
	},
	baskets: {
		basket: [],
		total: 0,
	},
	order: {
		address: "",
		email: "",
		fullname: "",
		phone: "",
	},
};
