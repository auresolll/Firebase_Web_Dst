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
		case ActionType.AddProduct:
			return {
				...state,
				Product: {
					...state.Product,
					[action.payload.key]: action.payload.value,
				},
			};
		case ActionType.SetProduct:
			return {
				...state,
				Product: {
					...state.Product,
					docId: action.payload.docId,
					title: action.payload.title,
					category: action.payload.category,
					type: action.payload.type,
					sale: action.payload.sale,
					cost: action.payload.cost,
					desc: action.payload.desc,
					thumbnail: action.payload.thumbnail,
					timestamp: action.payload.timestamp,
					rating: action.payload.rating,
				},
			};
		default:
			throw new Error("Reducer have error");
	}
};

export default reducer;
