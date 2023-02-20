import { DocumentData } from "@firebase/firestore-types";
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
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	startAfter,
	updateDoc,
	where,
} from "firebase/firestore";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { CATEGORIES, PRODUCTS, TOKENS, TOKEN_CLIENTS_DOCS, TYPE, USERS } from "../constants/utils";
import { Customer } from "../states/state";
import firebaseConfig from "./config.firebase";

class Firebase {
	protected app: FirebaseApp;
	protected db: Database;
	protected auth: Auth;
	protected googleProvider: GoogleAuthProvider;
	protected store: Firestore;
	public messaging: Messaging;

	constructor() {
		this.app = initializeApp(firebaseConfig);

		this.db = getDatabase(this.app);
		this.auth = getAuth(this.app);
		this.store = getFirestore(this.app);
		this.googleProvider = new GoogleAuthProvider();
		this.messaging = getMessaging(this.app);
		this.googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
	}

	public get getMessaging(): Messaging {
		return this.messaging;
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
			const usersColRef = collection(this.store, USERS);
			await setDoc(doc(usersColRef, "SF"), {
				name: "San Francisco",
				country: "USA",
				email: email,
				photoURL: photoURL,
			});
		}
	};

	public getCustomers = async () => {
		const usersColRef = collection(this.store, USERS);
		const usersSnap = await getDocs(usersColRef);
		if (usersSnap.size === 0) {
			console.log("No data available");
		}
		return usersSnap;
	};

	public getProductsWithPagination = async (_start: number, _limit: number) => {
		const productsColRef = collection(this.store, PRODUCTS);
		const _query = query(productsColRef, orderBy("timestamp"), startAfter(_start), limit(_limit));
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
}

class FirebaseMessaging extends Firebase {
	constructor() {
		super();
	}

	public getToken = async () => {
		return getToken(this.messaging, {
			vapidKey:
				"BIAPzcEYM4j5ynfNNiTlajVnfF5gpXLvXJQJ0PMrQhqK_tgHMuAGFSDxTRCxj4NGpaKr__u7jO6wDOO2KczHZPQ",
		}).then((token: string) => token);
	};

	public requestPermission = async () => {
		console.log("Requesting permission...");
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await this.getToken();
			console.log(token);
			this.sendTokenToServer(token);
			console.log("Notification permission granted.");
			return true;
		}
		return false;
	};

	public getTokenToServer = async () => {
		const tokensColRef = doc(collection(this.store, TOKENS), TOKEN_CLIENTS_DOCS);
		const tokens = await getDoc(tokensColRef);
		const result = tokens.data();
		return result;
	};

	public sendTokenToServer = async (token: string) => {
		const tokensColRef = collection(this.store, TOKENS);
		const _tokens = await this.getTokenToServer();
		const isExits = this.compareTokenOnSame(token, _tokens);
		if (isExits === false) return;
		if (_tokens === undefined) return;
		return updateDoc(doc(tokensColRef, TOKEN_CLIENTS_DOCS), {
			tokens: _tokens.tokens,
		});
	};

	public compareTokenOnSame = (token: string, list: DocumentData | undefined) => {
		if (list === undefined) return false;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const isExits = list.tokens.findIndex(
			(_token: DocumentData) => _token === (token as unknown as DocumentData)
		);
		if (isExits >= 0) return false;

		list.tokens.push(token as unknown as DocumentData);
		return true;
	};

	public onMessage = () => {
		return onMessage(this.messaging, (payload) => {
			console.log("Message received. ", payload);
		});
	};
}
const firebaseAuthInstance = new FirebaseAuth();
const firebaseMessagingInstance = new FirebaseMessaging();
const firebaseRepositoryInstance = new FirebaseRepository();

export { firebaseAuthInstance, firebaseMessagingInstance, firebaseRepositoryInstance };
