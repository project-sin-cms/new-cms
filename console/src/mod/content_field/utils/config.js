import {} from 'react-icons'
import { HiOutlineDocumentText } from 'react-icons/hi'

export const config = {
    name: 'Content Field',
    path: '/content_field/:model_id',
    mod_name: 'content_field',
    end_point: 'content_field',
}

export const fieldItem = [
    { label: 'テキスト', value: 'text', icon: null },
    { label: '数値', value: 'number', icon: null },
    { label: '日付', value: 'date', icon: null },
    { label: 'テキストエリア', value: 'textarea', icon: null },
    { label: 'リッチテキスト', value: 'richtext', icon: null },
    { label: 'ラジオボタン', value: 'radio', icon: null },
    { label: 'セレクトボックス', value: 'select', icon: null },
    { label: 'チェックボックス', value: 'checkbox', icon: null },
    { label: 'フラグボタン', value: 'flag', icon: null },
]
