/**
 * Row component that renders a CSS grid container with a given number of columns.
 *
 * @param {object} props
 * @param {string} [props.className] - Additional class names to apply.
 * @param {number} [props.cols=12] - Number of columns in the grid (Tailwind's `grid-cols-{n}`).
 * @param {React.Key} [props.key] - React key for the row.
 * @param {React.ReactNode} props.children - Child elements to render inside the grid.
 * @returns {JSX.Element}
 */
export const Row = ({ className = '', cols = 12, key = null, children }) => {
    return (
        <div className={`grid grid-cols-${cols} ${className}`} key={key}>
            {children}
        </div>
    )
}

/**
 * Col component that renders a grid column span inside a Row.
 *
 * @param {object} props
 * @param {number|null} [props.col] - Number of columns to span (Tailwind's `col-span-{n}`).
 * @param {string} [props.className] - Additional class names to apply.
 * @param {React.Key} [props.key] - React key for the column.
 * @param {React.ReactNode} props.children - Child elements to render inside the column.
 * @returns {JSX.Element}
 */
export const Col = ({ col = null, className = '', key = null, children }) => {
    return (
        <div class={`${col ? 'col-span-' + col : ''} ${className}`} key={key}>
            {children}
        </div>
    )
}
