import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CONTACT, FEATURE, HOME, PRODUCT, SIGNIN } from "../constants/router";
import useAuth from "../hooks/useAuth";
import { useStore } from "../states/context";
import Baskets from "./_Baskets";

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

export type Anchor = "right";
const Header: React.FunctionComponent<IHeaderProps> = (props) => {
	const [isToggle, setIsToggle] = React.useState<boolean>(false);
	const [isDropMenu, setIsDropMenu] = React.useState<boolean>(false);
	const activeStyle = {
		paddingBottom: "0.2em",
		borderBottom: "2px solid $black",
	};
	const { state } = useStore();
	const { handleSignOut } = useAuth();
	const anchor: Anchor = "right";
	const [stateDrawer, setState] = React.useState({
		right: false,
	});

	const toggleDrawer =
		(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};
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
						<span className="shopping_icon toggle_icon" onClick={toggleDrawer(anchor, true)}>
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
					{anchor && (
						<Baskets anchor={anchor} stateDrawer={stateDrawer} toggleDrawer={toggleDrawer} />
					)}
				</header>
			</div>
		</>
	);
};

export default Header;
