import React from 'react'
import ReactPaginate from 'react-paginate'

import style from './Pagination.module.scss'

type PaginationProps = {
	onClickCurrentPage: any ;
}

const Pagination: React.FC <PaginationProps> = ({ onClickCurrentPage }) => {
	return (
		<ReactPaginate
		className={style.root}
		breakLabel="..."
		nextLabel=">"
		previousLabel="<"
		onPageChange={(id) => onClickCurrentPage(id.selected+1)}
		pageRangeDisplayed={4}
		pageCount={3}
		renderOnZeroPageCount={null}
	/>
	)
}


export default Pagination