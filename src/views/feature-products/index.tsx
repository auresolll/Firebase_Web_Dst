import { Box } from "@mui/material";
import * as React from "react";
import ProductFilterSideBar from "../../components/_FilterSideBar";
import FeatureProduct from "../../components/_Product";
import { IProduct } from "../../constants/type";
import UseFeatureProducts from "../../hooks/useFeatureProducts";

interface IFeatureProps {}

const Feature: React.FunctionComponent<IFeatureProps> = (props) => {
	const { PRODUCTS, setPagination } = UseFeatureProducts();
	React.useEffect(() => {
		let isCheck = true;
		if (isCheck) {
			const updatedValues = {
				limit: 10,
			};
			setPagination((prevState) => {
				return { ...prevState, ...updatedValues };
			});
		}
		return () => {
			isCheck = false;
		};
	}, []);

	return (
		<>
			<main className="main">
				<section className="section">
					<div className="feature_section">
						<Box padding={"1.5em 2.5em"}>
							<ProductFilterSideBar />
						</Box>
						<div className="featured__container grid">
							{PRODUCTS.length > 0 &&
								PRODUCTS.map((val: IProduct) => (
									<FeatureProduct product={val} key={val.timestamp} />
								))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Feature;
