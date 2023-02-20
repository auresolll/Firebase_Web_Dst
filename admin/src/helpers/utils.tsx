import { ICustomer } from "../states/state";

export const formatVND = (number: number) => {
	return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const convert = (str: string) => {
	var date = new Date(str),
		month = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	return [date.getFullYear(), month, day].join("-");
};

export const customerToStore = () => {
	const setCustomer = (customer: ICustomer) => {
		return localStorage.setItem("ICustomer", JSON.stringify(customer));
	};

	const resetCustomer = () => {
		return setCustomer({
			docId: "",
			email: "",
			name: "",
			password: "",
			address: "",
			phone: "",
			country: "",
			timestamp: "",
		});
	};

	const getCustomer = () => {
		return JSON.parse(localStorage.getItem("ICustomer") || `{}`);
	};

	return {
		setCustomer,
		getCustomer,
		resetCustomer,
	};
};
