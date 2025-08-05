import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '../../hooks/useNavigation'
import { useLocation, useNavigate } from 'react-router'
import { useAxios } from '../../hooks/useAxios'
import { Dropdown, DropdownItem } from '../ui/dropdown'
import { Button, ButtonGroup } from '../ui/button'
import { MoreDotIcon } from '../../icons'
import { Card, CardBody, CardHeader } from '../ui/card'
import { Breadcrumb } from '../ui/breadcrumb'
import { BreadcrumbItem } from 'flowbite-react'
import { Spinner } from '../ui/spinner'
import { Alert } from '../ui/alert'
import { ListTable } from '../ui/table'
import { Paginate } from '../ui/paginate'
import { Modal, ModalBody } from '../ui/modal'
import {
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiOutlinePlusCircle,
    HiOutlineRefresh,
    HiOutlineXCircle,
} from 'react-icons/hi'
import { getUrlParams } from '../../common'
import { toast } from 'sonner'

export const ResourceIndex = ({
    breads = [],
    config,
    columns,
    isEdit = true,
    isDelete = true,
    addScopedColumns = {},
    addDropdownItems = [],
}) => {
    const { navigateTo } = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    // useAxiosフックを呼び出し、一覧取得用のsendRequestを取得
    const { data, error, loading, sendRequest: fetchContentModels } = useAxios()
    const { sendRequest: deleteContentModel } = useAxios()

    // 最後に表示したトーストのメッセージ内容を記憶するref
    const currentMessageRef = useRef(null)

    useEffect(() => {
        if (location.state?.message && location.state.message !== currentMessageRef.current) {
            toast.success(location.state.message)
            currentMessageRef.current = location.state.message
            navigate(location.pathname, { replace: true, state: {} })
        } else if (!location.state?.toast?.message && currentMessageRef.current) {
            currentMessageRef.current = null
        }
    }, [location, navigate])

    // コンポーネントマウント時に一覧データを取得
    useEffect(() => {
        fetchContentModels({
            method: 'get',
            url: config.end_point, // 一覧取得APIのエンドポイント
        })
    }, []) // 依存配列を空にする

    const handleDelete = async () => {
        try {
            await deleteContentModel({
                method: 'DELETE',
                url: `${config.end_point}/${deleteId}`,
            })
            setShowModal(false)
            toast.success('削除しました')
            fetchContentModels({
                method: 'get',
                url: config.end_point,
            })
        } catch (err) {
            toast.error('削除に失敗しました')
        }
    }

    // APIから取得したデータをitemsとして使用
    const items = data?.payload?.data || []
    const currentPage = data?.payload?.current || 1
    const totalPages = data?.payload?.pages || 1
    const totalItems = data?.payload?.total || 0

    // 表示件数テキストの計算
    const itemsPerPage = 10
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const scopedColumns = {
        ...addScopedColumns,
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
                            {isEdit && (
                                <DropdownItem
                                    onClick={() => navigateTo(`${config.path}/edit/${item.id}`)}
                                    icon={HiOutlinePencilAlt}
                                >
                                    編集
                                </DropdownItem>
                            )}
                            {isDelete && (
                                <DropdownItem
                                    onClick={() => {
                                        setDeleteId(item.id)
                                        setShowModal(true)
                                    }}
                                    icon={HiOutlineXCircle}
                                    className="text-red-800"
                                >
                                    削除
                                </DropdownItem>
                            )}
                            {addDropdownItems.map((item, index) => {
                                const { name, ...rest } = item
                                return (
                                    <DropdownItem key={index} {...rest}>
                                        {name}
                                    </DropdownItem>
                                )
                            })}
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
                            {breads.map((bread, index) => (
                                <BreadcrumbItem
                                    key={index}
                                    onClick={(e) => {
                                        if (typeof bread.path !== 'undefined') {
                                            navigateTo(bread.path)
                                        }
                                    }}
                                >
                                    {bread.name}
                                </BreadcrumbItem>
                            ))}
                        </Breadcrumb>
                        <div>
                            <ButtonGroup>
                                <Button
                                    size="xs"
                                    outline
                                    onClick={() =>
                                        fetchContentModels({ method: 'get', url: 'content_model' })
                                    }
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <HiOutlineRefresh className="me-1" />
                                    )}
                                    更新
                                </Button>
                                <Button
                                    size="xs"
                                    outline
                                    onClick={() => navigateTo(config.path + '/new')}
                                >
                                    <HiOutlinePlusCircle className="me-1" />
                                    追加
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {loading && (
                        <div className="flex items-center justify-center">
                            <Spinner size="xl" />
                        </div>
                    )}
                    {error && (
                        <Alert color="failure" className="mb-4">
                            データの読み込み中にエラーが発生しました: {error.message}
                        </Alert>
                    )}
                    <ListTable columns={columns} items={items} scopedColumns={scopedColumns} />
                    <div className="flex items-center justify-between w-full mt-1 border-t">
                        <p className="text-sm font-light text-gray-500">
                            {totalItems > 0
                                ? `${totalItems}件中${startItem}〜${endItem}件表示`
                                : '0件中0〜0件表示'}
                        </p>
                        <Paginate
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(current) => {
                                fetchContentModels({
                                    method: 'get',
                                    url: `content_model?` + getUrlParams({ current }),
                                })
                            }}
                        />
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
                            <Button color="red" onClick={handleDelete}>
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
