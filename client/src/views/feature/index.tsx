import * as React from "react";
import FeatureProduct from "../../components/_Product";
import { IProduct } from "../../constants/type";
import UseFeatureProducts from "../../hooks/useFeatureProducts";

interface IFeatureDemoProps {}

const FeatureDemo: React.FunctionComponent<IFeatureDemoProps> = (props) => {
	const { PRODUCTS } = UseFeatureProducts();

	return (
		<>
			<section className="section">
				<div className="feature_section">
					<h1 className="feature_section_title">New Feature</h1>
					<div className="featured__container grid">
						{PRODUCTS.length > 0 &&
							PRODUCTS.map((val: IProduct, index: number) => (
								<FeatureProduct product={val} key={index} />
							))}
					</div>
				</div>
			</section>
		</>
	);
};

export default FeatureDemo;
