import { useParams } from 'react-router'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'
import { ContentContextProvider, useContent } from '../utils/context/ContentContext'

const Contents = () => {
    const { config, modelData } = useContent()
    const { id } = useParams()
    const breads = [{ name: config.name, path: config.path }, { name: id ? '編集' : '新規作成' }]

    const formItem = []
    modelData?.fields.map((field, idx) => {
        let item = {
            title: field.name,
            id: field.field_id,
            formType: field.field_type,
            required: field.is_required,
        }
        formItem.push(item)
    })
    if (modelData?.is_use_category) {
        formItem.push({
            title: 'カテゴリ',
            id: 'categories',
            formType: 'taxonomy_select',
            placeholder: '選択してください',
            endpoint: `content/${modelData.alias}/category/resource`,
            isSearchable: true,
            onFetch: (data) => {
                if (data.length === 0) return null
                return { label: data[0].title, value: data[0].id }
            },
            position: 'aside',
        })
    }

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
