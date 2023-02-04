import { Rating } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import * as React from "react";
import ProductFilterSideBar from "../components/_FilterSideBar";
import { formatVND } from "../helpers/utils";
import UseProduct, { IProduct } from "../hooks/useProduct";
interface IProductProps {}

interface ObjectFilter {
	category: string;
	cost: string;
	rating: string;
}

const Product: React.FunctionComponent<IProductProps> = (props) => {
	const { PRODUCTS, setPagination } = UseProduct();
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
			<main>
				<div className="inner-section">
					<div className="inner-section-header">
						<h1>Products</h1>
					</div>

					<ProductFilterSideBar
						onFilter={handleChangeFilter}
						onCleanFilter={handleCleanFilter}
						searchField={search}
						onSearch={handleChangeSearch}
					/>
					<div className="inner-section-product-list">
						{filterProducts.length > 0 &&
							filterProducts.map((val, index) => (
								<div className="inner-section-product-item" key={val.docId}>
									<img
										src="https://firebase-web-dst.vercel.app/static/media/c1.fb0c24a12fb6ba1154f5.png"
										alt=""
									/>
									<h3>{val.title}</h3>
									<p>
										<span>{formatVND(Number(val.cost))}</span>
										<span>
											<Rating readOnly value={4} size="small" />
										</span>
									</p>
								</div>
							))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Product;
