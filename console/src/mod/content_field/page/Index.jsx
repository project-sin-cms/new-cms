import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { config, fieldItem } from '../utils/config'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from '../../../utils/components/ui/modal'
import { Button } from '../../../utils/components/ui/button'
import { Col, Row } from '../../../utils/components/ui/grid'
import { useContetField, ContentFieldProvider } from '../utils/context/ContentFieldContext'
import { useNavigation } from '../../../utils/hooks/useNavigation'

export const Index = () => {
    const { model_id, getBreads, repalcePath } = useContetField()
    const breads = getBreads([{ name: config.name }])
    const [showModal, setShowModal] = useState(false)
    const { navigateTo } = useNavigation()

    const columns = [
        { key: 'name', label: '名前' },
        { key: 'field_type', label: 'フィールドタイプ' },
        { key: 'actions', label: '', sortable: false, _props: { style: { width: '10%' } } },
    ]

    return (
        <>
            <ResourceIndex
                options={{
                    breads,
                    config: (() => {
                        let clone = { ...config }
                        clone.path = repalcePath(clone.path)
                        return clone
                    })(),
                    columns,
                    baseParams: { criteria: { model_id: model_id } },
                    customNewAction: () => {
                        setShowModal(true)
                    },
                    customEditAction: (item) => {
                        navigateTo(`${repalcePath(config.path)}/edit/${item.id}`, {
                            field_type: item.field_type,
                        })
                    },
                }}
            />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>フィールド追加</ModalHeader>
                <ModalBody>
                    <Row cols={12} className="gap-3">
                        {fieldItem.map((field, index) => {
                            return (
                                <Col col={4} key={index}>
                                    <Button
                                        color={'dark'}
                                        outline
                                        className="w-full h-20 text-1xl"
                                        onClick={() => {
                                            navigateTo(`${repalcePath(config.path)}/new`, {
                                                field_type: field.value,
                                            })
                                        }}
                                    >
                                        {field.icon && (
                                            <>
                                                <field.icon className="me-2" />
                                            </>
                                        )}
                                        {field.label}
                                    </Button>
                                </Col>
                            )
                        })}
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}
