import { useParams } from 'react-router'
import { config } from '../utils/config'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'

const formItem = [
    { title: 'タイトル', id: 'title', required: true },
    { title: 'エイリアス', id: 'alias', required: true },
    { title: '説明', id: 'description', formType: 'textarea' },
    { title: 'カテゴリ', id: 'is_use_category', formType: 'switch', label: '使用する' },
]

export const New = () => {
    const breads = [{ name: config.name, path: config.path }, { name: '新規作成' }]

    return (
        <>
            <ResourceForm options={{ breads, config, formItem }} />
        </>
    )
}

export const Edit = () => {
    const breads = [{ name: config.name, path: config.path }, { name: '編集' }]
    const { id } = useParams()

    return (
        <>
            <ResourceForm options={{ breads, config, formItem, id }} />
        </>
    )
}
