import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '../../hooks/useNavigation'
import { useLocation, useNavigate } from 'react-router'
import { useAxios } from '../../hooks/useAxios'
import { Dropdown, DropdownItem } from '../ui/dropdown'
import { Button, ButtonGroup } from '../ui/button'
import { MoreDotIcon } from '../../icons'
import { Card, CardBody, CardHeader } from '../ui/card'
import { BreadNavigation } from '../ui/breadcrumb'
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

import { useSessionStorage } from '../../hooks/useSessionStorage'
import { Select } from '../ui/form'

/**
 * 汎用的なリソース一覧表示用コンポーネント。
 *
 * @component
 * @param {Object} props
 * @param {Object} props.options コンポーネントの設定オプション
 * @param {Array} [props.options.breads=[]] パンくずリスト表示用配列
 * @param {Object} props.options.config リソースの設定情報
 * @param {string} props.options.config.name リソース名
 * @param {string} props.options.config.end_point APIのエンドポイントURL
 * @param {string} props.options.config.path 新規作成・編集画面のパスベース
 * @param {Array} props.options.columns テーブル列定義の配列
 * @param {boolean} [props.options.isNew=true] 新規作成ボタンを表示するか
 * @param {boolean} [props.options.isEdit=true] 編集アクションを表示するか
 * @param {boolean} [props.options.isDelete=true] 削除アクションを表示するか
 * @param {Object} [props.options.addScopedColumns={}] テーブルに追加する独自カラム定義
 * @param {Array} [props.options.addDropdownItems=[]] 各行のアクションに追加するドロップダウン項目
 * @param {Function|null} [props.options.customNewAction=null] 新規作成ボタンのカスタム処理関数
 * @param {Function|null} [props.options.customEditAction=null] 編集ボタンのカスタム処理関数
 * @param {Function|null} [props.options.customDeleteAction=null] 削除ボタンのカスタム処理関数
 * @param {Object} [props.options.baseParams={}] 一覧取得APIに付与する追加クエリパラメータ
 */
export const ResourceIndex = ({ options }) => {
    const {
        breads = [],
        config,
        columns,
        isNew = true,
        isEdit = true,
        isDelete = true,
        addScopedColumns = {},
        addDropdownItems = [],
        customNewAction = null,
        customEditAction = null,
        customDeleteAction = null,
        baseParams = {},
    } = options

    const { navigateTo } = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useSessionStorage(`${config.name}_current_page`, 1)
    const [itemsPerPage, setItemsPerPage] = useSessionStorage(`${config.name}_items_per_page`, 10)

    const limitOptions = [5, 10, 50, 100]

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
            url:
                `${config.end_point}?` +
                getUrlParams({ current: currentPage, limit: itemsPerPage, ...baseParams }), // 一覧取得APIのエンドポイント
        })
    }, [currentPage, itemsPerPage]) // 依存配列を空にする

    const handleDelete = async () => {
        try {
            await deleteContentModel({
                method: 'DELETE',
                url: `${config.end_point}/${deleteId}`,
            })
            setShowModal(false)
            toast.success('削除しました')

            if (items.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                fetchContentModels({
                    method: 'get',
                    url:
                        `${config.end_point}?` +
                        getUrlParams({ current: currentPage, limit: itemsPerPage, ...baseParams }),
                })
            }
        } catch (err) {
            toast.error('削除に失敗しました')
        }
    }

    // APIから取得したデータをitemsとして使用
    const items = data?.payload?.data || []
    const totalPages = data?.payload?.pages || 1
    const totalItems = data?.payload?.total || 0

    // 表示件数テキストの計算
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const scopedColumns = {
        ...addScopedColumns,
        actions: (item, row, idx) => {
            return (
                <td key={idx}>
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
                                    onClick={() => {
                                        if (customEditAction) {
                                            customEditAction(item, row, idx)
                                        } else {
                                            navigateTo(`${config.path}/edit/${item.id}`)
                                        }
                                    }}
                                    icon={HiOutlinePencilAlt}
                                >
                                    編集
                                </DropdownItem>
                            )}
                            {isDelete && (
                                <DropdownItem
                                    onClick={() => {
                                        if (customDeleteAction) {
                                            customDeleteAction(item, row, idx)
                                        } else {
                                            setDeleteId(item.id)
                                            setShowModal(true)
                                        }
                                    }}
                                    icon={HiOutlineXCircle}
                                    className="text-red-800"
                                >
                                    削除
                                </DropdownItem>
                            )}
                            {addDropdownItems.map((dropdown, index) => {
                                const { name, onClick = () => {}, ...rest } = dropdown
                                return (
                                    <DropdownItem
                                        key={index}
                                        onClick={() => onClick(item, row)}
                                        {...rest}
                                    >
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
                        <BreadNavigation breads={breads} />
                        <div>
                            <ButtonGroup>
                                <Button
                                    size="xs"
                                    outline
                                    onClick={() =>
                                        fetchContentModels({
                                            method: 'get',
                                            url:
                                                `${config.end_point}?` +
                                                getUrlParams({
                                                    current: currentPage,
                                                    limit: itemsPerPage,
                                                    ...baseParams,
                                                }),
                                        })
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
                                {isNew && (
                                    <Button
                                        size="xs"
                                        outline
                                        onClick={() => {
                                            if (!customNewAction) {
                                                navigateTo(config.path + '/new')
                                            } else {
                                                customNewAction()
                                            }
                                        }}
                                    >
                                        <HiOutlinePlusCircle className="me-1" />
                                        追加
                                    </Button>
                                )}
                            </ButtonGroup>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {error && (
                        <Alert color="failure" className="mb-4">
                            データの読み込み中にエラーが発生しました: {error.message}
                        </Alert>
                    )}
                    <ListTable columns={columns} items={items} scopedColumns={scopedColumns} />
                    {loading && (
                        <div className="flex items-center justify-center">
                            <Spinner size="xl" />
                        </div>
                    )}
                    <div className="flex items-center justify-between w-full mt-1 border-t">
                        <div className="flex items-center">
                            <p className="text-sm font-light text-gray-500 me-2">
                                {totalItems > 0
                                    ? `${totalItems}件中${startItem}〜${endItem}件表示`
                                    : '0件中0〜0件表示'}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-28 me-2">
                                <Select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(parseInt(e.target.value, 10))
                                        setCurrentPage(1)
                                    }}
                                    items={limitOptions.map((limit) => ({
                                        value: limit,
                                        label: `${limit}件`,
                                    }))}
                                    style={{ fontSize: '0.8rem', padding: '5px' }}
                                />
                            </div>
                            <Paginate
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
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
