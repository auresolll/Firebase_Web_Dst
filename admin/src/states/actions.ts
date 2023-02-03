import { ICustomer } from "./state";

export enum ActionType {
	AddCustomer,
	AddProduct,
}

export interface IAddCustomer {
	type: ActionType.AddCustomer;
	payload: {
		key: string;
		value: string;
	};
}

export interface IAddProduct {
	type: ActionType.AddProduct;
	payload: ICustomer;
}

export type IAction = IAddCustomer | IAddProduct;
