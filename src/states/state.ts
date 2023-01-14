export interface StoreState {
	customer: Customer;
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
};
