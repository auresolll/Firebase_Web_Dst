import { SUCCESS } from "./../constants/utils";
import { displayActionMessage } from "./../helpers/utils";
import { ActionType, StoreActions } from "./actions";
import { StoreState } from "./state";

export function storeReducer(state: StoreState, action: StoreActions): StoreState {
	switch (action.type) {
		case ActionType.AddCustomer:
			return {
				...state,
				customer: action.payload,
			};
		case ActionType.AddBasket:
			displayActionMessage("Add to Basket success", SUCCESS);
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.filter(
							(b) => b.product.timestamp !== action.payload.product.timestamp
						),
						action.payload,
					],
				},
			};

		// case ActionType.AddExtra:
		// 	return {
		// 		...state,
		// 		baskets: {
		// 			...state.baskets,
		// 			basket: {
		// 				...state.baskets.basket.filter((b) => {
		// 					if (b.product.timestamp === action.payload.productTimestamp) {
		// 						b.extra = action.payload.extra;
		// 					}
		// 					return b;
		// 				}),
		// 			},
		// 		},
		// 	};

		case ActionType.AddInfoOrder:
			return {
				...state,
				order: {
					...state.order,
					[action.payload.name]: action.payload.value,
				},
			};

		case ActionType.ChangeQuantityProduct:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.map((val) => {
							const isProduct: boolean = val.product.timestamp === action.payload.timestamp;
							if (isProduct === false) return val;
							if (action.payload.operate) {
								val.quantity = val.quantity + 1;
							} else {
								if (val.quantity <= 1) return val;
								val.quantity = val.quantity - 1;
							}
							return val;
						}),
					],
				},
			};

		case ActionType.ChangeQuantityExtra:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.map((val) => {
							const isProduct: boolean = val.product.timestamp === action.payload.timestampProduct;
							if (isProduct === false) return val;
							val.extra.map((extra) => {
								const isExtra = extra.timestamp === action.payload.timestampExtra;
								if (isExtra === false) return extra;
								if (action.payload.operate) {
									extra.quantity = extra.quantity + 1;
								} else {
									if (extra.quantity <= 1) return extra;
									extra.quantity = extra.quantity - 1;
								}
							});
							return val;
						}),
					],
				},
			};

		case ActionType.ResetBasket:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [...(state.baskets.basket = [])],
				},
			};

		case ActionType.ResetExtra:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.filter((val) => {
							const isProduct = val.product.timestamp === action.payload.timestamp;
							if (isProduct) {
								val.extra = [];
							}
							return val;
						}),
					],
				},
			};

		case ActionType.DeleteProduct:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.filter(
							(val) => val.product.timestamp !== action.payload.timestamp
						),
					],
				},
			};
		case ActionType.DeleteExtra:
			return {
				...state,
				baskets: {
					...state.baskets,
					basket: [
						...state.baskets.basket.filter((val) => {
							const isProduct = val.product.timestamp === action.payload.timestampProduct;
							if (isProduct) {
								val.extra = val.extra.filter(
									(extra) => extra.timestamp !== action.payload.timestampExtra
								);
							}
							return val;
						}),
					],
				},
			};
		default:
			return state;
	}
}
