import React from 'react'
import { Pagination as FPagination } from 'flowbite-react'
import { styled } from 'styled-components'

/**
 * Paginate component wrapping flowbite-react's Pagination with styled wrapper.
 *
 * @param {object} props
 * @param {number} [props.currentPage=1] - Current active page number.
 * @param {number} [props.totalPages=1] - Total number of pages.
 * @param {function(number): void} [props.onPageChange] - Callback triggered when the page changes.
 * @returns {JSX.Element}
 */
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
