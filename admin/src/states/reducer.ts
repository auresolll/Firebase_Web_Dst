import { ActionType, IAction } from "./actions";
import { IInitialState } from "./state";

const reducer = (state: IInitialState, action: IAction): IInitialState => {
	switch (action.type) {
		case ActionType.AddCustomer:
			return {
				...state,
				Customer: {
					...state.Customer,
					[action.payload.key]: action.payload.value,
				},
			};
		default:
			throw new Error("Reducer have error");
	}
};

export default reducer;
