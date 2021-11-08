import React from 'react'
import { FaArrowLeft, FaArrowRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'

export const Pagination = ({ totalPage = 5, btnPage }) => {
  const handlePageClick = (data) => {
    let selected = data.selected;
    btnPage(selected + 1)
    // console.log(selected + 1)
  };
  return (
    <ReactPaginate
      previousLabel={<FaArrowLeft />}
      nextLabel={< FaArrowRight />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination__link"}
      nextLinkClassName={"pagination__link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"pagination__link--active"}
    />

  )
}

const ReactPagintation = styled.div`
width: 100%;
`
