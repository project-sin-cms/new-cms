import { useDropzone } from 'react-dropzone'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../../../config/configLoader'
import { toast } from 'sonner'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

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
