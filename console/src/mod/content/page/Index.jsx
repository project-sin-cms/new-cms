import { useEffect, useState } from 'react'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { useContent } from '../utils/context/ContentContext'
import { Button } from '../../../utils/components/ui/button'
import { HiOutlineArrowCircleRight } from 'react-icons/hi'
import { useNavigation } from '../../../utils/hooks/useNavigation'

export const Index = () => {
    const { config, modelData } = useContent()
    const breads = [{ name: config.name }]
    const [columns, setColumns] = useState([])
    const { navigateTo } = useNavigation()

    useEffect(() => {
        if (!modelData) return

        let newColumns = []
        modelData?.fields?.map((field, key) => {
            if (field.is_list_heading) {
                newColumns.push({ label: field.name, key: field.field_id })
            }
        })
        newColumns.push({
            key: 'actions',
            label: '',
            sortable: false,
            _props: { style: { width: '10%' } },
        })
        setColumns(newColumns)
    }, [modelData])

    return (
        <>
            {modelData && (
                <ResourceIndex
                    options={{
                        breads,
                        config,
                        columns,
                        addPageActionButtons: modelData.is_use_category
                            ? [
                                  () => {
                                      return (
                                          <Button
                                              size="xs"
                                              outline
                                              onClick={() => navigateTo(config.path + '/category')}
                                          >
                                              <HiOutlineArrowCircleRight className="me-0.5" />
                                              カテゴリ
                                          </Button>
                                      )
                                  },
                              ]
                            : [],
                    }}
                />
            )}
        </>
    )
}
