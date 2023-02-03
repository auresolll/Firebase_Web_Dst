/* eslint-disable @typescript-eslint/no-useless-constructor */
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { CATEGORIES, USERS } from "../constants/utils";
import { ICustomer } from "../states/state";
import Firebase from "./firebase";

class FirebaseRepository extends Firebase {
	constructor() {
		super();
	}

	public createCustomer = async (customer: ICustomer, docId: string) => {
		const { email, name, address } = customer;
		const usersColRef = collection(this.store, USERS);
		return setDoc(doc(usersColRef, docId), {
			name,
			country: "VN",
			address,
			email,
			photoURL:
				"https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-1/327271301_680861220487729_1480706414865291410_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DuBLRnLEI58AX-BeQKS&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfDyGFv9GT-C8Xi0hhW2cguwDQnaabpDtlKif5_F03VXUQ&oe=63E23A26",
			timestamp: new Date(),
		});
	};

	public getCustomers = async () => {
		const usersColRef = collection(this.store, USERS);
		const usersSnap = await getDocs(usersColRef);
		if (usersSnap.size === 0) {
			console.log("No data available");
		}
		return usersSnap;
	};

	// public getProductsWithPagination = async (_start: number, _limit: number) => {
	// 	const productsColRef = collection(this.store, PRODUCTS);
	// 	const _query = query(productsColRef, orderBy("timestamp"), startAfter(_start), limit(_limit));
	// 	const productsSnap = await getDocs(_query);
	// 	if (productsSnap.size === 0) {
	// 		console.log("No data available");
	// 	}
	// 	return productsSnap;
	// };

	public getCategories = async () => {
		const categoriesColRef = collection(this.store, CATEGORIES);
		const categoriesSnap = await getDocs(categoriesColRef);
		if (categoriesSnap.size === 0) {
			console.log("No data available");
		}
		return categoriesSnap;
	};

	// public getProductsWithSlug = async (slug: string) => {
	// 	const productsColRef = collection(this.store, PRODUCTS);
	// 	const q = query(productsColRef, where(TYPE, "==", `${slug}`));
	// 	const productsSnap = await getDocs(q);
	// 	if (productsSnap.size === 0) {
	// 		console.log("No data available");
	// 	}
	// 	return productsSnap;
	// };
}
const firebaseRepositoryInstance = new FirebaseRepository();

export default firebaseRepositoryInstance;
