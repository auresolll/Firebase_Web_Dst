/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from "console";
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AUTH_WRONG_USER } from "../constants/errors";
import { HOME } from "../constants/router";
import { ERROR, SUCCESS } from "../constants/utils";
import { displayActionMessage } from "../helpers/utils";
import { firebaseAuthInstance, FirebaseRepositoryInstance } from "../services/firebase";
import { ActionType } from "../states/actions";
import { useStore } from "../states/context";
import { Status } from "../states/state";

const useAuth = () => {
	const authInstance = firebaseAuthInstance;
	const dbInstance = FirebaseRepositoryInstance;
	const navigate = useNavigate();
	const { state, dispatch } = useStore();

	const handleSignOut = () => {
		authInstance.signOut();
		return authInstance.onAuthStateChanged().catch((error) => {
			dispatch({
				type: ActionType.AddCustomer,
				payload: {
					displayName: "",
					email: "",
					phoneNumber: "",
					photoURL: "",
					providerId: "",
					status: Status.signOut,
					uid: "",
				},
			});

			return displayActionMessage(Status.signOut, SUCCESS);
		});
	};
	const handleAuthLocal = (email: string, password: string): void => {
		authInstance
			.signIn(email, password)
			.then((cb: UserCredential) => {
				cb.user.uid && navigate(HOME);
				dispatch({
					type: ActionType.AddCustomer,
					payload: {
						displayName: cb.user.displayName,
						email: cb.user.email,
						phoneNumber: cb.user.phoneNumber,
						photoURL: cb.user.photoURL as string | undefined,
						providerId: cb.user.providerId,
						status: Status.signIn,
						uid: cb.user.uid,
					},
				});
				return displayActionMessage(Status.signIn, SUCCESS);
			})
			.catch(async (error: any) => {
				// When a consumer doesn't have an account, create one
				if (String(error.message) === AUTH_WRONG_USER) {
					await authInstance.createAccount(email, password);
					return authInstance.onAuthStateChanged().then((cb: any) => {
						dispatch({
							type: ActionType.AddCustomer,
							payload: {
								displayName: cb.displayName,
								email: cb.email,
								phoneNumber: cb.phoneNumber,
								photoURL: cb.photoURL as string | undefined,
								providerId: cb.providerId,
								status: Status.signIn,
								uid: cb.uid,
							},
						});
						dbInstance.createCustomer(cb);
						navigate(HOME);
						displayActionMessage(Status.newAccount, SUCCESS);
						return dbInstance.createCustomer(cb);
					});
				}
				return displayActionMessage(error.message, ERROR);
			});
	};

	const handleAuthGoogle = () => {
		return authInstance.signInWithPopup().then((cb) => {
			console.log(typeof cb);
			if (typeof cb === "object") {
				dispatch({
					type: ActionType.AddCustomer,
					payload: {
						displayName: cb.user.displayName,
						email: cb.user.email,
						phoneNumber: cb.user.phoneNumber,
						photoURL: cb.user.photoURL as string | undefined,
						providerId: cb.user.providerId,
						status: Status.signIn,
						uid: cb.user.uid,
					},
				});
				navigate(HOME);
				return displayActionMessage(Status.signIn, SUCCESS);
			}
		});
	};

	return {
		authInstance,
		dbInstance,
		state,
		handleAuthLocal,
		handleSignOut,
		handleAuthGoogle,
	};
};

export default useAuth;
