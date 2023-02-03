import { Dialog, DialogContent } from "@mui/material";
import * as React from "react";
import { IExtra } from "../constants/type";
import { formatVND } from "../helpers/utils";
import { ActionType } from "../states/actions";
import { useStore } from "../states/context";

interface IExtraBasketProps {
	productId: string;
	fullScreen: boolean;
	handleClose: () => void;
	open: boolean;
}

const ExtraBasket: React.FunctionComponent<IExtraBasketProps> = (props) => {
	const { productId, fullScreen, handleClose, open } = props;
	const { state, dispatch } = useStore();
	const [extra, setExtra] = React.useState<IExtra[]>([]);

	React.useEffect(() => {
		state.baskets.basket.map((val) => {
			const isProduct = val.product.timestamp === productId;
			if (isProduct) {
				return setExtra(val.extra as unknown as IExtra[]);
			}
		});
	}, [state.baskets.basket, productId]);
	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogContent>
					<div className="basket-section">
						<div className="basket-container">
							<div className="basket-container-nav">
								<h4 className="basket-container-nav-title">
									My Basket <span>( {state.baskets.basket.length} item )</span>
								</h4>
								<div className="basket-container-toggle">
									<p onClick={handleClose}>Close</p>
									<p
										onClick={() =>
											dispatch({
												type: ActionType.ResetExtra,
												payload: {
													timestamp: productId,
												},
											})
										}
									>
										Clean Basket
									</p>
								</div>
							</div>
							<div className="basket-container-products">
								{extra.length > 0 &&
									extra.map((val) => (
										<div key={val.timestamp} className="basket-container-product">
											<div className="basket-container-product-quantity">
												<button
													onClick={() =>
														dispatch({
															type: ActionType.ChangeQuantityExtra,
															payload: {
																timestampExtra: val.timestamp,
																timestampProduct: productId,
																operate: true,
															},
														})
													}
												>
													+
												</button>
												<button
													onClick={() =>
														dispatch({
															type: ActionType.ChangeQuantityExtra,
															payload: {
																timestampExtra: val.timestamp,
																timestampProduct: productId,
																operate: false,
															},
														})
													}
												>
													-
												</button>
											</div>
											<div className="basket-container-product-info">
												<div className="basket-container-product-info-pic">
													<img src={require("../img/c1.png")} alt={val.title} />
												</div>
												<ul>
													<li>{val.title}</li>
													<li>Quantity: {val.quantity}</li>
												</ul>
												<ul>
													<li>Cost: {formatVND(Number(val.cost))}</li>
												</ul>
											</div>
											<div className="basket-container-product-toggle">
												<button
													onClick={() =>
														dispatch({
															type: ActionType.DeleteExtra,
															payload: {
																timestampExtra: val.timestamp,
																timestampProduct: productId,
															},
														})
													}
												>
													X
												</button>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ExtraBasket;
