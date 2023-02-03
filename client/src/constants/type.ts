export interface IProduct {
	title: string;
	cost: string;
	desc: string;
	rating: number;
	thumbnail: string;
	sale: number;
	timestamp: string;
	category: string;
	type: string;
}

export interface IExtra {
	[x: string]: any;
	title: string;
	cost: string;
	thumbnail: string;
	quantity: number;
	timestamp: string;
}

export interface ICategories {
	drink: [];
	food: [];
}
export interface IPagination {
	start: number;
	limit: number;
}
