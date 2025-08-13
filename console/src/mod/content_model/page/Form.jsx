import { useParams } from 'react-router'
import { config } from '../utils/config'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'

const formItem = [
    { title: 'タイトル', id: 'title', required: true },
    { title: 'エイリアス', id: 'alias', required: true },
    { title: '説明', id: 'description', formType: 'textarea' },
    { title: 'カテゴリ', id: 'is_use_category', formType: 'switch', label: '使用する' },
]

const Contents = () => {
    const { id } = useParams()
    const breads = [{ name: config.name, path: config.path }, { name: id ? '編集' : '新規作成' }]

    return (
        <>
            <ResourceForm options={{ breads, config, formItem, id }} />
        </>
    )
}

export const New = () => {
    return (
        <>
            <Contents />
        </>
    )
}

export const Edit = () => {
    return (
        <>
            <Contents />
        </>
    )
}
