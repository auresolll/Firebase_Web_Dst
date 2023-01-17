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
import { child, Database, get, getDatabase, ref, set } from "firebase/database";
import {
	collection,
	endAt,
	Firestore,
	getCountFromServer,
	getFirestore,
	query,
	startAt,
} from "firebase/firestore";
import { Customer } from "../states/state";
import { generatorRandomKey } from "./../helpers/utils";
import firebaseConfig from "./config.firebase";

class Firebase {
	private app: FirebaseApp;
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
		const { email, uid } = user;
		if (email !== "" && uid !== "") {
			console.log(
				await set(ref(this.db, "users/" + generatorRandomKey()), {
					email,
					uid,
				})
			);
		}
	};

	public getCustomer = async () => {
		const dbRef = ref(this.db);
		return get(child(dbRef, `users/`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					return snapshot.val();
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	public getProductsWithPagination = async (_start: number, _limit: number) => {
		const productsRef = collection(this.store, "products");
		const query_ = query(productsRef, startAt(_start), endAt(_limit));
		const snapshot = await getCountFromServer(query_);
		console.log("count: ", snapshot.data().count);
		return snapshot;
	};

	public getCategories = () => {
		const dbRef = ref(this.db);
		return get(child(dbRef, `categories/`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					return snapshot.val();
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

const firebaseAuthInstance = new FirebaseAuth();
const FirebaseRepositoryInstance = new FirebaseRepository();

export { firebaseAuthInstance, FirebaseRepositoryInstance };
