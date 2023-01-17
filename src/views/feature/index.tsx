import * as React from "react";

interface IFeatureDemoProps {}

const FeatureDemo: React.FunctionComponent<IFeatureDemoProps> = (props) => {
	return (
		<>
			<section className="section">
				<div className="feature_section">
					<h1 className="feature_section_title">New Feature</h1>
				</div>
			</section>
		</>
	);
};

export default FeatureDemo;
