import React from 'react'
import {
    Table as FTable,
    TableBody as FTableBody,
    TableCell as FTableCell,
    TableHead as FTableHead,
    TableHeadCell as FTableHeadCell,
    TableRow as FTableRow,
} from 'flowbite-react'

export const ListTable = ({
    columns = [],
    items = [],
    scopedColumns = {},
    tableProps = { hoverable: true, striped: true },
}) => {
    return (
        <>
            <div className="overflow-x-auto">
                <FTable {...tableProps}>
                    <FTableHead>
                        <FTableRow>
                            {columns.map((column, idx) => {
                                let props = column._props !== 'undefined' ? column._props : {}
                                return (
                                    <FTableHeadCell key={idx} {...props}>
                                        {column.label}
                                    </FTableHeadCell>
                                )
                            })}
                        </FTableRow>
                    </FTableHead>
                    <FTableBody className="divide-y">
                        {items.map((item, row) => {
                            return (
                                <FTableRow
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={row}
                                >
                                    {React.Children.toArray(
                                        columns.map((column, idx) => {
                                            if (typeof scopedColumns[column.key] !== 'undefined') {
                                                return scopedColumns[column.key](item, row)
                                            } else {
                                                return (
                                                    <FTableCell className={'p-3'} key={idx}>
                                                        {item[column.key]}
                                                    </FTableCell>
                                                )
                                            }
                                        })
                                    )}
                                </FTableRow>
                            )
                        })}
                    </FTableBody>
                </FTable>
            </div>
        </>
    )
}
