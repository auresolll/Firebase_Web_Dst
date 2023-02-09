/* eslint-disable array-callback-return */
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import UseCustomer from "../hooks/useCustomer";
import * as React from "react";
import firebaseRepositoryInstance from "../services/firebaseRepository";

interface Data {
	name: string;
	email: string;
	country: string;
	address: string;
	phone: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number, search: string) {
	let stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});

	if (search) {
		stabilizedThis = stabilizedThis.filter(
			(el: any) => el[0].name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		numeric: false,
		disablePadding: true,
		label: "Name",
	},
	{
		id: "email",
		numeric: true,
		disablePadding: false,
		label: "Email",
	},
	{
		id: "phone",
		numeric: true,
		disablePadding: false,
		label: "Phone",
	},
	{
		id: "address",
		numeric: true,
		disablePadding: false,
		label: "Address",
	},
	{
		id: "country",
		numeric: true,
		disablePadding: false,
		label: "Country",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	rowsRemove: readonly string[];
	callData: boolean;
	setCallData: React.Dispatch<React.SetStateAction<boolean>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected, rowsRemove, callData, setCallData } = props;
	const firebaseRepository = firebaseRepositoryInstance;
	const handleRemove = () => {
		firebaseRepository.removeCustomers(rowsRemove);
		return setCallData(!callData);
	};
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant="h6"
					id="tableTitle"
					component="div"
				></Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title="Delete" onClick={handleRemove}>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

interface ICustomerTableProps {
	search: string;
}
export default function CustomerTable(props: ICustomerTableProps) {
	const { search } = props;
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const { CUSTOMERS, callData, setCallData } = UseCustomer();

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = CUSTOMERS.map((n) => String(n.docId));
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string, docId: string) => {
		const selectedIndex = selected.indexOf(docId);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, docId);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (docId: string) => selected.indexOf(docId) !== -1;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					rowsRemove={selected}
					callData={callData}
					setCallData={setCallData}
				/>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={CUSTOMERS.length}
						/>
						<TableBody>
							{stableSort(CUSTOMERS, getComparator(order, orderBy), search)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(String(row.docId));
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, String(row.name), String(row.docId))}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={index}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId,
													}}
												/>
											</TableCell>
											<TableCell component="th" id={labelId} scope="row" padding="none">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.email}</TableCell>
											<TableCell align="right">{row.phone ? row.phone : "Don't update"}</TableCell>
											<TableCell align="right">
												{row.address ? row.address : "Don't update"}
											</TableCell>
											<TableCell align="right">
												{row.country ? row.country : "Don't update"}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={CUSTOMERS.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
