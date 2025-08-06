export const Row = ({ className = '', cols = 12, key = null, children }) => {
    return (
        <div className={`grid grid-cols-${cols} ${className}`} key={key}>
            {children}
        </div>
    )
}

export const Col = ({ col = null, className = '', key = null, children }) => {
    return (
        <div class={`${col ? 'col-span-' + col : ''} ${className}`} key={key}>
            {children}
        </div>
    )
}
