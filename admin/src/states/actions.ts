import { IProduct } from "./state";

export enum ActionType {
	AddCustomer,
	AddProduct,
	SetProduct,
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
	payload: {
		key: string;
		value: string | Date;
	};
}

export interface ISetProduct {
	type: ActionType.SetProduct;
	payload: IProduct;
}

export type IAction = IAddCustomer | IAddProduct | ISetProduct;
