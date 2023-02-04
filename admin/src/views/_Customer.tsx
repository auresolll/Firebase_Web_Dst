import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import * as React from "react";
import NewCustomer from "../components/_NewCustomer";
import CustomerTable from "../components/_TableCustomers";
import UseCustomer from "../hooks/useCustomer";
import firebaseAuthInstance from "../services/firebaseAuth";
import firebaseRepositoryInstance from "../services/firebaseRepository";
import { ActionType } from "../states/actions";
import { useMyContext } from "../states/context";

interface ICustomerProps {}

const Customer: React.FunctionComponent<ICustomerProps> = (props) => {
	const { state, dispatch } = useMyContext();
	const [open, setOpen] = React.useState(false);
	const [errorMess, setErrorMess] = React.useState<string>("");
	const [openError, setOpenError] = React.useState(false);
	const firebaseAuth = firebaseAuthInstance;
	const firebaseRepository = firebaseRepositoryInstance;
	const { fetchCustomers } = UseCustomer();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const { email, password } = state.Customer;
		try {
			const invalidAuth = await firebaseAuth.createAccount(email, password);
			if (invalidAuth.user.uid) {
				await firebaseRepository.createCustomer(state.Customer, invalidAuth.user.uid);
				setErrorMess("");
				fetchCustomers();
				setOpenError(false);
				setOpen(false);
			}
		} catch (error: any) {
			console.error(error.message);
			setErrorMess(error.message);
			setOpenError(true);
		}
	}

	const handleChangeDispatchCustomer = (key: string, value: string) => {
		dispatch({
			type: ActionType.AddCustomer,
			payload: {
				key,
				value,
			},
		});
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
	};

	return (
		<>
			<main>
				<div className="inner-section">
					<div className="inner-section-header">
						<h1 className="inner-section-header-title">Customer</h1>
						<div>
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								className="inner-section-header-btn"
								onClick={handleClickOpen}
							>
								New Customer
							</Button>
							<NewCustomer
								open={open}
								errorMess={errorMess}
								handleChangeDispatchCustomer={handleChangeDispatchCustomer}
								handleClose={handleClose}
								handleSubmit={handleSubmit}
								openError={openError}
								setOpenError={setOpenError}
							/>
						</div>
					</div>
					<CustomerTable />
				</div>
			</main>
		</>
	);
};

export default Customer;
