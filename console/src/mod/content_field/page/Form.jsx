import { useLocation, useParams } from 'react-router'
import { config, fieldItem } from '../utils/config'
import { ResourceForm } from '../../../utils/components/common/ResourceForm'
import { useContetField, ContentFieldProvider } from '../utils/context/ContentFieldContext'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { useRef } from 'react'
import { getChoice } from '../../../utils/common'

const Contents = () => {
    const { id } = useParams()
    const { getBreads, repalcePath, model_id } = useContetField()
    const { navigateTo } = useNavigation()
    const formRef = useRef(null)

    const breads = getBreads([
        { name: config.name, path: repalcePath(config.path) },
        { name: id ? '編集' : '新規作成' },
    ])

    // リンクからfield_type取得
    const location = useLocation()
    const fieldType = location?.state?.field_type

    // field_typeがない場合はindexへ
    if (!fieldType) {
        navigateTo(repalcePath(config.path))
    }

    const formItem = [
        { title: '', id: 'model_id', default: model_id, formType: 'hidden' },
        {
            title: 'フィールドタイプ',
            id: 'field_type',
            default: fieldType,
            formType: 'label',
            label: (() => {
                let choice = getChoice(fieldItem, fieldType)
                return choice ? choice.label : ''
            })(),
        },
        { title: '名前', id: 'name', required: true },
        { title: 'フィールドID', id: 'field_id', required: true },
        { title: '必須項目', id: 'is_required', formType: 'switch' },
        { title: '一覧見出し', id: 'is_list_heading', formType: 'switch' },
    ]

    return (
        <ResourceForm
            options={{
                breads,
                config: (() => {
                    let clone = { ...config }
                    clone.path = repalcePath(config.path)
                    return clone
                })(),
                formItem,
                id,
            }}
            ref={formRef}
        />
    )
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
