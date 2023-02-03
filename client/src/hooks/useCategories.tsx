import { DocumentData } from "firebase/firestore";
import * as React from "react";
import { firebaseRepositoryInstance } from "../services/firebase";

const UseCategories = () => {
	const [CATEGORIES, setCATEGORIES] = React.useState<DocumentData[]>([]);

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchCategories = () => {
				const categories = firebaseRepositoryInstance.getCategories();
				categories.then((data) => {
					const result: DocumentData[] = data.docs.map((val) => {
						return val.data();
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
