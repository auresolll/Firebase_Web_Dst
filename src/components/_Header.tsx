import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CONTACT, FEATURE, HOME, PRODUCT, SIGNIN } from "../constants/router";
import { SUCCESS } from "../constants/utils";
import { displayActionMessage } from "../helpers/utils";
import useAuth from "../hooks/useAuth";
import { useStore } from "../states/context";

interface IHeaderProps {}
const ROUTES = [
	{
		link: HOME,
		label: "Home",
	},
	{
		link: FEATURE,
		label: "Features",
	},
	{
		link: PRODUCT,
		label: "Products",
	},
	{
		link: CONTACT,
		label: "Contact",
	},
];
const Header: React.FunctionComponent<IHeaderProps> = (props) => {
	const [isToggle, setIsToggle] = React.useState<boolean>(false);
	const [isDropMenu, setIsDropMenu] = React.useState<boolean>(false);
	const activeStyle = {
		paddingBottom: "0.2em",
		borderBottom: "2px solid $black",
	};
	const { state } = useStore();
	console.log(state.baskets.basket);

	const { handleSignOut } = useAuth();
	return (
		<>
			<div className="inner">
				<header className="header">
					<nav className="nav">
						<h1>LOGO</h1>
						<ul className={`nav_list ${isToggle && "close_menu"}`}>
							{ROUTES.map((cb) => {
								return (
									<NavLink
										to={cb.link}
										style={({ isActive }) => (isActive ? activeStyle : undefined)}
										className="nav_item"
										key={cb.label}
									>
										{cb.label}
									</NavLink>
								);
							})}
							<span className="toggle_close" onClick={() => setIsToggle(!isToggle)}>
								<i className="ri-close-line"></i>
							</span>
						</ul>
					</nav>
					<div className="toggle">
						<span className="toggle_active toggle_icon" onClick={() => setIsToggle(!isToggle)}>
							<i className="ri-menu-3-line"></i>
						</span>
						<span className="shopping_icon toggle_icon">
							<i className="ri-shopping-bag-line"></i>
						</span>
						{state.customer.uid ? (
							<>
								<div className="toggle_customer">
									<div
										className="toggle_customer_main_img"
										onClick={() => setIsDropMenu(!isDropMenu)}
									>
										{state.customer.photoURL ? (
											<img
												width="34px"
												height="34px"
												src={state.customer.photoURL}
												className={`toggle_icon ${state.customer.photoURL && "toggle_photo"}`}
												alt={String(state.customer.email)}
											/>
										) : (
											<i className="ri-user-4-line"></i>
										)}
									</div>
									<div className={`toggle_customer_drop ${isDropMenu && "active_drop"}`}>
										<div className="toggle_customer_drop_content">
											<p>{state.customer.email}</p>
											<p>{state.customer.status}</p>
											<p>Home</p>
											<p>Profile</p>
											<p>Setting</p>

											<p onClick={handleSignOut}>Sign Out</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<Link to={SIGNIN}>
								<span className="profile_icon toggle_icon">
									<i className="ri-login-circle-line"></i>
								</span>
							</Link>
						)}
					</div>
				</header>
			</div>
		</>
	);
};

export default Header;
