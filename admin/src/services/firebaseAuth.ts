import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	deleteUser,
	User,
} from "firebase/auth";
import Firebase from "./firebase";

class FirebaseAuth extends Firebase {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor() {
		super();
	}

	public createAccount = (email: string, password: string) => {
		return createUserWithEmailAndPassword(this.auth, email, password);
	};

	public removeAccount = (user: User) => {
		return deleteUser(user);
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
const firebaseAuthInstance = new FirebaseAuth();
export default firebaseAuthInstance;
