import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useStore } from "../../states/context";
import { formatVND } from "../../helpers/utils";
import { StoreState } from "../../states/state";
import { IExtra } from "../../constants/type";

function createData(name: string, cost: number, quantity: number) {
	return {
		name,
		cost,
		quantity,
	};
}

function Row(props: { row: ReturnType<typeof createData>; extra: IExtra[] }) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{formatVND(row.cost)}</TableCell>
				<TableCell align="right">{row.quantity}</TableCell>
			</TableRow>
			{props.extra.length > 0 && (
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									Extra
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell />
											<TableCell>Name</TableCell>
											<TableCell align="right">Cost</TableCell>
											<TableCell align="right">Quantity</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{props.extra.map((val) => (
											<TableRow key={val.timestamp}>
												<TableCell />
												<TableCell>{val.title}</TableCell>
												<TableCell align="right">{formatVND(Number(val.cost))}</TableCell>
												<TableCell align="right">{val.quantity}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</React.Fragment>
	);
}

export default function OrderSummary() {
	const { state } = useStore();
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Name</TableCell>
						<TableCell align="right">Cost</TableCell>
						<TableCell align="right">Quantity</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.baskets.basket.map((row) => (
						<Row
							key={row.product.timestamp}
							row={{
								name: row.product.title,
								cost: Number(row.product.cost),
								quantity: row.quantity,
							}}
							extra={row.extra}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
