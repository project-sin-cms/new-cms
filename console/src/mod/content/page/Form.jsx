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

    return (
        <>
            <ResourceForm options={{ breads, config, formItem, id }} />
        </>
    )
}

export const New = () => {
    return (
        <>
            <ContentContextProvider>
                <Contents />
            </ContentContextProvider>
        </>
    )
}

export const Edit = () => {
    return (
        <>
            <ContentContextProvider>
                <Contents />
            </ContentContextProvider>
        </>
    )
}
