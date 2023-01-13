/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { NewCustomer } from "../../states/state";

interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = (props) => {
	const { handleAuthLocal } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: NewCustomer) => {
		const { email, password } = data;
		if (email !== undefined && password !== undefined) {
			handleAuthLocal(email, password);
		}
	};
	const [isForget, setIsForget] = React.useState<boolean>(false);

	return (
		<>
			<main className="main">
				<div className="form_login">
					<div className="form_content">
						<h3>Sign in to THINH LE VAN</h3>
						<div className="auth-wrapper">
							<div>
								<form onSubmit={handleSubmit(onSubmit)}>
									{isForget && (
										<div className="auth-field">
											<div className="input-group">
												<label className="label-input">Full name</label>
												<input
													type="full-name"
													id="full-name"
													className="input-form undefined"
													placeholder="test"
													{...register("fullname")}
													required
												></input>
												{errors.fullname && <span>This field is required</span>}
											</div>
										</div>
									)}
									<div className="auth-field">
										<div className="input-group">
											<label className="label-input">Email</label>
											<input
												type="email"
												id="email"
												className="input-form undefined"
												placeholder="test@example.com"
												{...register("email")}
												required
											></input>
											{errors.email && <span>This field is required</span>}
										</div>
									</div>
									<div className="auth-field">
										<div className="input-group">
											<label className="label-input">Password</label>
											<input
												type="password"
												id="password"
												className="input-form undefined"
												{...register("password", {
													minLength: 6,
												})}
												required
											></input>
											{errors.password && <span>This field is required</span>}
										</div>
									</div>
									<br></br>
									<div className="auth-field auth-action">
										{!isForget && (
											<a href="/forgot_password">
												<span>Forgot password?</span>
											</a>
										)}
										<button className="button auth-button" type="submit">
											{isForget ? "Sign Up" : "Sign In"}
										</button>
									</div>
								</form>
							</div>
							<div className="auth-divider">
								<h6>OR</h6>
							</div>
							<div className="flex-col auth-social">
								<div className="auth-item-facebook auth-item">
									<span>
										<i className="ri-facebook-circle-line"></i>
									</span>
									<p>Continue with Facebook</p>
								</div>
								<div className="auth-item-google auth-item">
									<span>
										<i className="ri-google-line"></i>
									</span>
									<p>Continue with Google</p>
								</div>
								<div className="auth-item-github auth-item">
									<span>
										<i className="ri-github-fill"></i>
									</span>
									<p>Continue with Github</p>
								</div>
							</div>
						</div>
					</div>
					<div className="auth-forget flex-row">
						<p>Don't have an account ?</p>
						<button onClick={() => setIsForget(!isForget)}>
							{isForget ? "Sign In" : "Sign Up"}
						</button>
					</div>
				</div>
			</main>
		</>
	);
};

export default SignIn;
