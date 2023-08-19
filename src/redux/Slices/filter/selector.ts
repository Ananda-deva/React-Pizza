import { RootState } from "../../store"

export const selectSort = (state: RootState) => state.filterReducer.sort
export const selectHome = (state: RootState) => state.filterReducer