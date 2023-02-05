/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { ANALYTICS, APP, CUSTOMERS, DASHBOARD, LOGIN, PRODUCTS } from "../constants/routes";
import Analytic from "../views/_Analytic";
import Customer from "../views/_Customer";
import Dashboard from "../views/_Dashboard";
import Login from "../views/_Login";
import Product from "../views/_Product";
const AppRouter = createBrowserRouter([
	{
		path: APP,
		element: <App />,
		children: [
			{ element: <Navigate to={DASHBOARD} />, index: true },
			{ path: DASHBOARD, element: <Dashboard /> },
			{ path: CUSTOMERS, element: <Customer /> },
			{ path: PRODUCTS, element: <Product /> },
			{ path: ANALYTICS, element: <Analytic /> },

			// { path: PROFILE, element: <Profile /> },
		],
	},
	{ path: LOGIN, element: <Login /> },
]);
export default AppRouter;
