import { collection, doc, updateDoc } from "firebase/firestore";
import { Messaging } from "firebase/messaging";
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { getToken, onMessage } from "firebase/messaging";
import { TOKENS, TOKEN_ADMIN_FELID } from "../constants/utils";
import Firebase from "./firebase";

class FirebaseMessaging extends Firebase {
	constructor() {
		super();
	}

	public get getMessaging(): Messaging {
		return this.messaging;
	}

	public getToken = async () => {
		return getToken(this.messaging, {
			vapidKey: process.env.REACT_APP_FIREBASE_KEY_MESSAGE,
		}).then((token: string) => token);
	};

	public requestPermission = () => {
		console.log("Requesting permission...");
		Notification.requestPermission().then(async (permission) => {
			if (permission === "granted") {
				const token = await this.getToken();
				this.sendTokenToServer(token);
				console.log("Notification permission granted.");
			}
		});
	};

	public onMessage = () => {
		return onMessage(this.messaging, (payload) => {
			console.log("Message received. ", payload);
		});
	};

	public sendTokenToServer = (token: string) => {
		const tokensColRef = collection(this.store, TOKENS);
		const timestamp = new Date();
		return updateDoc(doc(tokensColRef, TOKEN_ADMIN_FELID), {
			token: token,
			timestamp: timestamp,
		});
	};
}
const firebaseMessagingInstance = new FirebaseMessaging();
export default firebaseMessagingInstance;
