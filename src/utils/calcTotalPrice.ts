import { CartItem } from "../redux/Slices/cart/types"

export const CalcTotalPrice = (items: CartItem[]) => {
		return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}