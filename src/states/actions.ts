import { IExtra } from "./../constants/type";
import { Basket, Customer, NewCustomer } from "./state";

export enum ActionType {
	AddCustomer,
	OnAuthStateChanged,
	AddBasket,
	AddExtra,
	ResetStatus,
}

export interface AddExtra {
	type: ActionType.AddCustomer;
	payload: Customer;
}

export interface ResetStatus {
	type: ActionType.ResetStatus;
}

export interface AddCustomer {
	type: ActionType.AddExtra;
	payload: {
		extra: IExtra[];
		productTimestamp: string;
	};
}

export interface AddBasket {
	type: ActionType.AddBasket;
	payload: Basket;
}

export interface OnAuthStateChanged {
	type: ActionType.OnAuthStateChanged;
	payload: { id: number; value: number };
}

export type StoreActions = AddCustomer | OnAuthStateChanged | AddBasket | AddExtra | ResetStatus;
