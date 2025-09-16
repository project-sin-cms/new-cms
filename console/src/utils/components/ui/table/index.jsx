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
import { HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineSwitchVertical } from 'react-icons/hi'

/**
 * ListTable component wrapping flowbite-react's Table with theme provider and scoped columns support.
 *
 * @param {object} props
 * @param {Array} props.columns - Column definitions with label and key.
 * @param {Array} props.items - Array of data objects to render as rows.
 * @param {Object.<string, function>} [props.scopedColumns={}] - Optional render functions for specific columns.
 * @param {object} [props.tableProps={ hoverable: true, striped: true }] - Props to pass to the Table component.
 * @param {object} [props.sortConfig={}] - Sort configuration with column and direction.
 * @param {function} [props.onSort] - Callback function when sort is triggered.
 * @returns {JSX.Element}
 */
export const ListTable = ({
    columns = [],
    items = [],
    scopedColumns = {},
    tableProps = { hoverable: true, striped: true },
    sortConfig = {},
    onSort,
    loading = false,
    skeletonRow = 10,
    nodata = null,
}) => {
    const customTheme = createTheme({
        table: {
            wrapper: '',
        },
    })

    const handleSort = (column) => {
        if (!onSort || column.sortable === false) return

        let direction = 'asc'
        if (sortConfig.column === column.key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc'
            } else if (sortConfig.direction === 'desc') {
                // 降順の次はクリア（ソートなし）
                onSort(null, null)
                return
            }
        }
        onSort(column.key, direction)
    }

    const getSortIcon = (column) => {
        if (column.sortable === false) return null

        if (sortConfig.column === column.key) {
            if (sortConfig.direction === 'asc') {
                return <HiOutlineArrowUp className="w-4 h-4 ml-1 flex-shrink-0" />
            } else if (sortConfig.direction === 'desc') {
                return <HiOutlineArrowDown className="w-4 h-4 ml-1 flex-shrink-0" />
            }
        }
        return <HiOutlineSwitchVertical className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" />
    }

    return (
        <>
            <ThemeProvider theme={customTheme}>
                <FTable {...tableProps}>
                    <FTableHead>
                        <FTableRow>
                            {columns.map((column, idx) => {
                                let props = column._props !== 'undefined' ? column._props : {}
                                const isSortable = column.sortable !== false

                                return (
                                    <FTableHeadCell
                                        key={idx}
                                        {...props}
                                        className={`${props?.className || ''} ${
                                            isSortable
                                                ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 select-none'
                                                : ''
                                        }`}
                                        onClick={() => handleSort(column)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="relative group flex-1 min-w-0 max-w-[60px]">
                                                <span className="block truncate">
                                                    {column.label}
                                                </span>
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-gray-50 text-xs rounded px-2 py-1 z-10 whitespace-nowrap pointer-events-none">
                                                    {column.label}
                                                </div>
                                            </div>
                                            {isSortable && (
                                                <div className="flex-shrink-0 ml-1">
                                                    {getSortIcon(column)}
                                                </div>
                                            )}
                                        </div>
                                    </FTableHeadCell>
                                )
                            })}
                        </FTableRow>
                    </FTableHead>
                    <FTableBody className="divide-y">
                        {loading && (
                            <>
                                {Array.from({ length: skeletonRow }).map((item, row) => {
                                    return (
                                        <FTableRow
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            key={row}
                                        >
                                            {React.Children.toArray(
                                                columns.map((column, idx) => {
                                                    return (
                                                        <FTableCell className={'p-3'} key={idx}>
                                                            <div className="animate-pulse w-full h-6 bg-gray-300 dark:bg-gray-500 rounded-xs" />
                                                        </FTableCell>
                                                    )
                                                })
                                            )}
                                        </FTableRow>
                                    )
                                })}
                            </>
                        )}
                        {!loading && items.length > 0 && (
                            <>
                                {items.map((item, row) => {
                                    return (
                                        <FTableRow
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            key={row}
                                        >
                                            {React.Children.toArray(
                                                columns.map((column, idx) => {
                                                    if (
                                                        typeof scopedColumns[column.key] !==
                                                        'undefined'
                                                    ) {
                                                        return scopedColumns[column.key](
                                                            item,
                                                            row,
                                                            idx
                                                        )
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
                            </>
                        )}
                    </FTableBody>
                </FTable>
            </ThemeProvider>
            {!loading && items.length === 0 && nodata}
        </>
    )
}
