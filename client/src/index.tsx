import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import "./styles/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	// <React.StrictMode>
	<RouterProvider router={AppRouter} />
	// </React.StrictMode>
);
