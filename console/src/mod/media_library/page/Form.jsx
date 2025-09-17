const Contents = ({ children }) => {
    return <>{children}</>
}

export const New = () => {
    return (
        <>
            <Contents>新規作成</Contents>
        </>
    )
}

export const Edit = () => {
    return (
        <>
            <Contents>編集</Contents>
        </>
    )
}
