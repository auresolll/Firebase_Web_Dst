/* eslint-disable jsx-a11y/alt-text */
import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/_Header";
import Nav from "./components/_Nav";
import { MyContext } from "./states/context";
import reducer from "./states/reducer";
import { initialState } from "./states/state";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<MyContext.Provider value={{ state, dispatch }}>
			<div className="App">
				<div className="container">
					<div className="inner">
						<div className="inner-side">
							<Header />
						</div>
						<div className="inner-content">
							<Nav />
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</MyContext.Provider>
	);
}

export default App;
