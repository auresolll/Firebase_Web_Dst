import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getMessaging, Messaging } from "firebase/messaging";
import firebaseConfig from "./firebaseConfig";

export default class Firebase {
	protected app: FirebaseApp;
	protected auth: Auth;
	protected googleProvider: GoogleAuthProvider;
	protected store: Firestore;
	protected messaging: Messaging;

	constructor() {
		this.app = initializeApp(firebaseConfig);

		this.auth = getAuth(this.app);
		this.store = getFirestore(this.app);
		this.googleProvider = new GoogleAuthProvider();
		this.messaging = getMessaging(this.app);
		this.googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
	}
}
