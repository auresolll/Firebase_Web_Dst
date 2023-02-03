import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import Header from "./_Header";

interface INavProps {}

type Anchor = "left";

const Nav: React.FunctionComponent<INavProps> = (props) => {
	const positionAnchor: Anchor = "left";
	const [stateAnchor, setState] = React.useState({
		left: false,
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

			setState({ ...stateAnchor, [anchor]: open });
		};
	return (
		<>
			<div className="inner-content-header">
				<div className="inner-content-bar" onClick={toggleDrawer(positionAnchor, true)}>
					<MenuIcon />
				</div>
				<React.Fragment key={positionAnchor}>
					<Drawer
						anchor={positionAnchor}
						open={stateAnchor[positionAnchor]}
						onClose={toggleDrawer(positionAnchor, false)}
					>
						<Header />
					</Drawer>
				</React.Fragment>
				<div className="account">
					<img
						className="inner-bar-status-pic"
						src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
						alt="avatar"
					/>
				</div>
			</div>
		</>
	);
};

export default Nav;
