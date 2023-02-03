import React from "react";
import { StoreActions } from "./actions";
import { initialStoreState, StoreState } from "./state";

export const StoreContext = React.createContext<{
	state: StoreState;
	dispatch: React.Dispatch<StoreActions>;
}>({
	state: initialStoreState,
	dispatch: (action: StoreActions) => undefined,
});

export const useStore = () => {
	const context = React.useContext(StoreContext);
	if (context === undefined) {
		throw new Error("useCount must be used within a CountProvider");
	}
	return context;
};
