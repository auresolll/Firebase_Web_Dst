/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Divider,
	FormControl,
	MenuItem,
	Rating,
	Select,
	Stack,
	TextField,
} from "@mui/material";

import * as React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import ProductFilterSideBar from "../components/_FilterSideBar";
import ModifyProduct from "../components/_ModifyProduct";
import { formatVND } from "../helpers/utils";
import UseCategories from "../hooks/useCategories";
import UseProduct from "../hooks/useProduct";
import firebaseRepositoryInstance from "../services/firebaseRepository";
import { ActionType } from "../states/actions";
import { useMyContext } from "../states/context";
import { IProduct } from "../states/state";

interface IProductProps {}

interface ObjectFilter {
	category: string;
	cost: string;
	rating: string;
}

export type typeDialog = "new" | "edit";
const Product: React.FunctionComponent<IProductProps> = (props) => {
	const { dispatch, state } = useMyContext();
	const { PRODUCTS, setPagination, callbackProducts, setCallbackProducts } = UseProduct();
	const [filterObj, setFilterObj] = React.useState<ObjectFilter>({
		category: "",
		cost: "",
		rating: "",
	});
	const [search, setSearch] = React.useState<string>("");
	const [open, setOpen] = React.useState({
		new: false,
		edit: false,
	});
	const { CATEGORIES } = UseCategories();
	const [newCATEGORIES, setNewCATEGORIES] = React.useState([]);
	const [images, setImages] = React.useState([]);
	const maxNumber = 69;

	// UI CODE
	const handleClickOpen = (type: typeDialog) => {
		setOpen((pre) => {
			return {
				...pre,
				[type]: true,
			};
		});
	};

	const handleClose = () => {
		setOpen({
			new: false,
			edit: false,
		});
	};

	// LOGIC CODE
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		await firebaseRepositoryInstance.createProduct(state.Product);
		setCallbackProducts(!callbackProducts);
		setOpen({
			new: false,
			edit: false,
		});
		setImages([]);
	}

	const handleChangeSearch = (search: string) => {
		setSearch(search);
	};

	const handleChangeFilter = (name: string, value: string) => {
		setFilterObj((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleCleanFilter = () => {
		const cleanValue = {
			category: "",
			cost: "",
			rating: "",
		};
		setFilterObj((prevState) => {
			return { ...prevState, ...cleanValue };
		});
	};
	const applyFilter = (
		array: any,
		search: string,
		category: string,
		cost: string,
		rating: string
	) => {
		let products = array;
		if (search) {
			products = products.filter((val: { title: string }) => {
				const isSearch = val.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
				if (isSearch !== -1) {
					return val;
				}
			});
		}
		if (category) {
			products = products.filter((val: { category: string }) => {
				const isCategory = val.category === category;
				if (isCategory) {
					return val;
				}
			});
		}

		if (cost) {
			products = products.filter((val: { cost: any }) => {
				let isCost;
				switch (Number(cost)) {
					case 19000:
						isCost = Number(val.cost) < Number(cost);
						break;
					case 50000:
						isCost = Number(val.cost) < Number(cost) && Number(val.cost) > 19000;
						break;
					case 500000:
						isCost = Number(val.cost) > 50000;
						break;
					default:
						break;
				}
				if (isCost) {
					return val;
				}
			});
		}

		if (rating) {
			products = products.filter((val: { rating: any }) => {
				const isRating = Number(val.rating) <= Number(rating);
				if (isRating) {
					return val;
				}
			});
		}

		return products;
	};

	// const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
	// 	const offset = (page - 1) * 10 + 1;
	// 	const updatedValues = {
	// 		start: offset,
	// 		limit: offset + 10,
	// 	};
	// 	setPagination((prevState) => {
	// 		return { ...prevState, ...updatedValues };
	// 	});
	// };

	// DISPATCH CODE
	const handleSetDispatchProduct = (product: IProduct) => {
		dispatch({
			type: ActionType.SetProduct,
			payload: product,
		});
	};

	const handleChangeDispatchProduct = (key: string, value: string | Date) => {
		dispatch({
			type: ActionType.AddProduct,
			payload: {
				key,
				value,
			},
		});
	};

	const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		if (imageList.length > 0) {
			handleChangeDispatchProduct("thumbnail", imageList[0].data_url as string);
		}
		setImages(imageList as never[]);
	};

	React.useEffect(() => {
		let isCheck = true;
		if (isCheck) {
			const updatedValues = {
				limit: 10,
			};
			setPagination((prevState) => {
				return { ...prevState, ...updatedValues };
			});
		}
		return () => {
			isCheck = false;
		};
	}, []);

	const filterProducts = PRODUCTS
		? applyFilter(PRODUCTS, search, filterObj.category, filterObj.cost, filterObj.rating)
		: [];

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
	return (
		<>
			<div>
				<div className="inner-section">
					<div className="inner-section-header">
						<h1>Products</h1>
						<div className="inner-section-header-product">
							<Button
								variant="contained"
								startIcon={<AddIcon />}
								className="inner-section-header-btn"
								onClick={() => handleClickOpen("new")}
							>
								New Product
							</Button>
						</div>
					</div>

					<ProductFilterSideBar
						newCATEGORIES={newCATEGORIES}
						onFilter={handleChangeFilter}
						onCleanFilter={handleCleanFilter}
						searchField={search}
						onSearch={handleChangeSearch}
					/>

					<div className="inner-section-product-list">
						{filterProducts.length > 0 &&
							filterProducts.map((val: IProduct, index: number) => (
								<>
									<div className="inner-section-product-item" key={index}>
										<img
											src={val.thumbnail || require("../images/form.png")}
											onClick={() => {
												// Dispatch Product to state reducer to use for Edit modify component
												handleSetDispatchProduct(val);
												handleClickOpen("edit");
											}}
											alt={val.title}
										/>
										<h3>{val.title}</h3>
										<p>
											<span>{formatVND(Number(val.cost))}</span>
											<span>
												<Rating readOnly value={Number(val.rating)} size="small" />
											</span>
										</p>
									</div>
								</>
							))}
					</div>

					<ModifyProduct open={open.new} handleClose={handleClose}>
						<form onSubmit={handleSubmit}>
							<Stack gap={2} flexDirection="column" padding={3}>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Full Name</label>
										<TextField
											required
											id="filled-required"
											placeholder="Pepsi"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("title", e.target.value)}
										/>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Cost</label>
										<TextField
											required
											type={"cost"}
											id="filled-required"
											placeholder="20.000 VND"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("cost", e.target.value)}
										/>
									</Box>
								</Box>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Desc</label>
										<TextField
											required
											id="filled-required"
											type={"text"}
											placeholder="Lorem ipsum is placeholder text commonly used in the graphic"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("desc", e.target.value)}
										/>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Sale</label>
										<TextField
											required
											id="filled-required"
											type={"number"}
											placeholder="0%"
											defaultValue={0}
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("sale", e.target.value)}
										/>
									</Box>
								</Box>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Category</label>
										<FormControl size="small" sx={{ maxWidth: "235px", minWidth: "235px" }}>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Category"
												required
												onChange={(e) =>
													handleChangeDispatchProduct("category", e.target.value as string)
												}
											>
												{newCATEGORIES.map((val) => (
													<MenuItem value={val}>{val}</MenuItem>
												))}
											</Select>
										</FormControl>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Type</label>
										<FormControl size="small" sx={{ maxWidth: "235px", minWidth: "235px" }}>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Type"
												required
												onChange={(e) =>
													handleChangeDispatchProduct("type", e.target.value as string)
												}
											>
												<MenuItem value="Food">Food</MenuItem>
												<MenuItem value="Drink">Drink</MenuItem>
											</Select>
										</FormControl>
									</Box>
								</Box>
								<ImageUploading
									multiple
									value={images}
									onChange={onChange}
									maxNumber={maxNumber}
									dataURLKey="data_url"
								>
									{({
										imageList,
										onImageUpload,
										onImageRemoveAll,
										onImageRemove,
										onImageUpdate,
										dragProps,
									}) => (
										// write your building UI
										<div className="upload__image-wrapper">
											{imageList.length <= 0 && (
												<Button variant="outlined" onClick={onImageUpload} {...dragProps}>
													Click to upload image
												</Button>
											)}
											{imageList.map((image, index) => (
												<div key={index} className="image-item">
													<img src={image["data_url"]} alt="" width="100" />
													<div className="image-item__btn-wrapper">
														<Button onClick={() => onImageUpdate(index)}>Update</Button>
														<Button onClick={() => onImageRemove(index)}>Remove</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</ImageUploading>
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
					</ModifyProduct>
					<ModifyProduct open={open.edit} handleClose={handleClose}>
						<form onSubmit={handleSubmit}>
							<Stack gap={2} flexDirection="column" padding={3}>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Full Name</label>
										<TextField
											required
											id="filled-required"
											placeholder="Pepsi"
											defaultValue={state.Product.title}
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("title", e.target.value)}
										/>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Cost</label>
										<TextField
											required
											type={"cost"}
											defaultValue={state.Product.cost}
											id="filled-required"
											placeholder="20.000 VND"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("cost", e.target.value)}
										/>
									</Box>
								</Box>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Desc</label>
										<TextField
											required
											id="filled-required"
											type={"text"}
											defaultValue={state.Product.desc}
											placeholder="Lorem ipsum is placeholder text commonly used in the graphic"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("desc", e.target.value)}
										/>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Sale</label>
										<TextField
											required
											id="filled-required"
											type={"number"}
											defaultValue={state.Product.sale}
											placeholder="0%"
											variant="outlined"
											size="small"
											onChange={(e) => handleChangeDispatchProduct("sale", e.target.value)}
										/>
									</Box>
								</Box>
								<Box display={"flex"} flexDirection={"row"} gap={2}>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Category</label>
										<FormControl size="small" sx={{ maxWidth: "235px", minWidth: "235px" }}>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Category"
												required
												defaultValue=""
												onChange={(e) =>
													handleChangeDispatchProduct("category", e.target.value as string)
												}
											>
												{newCATEGORIES.map((val) => (
													<MenuItem value={val}>{val}</MenuItem>
												))}
											</Select>
										</FormControl>
									</Box>
									<Box display={"flex"} flexDirection={"column"} gap={1}>
										<label>Type</label>
										<FormControl size="small" sx={{ maxWidth: "235px", minWidth: "235px" }}>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Type"
												required
												defaultValue=""
												onChange={(e) =>
													handleChangeDispatchProduct("type", e.target.value as string)
												}
											>
												<MenuItem value="Food">Food</MenuItem>
												<MenuItem value="Drink">Drink</MenuItem>
											</Select>
										</FormControl>
									</Box>
								</Box>
								<ImageUploading
									multiple
									value={images}
									onChange={onChange}
									maxNumber={maxNumber}
									dataURLKey="data_url"
								>
									{({ imageList, onImageUpload, onImageRemove, onImageUpdate, dragProps }) => (
										// write your building UI

										<div className="upload__image-wrapper">
											{imageList.length === 0 && (
												<img src={state.Product.thumbnail || ""} alt="" width="100" />
											)}
											<Divider sx={{ margin: 2 }} />
											{imageList.length === 0 && (
												<Button variant="outlined" onClick={onImageUpload} {...dragProps}>
													Click to upload image
												</Button>
											)}
											{imageList.map((image, index) => (
												<div key={index} className="image-item">
													<img src={image["data_url"]} alt="" width="100" />
													<div className="image-item__btn-wrapper">
														<Button onClick={() => onImageUpdate(index)}>Update</Button>
														<Button
															onClick={() => {
																handleChangeDispatchProduct("thumbnail", "");
																onImageRemove(index);
															}}
														>
															Remove
														</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</ImageUploading>
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
					</ModifyProduct>
				</div>
			</div>
		</>
	);
};

export default Product;
