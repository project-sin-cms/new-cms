import { useParams } from 'react-router'
import { ContentContextProvider, useContent } from '../../utils/context/ContentContext'
import { ResourceForm } from '../../../../utils/components/common/ResourceForm'
import { useEffect, useRef } from 'react'

const Contents = () => {
    const { config, modelData } = useContent()
    const { id } = useParams()
    const initRef = useRef(false)

    const breads = [
        { name: config.name, path: config.path },
        { name: 'カテゴリ', path: config.path + '/category' },
        { name: id ? '編集' : '新規作成' },
    ]

    const formItem = [{ title: 'タイトル', id: 'title', required: true }]

    useEffect(() => {
        if (!modelData || initRef.current) return

        // config設定変更
        config.end_point = config.end_point + '/category'
        config.path = config.path + '/category'
        initRef.current = true

        return () => (initRef.current = false)
    }, [modelData])

    return (
        <>
            <ResourceForm options={{ breads, config, formItem, id }} />
        </>
    )
}

export const New = () => {
    return (
        <ContentContextProvider>
            <Contents />
        </ContentContextProvider>
    )
}

export const Edit = () => {
    return (
        <ContentContextProvider>
            <Contents />
        </ContentContextProvider>
    )
}
