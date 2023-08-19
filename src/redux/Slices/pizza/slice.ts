import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItems, PizzaSliceState, SearchPizzaParams, Status } from './types';
			
			const initialState: PizzaSliceState = {
				items: [],
				status: Status.LOADING, // loading || success || error
			}
	
export const fetchPizzas = createAsyncThunk<PizzaItems[], SearchPizzaParams>('pizza/fetchByIdStatusStatus', async (params) => {
	const { currentPage, categoriesChange, sortChange } = params;
	
	try {
		const { data } = await axios.get(
			`https://64d20df0f8d60b1743615ba6.mockapi.io/items?page=${currentPage}&limit=4&` + categoriesChange + sortChange
					);
					return data;
				} catch (error) {
					console.error(error);
				}
			});
			
const pizzaSlice = createSlice ({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItems[]>) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING
				state.items = []
				console.log('Идёт отправка');
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
					// action.payload contains the fetched data
					state.items = action.payload; // Update the state with fetched data
					state.status = Status.SUCCESS
					console.log('Кайфуй!Всё чётко:)');
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				state.status = Status.ERROR
				state.items = []
				console.log('Была ошибка:', action.error); // action.error contains the error data
			});
		}
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer