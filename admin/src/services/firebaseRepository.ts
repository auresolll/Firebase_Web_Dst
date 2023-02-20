import { DocumentData, getCountFromServer, updateDoc, where } from "firebase/firestore";
import { PRODUCTS } from "./../constants/routes";
import { ORDERS } from "./../constants/utils";
import { IProduct } from "./../states/state";
/* eslint-disable @typescript-eslint/no-useless-constructor */
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	startAfter,
} from "firebase/firestore";
import { CATEGORIES, TYPE, USERS } from "../constants/utils";
import { ICustomer } from "../states/state";
import Firebase from "./firebase";

class FirebaseRepository extends Firebase {
	constructor() {
		super();
	}

	public createCustomer = async (customer: ICustomer, docId: string) => {
		const { email, name, address } = customer;
		const usersColRef = collection(this.store, USERS);
		const timestamp = new Date();

		return setDoc(doc(usersColRef, docId), {
			name,
			country: "VN",
			address,
			email,
			photoURL:
				"https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-1/327271301_680861220487729_1480706414865291410_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DuBLRnLEI58AX-BeQKS&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfDyGFv9GT-C8Xi0hhW2cguwDQnaabpDtlKif5_F03VXUQ&oe=63E23A26",
			timestamp,
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

	public removeCustomer = async (docId: string) => {
		await deleteDoc(doc(this.store, USERS, docId));
	};

	public removeCustomers = (array: readonly string[]) => {
		array.forEach(async (element) => {
			await deleteDoc(doc(this.store, USERS, element));
		});
	};

	public getProductsWithPagination = async (_start: number, _limit: number) => {
		const productsColRef = collection(this.store, PRODUCTS);
		const _query = query(productsColRef, orderBy("title"), startAfter(_start), limit(_limit));
		const productsSnap = await getDocs(_query);
		if (productsSnap.size === 0) {
			console.log("No data available");
		}
		return productsSnap;
	};

	public getCategories = async () => {
		const categoriesColRef = collection(this.store, CATEGORIES);
		const categoriesSnap = await getDocs(categoriesColRef);
		if (categoriesSnap.size === 0) {
			console.log("No data available");
		}
		return categoriesSnap;
	};

	public getProductsWithSlug = async (slug: string) => {
		const productsColRef = collection(this.store, PRODUCTS);
		const q = query(productsColRef, where(TYPE, "==", `${slug}`));
		const productsSnap = await getDocs(q);
		if (productsSnap.size === 0) {
			console.log("No data available");
		}
		return productsSnap;
	};

	public createProduct = async (product: IProduct) => {
		const { title, category, cost, desc, rating, sale, thumbnail, type } = product;
		const productsColRef = collection(this.store, PRODUCTS);
		const timestamp = new Date();
		return setDoc(doc(productsColRef), {
			title,
			category,
			cost,
			desc,
			rating,
			sale,
			thumbnail,
			type,
			timestamp,
		});
	};

	public modifyProduct = async (product: IProduct) => {
		const { docId, title, category, cost, desc, rating, sale, thumbnail, type } = product;
		const productsColRef = collection(this.store, PRODUCTS);
		const timestamp = new Date();
		return updateDoc(doc(productsColRef, docId), {
			title,
			category,
			cost,
			desc,
			rating,
			sale,
			thumbnail,
			type,
			timestamp,
		});
	};

	public removeProduct = async (docId: string) => {
		await deleteDoc(doc(this.store, PRODUCTS, docId));
	};

	public getTotalProductsSeller = async () => {
		const orderColRef = collection(this.store, ORDERS);
		const query_ = query(orderColRef);
		const snapshot = await getCountFromServer(query_);
		const orderDocsSnap = await getDocs(orderColRef);
		orderDocsSnap.forEach((val) => {
			snapshot.data().count += val.data().extra.length;
		});
		return {
			count: snapshot.data().count,
			collection: ORDERS,
		};
	};

	public getTotalCustomers = async () => {
		const customersColRef = collection(this.store, USERS);
		const query_ = query(customersColRef);
		const snapshot = await getCountFromServer(query_);
		return {
			count: snapshot.data().count,
			collection: USERS,
		};
	};

	public getTotalCostEarn = async () => {
		const ordersColRef = collection(this.store, ORDERS);
		const ordersSnap = await getDocs(ordersColRef);
		const initialValue = 0;
		const calculatesCostEarn = ordersSnap.docs.map((val) => val.data());
		const total = calculatesCostEarn.reduce((accumulator, currentValue) => {
			accumulator = accumulator + Number(currentValue.cost) * Number(currentValue.quantity);
			if (currentValue.extra.length > 0) {
				currentValue.extra.filter(
					(a: DocumentData, b: number) => (accumulator += Number(a.cost) * Number(a.quantity))
				);
			}
			return accumulator;
		}, initialValue);
		return {
			count: total,
			collection: ORDERS,
		};
	};

	public getEarnWithTime = async (from: Date, to: Date) => {
		const ordersColRef = collection(this.store, ORDERS);
		const query_ = query(
			ordersColRef,
			orderBy("timestamp"),
			where("timestamp", ">", new Date(from.toString())),
			where("timestamp", "<", new Date(to.toString()))
		);
		const ordersSnap = await getDocs(query_);
		return ordersSnap.docs.map((el) => {
			return el.data();
		});
	};

	public getEarnWithNowDay = async () => {
		const ordersColRef = collection(this.store, ORDERS);
		const startOfToday = new Date();
		startOfToday.setUTCHours(0, 0, 0, 0);
		const query_ = query(ordersColRef, orderBy("timestamp"), where("timestamp", ">", startOfToday));
		const ordersSnap = await getDocs(query_);
		const data = ordersSnap.docs.map((el) => {
			return el.data();
		});
		return data;
	};
}
const firebaseRepositoryInstance = new FirebaseRepository();
export default firebaseRepositoryInstance;
