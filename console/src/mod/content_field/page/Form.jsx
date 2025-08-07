import { useParams } from 'react-router'
import { config } from '../utils/config'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'
import { useContetField, ContentFieldProvider } from '../utils/context/ContentFieldContext'

const formItem = [
    { title: 'タイトル', id: 'title', required: true },
    { title: 'エイリアス', id: 'alias', required: true },
    { title: '説明', id: 'description', formType: 'textarea' },
]

const Contents = () => {
    const { id } = useParams()
    const { getBreads, repalcePath } = useContetField()
    const breads = getBreads([
        { name: config.name, path: repalcePath(config.path) },
        { name: id ? '編集' : '新規作成' },
    ])

    return <ResourceForm options={{ breads, config, formItem, id }} />
}

export const New = () => {
    return (
        <>
            <ContentFieldProvider>
                <Contents />
            </ContentFieldProvider>
        </>
    )
}

export const Edit = () => {
    return (
        <>
            <ContentFieldProvider>
                <Contents />
            </ContentFieldProvider>
        </>
    )
}
