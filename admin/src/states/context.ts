import React from "react";
import { IAction } from "./actions";
import { IInitialState, initialState } from "./state";

export const MyContext = React.createContext<{
	state: IInitialState;
	dispatch: React.Dispatch<IAction>;
}>({
	state: initialState,
	dispatch: (action: IAction) => undefined,
});

export const useMyContext = () => {
	const context = React.useContext(MyContext);
	if (context === undefined) {
		throw new Error("Must be used within a Provider");
	}
	return context;
};
