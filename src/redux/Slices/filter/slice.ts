import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types'

const initialState: FilterSliceState = {
	viewCategories: 0,
	currentPage: 1,
	searchValue: '',
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.PRICE_DESC
	},
}

const filterSlice = createSlice ({
	name: 'filter',
	initialState,
	reducers: {
		setViewCategories(state, action: PayloadAction<number>) {
			state.viewCategories = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.sort = action.payload.sort;
			state.currentPage = action.payload.currentPage;
			// state.viewCategories = action.payload.viewCategories;
		},

	}
})

export const { setViewCategories, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer