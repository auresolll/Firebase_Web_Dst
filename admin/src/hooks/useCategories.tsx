import { DocumentData } from "firebase/firestore";
import * as React from "react";
import firebaseRepositoryInstance from "../services/firebaseRepository";

const UseCategories = () => {
	const [CATEGORIES, setCATEGORIES] = React.useState<DocumentData[]>([]);

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchCategories = () => {
				const categories = firebaseRepositoryInstance.getCategories();
				categories.then((data: any) => {
					const result = data.docs.map((el: any) => {
						Object(el.data())["docId"] = el.id;
						return el.data();
					});
					setCATEGORIES(result);
				});
			};
			fetchCategories();
		}
		return () => {
			isChecked = false;
		};
	}, []);
	return {
		CATEGORIES,
	};
};

export default UseCategories;
