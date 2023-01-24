import { Drawer } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { FEATURE, SIGNIN } from "../constants/router";
import { formatVND } from "../helpers/utils";
import { useStore } from "../states/context";
import { Anchor } from "./_Header";

interface IBasketsProps {
	anchor: Anchor;
	toggleDrawer: (
		anchor: Anchor,
		open: boolean
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
	stateDrawer: {
		right: boolean;
	};
}

const Baskets: React.FunctionComponent<IBasketsProps> = (props) => {
	const { state } = useStore();
	return (
		<>
			<React.Fragment key={props.anchor}>
				<Drawer
					anchor={props.anchor}
					open={props.stateDrawer[props.anchor]}
					onClose={props.toggleDrawer(props.anchor, false)}
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
									<div className="basket-container">
										<div className="basket-container-nav">
											<h4 className="basket-container-nav-title">
												My Basket <span>( {state.baskets.basket.length} item )</span>
											</h4>
											<div className="basket-container-toggle">
												<p onClick={props.toggleDrawer(props.anchor, false)}>Close</p>
												<p>Clean Basket</p>
											</div>
										</div>
										<div className="basket-container-products">
											{state.baskets.basket.map((val) => (
												<div key={val.product.timestamp} className="basket-container-product">
													<div className="basket-container-product-quantity">
														<button>+</button>
														<button>-</button>
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
															<li>
																Extra: <span>({val.extra.length} item)</span>
															</li>
														</ul>
													</div>
													<div className="basket-container-product-toggle">
														<button>X</button>
													</div>
												</div>
											))}
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

export default Baskets;
