export const SUCCESS = "success";
export const ERROR = "error";

// Database
export const TYPE = "type";
export const PRODUCTS = "products";
export const USERS = "users";
export const CATEGORIES = "categories";
export const TOKENS = "tokens";
export const TOKEN_CLIENTS_DOCS = "clients";

// Slug Type
export const DRINK = "drink";
export const FOOD = "food";

export const registerServiceWorker = () => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("firebase-messaging-sw.js")
			.then(function (registration) {
				console.log(registration);
				return registration.scope;
			})
			.catch(function (err) {
				return err;
			});
	}
};
