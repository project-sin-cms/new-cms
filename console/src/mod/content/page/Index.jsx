import { useEffect, useState } from 'react'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { ContentContextProvider, useContent } from '../utils/context/ContentContext'

const Contents = () => {
    const { config, modelData } = useContent()
    const breads = [{ name: config.name }]
    const [columns, setColumns] = useState([])

    useEffect(() => {
        let newColumns = []
        modelData?.fields?.map((field, key) => {
            if (field.is_list_heading) {
                newColumns.push({ label: field.name, key: field.field_id })
            }
        })
        newColumns.push({ key: 'actions', label: '', _props: { style: { width: '10%' } } })
        setColumns(newColumns)
    }, [])

    return (
        <>
            <ResourceIndex
                options={{
                    breads,
                    config,
                    columns,
                }}
            />
        </>
    )
}

export const Index = () => {
    return (
        <ContentContextProvider>
            <Contents />
        </ContentContextProvider>
    )
}
