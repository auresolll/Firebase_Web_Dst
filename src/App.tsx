/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/_Header";
import useAuth from "./hooks/useAuth";
import { StoreContext } from "./states/context";
import { storeReducer } from "./states/reducer";
import { initialStoreState } from "./states/state";
function App() {
	const [state, dispatch] = useReducer(storeReducer, initialStoreState);
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
