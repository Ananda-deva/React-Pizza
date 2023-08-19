export type PizzaItems = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: number;
	size: number;
	count: number;
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface PizzaSliceState {
	items: PizzaItems[];
	status :  Status

}

export type SearchPizzaParams = {
	searchValue: string;
	currentPage: string ;
	categoriesChange: string ;
	sortChange: string ;
}