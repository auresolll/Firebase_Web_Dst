/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import React, { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/_Header";
import { customerToStore } from "./helpers/utils";
import { ActionType } from "./states/actions";
import { StoreContext } from "./states/context";
import { storeReducer } from "./states/reducer";
import { initialStoreState } from "./states/state";
function App() {
	const [state, dispatch] = useReducer(storeReducer, initialStoreState);
	React.useEffect(() => {
		const data = customerToStore().getCustomer();
		if (state.customer.uid === "" && data.uid !== "") {
			dispatch({
				type: ActionType.AddCustomer,
				payload: customerToStore().getCustomer(),
			});
		}
	}, []);
	console.log(state);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<div className="container">
				<Header />
				<Outlet />
			</div>
		</StoreContext.Provider>
	);
}

export default App;
