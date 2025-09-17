import { config } from '../utils/config'
import { ResourceIndex } from '../../../utils/components/common/ResourceIndex'
import { Button } from '../../../utils/components/ui/button'
import { HiOutlineDocument, HiOutlinePhotograph, HiOutlineUpload } from 'react-icons/hi'
import { useState, useRef } from 'react'
import { Modal, ModalHeader } from '../../../utils/components/ui/modal'
import { ModalBody, ModalFooter } from 'flowbite-react'
import { FormBuilder } from '../../../utils/components/ui/form'
import dayjs from 'dayjs'
import { Alert } from '../../../utils/components/ui/alert'
import { getFileBytes, isImage } from '../../../utils/common'

export const Index = () => {
    const breads = [{ name: config.name }]
    const columns = [
        { key: 'file', label: '', sortable: false, _props: { style: { width: '80px' } } },
        { key: 'file_name', label: 'ファイル名' },
        { key: 'mime_type', label: 'ファイル形式', _props: { style: { width: '8%' } } },
        { key: 'file_size', label: 'サイズ', _props: { style: { width: '10%' } } },
        { key: 'created_at', label: '作成日', _props: { style: { width: '15%' } } },
        { key: 'actions', label: '', sortable: false, _props: { style: { width: '5%' } } },
    ]

    const [showModal, setShowModal] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const resourceIndexRef = useRef(null)
    const idRef = useRef(null)

    // ファイルアイコンを取得する関数
    const getFileIcon = (mimeType) => {
        if (isImage(mimeType)) {
            return <HiOutlinePhotograph className="w-6 h-6 text-blue-500" />
        }
        return <HiOutlineDocument className="w-6 h-6 text-gray-500" />
    }

    const handleUploadComplete = () => {
        // モーダルを閉じる
        setShowModal(false)
        // 一覧をリフレッシュ
        if (resourceIndexRef.current && resourceIndexRef.current.refresh) {
            resourceIndexRef.current.refresh()
        }
    }

    const handleUploadStateChange = (uploading) => {
        setIsUploading(uploading)
    }

    const handleModalClose = () => {
        // アップロード中はモーダルを閉じない
        if (isUploading) {
            return
        }
        setShowModal(false)
        idRef.current = null
    }

    return (
        <>
            <ResourceIndex
                ref={resourceIndexRef}
                options={{
                    breads,
                    config,
                    columns,
                    isNew: false,
                    addScopedColumns: {
                        file: (item, row, idx) => {
                            return (
                                <td key={idx} className="text-center">
                                    {isImage(item.mime_type) ? (
                                        <div className="flex justify-center">
                                            <img
                                                src={item.file_url}
                                                alt={item.file_name}
                                                className="w-12 h-12 object-cover rounded border"
                                                onError={(e) => {
                                                    // 画像読み込みエラー時はアイコンを表示
                                                    e.target.style.display = 'none'
                                                    e.target.nextSibling.style.display = 'flex'
                                                }}
                                            />
                                            <div
                                                className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border"
                                                style={{ display: 'none' }}
                                            >
                                                {getFileIcon(item.mime_type)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            {getFileIcon(item.mime_type)}
                                        </div>
                                    )}
                                </td>
                            )
                        },
                        file_name: (item, row, idx) => {
                            return (
                                <td>
                                    <a
                                        href={item.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.file_name}
                                    </a>
                                </td>
                            )
                        },
                        file_size: (item, row, idx) => {
                            return (
                                <td className="text-end pe-2" key={idx}>
                                    {getFileBytes(item.file_size)}
                                </td>
                            )
                        },
                        created_at: (item) => {
                            return (
                                <td className="text-center">
                                    {dayjs(item.created_at).format('YYYY/MM/DD HH:mm:ss')}
                                </td>
                            )
                        },
                    },
                    addPageActionButtons: [
                        () => (
                            <Button size="xs" outline onClick={() => setShowModal(true)}>
                                <HiOutlineUpload className="me-0.5" />
                                アップロード
                            </Button>
                        ),
                    ],
                    addDropdownItems: [
                        {
                            name: '再アップロード',
                            onClick: (item, row) => {
                                idRef.current = item.id
                                setShowModal(true)
                            },
                            icon: HiOutlineUpload,
                        },
                    ],
                }}
            />
            <Modal
                show={showModal}
                onClose={handleModalClose}
                size="4xl"
                dismissible={!isUploading} // アップロード中は閉じれない
            >
                <ModalHeader>
                    <div className="flex items-center justify-between w-full">
                        <span>ファイルアップロード</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    {idRef.current && (
                        <>
                            <p className="text-red-500 font-bold mb-2">
                                更新前のメディアファイルは削除されます。更新しますか？
                            </p>
                        </>
                    )}
                    <FormBuilder
                        formType="uploader"
                        onUploadComplete={handleUploadComplete}
                        onUploadStateChange={handleUploadStateChange}
                        endpoint={
                            idRef.current
                                ? 'media_library/update_media/' + idRef.current
                                : 'media_library/store'
                        }
                    />
                </ModalBody>
            </Modal>
        </>
    )
}
