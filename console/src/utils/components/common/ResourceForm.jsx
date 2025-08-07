import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useAxios } from '../../hooks/useAxios'
import { useNavigation } from '../../hooks/useNavigation'
import { Form, FormBuilder, FormGroup, Label } from '../ui/form'
import { Card, CardBody, CardFooter, CardHeader } from '../ui/card'
import { BreadNavigation } from '../ui/breadcrumb'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Spinner } from 'flowbite-react'
import { HiOutlineSave } from 'react-icons/hi'

/**
 * 汎用リソースフォームコンポーネント（作成・編集）。
 *
 * @component
 * @param {Object} props
 * @param {Object} props.options 設定オプション
 * @param {Array} [props.options.breads=[]] パンくずリスト
 * @param {Object} props.options.config リソースの設定（end_point, path など）
 * @param {string} [props.options.id=null] 編集対象ID（nullなら新規作成）
 * @param {Array} props.options.formItem フォームフィールド定義（id, title, type などを含む）
 */
export const ResourceForm = forwardRef(({ options }, ref) => {
    const { breads = [], config, id = null, formItem = [] } = options
    const { navigateTo } = useNavigation()
    const { error, loading, validationErrors, sendRequest } = useAxios()

    const [inputs, setInputs] = useState(() => {
        const result = {}
        formItem.forEach((item) => {
            result[item.id] = ''
        })
        return result
    })

    useImperativeHandle(ref, () => ({}), [])

    useEffect(() => {
        if (!id) return

        // 編集データ取得
        const fetchContentModel = async () => {
            try {
                const response = await sendRequest({
                    method: 'GET',
                    url: `${config.end_point}/${id}`,
                })
                if (response && response.data) {
                    const data = {}
                    formItem.forEach((item) => {
                        data[item.id] = response.data.payload.data[item.id]
                    })
                    setInputs(data)
                }
            } catch (err) {
                // エラー処理
            }
        }
        fetchContentModel()
    }, [id, sendRequest])

    const setInputVal = (formId, value) => {
        setInputs({
            ...inputs,
            [formId]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await sendRequest({
            method: !id ? 'post' : 'put',
            url: !id ? `${config.end_point}/store` : `${config.end_point}/${id}`,
            data: inputs,
        })

        if (result.success) {
            // 成功したらindexへ
            navigateTo(config.path, {
                message: !id ? `作成しました。` : `更新しました。`,
            })
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <BreadNavigation breads={breads} />
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            {error && !validationErrors && (
                                <Alert color="failure">エラーが発生しました: {error.message}</Alert>
                            )}
                            {formItem.map((item, index) => {
                                const { title, required = false, ...rest } = item
                                const formId = rest.id
                                return (
                                    <FormGroup key={index}>
                                        <Label htmlFor={formId}>
                                            {title}
                                            {required && <span className="text-red-600">*</span>}
                                        </Label>
                                        <FormBuilder
                                            defaultValue={inputs?.[formId]}
                                            onChange={(value, e) => {
                                                setInputVal(formId, value)
                                            }}
                                            {...rest}
                                        />
                                        {validationErrors?.[formId] && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {validationErrors[formId]}
                                            </p>
                                        )}
                                    </FormGroup>
                                )
                            })}
                        </div>
                    </Form>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-end">
                        <Button size="xs" outline onClick={handleSubmit} disabled={loading}>
                            {loading ? <Spinner size="sm" /> : <HiOutlineSave className="me-1" />}
                            保存
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
})
