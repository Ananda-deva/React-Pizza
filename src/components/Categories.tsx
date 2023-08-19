import React from 'react'

type CategoriesProps = {
	value: number;
	onClickViewCategories: (i: number) => void
}

const Categories: React.FC <CategoriesProps> = React.memo(({ value, onClickViewCategories }) => {

	const categoriesArr = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
	
	return (
		<div className="categories">
			<ul>
			{categoriesArr.map((name, i) => (
					<li key={name} onClick={() => onClickViewCategories(i)} className={ value === i ? "active" : '' }>
						{name}
					</li>
				))}
			</ul>
		</div>
	)
})


export default Categories
