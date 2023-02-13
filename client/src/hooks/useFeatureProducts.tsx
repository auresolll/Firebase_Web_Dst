import { DocumentData } from "firebase/firestore";
import * as React from "react";
import { IPagination, IProduct } from "../constants/type";
import { firebaseRepositoryInstance } from "../services/firebase";

const UseFeatureProducts = () => {
	const [PRODUCTS, setPRODUCTS] = React.useState<IProduct[]>([]);
	const [pagination, setPagination] = React.useState<IPagination>({
		start: 0,
		limit: 3,
	});

	React.useEffect(() => {
		const fetchProducts = () => {
			const products = firebaseRepositoryInstance.getProductsWithPagination(
				pagination.start,
				pagination.limit
			);

			products.then(async (val) => {
				const result: DocumentData[] = await val.docs.map((el) => {
					Object(el.data())["doc"] = el.id;
					return el.data();
				});
				setPRODUCTS(result as unknown as IProduct[]);
			});
		};
		const startFetch = setTimeout(fetchProducts, 1000);
		return () => clearTimeout(startFetch);
	}, [pagination.start, pagination.limit]);
	return {
		PRODUCTS,
		pagination,
		setPagination,
	};
};

export default UseFeatureProducts;
