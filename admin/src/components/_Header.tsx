/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { NavLink } from "react-router-dom";
import { ANALYTICS, CUSTOMERS, DASHBOARD, LOGIN, PRODUCTS } from "../constants/routes";

interface IHeaderProps {}
const ROUTES = [
	{
		link: DASHBOARD,
		img: "https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_analytics.svg",
		label: "Dashboard",
	},
	{
		link: CUSTOMERS,
		img: "https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_user.svg",
		label: "Customers",
	},
	{
		link: PRODUCTS,
		img: "https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_cart.svg",
		label: "Products",
	},
	// {
	// 	link: ANALYTICS,
	// 	img: "https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_analytics.svg",
	// 	label: "Analytics",
	// },
	{
		link: LOGIN,
		img: "https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_lock.svg",
		label: "Login",
	},
];
const activeStyle = {
	backgroundColor: "rgba(145, 158, 171, 0.12)",
	color: "rgb(33, 43, 54) !important",
	transition: "0.5s",
};
const Header: React.FunctionComponent<IHeaderProps> = (props) => {
	return (
		<>
			<div className="inner-bar">
				<h1 className="inner-bar-logo">LOGO</h1>
				<div className="inner-bar-status">
					<img
						className="inner-bar-status-pic"
						src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
					/>
					<h6 className="inner-bar-status-name">Jaydon Frankie</h6>
				</div>
				<div className="inner-bar-touch">
					<ul className="inner-bar-touch-list">
						{ROUTES.map((route, index) => (
							<li key={index}>
								<NavLink
									className="inner-bar-item"
									to={route.link}
									style={({ isActive }) => (isActive ? activeStyle : undefined)}
								>
									<span>
										<img src={route.img} />
									</span>
									<p className="inner-bar-link">{route.label}</p>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Header;
