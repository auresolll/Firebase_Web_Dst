/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { UserCredential } from "firebase/auth";
import React from "react";
import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/_Header";
import useAuth from "./hooks/useAuth";
import { ActionType } from "./states/actions";
import { StoreContext } from "./states/context";
import { storeReducer } from "./states/reducer";
import { initialStoreState, Status } from "./states/state";
function App() {
	const [state, dispatch] = useReducer(storeReducer, initialStoreState);
	const { authInstance } = useAuth();
	const isAuth = authInstance.onAuthStateChanged();
	React.useEffect(() => {
		isAuth.then((cb: any) => {
			dispatch({
				type: ActionType.AddCustomer,
				payload: {
					displayName: cb.displayName,
					email: cb.email,
					phoneNumber: cb.phoneNumber,
					photoURL: cb.photoURL as string | undefined,
					providerId: cb.providerId,
					status: Status.signIn,
					uid: cb.uid,
				},
			});
		});
	}, [isAuth]);
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
