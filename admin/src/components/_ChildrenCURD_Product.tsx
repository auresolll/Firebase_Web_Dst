/* eslint-disable react/jsx-no-duplicate-props */
import {
	Box,
	Button,
	Divider,
	FormControl,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { EDIT, NEW } from "../constants/utils";

import { IInitialState, IProduct } from "../states/state";
import ModifyProduct from "./_ModifyProduct";

interface IChildrenCRUD_ProductProps {
	open: {
		new: boolean;
		edit: boolean;
	};
	maxNumber: number;
	images: never[];
	state: IInitialState;
	newCATEGORIES: never[];

	handleClose: () => void;
	handleSubmit(e: React.FormEvent, operator: string): Promise<void>;
	handleRemoveProduct: (docId: string) => Promise<void>;
	onChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
	handleSetDispatchProduct: (product: IProduct) => void;
	handleChangeDispatchProduct: (key: string, value: string | Date) => void;
}

const ChildrenCRUD_Product: React.FunctionComponent<IChildrenCRUD_ProductProps> = (props) => {
	const {
		newCATEGORIES,
		state,
		images,
		maxNumber,
		open,
		handleClose,
		handleSubmit,
		handleRemoveProduct,
		handleSetDispatchProduct,
		handleChangeDispatchProduct,
		onChange,
	} = props;

	return (
		<>
			<ModifyProduct open={open.new} handleClose={handleClose}>
				<form onSubmit={(e) => handleSubmit(e, NEW)}>
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
										{newCATEGORIES.map((val, index) => (
											<MenuItem key={index} value={val}>
												{val}
											</MenuItem>
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
										onChange={(e) => handleChangeDispatchProduct("type", e.target.value as string)}
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
				<form onSubmit={(e) => handleSubmit(e, EDIT)}>
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
										defaultValue={state.Product.category}
										onChange={(e) =>
											handleChangeDispatchProduct("category", e.target.value as string)
										}
									>
										{newCATEGORIES.map((val, index) => (
											<MenuItem key={index} value={val}>
												{val}
											</MenuItem>
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
										defaultValue={state.Product.type}
										onChange={(e) => handleChangeDispatchProduct("type", e.target.value as string)}
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
									<Divider sx={{ margin: 2 }} />
									{imageList.length === 0 && (
										<Button variant="outlined" onClick={onImageUpload} {...dragProps}>
											Click to upload image
										</Button>
									)}
									{imageList.length === 0 && (
										<div className="upload__image-wrapper-center">
											<img
												src={state.Product.thumbnail || ""}
												loading="lazy"
												className="upload-img"
												alt=""
											/>
										</div>
									)}
									{imageList.map((image, index) => (
										<div key={index} className="image-item">
											<img src={image["data_url"]} loading="lazy" className="upload-img" alt="" />
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
				<Button
					sx={{ marginX: 3, marginBottom: 2 }}
					onClick={() => {
						handleRemoveProduct(String(state.Product.docId));
					}}
					variant="contained"
					startIcon={<AddIcon />}
					className="inner-section-header-btn"
				>
					Remove
				</Button>
			</ModifyProduct>
		</>
	);
};

export default ChildrenCRUD_Product;
