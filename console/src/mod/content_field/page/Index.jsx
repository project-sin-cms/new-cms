import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { useContetField } from '../utils/hooks/useContentField'
import { Spinner } from '../../../utils/components/ui/spinner'
import { config, fieldItem } from '../utils/config'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from '../../../utils/components/ui/modal'
import { Button } from '../../../utils/components/ui/button'
import { Card, CardBody } from '../../../utils/components/ui/card'
import { Col, Row } from '../../../utils/components/ui/grid'

export const Index = () => {
    const { model_id, getBreads, loading } = useContetField()
    const breads = getBreads([{ name: config.name }])
    const [showModal, setShowModal] = useState(false)

    const columns = [
        { key: 'title', label: '名前' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <ResourceIndex
                    breads={breads}
                    config={config}
                    columns={columns}
                    baseParams={{ model_id }}
                    customNewAction={() => {
                        setShowModal(true)
                    }}
                />
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>フィールド追加</ModalHeader>
                <ModalBody>
                    <Row cols={12} className="gap-3">
                        {fieldItem.map((field, index) => {
                            return (
                                <Col col={4} key={index}>
                                    <Button color={'dark'} outline className="w-full h-20 text-1xl">
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
