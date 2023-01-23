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
					total: 10,
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

		default:
			return state;
	}
}
