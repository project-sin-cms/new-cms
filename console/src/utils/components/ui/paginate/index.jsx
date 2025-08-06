import React from 'react'
import { Pagination as FPagination } from 'flowbite-react'
import { styled } from 'styled-components'

export const Paginate = ({ currentPage = 1, totalPages = 1, onPageChange = () => {} }) => {
    const Wapper = styled.div`
        font-size: 0.8rem !important;
        button {
            width: 35px !important;
        }
    `

    return (
        <>
            <Wapper>
                <FPagination
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    previousLabel="<"
                    nextLabel=">"
                    className="pagination"
                />
            </Wapper>
        </>
    )
}
