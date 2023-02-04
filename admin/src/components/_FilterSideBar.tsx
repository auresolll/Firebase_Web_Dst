import CloseIcon from "@mui/icons-material/Close";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
	Box,
	Divider,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	Rating,
	Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import UseCategories from "../hooks/useCategories";

export const FILTER_RATING_OPTIONS = ["1", "2", "3", "4"];

export const FILTER_PRICE_OPTIONS = [
	{ value: "below", label: "Below 20.000 VND", price: "19000" },
	{ value: "between", label: "Between 20.000 - 50.000 VND", price: "50000" },
	{ value: "above", label: "Above 50.000 VND", price: "500000" },
];

type Anchor = "top" | "left" | "bottom" | "right";

interface IProductFilterSideBarProps {
	searchField: string;
	onFilter: (name: string, value: string) => void;
	onCleanFilter: () => void;
	onSearch: (search: string) => void;
}
const ProductFilterSideBar: React.FunctionComponent<IProductFilterSideBarProps> = (props) => {
	const anchor: Anchor = "right";
	const [state, setState] = React.useState({
		right: false,
	});
	const { CATEGORIES } = UseCategories();
	const [newCATEGORIES, setNewCATEGORIES] = React.useState([]);

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && CATEGORIES.length > 0) {
			const result = CATEGORIES.map((category) => Object.values(category))
				.reduce((a, b) => a.concat(b))
				.reduce((a, b) => a.concat(b));
			setNewCATEGORIES(result);
		}
		return () => {
			isChecked = false;
		};
	}, [CATEGORIES]);
	const toggleDrawer =
		(anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	return (
		<>
			<React.Fragment key={anchor}>
				<Stack flexDirection={"row"} justifyContent={"end"}>
					<Button disableRipple color="inherit" onClick={toggleDrawer(anchor, true)}>
						<h5 className="filter-btn">Filters&nbsp;</h5>
						<FilterListIcon />
					</Button>
					{/* <Search search={props.searchField} onSearch={props.onSearch} /> */}
				</Stack>
				<Drawer
					anchor={anchor}
					open={state[anchor]}
					PaperProps={{
						sx: { width: 280, border: "none", overflow: "hidden" },
					}}
					onClose={toggleDrawer(anchor, false)}
				>
					<div className="clearfix">
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ px: 1, py: 2 }}
						>
							<p className="font-semibold ml-1">Filters</p>
							<IconButton onClick={toggleDrawer(anchor, false)}>
								<CloseIcon />
							</IconButton>
						</Stack>

						<Divider />
						<Stack spacing={3} sx={{ p: 3 }}>
							<div>
								<h5 className="font-semibold">Categories</h5>
								<RadioGroup sx={{ padding: "1em 0 0" }}>
									{newCATEGORIES.length > 0 &&
										newCATEGORIES.map((item, index: number) => (
											<FormControlLabel
												key={index}
												value={item}
												control={<Radio />}
												label={item}
												onClick={() => props.onFilter("category", item)}
											/>
										))}
								</RadioGroup>
							</div>
							<div>
								<h5 className="font-semibold">Price</h5>
								<RadioGroup>
									{FILTER_PRICE_OPTIONS.map((item, index) => (
										<FormControlLabel
											key={index}
											sx={{ fontFamily: "Public Sans" }}
											value={item.price}
											control={<Radio />}
											label={item.label}
											onClick={() => props.onFilter("cost", item.price)}
										/>
									))}
								</RadioGroup>
							</div>
							<div>
								<h5 className="font-semibold">Rating</h5>
								<RadioGroup>
									{FILTER_RATING_OPTIONS.map((item, index) => (
										<FormControlLabel
											key={item}
											value={item}
											control={
												<Radio
													disableRipple
													color="default"
													icon={<Rating readOnly value={1 + index} />}
													checkedIcon={<Rating readOnly value={1 + index} />}
													sx={{
														"&:hover": { bgcolor: "transparent" },
													}}
												/>
											}
											onClick={() => props.onFilter("rating", item)}
											label="& Up"
											sx={{
												my: 0.5,
												borderRadius: 1,
												"&:hover": { opacity: 0.48 },
											}}
										/>
									))}
								</RadioGroup>
							</div>
						</Stack>

						<Divider />
						<Box sx={{ p: 3 }}>
							<Button
								fullWidth
								size="large"
								type="submit"
								color="error"
								variant="outlined"
								onClick={props.onCleanFilter}
							>
								<DoNotDisturbAltIcon sx={{ marginRight: ".5em" }} />
								<span>Clear All</span>
							</Button>
						</Box>
					</div>
				</Drawer>
			</React.Fragment>
		</>
	);
};

export default ProductFilterSideBar;
