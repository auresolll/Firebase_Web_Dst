import * as React from "react";
import { ICustomer } from "../states/state";
import firebaseRepositoryInstance from "../services/firebaseRepository";

const UseCustomer = () => {
	const [CUSTOMERS, setCUSTOMERS] = React.useState<ICustomer[]>([]);
	const [callData, setCallData] = React.useState<boolean>(true);
	const firebaseRepository = firebaseRepositoryInstance;

	const fetchCustomers = async () => {
		const result = await firebaseRepository.getCustomers();
		const data = result.docs.map((val) => {
			const newData = Object.assign(val.data(), { docId: val.id });
			return newData;
		});
		setCUSTOMERS(data as ICustomer[]);
	};
	React.useEffect(() => {
		const start = setTimeout(fetchCustomers, 300);
		return () => clearTimeout(start);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callData]);
	return {
		CUSTOMERS,
		setCUSTOMERS,
		callData,
		setCallData,
		fetchCustomers,
	};
};

export default UseCustomer;
