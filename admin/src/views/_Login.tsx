import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../constants/routes";
import firebaseAuthInstance from "../services/firebaseAuth";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
	const navigate = useNavigate();
	const [info, setInfo] = React.useState({
		email: "",
		password: "",
	});
	const firebaseAuth = firebaseAuthInstance;

	const handleChangeInfo = (key: string, value: string) => {
		return setInfo((pre) => {
			return {
				...pre,
				[key]: value,
			};
		});
	};

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		const { email, password } = info;
		const invalid = await firebaseAuth.signIn(email, password);
		if (invalid.user.uid) {
			navigate(DASHBOARD);
		}
	}
	return (
		<>
			<div className="container-bg">
				<div className="login-section">
					<h2>Sign in</h2>
					<div className="login-section-form">
						<form onSubmit={handleSubmit}>
							<img src={require("../images/form.png")} alt="" />
							<Stack gap={2}>
								<TextField
									required
									id="outlined-basic"
									type={"email"}
									label="Email"
									variant="outlined"
									fullWidth
									onChange={(e) => handleChangeInfo("email", e.target.value)}
								/>
								<TextField
									required
									id="outlined-basic"
									type={"password"}
									label="Password"
									variant="outlined"
									fullWidth
									onChange={(e) => handleChangeInfo("password", e.target.value)}
								/>
								<Button type="submit" variant="contained">
									Sign In
								</Button>
							</Stack>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
