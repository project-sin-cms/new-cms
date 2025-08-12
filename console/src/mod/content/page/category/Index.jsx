import { useEffect, useRef } from 'react'
import { ContentContextProvider, useContent } from '../../utils/context/ContentContext'
import { ResourceIndex } from '../../../../utils/components/common/ResourceIndex'

const Contents = () => {
    const { config, modelData } = useContent()
    const breads = [{ name: config.name, path: config.path }, { name: 'カテゴリ' }]
    const initRef = useRef(false)

    const columns = [
        { key: 'title', label: 'タイトル' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    useEffect(() => {
        if (!modelData || initRef.current) return

        // config設定変更
        config.end_point = config.end_point + '/category'
        config.path = config.path + '/category'
        initRef.current = true

        return () => (initRef.current = false)
    }, [modelData])

    return <>{modelData && <ResourceIndex options={{ breads, config, columns }} />}</>
}

export const Index = () => {
    return (
        <ContentContextProvider>
            <Contents />
        </ContentContextProvider>
    )
}
