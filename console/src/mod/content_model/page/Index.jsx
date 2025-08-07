import { config } from '../utils/config'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { config as fieldConfig } from '../../content_field/utils/config'
import { Link } from 'react-router'

export const Index = () => {
    const breads = [{ name: config.name }]
    const { navigateTo } = useNavigation()

    const columns = [
        { key: 'title', label: '名前' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    const addDropdownItems = [
        {
            name: 'field',
            onClick: (item, row) => {
                navigateTo(fieldConfig.path.replace(':model_id', item.id))
            },
            icon: HiOutlineNewspaper,
        },
    ]

    return (
        <>
            <ResourceIndex
                options={{
                    breads,
                    config,
                    columns,
                    addDropdownItems,
                    addScopedColumns: {
                        title: (item, row, idx) => {
                            return (
                                <td className="p-2" key={idx}>
                                    <Link
                                        to={fieldConfig.path.replace(':model_id', item.id)}
                                        className="underline"
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                            )
                        },
                    },
                }}
            />
        </>
    )
}
