import { ActionType, StoreActions } from "./actions";
import { StoreState } from "./state";

export function storeReducer(state: StoreState, action: StoreActions): StoreState {
	switch (action.type) {
		case ActionType.AddCustomer:
			return {
				...state,
				customer: action.payload,
			};
		default:
			return state;
	}
}
