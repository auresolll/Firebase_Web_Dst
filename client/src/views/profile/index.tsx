import * as React from "react";
import { useStore } from "../../states/context";
import UserTab from "./_UserTab";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
	const { state } = useStore();
	const [activeStep, setActiveStep] = React.useState<number>(1);
	const getContentUserTab = (active: number) => {
		switch (active) {
			case 1:
				return <UserTab state={state} />;
			default:
				break;
		}
	};
	return (
		<>
			<div className="user-tab">
				<div className="user-tab-nav">
					<ul className="user-tab-menu">
						<li className="user-tab-item user-tab-active" role="presentation">
							Account
						</li>
						<li className="user-tab-item " role="presentation">
							My Wish List
						</li>
						<li className="user-tab-item " role="presentation">
							My Orders
						</li>
					</ul>
				</div>
				{getContentUserTab(activeStep)}
			</div>
		</>
	);
};

export default Profile;
