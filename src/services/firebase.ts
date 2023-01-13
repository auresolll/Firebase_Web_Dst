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
import { Firestore, getFirestore } from "firebase/firestore";
import firebaseConfig from "./config.firebase";

class Firebase {
	private app: FirebaseApp;
	protected db: Firestore;
	protected auth: Auth;
	protected googleProvider: GoogleAuthProvider;

	constructor() {
		this.app = initializeApp(firebaseConfig);

		this.db = getFirestore(this.app);
		this.auth = getAuth(this.app);
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
		signInWithPopup(this.auth, this.googleProvider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				console.log({
					credential,
					token,
					user,
				});
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
}

const firebaseAuthInstance = new FirebaseAuth();
const FirebaseRepositoryInstance = new FirebaseRepository();

export { firebaseAuthInstance, FirebaseRepositoryInstance };
