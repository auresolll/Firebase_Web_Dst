import { User } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, List, ListItem, Popover, Typography } from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../constants/routes";
import firebaseAuthInstance from "../services/firebaseAuth";
import Header from "./_Header";

interface INavProps {}

type Anchor = "left";

const Nav: React.FunctionComponent<INavProps> = (props) => {
	const navigate = useNavigate();
	const positionAnchor: Anchor = "left";
	const [stateAnchor, setState] = React.useState({
		left: false,
	});
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [USER, setUSER] = React.useState<User | null>(null);
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

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	React.useEffect(() => {
		firebaseAuthInstance.onAuthStateChanged().then((cb: any) => {
			setUSER(cb);
		});
	}, []);

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
						onClick={handleClick}
					/>
				</div>

				<Popover
					sx={{ mt: 3 }}
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<Typography sx={{ p: 2 }}>
						<List>
							{USER !== null && (
								<>
									<ListItem>{USER.email}</ListItem>
									<Divider></Divider>
									<ListItem>
										<Link to={DASHBOARD}>Home</Link>
									</ListItem>
									<ListItem>Profile</ListItem>
									<ListItem>Setting</ListItem>
									<Divider></Divider>
									<ListItem
										onClick={() => {
											firebaseAuthInstance.signOut();
											navigate(LOGIN);
										}}
									>
										Logout
									</ListItem>
								</>
							)}
						</List>
					</Typography>
				</Popover>
			</div>
		</>
	);
};

export default Nav;
