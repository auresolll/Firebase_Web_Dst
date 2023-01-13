import * as React from "react";

interface IFeatureProps {}

const Home: React.FunctionComponent<IFeatureProps> = (props) => {
	return (
		<>
			<main className="main">
				<div>
					<img src="./../../images/BANNER.png" width="100%" height="100%" alt="" />
				</div>
			</main>
		</>
	);
};

export default Home;
