import { useParams } from 'react-router'
import { config } from '../utils/config'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'

const formItem = [
    { title: 'タイトル', id: 'title', required: true },
    { title: 'エイリアス', id: 'alias', required: true },
    { title: '説明', id: 'description', formType: 'textarea' },
]

export const New = () => {
    const breads = [{ name: config.name, path: config.path }, { name: '新規作成' }]

    return (
        <>
            <ResourceForm breads={breads} config={config} formItem={formItem} />
        </>
    )
}

export const Edit = () => {
    const breads = [{ name: config.name, path: config.path }, { name: '編集' }]
    const { id } = useParams()

    return (
        <>
            <ResourceForm breads={breads} config={config} id={id} formItem={formItem} />
        </>
    )
}
