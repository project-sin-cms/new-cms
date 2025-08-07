import React from 'react'
import {
    Table as FTable,
    TableBody as FTableBody,
    TableCell as FTableCell,
    TableHead as FTableHead,
    TableHeadCell as FTableHeadCell,
    TableRow as FTableRow,
    createTheme,
    ThemeProvider,
} from 'flowbite-react'

/**
 * ListTable component wrapping flowbite-react's Table with theme provider and scoped columns support.
 *
 * @param {object} props
 * @param {Array} props.columns - Column definitions with label and key.
 * @param {Array} props.items - Array of data objects to render as rows.
 * @param {Object.<string, function>} [props.scopedColumns={}] - Optional render functions for specific columns.
 * @param {object} [props.tableProps={ hoverable: true, striped: true }] - Props to pass to the Table component.
 * @returns {JSX.Element}
 */
export const ListTable = ({
    columns = [],
    items = [],
    scopedColumns = {},
    tableProps = { hoverable: true, striped: true },
}) => {
    const customTheme = createTheme({
        table: {
            wrapper: '',
        },
    })

    return (
        <>
            <ThemeProvider theme={customTheme}>
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
                                                return scopedColumns[column.key](item, row, idx)
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
            </ThemeProvider>
        </>
    )
}
