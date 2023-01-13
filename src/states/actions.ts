import { Customer, NewCustomer } from "./state";

export enum ActionType {
	AddCustomer,
	OnAuthStateChanged,
}

export interface AddCustomer {
	type: ActionType.AddCustomer;
	payload: Customer;
}

export interface OnAuthStateChanged {
	type: ActionType.OnAuthStateChanged;
	payload: { id: number; value: number };
}

export type StoreActions = AddCustomer | OnAuthStateChanged;
