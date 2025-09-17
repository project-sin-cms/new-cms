import { useDropzone } from 'react-dropzone'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import config from '../../../../config/configLoader'
import { toast } from 'sonner'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Button } from '../button'
import { Modal, ModalBody, ModalHeader } from '../modal'
import { ResourceIndex } from '../../common/ResourceIndex'
import { config as mediaConfig } from '../../../../mod/media_library/utils/config'
import { HiOutlineDocument, HiOutlinePhotograph } from 'react-icons/hi'
import dayjs from 'dayjs'
import { isImage, getFileBytes } from '../../../common'
import { useAxios } from '../../../hooks/useAxios'

/**
 * ファイルアップロード
 */
export default function FileUploader({
    endpoint = 'media_library/store',
    onUploadComplete,
    onUploadStateChange,
    acceptedFileTypes = {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'text/plain': ['.txt'],
        'text/csv': ['.csv'],
    },
    maxFileSize = 100 * 1024 * 1024, // 100MB
}) {
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(null)

    const CHUNK_SIZE = 2 * 1024 * 1024 // 2MBごとに分割

    // アップロード状態の変更を親に通知
    useEffect(() => {
        if (onUploadStateChange) {
            onUploadStateChange(uploading)
        }
    }, [uploading, onUploadStateChange])

    // ファイル形式を検証する関数
    const validateFileType = (file) => {
        const allowedExtensions = Object.values(acceptedFileTypes).flat()
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
        return allowedExtensions.includes(fileExtension)
    }

    // ファイルサイズを検証する関数
    const validateFileSize = (file) => {
        return file.size <= maxFileSize
    }

    const onDrop = async (acceptedFiles = [], rejectedFiles = []) => {
        // 拒否されたファイルがある場合のエラーハンドリング
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0]
            let errorMessage = ''

            if (rejectedFile.errors[0]?.code === 'file-invalid-type') {
                errorMessage = 'サポートされていないファイル形式です。'
            } else if (rejectedFile.errors[0]?.code === 'file-too-large') {
                errorMessage = `ファイルサイズが大きすぎます。最大${Math.round(
                    maxFileSize / 1024 / 1024
                )}MBまでです。`
            } else {
                errorMessage = 'ファイルの選択に失敗しました。'
            }

            setError(errorMessage)
            return
        }

        if (acceptedFiles.length === 0) return

        const file = acceptedFiles[0]

        // 追加のファイル形式検証
        if (!validateFileType(file)) {
            setError('サポートされていないファイル形式です。')
            return
        }

        // 追加のファイルサイズ検証
        if (!validateFileSize(file)) {
            setError(
                `ファイルサイズが大きすぎます。最大${Math.round(
                    maxFileSize / 1024 / 1024
                )}MBまでです。`
            )
            return
        }

        // エラーをクリア
        setError(null)

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
        setUploading(true)
        setProgress(0) // プログレスをリセット

        try {
            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE
                const end = Math.min(file.size, start + CHUNK_SIZE)
                const chunk = file.slice(start, end)

                const formData = new FormData()
                formData.append('file', chunk)
                formData.append('fileName', file.name)
                formData.append('chunkIndex', i)
                formData.append('totalChunks', totalChunks)

                await axios.post(config.endpointUrl + endpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                setProgress(Math.round(((i + 1) / totalChunks) * 100))
            }

            // アップロード完了
            setUploading(false)
            setProgress(0)

            // 成功トーストを表示
            toast.success('ファイルのアップロードが完了しました')

            // アップロード完了コールバックを実行
            if (onUploadComplete) {
                onUploadComplete()
            }
        } catch (err) {
            setUploading(false)
            setProgress(0)

            // エラーメッセージを設定
            const errorMessage =
                err.response?.data?.message || err.message || 'ファイルのアップロードに失敗しました'
            setError(errorMessage)

            console.error('Upload error:', err)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize: maxFileSize,
        multiple: false,
    })

    // 許可されるファイル形式の説明文を生成
    const getAcceptedFileTypesDescription = () => {
        const extensions = Object.values(acceptedFileTypes).flat()
        return extensions.join(', ')
    }

    return (
        <div className="w-full mx-auto">
            {/* エラーメッセージ表示 */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <div className="flex items-center">
                        <HiOutlineExclamationCircle className="h-5 w-5 text-red-400 dark:text-red-300 mr-2 flex-shrink-0" />
                        <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
                    </div>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : error
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-300 dark:border-gray-600'
                } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
            >
                <input {...getInputProps()} disabled={uploading} />
                {uploading ? (
                    <div className="space-y-2">
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                            アップロード中...
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{progress}% 完了</p>
                    </div>
                ) : isDragActive ? (
                    <div className="space-y-2">
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                            ここにファイルをドロップしてください
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            対応形式: {getAcceptedFileTypesDescription()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            最大サイズ: {Math.round(maxFileSize / 1024 / 1024)}MB
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300">
                            ファイルをドラッグ＆ドロップ、またはクリックで選択
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            対応形式: {getAcceptedFileTypesDescription()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            最大サイズ: {Math.round(maxFileSize / 1024 / 1024)}MB
                        </p>
                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                再度お試しください
                            </p>
                        )}
                    </div>
                )}
            </div>

            {uploading && (
                <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded">
                    <div
                        className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    >
                        {progress}%
                    </div>
                </div>
            )}
        </div>
    )
}

