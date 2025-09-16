import { useContent } from '../../utils/context/ContentContext'
import { ResourceIndex } from '../../../../utils/components/common/ResourceIndex'
import { useNavigation } from '../../../../utils/hooks/useNavigation'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'
import { Button } from '../../../../utils/components/ui/button'

export const Index = () => {
    const { getCateConfig, modelData } = useContent()
    const { navigateTo } = useNavigation()
    const config = getCateConfig()
    const breads = [{ name: config.name, path: config.parent_path }, { name: 'カテゴリ' }]

    const columns = [
        { key: 'title', label: 'タイトル' },
        { key: 'actions', label: '', sortable: false, _props: { style: { width: '10%' } } },
    ]

    return (
        <>
            {modelData && (
                <ResourceIndex
                    options={{
                        breads,
                        config,
                        columns,
                        addPageActionButtons: [
                            () => {
                                return (
                                    <Button
                                        size="xs"
                                        outline
                                        onClick={() => navigateTo(config.parent_path)}
                                    >
                                        <HiOutlineArrowCircleLeft className="me-0.5" />
                                        一覧に戻る
                                    </Button>
                                )
                            },
                        ],
                    }}
                />
            )}
        </>
    )
}
