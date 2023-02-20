import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { registerServiceWorker } from "./constants/utils";
import AppRouter from "./routers/AppRouter";
import "./styles/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={AppRouter} />);
registerServiceWorker();
