import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Alert,
	Box,
	Button,
	Collapse,
	Dialog,
	DialogContent,
	IconButton,
	Stack,
	TextField,
} from "@mui/material";
import * as React from "react";
import UseCustomer from "../hooks/useCustomer";

interface INewCustomerProps {
	open: boolean;
	errorMess: string;
	openError: boolean;
	handleChangeDispatchCustomer: (key: string, value: string) => void;
	handleSubmit(e: React.FormEvent): Promise<void>;
	handleClose: (value: string) => void;
	setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCustomer: React.FunctionComponent<INewCustomerProps> = (props) => {
	const {
		open,
		errorMess,
		openError,
		handleChangeDispatchCustomer,
		handleSubmit,
		handleClose,
		setOpenError,
	} = props;
	return (
		<>
			<Dialog onClose={handleClose} open={open}>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<Stack gap={2} flexDirection="column">
							<Box display={"flex"} flexDirection={"row"} gap={2}>
								<Box display={"flex"} flexDirection={"column"} gap={1}>
									<label>Full Name</label>
									<TextField
										required
										id="filled-required"
										placeholder="The Fuck"
										variant="outlined"
										size="small"
										onChange={(e) => handleChangeDispatchCustomer("name", e.target.value)}
									/>
								</Box>
								<Box display={"flex"} flexDirection={"column"} gap={1}>
									<label>Email</label>
									<TextField
										required
										type={"email"}
										id="filled-required"
										placeholder="example@gmail.com"
										variant="outlined"
										size="small"
										onChange={(e) => handleChangeDispatchCustomer("email", e.target.value)}
									/>
								</Box>
							</Box>
							<Box display={"flex"} flexDirection={"row"} gap={2}>
								<Box display={"flex"} flexDirection={"column"} gap={1}>
									<label>Password</label>
									<TextField
										required
										id="filled-required"
										type={"password"}
										placeholder="The Fuck"
										variant="outlined"
										size="small"
										onChange={(e) => handleChangeDispatchCustomer("password", e.target.value)}
									/>
								</Box>
								<Box display={"flex"} flexDirection={"column"} gap={1}>
									<label>Address</label>
									<TextField
										required
										id="filled-required"
										placeholder="Da lat Phu Dong"
										variant="outlined"
										size="small"
										onChange={(e) => handleChangeDispatchCustomer("address", e.target.value)}
									/>
								</Box>
							</Box>
							<Button
								type="submit"
								variant="contained"
								startIcon={<AddIcon />}
								className="inner-section-header-btn"
							>
								Save
							</Button>
						</Stack>
					</form>
				</DialogContent>
				<Collapse in={openError}>
					<DialogContent>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="error"
									size="small"
									onClick={() => {
										setOpenError(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							sx={{ mb: 2 }}
							color="error"
						>
							{errorMess}
						</Alert>
					</DialogContent>
				</Collapse>
			</Dialog>
		</>
	);
};

export default NewCustomer;
