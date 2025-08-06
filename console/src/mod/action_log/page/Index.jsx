import { config } from '../utils/config'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'

export const Index = () => {
    const breads = [{ name: config.name }]

    const columns = [
        { key: 'title', label: 'タイトル' },
        { key: 'method', label: 'メソッド' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    return (
        <>
            <ResourceIndex options={{ breads, config, columns, isNew: false }} />
        </>
    )
}
