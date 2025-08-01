import { Card, CardBody, CardHeader } from '../../../utils/components/ui/card'
import { ListTable } from '../../../utils/components/ui/table'
import { config } from '../utils/config'
import { MoreDotIcon } from '../../../utils/icons/index'
import { Paginate } from '../../../utils/components/ui/paginate'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { Button } from '../../../utils/components/ui/button'
import { Dropdown, DropdownItem } from '../../../utils/components/ui/dropdown'
import { Modal, ModalBody } from '../../../utils/components/ui/modal'
import { useState } from 'react'
import {
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiOutlineXCircle,
    HiOutlinePlusCircle,
} from 'react-icons/hi'
import { Breadcrumb, BreadcrumbItem } from '../../../utils/components/ui/breadcrumb'

export const Index = () => {
    const { navigateTo } = useNavigation()
    const [showModal, setShowModal] = useState(false)

    const columns = [
        { key: 'name', label: '名前' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    const items = [
        { id: 1, name: '新着情報', fields: 5 },
        { id: 2, name: 'よくあるご質問', fields: 2 },
        { id: 3, name: 'お問い合わせ設定', fields: 7 },
    ]

    const scopedColumns = {
        actions: (item, row) => {
            return (
                <td>
                    <div className="flex justify-end">
                        <Dropdown
                            label=""
                            dismissOnClick={false}
                            renderTrigger={() => (
                                <Button
                                    color={'light'}
                                    outline
                                    size="sm"
                                    className="focus:ring-0 focus:outline-none active:ring-0"
                                >
                                    <MoreDotIcon />
                                </Button>
                            )}
                        >
                            <DropdownItem
                                onClick={() => navigateTo(`${config.path}/edit/${item.id}`)}
                                icon={HiOutlinePencilAlt}
                            >
                                編集
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setShowModal(true)}
                                icon={HiOutlineXCircle}
                                className="text-red-800"
                            >
                                削除
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </td>
            )
        },
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <Breadcrumb>
                            <BreadcrumbItem>{config.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <Button size="xs" outline onClick={() => navigateTo(config.path + '/new')}>
                            <HiOutlinePlusCircle className="me-1" />
                            追加
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <ListTable columns={columns} items={items} scopedColumns={scopedColumns} />
                    <div className="flex items-center justify-between w-full mt-1 border-t">
                        <p className="text-sm font-light text-gray-500">10件中1〜10件表示</p>
                        <Paginate />
                    </div>
                </CardBody>
            </Card>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            削除しますか？
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => setShowModal(false)}>
                                はい
                            </Button>
                            <Button color="alternative" onClick={() => setShowModal(false)}>
                                キャンセル
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
