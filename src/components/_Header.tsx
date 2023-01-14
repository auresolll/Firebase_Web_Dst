import * as React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CONTACT, FEATURE, HOME, PRODUCT, SIGNIN } from "../constants/router";
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
	const { state, dispatch } = useStore();
	console.log(state.customer);

	return (
		<>
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
					<span
						className="shopping_icon toggle_active toggle_icon"
						onClick={() => setIsToggle(!isToggle)}
					>
						<i className="ri-menu-3-line"></i>
					</span>
					<span className="shopping_icon toggle_icon">
						<i className="ri-shopping-bag-line"></i>
					</span>
					{state.customer.uid ? (
						<></>
					) : (
						<span className="profile_icon toggle_icon">
							<Link to={SIGNIN}>
								<i className="ri-user-3-line"></i>
							</Link>
						</span>
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