import { useCallback } from 'react'

// メディアアイテムの状態管理ロジックをカスタムフックに抽出
const useMediaItem = (defaultValue) => {
    const [selected, setSelected] = useState(
        defaultValue && typeof defaultValue === 'object' ? defaultValue : null
    )
    const [initializing, setInitializing] = useState(!!defaultValue)
    const { data: showData, sendRequest: fetchMediaShow } = useAxios()

    useEffect(() => {
        if (defaultValue && typeof defaultValue === 'object') {
            if (selected?.id != defaultValue.id) {
                setSelected(defaultValue)
            }
            setInitializing(false)
            return
        }
        if (!defaultValue) {
            setSelected(null)
            setInitializing(false)
            return
        }
        if (typeof defaultValue !== 'object') {
            // IDが渡された場合、現在のselectedと異なれば取得
            if (!selected || selected.id != defaultValue) {
                setInitializing(true)
                fetchMediaShow({ method: 'get', url: `${mediaConfig.end_point}/${defaultValue}` })
            } else {
                // 既に正しいアイテムが選択されている
                setInitializing(false)
            }
        }
    }, [defaultValue, fetchMediaShow, selected])

    useEffect(() => {
        const item = showData?.payload?.data
        if (item) {
            setSelected(item)
        }
        if (showData) {
            setInitializing(false)
        }
    }, [showData])

    return { initializing, selected, setSelected }
}

// 共通のレンダリングロジックをコンポーネントに分離
const getFileIcon = (mimeType) => {
    if (isImage(mimeType)) return <HiOutlinePhotograph className="w-6 h-6 text-blue-500" />
    return <HiOutlineDocument className="w-6 h-6 text-gray-500" />
}

const SelectedItemDisplay = ({ selected, onClear }) => (
    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
        {isImage(selected?.mime_type) ? (
            <img
                src={selected?.file_url}
                alt={selected?.file_name}
                className="w-12 h-12 object-cover rounded border"
            />
        ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border">
                {getFileIcon(selected?.mime_type)}
            </div>
        )}
        <div>
            <div className="font-medium">{selected?.file_name}</div>
            <div className="text-xs text-gray-500">
                {selected?.mime_type} ・ {getFileBytes(selected?.file_size)}
            </div>
        </div>
        <Button size="xs" color="light" onClick={onClear}>
            クリア
        </Button>
    </div>
)

const InitializingSkeleton = () => (
    <div className="flex items-center gap-3 w-full animate-pulse">
        <div className="w-12 h-12 rounded border bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
    </div>
)

