import * as React from "react";
import FirebaseRepository from "../services/firebaseRepository";
interface IPagination {
	start: number;
	limit: number;
}

export interface IProduct {
	docId: string;
	title: string;
	cost: string;
	desc: string;
	rating: number;
	thumbnail: string;
	sale: number;
	timestamp: string;
	category: string;
	type: string;
}

const UseProduct = () => {
	const [PRODUCTS, setPRODUCTS] = React.useState<IProduct[]>([]);
	const [callbackProducts, setCallbackProducts] = React.useState<boolean>(true);
	const [pagination, setPagination] = React.useState<IPagination>({
		start: 0,
		limit: 3,
	});

	React.useEffect(() => {
		const fetchProducts = () => {
			const products = FirebaseRepository.getProductsWithPagination(
				pagination.start,
				pagination.limit
			);

			products.then(async (val) => {
				const result = await val.docs.map((el) => {
					Object(el.data())["docId"] = el.id;
					return el.data();
				});
				setPRODUCTS(result as unknown as IProduct[]);
			});
		};
		const startFetch = setTimeout(fetchProducts, 100);
		return () => clearTimeout(startFetch);
	}, [pagination.start, pagination.limit, callbackProducts]);
	return {
		PRODUCTS,
		pagination,
		setPagination,
		callbackProducts,
		setCallbackProducts,
	};
};

export default UseProduct;
