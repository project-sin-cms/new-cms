import React, { useEffect, useMemo, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import Paragraph from '@editorjs/paragraph'
import { twMerge } from 'tailwind-merge'

export const ReactEditor = ({
    defaultValue = {},
    onChange = () => {},
    readOnly = false,
    autofocus = false,
    placeholder = '入力を開始してください...',
    id,
    className,
    editorClassName,
    minHeight = 120,
    paddingXClass = 'px-0',
    ...rest
}) => {
    const editorRef = useRef(null)
    const holderId = useMemo(() => id || `editorjs-${Math.random().toString(36).slice(2)}`, [id])

    const tools = useMemo(
        () => ({
            header: { class: Header, inlineToolbar: true },
            paragraph: { class: Paragraph, inlineToolbar: true },
            list: { class: List, inlineToolbar: true },
            quote: { class: Quote, inlineToolbar: true },
            delimiter: { class: Delimiter },
            inlineCode: { class: InlineCode },
            marker: { class: Marker },
        }),
        []
    )

    useEffect(() => {
        // グローバルに既存インスタンスを管理して二重初期化を防止
        if (!window.__editorjs_instances) window.__editorjs_instances = new Map()
        if (!window.__editorjs_initing) window.__editorjs_initing = new Set()

        // すでに初期化処理中なら何もしない（StrictModeの二重実行対策）
        if (window.__editorjs_initing.has(holderId)) {
            return () => {}
        }
        window.__editorjs_initing.add(holderId)
        const existing = window.__editorjs_instances.get(holderId)
        if (existing) {
            editorRef.current = existing
            window.__editorjs_initing.delete(holderId)
            return () => {}
        }
        if (editorRef.current && editorRef.current.destroy) {
            try {
                editorRef.current.destroy()
            } catch (_) {}
            editorRef.current = null
        }
        const holderEl = document.getElementById(holderId)
        if (holderEl) holderEl.innerHTML = ''

        const instance = new EditorJS({
            holder: holderId,
            tools,
            data: defaultValue,
            readOnly,
            autofocus,
            placeholder,
            minHeight: 0,
            onChange: async () => {
                try {
                    const saved = await instance.save()
                    onChange(saved)
                } catch (_) {}
            },
            ...rest,
        })
        editorRef.current = instance
        window.__editorjs_instances.set(holderId, instance)
        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current.destroy()
            }
            editorRef.current = null
            window.__editorjs_instances.delete(holderId)
            const holderEl = document.getElementById(holderId)
            if (holderEl) holderEl.innerHTML = ''
            window.__editorjs_initing.delete(holderId)
        }
    }, [])

    return (
        <div
            className={twMerge(
                `border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white py-0 ${paddingXClass} focus-within:ring-2 focus-within:ring-primary-500`,
                className
            )}
            style={{ minHeight }}
        >
            <div
                id={holderId}
                className={twMerge('min-h-[50px]', editorClassName)}
                style={{ minHeight: Math.max(minHeight, 0) }}
            />
        </div>
    )
}
