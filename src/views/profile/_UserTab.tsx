import * as React from "react";
import { StoreState } from "../../states/state";

interface IUserTabProps {
	state: StoreState;
}

const UserTab: React.FunctionComponent<IUserTabProps> = (props) => {
	return (
		<>
			<div className="user-tab-content">
				<div className="user-profile">
					<div className="user-profile-block">
						<div className="user-profile-banner">
							<div className="user-profile-banner-wrapper">
								<img
									alt="Banner"
									className="user-profile-banner-img is-img-loaded"
									src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
								></img>
							</div>
							<div className="user-profile-avatar-wrapper">
								<img
									alt="Avatar"
									className="user-profile-img is-img-loaded"
									src="https://avatars.githubusercontent.com/u/99936663?v=4"
								></img>
							</div>
							<button className="button button-small user-profile-edit" type="button">
								Edit Account
							</button>
						</div>
						<div className="user-profile-details">
							<h2 className="user-profile-name text-subtle text-italic">
								{props.state.customer.displayName === "" ||
								props.state.customer.displayName === null
									? "Fullname not set"
									: props.state.customer.displayName}
							</h2>
							<span>Email</span>
							<h5>{props.state.customer.email}</h5>
							<span>Address</span>
							<h5 className="text-subtle text-italic">Address not set</h5>
							<span>Mobile</span>
							<span>Date Joined</span>
							<h5>January 11, 2023</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserTab;
