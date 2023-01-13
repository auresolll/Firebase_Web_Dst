/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { APP, FEATURE, HOME, SIGNIN } from "../constants/router";
import Feature from "../views/feature-products";
import Home from "../views/home";
import SignIn from "../views/sigin";
const AppRouter = createBrowserRouter([
	{
		path: APP,
		element: <App />,
		children: [
			{ element: <Navigate to={HOME} />, index: true },
			{ path: HOME, element: <Home /> },
			{ path: FEATURE, element: <Feature /> },
			{ path: SIGNIN, element: <SignIn /> },
		],
	},
]);
export default AppRouter;
