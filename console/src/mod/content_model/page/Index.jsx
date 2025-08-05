import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader } from '../../../utils/components/ui/card'
import { ListTable } from '../../../utils/components/ui/table'
import { config } from '../utils/config'
import { MoreDotIcon } from '../../../utils/icons/index'
import { Paginate } from '../../../utils/components/ui/paginate'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { Button, ButtonGroup } from '../../../utils/components/ui/button'
import { Dropdown, DropdownItem } from '../../../utils/components/ui/dropdown'
import { Modal, ModalBody } from '../../../utils/components/ui/modal'
import { useState, useEffect, useRef } from 'react'
import {
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiOutlineXCircle,
    HiOutlinePlusCircle,
    HiOutlineRefresh, // HiOutlineRefreshをインポート
} from 'react-icons/hi'
import { Breadcrumb, BreadcrumbItem } from '../../../utils/components/ui/breadcrumb'
import { toast } from 'sonner'
import { useAxios } from '../../../utils/hooks/useAxios' // useAxiosをインポート
import { Spinner } from '../../../utils/components/ui/spinner' // Spinnerをインポート
import { Alert } from '../../../utils/components/ui/alert' // Alertをインポート

export const Index = () => {
    const { navigateTo } = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // useAxiosフックを呼び出し、一覧取得用のsendRequestを取得
    const { data, error, loading, sendRequest } = useAxios()

    // 最後に表示したトーストのメッセージ内容を記憶するref
    const currentMessageRef = useRef(null)

    useEffect(() => {
        if (location.state?.message && location.state.message !== currentMessageRef.current) {
            toast.success(location.state.message)
            currentMessageRef.current = location.state.message
            navigate(location.pathname, { replace: true, state: {} })
        } else if (!location.state?.message && currentMessageRef.current) {
            currentMessageRef.current = null
        }
    }, [location, navigate])

    // コンポーネントマウント時に一覧データを取得
    useEffect(() => {
        sendRequest({
            method: 'get',
            url: 'content_model', // 一覧取得APIのエンドポイント
        })
    }, []) // 依存配列を空にする

    const columns = [
        { key: 'name', label: '名前' },
        { key: 'actions', label: '', _props: { style: { width: '10%' } } },
    ]

    // APIから取得したデータをitemsとして使用
    const items = data?.payload?.data || []
    const currentPage = data?.payload?.current || 1
    const totalPages = data?.payload?.pages || 1
    const totalItems = data?.payload?.totalItems || 0

    // 表示件数テキストの計算
    const itemsPerPage = items.length > 0 ? items.length : 1 // 1ページあたりの表示件数（データがない場合は1で割るのを避ける）
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

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
                        <div>
                            <ButtonGroup>
                                <Button
                                    size="xs"
                                    outline
                                    onClick={() =>
                                        sendRequest({ method: 'get', url: 'content_model' })
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
                            onPageChange={(page) => {
                                // ページ変更時の処理（API再取得など）
                                console.log('Page changed to:', page)
                                // sendRequest({ method: 'get', url: `content_model?page=${page}` }); // 実際のAPIではこのようにページ番号を渡す
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
