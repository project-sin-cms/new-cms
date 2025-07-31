import React, { useState } from 'react'
import { Pagination as FPagination } from 'flowbite-react'
import { styled } from 'styled-components'

export const Paginate = ({ current = 1, totalPage = 3, onPageChange = () => {} }) => {
    const [currentPage, setCurrentPage] = useState(current)
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
                    totalPages={totalPage}
                    onPageChange={(page) => {
                        setCurrentPage(page)
                        onPageChange(page)
                    }}
                    previousLabel="<"
                    nextLabel=">"
                    className="pagination"
                />
            </Wapper>
        </>
    )
}
