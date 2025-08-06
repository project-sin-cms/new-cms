import { config } from '../utils/config'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'

export const Index = () => {
    const breads = [{ name: config.name }]

    const columns = [
        { key: 'title', label: '名前' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    return (
        <>
            <ResourceIndex breads={breads} config={config} columns={columns} />
        </>
    )
}
