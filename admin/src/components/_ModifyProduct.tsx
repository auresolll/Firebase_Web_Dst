import { Dialog } from "@mui/material";
import * as React from "react";

interface IModifyProductProps {
	open: boolean;
	handleClose: () => void;
	children: React.ReactNode;
}

const ModifyProduct: React.FunctionComponent<IModifyProductProps> = (props) => {
	const { open, handleClose, children } = props;
	return (
		<>
			<Dialog onClose={handleClose} open={open}>
				{children}
			</Dialog>
		</>
	);
};

export default ModifyProduct;
