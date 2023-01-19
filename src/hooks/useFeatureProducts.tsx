import { DocumentData } from "firebase/firestore";
import * as React from "react";
import { IProduct } from "../constants/type";
import { firebaseRepositoryInstance } from "../services/firebase";

const UseFeatureProducts = () => {
	const [PRODUCTS, setPRODUCTS] = React.useState<IProduct[]>([]);

	React.useEffect(() => {
		const fetchProducts = () => {
			const products = firebaseRepositoryInstance.getProductsWithPagination(1, 4);
			products.then((val) => {
				const result: DocumentData[] = val.docs.map((el) => {
					return el.data();
				});
				setPRODUCTS(result as unknown as IProduct[]);
			});
		};
		const startFetch = setTimeout(fetchProducts, 1500);
		return () => clearTimeout(startFetch);
	}, []);
	return {
		PRODUCTS,
	};
};

export default UseFeatureProducts;
