export const Card = ({ className = '', rounded = false, children }) => {
    return (
        <>
            <div
                className={`${
                    rounded ? 'rounded-2xl ' : ''
                } border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
            >
                {children}
            </div>
        </>
    )
}

export const CardHeader = ({ className = 'px-3 py-2', children }) => {
    return <>{children && <div className={`border-b ${className}`}>{children}</div>}</>
}

export const CardBody = ({ className = 'px-3 py-2', children }) => {
    return (
        <>
            <div className={`${className}`}>{children}</div>
        </>
    )
}

export const CardFooter = ({ className = 'px-3 py-2', children }) => {
    return (
        <>
            <div className={`border-t ${className}`}>{children}</div>
        </>
    )
}
