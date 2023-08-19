import { configureStore } from "@reduxjs/toolkit";
import filterReducer  from './Slices/filter/slice'
import cartSlice  from './Slices/cart/slice'
import pizzaSlice  from './Slices/pizza/slice'
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		filterReducer,
		cartSlice,
		pizzaSlice,
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () =>  useDispatch<AppDispatch>()