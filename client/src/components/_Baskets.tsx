import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { CHECKOUT, FEATURE, SIGNIN } from "../constants/router";
import { IExtra } from "../constants/type";
import { formatVND } from "../helpers/utils";
import { ActionType } from "../states/actions";
import { useStore } from "../states/context";
import ExtraBasket from "./_ExtraBasket";
import { Anchor } from "./_Header";

interface IBasketProps {
	anchor: Anchor;
	toggleDrawer: (
		anchor: Anchor,
		open: boolean
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
	stateDrawer: {
		right: boolean;
	};
}

type PRODUCT_DETAIL = {
	productId: string;
	extra: IExtra[];
};
const Basket: React.FunctionComponent<IBasketProps> = (props) => {
	const { state, dispatch } = useStore();
	const [total, setTotal] = React.useState<number>(0);
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [PRODUCT_DETAIL, setPRODUCT_DETAIL] = React.useState<PRODUCT_DETAIL>({
		productId: "",
		extra: [],
	});

	const handleClickOpen = (extra: IExtra[], productId: string) => {
		setOpen(true);
		if (extra.length > 0) {
			setPRODUCT_DETAIL({
				...PRODUCT_DETAIL,
				extra: extra,
				productId: productId,
			});
		}
	};

	const handleClose = () => {
		setOpen(false);
	};
	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && state.baskets.basket.length > 0) {
			let subTotal = 0;
			state.baskets.basket.filter((val) => {
				subTotal += Number(val.product.cost) * val.quantity;
				if (val.extra.length > 0) {
					val.extra.filter((val) => {
						subTotal += Number(val.cost) * val.quantity;
					});
				}
			});
			setTotal(subTotal);
		}

		return () => {
			isChecked = false;
		};
	}, [state.baskets.basket]);
	return (
		<>
			<React.Fragment key={props.anchor}>
				<Drawer
					anchor={props.anchor}
					open={props.stateDrawer[props.anchor]}
					onClose={props.toggleDrawer(props.anchor, false)}
					sx={{ justifyContent: "space-between" }}
					className="custom-drawer-basket"
				>
					{state.customer.uid ? (
						<>
							{state.baskets.basket.length === 0 && (
								<div className="basket-login">
									<div className="basket-login-pic">
										<img src="https://static.thenounproject.com/png/4700132-200.png" alt="" />
									</div>
									<h1 className="basket-login-title">
										LOL Click <Link to={FEATURE}>here</Link> to view foods
									</h1>
								</div>
							)}
							{state.baskets.basket.length > 0 && (
								<>
									<div className="basket-section">
										<div className="basket-container">
											<div className="basket-container-nav">
												<h4 className="basket-container-nav-title">
													My Basket <span>( {state.baskets.basket.length} item )</span>
												</h4>
												<div className="basket-container-toggle">
													<p onClick={props.toggleDrawer(props.anchor, false)}>Close</p>
													<p onClick={() => dispatch({ type: ActionType.ResetBasket })}>
														Clean Basket
													</p>
												</div>
											</div>
											<div className="basket-container-products">
												{state.baskets.basket.map((val) => (
													<div key={val.product.timestamp} className="basket-container-product">
														<div className="basket-container-product-quantity">
															<button
																onClick={() =>
																	dispatch({
																		type: ActionType.ChangeQuantityProduct,
																		payload: {
																			timestamp: val.product.timestamp,
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
																		type: ActionType.ChangeQuantityProduct,
																		payload: {
																			timestamp: val.product.timestamp,
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
																<img src={require("../img/c1.png")} alt={val.product.title} />
															</div>
															<ul>
																<li>{val.product.title}</li>
																<li>Quantity: {val.quantity}</li>
															</ul>
															<ul>
																<li>Cost: {formatVND(Number(val.product.cost))}</li>
																<li
																	onClick={() => handleClickOpen(val.extra, val.product.timestamp)}
																>
																	Extra: <span>({val.extra.length} item)</span>
																</li>
															</ul>
														</div>
														<div className="basket-container-product-toggle">
															<button
																onClick={() =>
																	dispatch({
																		type: ActionType.DeleteProduct,
																		payload: {
																			timestamp: val.product.timestamp,
																		},
																	})
																}
															>
																X
															</button>
														</div>
													</div>
												))}

												{PRODUCT_DETAIL.extra.length > 0 && (
													<ExtraBasket
														productId={PRODUCT_DETAIL.productId}
														fullScreen={fullScreen}
														handleClose={handleClose}
														open={open}
													/>
												)}
											</div>
										</div>
										<div className="basket-container-checkout">
											<div className="content">
												<p className="basket-container-checkout-title">Subtotal Amount</p>
												<p className="basket-container-checkout-cost">{formatVND(Number(total))}</p>
											</div>
											<button>
												<Link to={CHECKOUT}>CheckOut</Link>
											</button>
										</div>
									</div>
								</>
							)}
						</>
					) : (
						<>
							<div className="basket-login">
								<div className="basket-login-pic">
									<img
										width="50%"
										src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
										alt=""
									/>
								</div>
								<h1 className="basket-login-title">
									You must <Link to={SIGNIN}>Sign In</Link>
								</h1>
							</div>
						</>
					)}
				</Drawer>
			</React.Fragment>
		</>
	);
};

export default Basket;
