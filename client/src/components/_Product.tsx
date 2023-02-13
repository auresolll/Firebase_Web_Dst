/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Checkbox, Divider, Drawer } from "@mui/material";
import { Stack } from "@mui/system";
import { DocumentData } from "firebase/firestore";
import * as React from "react";
import { Link } from "react-router-dom";
import { SIGNIN } from "../constants/router";
import { IExtra, IProduct } from "../constants/type";
import { basketToStore, formatVND } from "../helpers/utils";
import { firebaseRepositoryInstance } from "../services/firebase";
import { ActionType } from "../states/actions";
import { useStore } from "../states/context";
import { Basket } from "../states/state";

interface IFeatureProductProps {
	product: IProduct;
}

type Anchor = "right";
const FeatureProduct: React.FunctionComponent<IFeatureProductProps> = (props) => {
	const anchor: Anchor = "right";
	const { state, dispatch } = useStore();
	const [extraProducts, setExtraProducts] = React.useState<IExtra[]>([]);
	const [stateDraw, setState] = React.useState({
		right: false,
	});
	const [DRINK_PRODUCTS, setDRINK_PRODUCTS] = React.useState<DocumentData[]>([]);
	const toggleDrawer =
		(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const handleAddToBasket = (timestamp: string): void => {
		const cb = (el: Basket) => el.product.timestamp === timestamp;
		const isCheckedExits = state.baskets.basket.findIndex(cb);
		if (isCheckedExits === -1) {
			dispatch({
				type: ActionType.AddBasket,
				payload: {
					product: props.product,
					quantity: 1,
					extra: extraProducts,
				},
			});
		}
		setExtraProducts([]);
		setState({ ...state, [anchor]: false });
	};
	const handleExtraProducts = (options: IExtra) => {
		setExtraProducts((pre) => [...pre, options]);
	};
	React.useEffect(() => {
		const fetchProducts = async () => {
			const drink = firebaseRepositoryInstance.getProductsWithSlug("drink");
			setDRINK_PRODUCTS((await drink).docs.map((val) => val.data()));
		};
		const timer = setTimeout(fetchProducts, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<article className="featured__card">
				<span className="featured__tag">Sale</span>
				<img
					onClick={toggleDrawer(anchor, true)}
					src={require("../img/c1.png")}
					alt={props.product.title}
					className="featured__img"
				></img>

				<div className="featured__data">
					<h3 className="featured__title">{props.product.title}</h3>
					<span className="featured__price">{formatVND(Number(props.product.cost))}</span>
				</div>

				<button className="button featured__button">ADD TO CART</button>

				<div className="order">
					<Drawer anchor={anchor} open={stateDraw[anchor]} onClose={toggleDrawer(anchor, false)}>
						<div className="order_container">
							<div className="order_content">
								<img
									className="order_content_pic"
									src={require("../img/c1.png")}
									alt={props.product.title}
								/>
								<div className="order_content_information">
									<h1 className="order_content_title">{props.product.title}</h1>
									<p className="order_content_desc">{props.product.desc}</p>
									<p className="order_content_cost">
										Cost: {formatVND(Number(props.product.cost))}
									</p>
								</div>
							</div>
							<div className="order_extra">
								<div className="order_attach">
									<h5 className="order_attach_title">Drink Attach</h5>
									{DRINK_PRODUCTS.length !== 0 &&
										DRINK_PRODUCTS.map((val, index: number) => (
											<>
												<Stack key={val.timestamp} flexDirection={"row"} alignItems={"center"}>
													<Checkbox
														size="small"
														onClick={() =>
															handleExtraProducts({
																title: val.title,
																cost: val.cost,
																thumbnail: val.thumbnail,
																quantity: 1,
																timestamp: val.timestamp,
															})
														}
													/>
													<p className="order_attach_item">
														{`${val.title} | ${formatVND(Number(val.cost))}`}
													</p>
												</Stack>
											</>
										))}
								</div>
							</div>
						</div>
						<Divider />
						<Box sx={{ p: 3 }}>
							{state.customer.uid ? (
								<Button
									onClick={() => {
										handleAddToBasket(props.product.timestamp);
									}}
									fullWidth
									size="large"
									type="submit"
									color="success"
									variant="outlined"
								>
									<AddCircleIcon sx={{ marginRight: ".5em" }} />
									<span>add to basket</span>
								</Button>
							) : (
								<Button fullWidth size="large" type="submit" color="success" variant="outlined">
									<AddCircleIcon sx={{ marginRight: ".5em" }} />
									<span>
										<Link to={SIGNIN}>add to basket</Link>
									</span>
								</Button>
							)}
						</Box>
					</Drawer>
				</div>
			</article>
		</>
	);
};

export default FeatureProduct;
