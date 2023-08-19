import React from 'react'
import { setSort } from '../redux/Slices/filter/slice'
import { useDispatch } from 'react-redux'
import { Sort, SortPropertyEnum } from '../redux/Slices/filter/types';


type SortItem = {
	name: string;
	sortProperty: SortPropertyEnum;
}

export const typeSort: SortItem[] = [
	{name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC},
	{name: 'цене', sortProperty: SortPropertyEnum.PRICE_DESC},
	{name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE_DESC},
]

type SortPopUpValue = {
	value: Sort;
}

	const SortPopUp: React.FC<SortPopUpValue> = React.memo(({ value }) => {
		const dispatch = useDispatch()
		// const sort = useSelector(selectSort)
		const sortRef = React.useRef<HTMLSpanElement>(null);


	const [openSort, setOpenSort] = React.useState(false)


	const openSortId = (obj: SortItem) => {
		dispatch(setSort(obj))
		setOpenSort(false)
	}

	React.useEffect(() => {

		const handleClickOutside = (event: any) => {
			if(!event.composedPath().includes(sortRef.current)) {
				setOpenSort(false);
			}
		}
	document.body.addEventListener('click', handleClickOutside)

	return () => document.body.removeEventListener('click', handleClickOutside)
	}, [openSort])

	return (
		<div  className="sort">
		<div className="sort__label">
			<svg
				width="10"
				height="6"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
					fill="#2C2C2C"
				/>
			</svg>
			<b>Сортировка по:</b>
			<span ref={sortRef} onClick={() => setOpenSort(!openSort)}>{value.name}</span>
		</div>
		{openSort && 
			<div className="sort__popup">
				<ul>
					{typeSort.map((obj) => (
						<li key={obj.name} onClick={() => openSortId(obj)} className={value.sortProperty === obj.sortProperty ? "active" : ''}>{obj.name}</li>
					))}
				</ul>
				</div>
		}
	</div>
	)
})

export default SortPopUp