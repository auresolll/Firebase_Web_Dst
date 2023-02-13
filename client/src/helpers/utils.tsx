import { Baskets, Customer, Status } from "../states/state";

export const displayActionMessage = (msg: string, status = "info") => {
	const div = document.createElement("div");
	const span = document.createElement("span");

	div.className = `toast ${
		status === "info" ? "toast-info" : status === "success" ? "toast-success" : "toast-error"
		// eslint-disable-next-line indent
	}`;
	span.className = "toast-msg";
	span.textContent = msg;
	div.appendChild(span);

	if (document.querySelector(".toast")) {
		document.body.removeChild(document.querySelector(".toast") as Element);
		document.body.appendChild(div);
	} else {
		document.body.appendChild(div);
	}

	setTimeout(() => {
		try {
			document.body.removeChild(div);
		} catch (e) {
			console.log(e);
		}
	}, 2000);
};

export const generatorRandomKey = () => {
	return Date.now();
};

export const formatVND = (number: number) => {
	return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const customerToStore = () => {
	const setCustomer = (customer: Customer) => {
		return localStorage.setItem("customer", JSON.stringify(customer));
	};

	const resetCustomer = () => {
		return setCustomer({
			displayName: "",
			email: "",
			phoneNumber: "",
			photoURL: "",
			providerId: "",
			status: Status.signOut,
			uid: "",
		});
	};

	const getCustomer = () => {
		return JSON.parse(localStorage.getItem("customer") || `{}`);
	};

	return {
		setCustomer,
		getCustomer,
		resetCustomer,
	};
};

export const basketToStore = () => {
	const setBasket = (baskets: Baskets) => {
		return localStorage.setItem("basket", JSON.stringify(baskets));
	};

	const getBasket = () => {
		return JSON.parse(localStorage.getItem("basket") || `[]`);
	};

	return {
		setBasket,
		getBasket,
	};
};
