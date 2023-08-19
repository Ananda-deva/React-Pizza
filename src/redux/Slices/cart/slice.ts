import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, CartSliceState } from '../cart/types';
import { getCartFromLS } from '../../../utils/getCartLocalStorage';
import { CalcTotalPrice } from '../../../utils/calcTotalPrice';

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice,
	items,
}

const cartSlice = createSlice ({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findPizza = state.items.find((obj) => obj.id === action.payload.id) 
			if (findPizza) {
				findPizza.count++
			} else {
				state.items.push({...action.payload, count: 1})
			}
				state.totalPrice = CalcTotalPrice(state.items)
		},
		minusItem(state, action: PayloadAction<string>) {
			const findPizza = state.items.find(obj => obj.id === action.payload)
			if (findPizza && findPizza.count > 0) {
				findPizza.count--; 
				state.totalPrice -= findPizza.price
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	}
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
