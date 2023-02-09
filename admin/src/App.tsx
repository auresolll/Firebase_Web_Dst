/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useReducer } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/_Header";
import Nav from "./components/_Nav";
import { LOGIN } from "./constants/routes";
import { OWNER } from "./constants/utils";
import firebaseAuthInstance from "./services/firebaseAuth";
import { MyContext } from "./states/context";
import reducer from "./states/reducer";
import { initialState } from "./states/state";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	React.useEffect(() => {
		firebaseAuthInstance.onAuthStateChanged().then((cb: any) => {
			if (cb.email === OWNER) {
				return;
			} else {
				navigate(LOGIN);
			}
		});
	}, []);
	return (
		<MyContext.Provider value={{ state, dispatch }}>
			<div className="App">
				<div className="container">
					<div className="inner">
						<div className="inner-side">
							<Header />
						</div>
						<main className="inner-content">
							<Nav />
							<Outlet />
						</main>
					</div>
				</div>
			</div>
		</MyContext.Provider>
	);
}

export default App;
