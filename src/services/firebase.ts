import { FirebaseApp, initializeApp } from "firebase/app";
import {
	Auth,
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import {
	collection,
	doc,
	Firestore,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	startAfter,
} from "firebase/firestore";
import { Customer } from "../states/state";
import firebaseConfig from "./config.firebase";

class Firebase {
	protected app: FirebaseApp;
	protected db: Database;
	protected auth: Auth;
	protected googleProvider: GoogleAuthProvider;
	protected store: Firestore;

	constructor() {
		this.app = initializeApp(firebaseConfig);

		this.db = getDatabase(this.app);
		this.auth = getAuth(this.app);
		this.store = getFirestore(this.app);
		this.googleProvider = new GoogleAuthProvider();

		this.googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
	}
}

class FirebaseAuth extends Firebase {
	constructor() {
		super();
	}

	public createAccount = (email: string, password: string) => {
		return createUserWithEmailAndPassword(this.auth, email, password);
	};

	public signIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(this.auth, email, password);
	};

	public signInWithPopup = () => {
		return signInWithPopup(this.auth, this.googleProvider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				return {
					credential,
					token,
					user,
				};
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.error({
					errorCode,
					errorMessage,
					email,
					credential,
				});
			});
	};

	public signOut = () => {
		signOut(this.auth);
	};

	public onAuthStateChanged = () => {
		return new Promise((resolve, reject) => {
			onAuthStateChanged(this.auth, (user) => {
				if (user) {
					resolve(user);
				} else {
					reject(new Error("Auth State Changed failed"));
				}
			});
		});
	};
}

class FirebaseRepository extends Firebase {
	constructor() {
		super();
	}

	public createCustomer = async (user: Customer) => {
		const { email, photoURL } = user;
		if (email !== "") {
			const usersColRef = collection(this.store, "users");
			await setDoc(doc(usersColRef, "SF"), {
				name: "San Francisco",
				country: "USA",
				email: email,
				photoURL: photoURL,
			});
		}
	};

	public getCustomers = async () => {
		const usersColRef = collection(this.store, "users");
		const usersSnap = await getDocs(usersColRef);
		if (usersSnap.size === 0) {
			console.log("No data available");
		}
		return usersSnap;
	};

	public getProductsWithPagination = async (_start: number, _limit: number) => {
		const productsColRef = collection(this.store, "products");
		const _query = query(productsColRef, orderBy("timestamp"), startAfter(_start), limit(_limit));
		const productsSnap = await getDocs(_query);
		if (productsSnap.size === 0) {
			console.log("No data available");
		}
		return productsSnap;
	};

	public getCategories = async () => {
		const categoriesColRef = collection(this.store, "categories");
		const categoriesSnap = await getDocs(categoriesColRef);
		if (categoriesSnap.size === 0) {
			console.log("No data available");
		}
		return categoriesSnap;
	};
}

const firebaseAuthInstance = new FirebaseAuth();
const firebaseRepositoryInstance = new FirebaseRepository();

export { firebaseAuthInstance, firebaseRepositoryInstance };
