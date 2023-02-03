import { Box, Pagination, Stack } from "@mui/material";
import * as React from "react";
import { start } from "repl";
import ProductFilterSideBar from "../../components/_FilterSideBar";
import FeatureProduct from "../../components/_Product";
import { IProduct } from "../../constants/type";
import UseFeatureProducts from "../../hooks/useFeatureProducts";

interface IFeatureProps {}

type ObjectFilter = {
	category: string;
	cost: string;
	rating: string;
};
const Feature: React.FunctionComponent<IFeatureProps> = (props) => {
	const { PRODUCTS, setPagination } = UseFeatureProducts();
	const [filterObj, setFilterObj] = React.useState<ObjectFilter>({
		category: "",
		cost: "",
		rating: "",
	});
	const [search, setSearch] = React.useState<string>("");

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
		array: IProduct[],
		search: string,
		category: string,
		cost: string,
		rating: string
	) => {
		let products = array;
		if (search) {
			products = products.filter((val) => {
				const isSearch = val.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
				if (isSearch !== -1) {
					return val;
				}
			});
		}
		if (category) {
			products = products.filter((val) => {
				const isCategory = val.category === category;
				if (isCategory) {
					return val;
				}
			});
		}

		if (cost) {
			products = products.filter((val) => {
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
			products = products.filter((val) => {
				const isRating = Number(val.rating) <= Number(rating);
				if (isRating) {
					return val;
				}
			});
		}

		return products;
	};

	const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
		const offset = (page - 1) * 10 + 1;
		const updatedValues = {
			start: offset,
			limit: offset + 10,
		};
		setPagination((prevState) => {
			return { ...prevState, ...updatedValues };
		});
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
	return (
		<>
			<main className="main">
				<section className="section">
					<div className="feature_section">
						<Box padding={"1.5em 2.5em"}>
							<ProductFilterSideBar
								onFilter={handleChangeFilter}
								onCleanFilter={handleCleanFilter}
								searchField={search}
								onSearch={handleChangeSearch}
							/>
						</Box>
						<div className="featured__container grid">
							{filterProducts.length > 0 &&
								filterProducts.map((val: IProduct, index: number) => (
									<FeatureProduct product={val} key={index} />
								))}
						</div>
					</div>
					<Stack spacing={2} justifyContent={"center"} alignItems="center" marginY={"3em"}>
						<Pagination count={5} onChange={handleChangePage} />
					</Stack>
				</section>
			</main>
		</>
	);
};

export default Feature;