// MediaImage と MediaFile の共通ロジックを担うコンポーネント
const MediaSelector = ({
    defaultValue = null,
    onChange = () => {},
    modalTitle,
    fileUploaderProps = {},
    resourceIndexProps = {},
}) => {
    const { initializing, selected, setSelected } = useMediaItem(defaultValue)
    const [showModal, setShowModal] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const resourceIndexRef = useRef(null)

    const handleClear = useCallback(() => {
        setSelected(null)
        onChange(null)
    }, [onChange, setSelected])

    const handleSelect = useCallback(
        (item) => {
            setSelected(item)
            onChange(item.id, item)
            setShowModal(false)
        },
        [onChange, setSelected]
    )

    const handleUploadComplete = useCallback(() => {
        resourceIndexRef.current?.refresh()
        toast.success('ファイルをアップロードしました')
    }, [])

    const columns = [
        { key: 'btns', label: '', sortable: false, _props: { style: { width: '8%' } } },
        { key: 'file', label: '', sortable: false, _props: { style: { width: '80px' } } },
        { key: 'file_name', label: 'ファイル名' },
        { key: 'mime_type', label: '形式', _props: { style: { width: '10%' } } },
        { key: 'file_size', label: 'サイズ', _props: { style: { width: '10%' } } },
        { key: 'created_at', label: '作成日', _props: { style: { width: '15%' } } },
    ]

    const addScopedColumns = {
        file: (item, row, idx) => (
            <td key={idx} className="text-center p-2">
                {isImage(item.mime_type) ? (
                    <div className="flex justify-center">
                        <img
                            src={item.file_url}
                            alt={item.file_name}
                            className="w-12 h-12 object-cover rounded border"
                            onError={(e) => {
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
                    <div className="flex justify-center">{getFileIcon(item.mime_type)}</div>
                )}
            </td>
        ),
        file_name: (item) => (
            <td>
                <span className="text-gray-700 dark:text-gray-200">{item.file_name}</span>
            </td>
        ),
        file_size: (item, row, idx) => (
            <td className="text-end pe-2" key={idx}>
                {getFileBytes(item.file_size)}
            </td>
        ),
        created_at: (item) => (
            <td className="text-center">{dayjs(item.created_at).format('YYYY/MM/DD HH:mm:ss')}</td>
        ),
        btns: (item, row, idx) => (
            <td key={idx} className="text-end">
                {item.id !== selected?.id && (
                    <div className="flex justify-center w-full">
                        <Button size="xs" outline onClick={() => handleSelect(item)}>
                            選択
                        </Button>
                    </div>
                )}
            </td>
        ),
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                {initializing ? (
                    <InitializingSkeleton />
                ) : !selected ? (
                    <Button outline onClick={() => setShowModal(true)} size="xs">
                        メディアライブラリから選択する
                    </Button>
                ) : (
                    <SelectedItemDisplay selected={selected} onClear={handleClear} />
                )}
            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                size="5xl"
                dismissible={!isUploading}
            >
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalBody>
                    <div className="mb-4">
                        <FileUploader
                            endpoint={'media_library/store'}
                            onUploadStateChange={setIsUploading}
                            onUploadComplete={handleUploadComplete}
                            {...fileUploaderProps}
                        />
                    </div>
                    <ResourceIndex
                        ref={resourceIndexRef}
                        options={{
                            breads: [{ name: mediaConfig.name }],
                            config: mediaConfig,
                            columns,
                            isNew: false,
                            isEdit: false,
                            isDelete: false,
                            skeletonRow: 3,
                            addScopedColumns,
                            ...resourceIndexProps,
                        }}
                    />
                </ModalBody>
            </Modal>
        </div>
    )
}

/**
 * メディアライブラリから画像選択
 */
export const MediaImage = (props) => (
    <MediaSelector
        {...props}
        modalTitle="メディアを選択"
        fileUploaderProps={{
            acceptedFileTypes: {
                'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
            },
        }}
        resourceIndexProps={{
            baseParams: { 'criteria[only_image]': 1 },
        }}
    />
)

/**
 * メディアライブラリからファイル選択（全ファイル対象）
 */
export const MediaFile = (props) => <MediaSelector {...props} modalTitle="ファイルを選択" />
