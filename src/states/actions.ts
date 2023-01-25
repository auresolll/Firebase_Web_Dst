import { IExtra } from "./../constants/type";
import { Basket, Customer, NewCustomer } from "./state";

export enum ActionType {
	AddCustomer,
	OnAuthStateChanged,
	AddBasket,
	AddExtra,
	ResetBasket,
	ResetExtra,
	ChangeQuantityProduct,
	ChangeQuantityExtra,
	DeleteProduct,
	DeleteExtra,
}

export interface AddExtra {
	type: ActionType.AddCustomer;
	payload: Customer;
}

export interface ResetBasket {
	type: ActionType.ResetBasket;
}

export interface ResetExtra {
	type: ActionType.ResetExtra;
	payload: {
		timestamp: string;
	};
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
export interface ChangeQuantityProduct {
	type: ActionType.ChangeQuantityProduct;
	payload: {
		timestamp: string;
		operate: boolean;
	};
}
export interface ChangeQuantityExtra {
	type: ActionType.ChangeQuantityExtra;
	payload: {
		timestampProduct: string;
		timestampExtra: string;
		operate: boolean;
	};
}
export interface DeleteProduct {
	type: ActionType.DeleteProduct;
	payload: {
		timestamp: string;
	};
}
export interface DeleteExtra {
	type: ActionType.DeleteExtra;
	payload: {
		timestampProduct: string;
		timestampExtra: string;
	};
}

export interface OnAuthStateChanged {
	type: ActionType.OnAuthStateChanged;
	payload: { id: number; value: number };
}

export type StoreActions =
	| AddCustomer
	| OnAuthStateChanged
	| AddBasket
	| AddExtra
	| ResetBasket
	| ResetExtra
	| ChangeQuantityProduct
	| ChangeQuantityExtra
	| DeleteProduct
	| DeleteExtra;
