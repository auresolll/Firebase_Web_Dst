import * as React from "react";
import { IProduct } from "../constants/type";
import { formatVND } from "../helpers/utils";

interface IFeatureProductProps {
	product: IProduct;
}

const FeatureProduct: React.FunctionComponent<IFeatureProductProps> = (props) => {
	console.log(props.product);

	return (
		<>
			<article className="featured__card">
				<span className="featured__tag">Sale</span>
				<img
					src={require("../img/c1.png")}
					alt={props.product.title}
					className="featured__img"
				></img>

				<div className="featured__data">
					<h3 className="featured__title">{props.product.title}</h3>
					<span className="featured__price">{formatVND(Number(props.product.cost))}</span>
				</div>

				<button className="button featured__button">ADD TO CART</button>
			</article>
		</>
	);
};

export default FeatureProduct;
