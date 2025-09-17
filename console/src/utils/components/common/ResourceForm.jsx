import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useRef,
    useCallback,
} from 'react'
import { useAxios } from '../../hooks/useAxios'
import { useNavigation } from '../../hooks/useNavigation'
import { Form, FormBuilder, FormGroup, Label } from '../ui/form'
import { Card, CardBody, CardFooter, CardHeader } from '../ui/card'
import { BreadNavigation } from '../ui/breadcrumb'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { HiOutlineSave } from 'react-icons/hi'
import { Col, Row } from '../ui/grid'

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
    const [isLoaded, setIsLoaded] = useState(!id)

    const [inputs, setInputs] = useState(() => {
        const result = {}
        formItem.forEach((item) => {
            result[item.id] = item?.default ?? ''
        })
        return result
    })

    // メインエリアのフォーム
    const [mainFormItem] = useState(
        formItem?.filter(
            (item) => typeof item.position === 'undefined' || item.position !== 'aside'
        )
    )

    // サイドエリアのフォーム
    const [aSideFormItem] = useState(
        formItem?.filter(
            (item) => typeof item.position !== 'undefined' && item.position === 'aside'
        )
    )

    useEffect(() => {
        if (!id) return

        // 編集データ取得
        const fetch = async () => {
            setIsLoaded(false)
            try {
                const response = await sendRequest({
                    method: 'GET',
                    url: `${config.end_point}/${id}`,
                })
                if (response && response.data) {
                    const data = {}
                    formItem.forEach((item) => {
                        if (typeof item.onFetch !== 'undefined') {
                            data[item.id] = item.onFetch(
                                response.data.payload.data[item.id],
                                response.data.payload.data
                            )
                        } else {
                            data[item.id] = response.data.payload.data[item.id]
                        }
                    })
                    setInputs(data)
                }
            } catch (err) {
                // エラー処理
            } finally {
                setIsLoaded(true)
            }
        }
        fetch()
    }, [id, sendRequest])

    const setInputVal = (formId, value) => {
        setInputs((prev) => {
            if (prev[formId] === value) return prev
            return { ...inputs, [formId]: value }
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
                    {!isLoaded ? (
                        <>
                            <Spinner />
                        </>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                {error && !validationErrors && (
                                    <Alert color="failure">
                                        エラーが発生しました: {error.message}
                                    </Alert>
                                )}
                                <Row cols={12}>
                                    <Col col={aSideFormItem.length > 0 ? 9 : 12}>
                                        {mainFormItem?.map((item, index) => {
                                            const {
                                                title,
                                                required = false,
                                                onFetch,
                                                ...rest
                                            } = item
                                            if (item.formType === 'hidden') {
                                                return <></>
                                            }
                                            const formId = rest.id
                                            return (
                                                <FormGroup key={index}>
                                                    <Label htmlFor={formId}>
                                                        {title}
                                                        {required && (
                                                            <span className="text-red-600">*</span>
                                                        )}
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
                                    </Col>
                                    {aSideFormItem.length > 0 && (
                                        <Col col={3} className="ms-4 ps-4 border-s">
                                            {aSideFormItem?.map((item, index) => {
                                                const { title, required = false, ...rest } = item
                                                if (item.formType === 'hidden') {
                                                    return <></>
                                                }
                                                const formId = rest.id
                                                return (
                                                    <FormGroup key={index}>
                                                        <Label htmlFor={formId}>
                                                            {title}
                                                            {required && (
                                                                <span className="text-red-600">
                                                                    *
                                                                </span>
                                                            )}
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
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </Form>
                    )}
                </CardBody>
                {isLoaded && (
                    <CardFooter>
                        <div className="flex justify-end">
                            <Button size="xs" outline onClick={handleSubmit} disabled={loading}>
                                {loading ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <HiOutlineSave className="me-1" />
                                )}
                                保存
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </>
    )
})
