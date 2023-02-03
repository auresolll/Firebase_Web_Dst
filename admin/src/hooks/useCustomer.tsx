import * as React from "react";
import { ICustomer } from "../states/state";
import firebaseRepositoryInstance from "../services/firebaseRepository";

const UseCustomer = () => {
	const [CUSTOMERS, setCUSTOMERS] = React.useState<ICustomer[]>([]);
	console.log(CUSTOMERS);

	const firebaseRepository = firebaseRepositoryInstance;
	React.useEffect(() => {
		const fetchCustomers = async () => {
			const result = await firebaseRepository.getCustomers();
			const data = await result.docs.map((val) => {
				return val.data();
			});
			setCUSTOMERS(data as ICustomer[]);
		};
		const start = setTimeout(fetchCustomers, 300);
		return () => clearTimeout(start);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		CUSTOMERS,
	};
};

export default UseCustomer;
