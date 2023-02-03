/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { APP, CUSTOMERS, DASHBOARD } from "../constants/routes";
import Customer from "../views/_Customer";
import Dashboard from "../views/_Dashboard";
const AppRouter = createBrowserRouter([
	{
		path: APP,
		element: <App />,
		children: [
			{ element: <Navigate to={DASHBOARD} />, index: true },
			{ path: DASHBOARD, element: <Dashboard /> },
			{ path: CUSTOMERS, element: <Customer /> },
			// { path: SIGNIN, element: <SignIn /> },
			// { path: CHECKOUT, element: <CheckOut /> },
			// { path: PROFILE, element: <Profile /> },
		],
	},
]);
export default AppRouter;
