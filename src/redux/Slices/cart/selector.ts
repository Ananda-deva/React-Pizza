import { RootState } from "../../store"

export const cartSelector = (state: RootState) => state.cartSlice

export const cartItemsSelector = (id: string) => (state: RootState) => state.cartSlice.items.find((obj) => obj.id === id)