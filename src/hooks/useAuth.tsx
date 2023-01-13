/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AUTH_WRONG_USER } from "../constants/errors";
import { HOME } from "../constants/router";
import { ERROR, SUCCESS } from "../constants/utils";
import { displayActionMessage } from "../helpers/utils";
import { firebaseAuthInstance } from "../services/firebase";
import { ActionType } from "../states/actions";
import { useStore } from "../states/context";
import { Status } from "../states/state";

const useAuth = () => {
	const authInstance = firebaseAuthInstance;
	const navigate = useNavigate();
	const { state, dispatch } = useStore();

	const handleAuthLocal = (email: string, password: string): void => {
		authInstance
			.signIn(email, password)
			.then((cb: UserCredential) => {
				dispatch({
					type: ActionType.AddCustomer,
					payload: {
						displayName: cb.user.displayName,
						email: cb.user.email,
						phoneNumber: cb.user.phoneNumber,
						photoURL: cb.user.photoURL,
						providerId: cb.user.providerId,
						status: Status.signIn,
						uid: cb.user.uid,
					},
				});
				cb.user.uid && navigate(HOME);
				return displayActionMessage(Status.signIn, SUCCESS);
			})
			.catch((error: any) => {
				// When a consumer doesn't have an account, create one
				if (String(error.message) === AUTH_WRONG_USER) {
					authInstance.createAccount(email, password);
					return authInstance.onAuthStateChanged().then((cb: unknown) => {
						console.log(cb);
						navigate(HOME);
						return displayActionMessage(Status.newAccount, SUCCESS);
					});
				}
				return displayActionMessage(error.message, ERROR);
			});
	};

	return {
		state,
		handleAuthLocal,
	};
};

export default useAuth;
