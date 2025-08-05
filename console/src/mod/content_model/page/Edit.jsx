import { Breadcrumb, BreadcrumbItem } from '../../../utils/components/ui/breadcrumb'
import { Button } from '../../../utils/components/ui/button'
import { Card, CardHeader, CardBody, CardFooter } from '../../../utils/components/ui/card'
import { config } from '../utils/config'
import { Form, FormGroup, Label, Textarea, TextInput } from '../../../utils/components/ui/form'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { HiOutlineSave } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useAxios } from '../../../utils/hooks/useAxios'
import { useEffect, useState } from 'react'
import { Spinner } from '../../../utils/components/ui/spinner'

export const Edit = () => {
    const { navigateTo } = useNavigation()
    const { id } = useParams()
    const { error, loading, validationErrors, sendRequest } = useAxios()

    const [title, setTitle] = useState('')
    const [alias, setAlias] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const fetchContentModel = async () => {
            try {
                const response = await sendRequest({
                    method: 'GET',
                    url: `content_model/${id}`,
                })
                if (response && response.data) {
                    setTitle(response.data.payload.data.title)
                    setAlias(response.data.payload.data.alias)
                    setDescription(response.data.payload.data.description)
                }
            } catch (err) {
                // エラー処理
            }
        }
        fetchContentModel()
    }, [id, sendRequest])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await sendRequest({
            method: 'PUT',
            url: `content_model/${id}`,
            data: { title, alias, description },
        })

        if (result.success) {
            navigateTo(config.path, { message: '更新しました' })
        }
    }

    return (
        <Card>
            <CardHeader>
                <Breadcrumb>
                    <BreadcrumbItem onClick={() => navigateTo(config.path)}>
                        {config.name}
                    </BreadcrumbItem>
                    <BreadcrumbItem>編集</BreadcrumbItem>
                </Breadcrumb>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">名前</Label>
                        <TextInput
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        {validationErrors?.title && (
                            <p className="mt-2 text-sm text-red-600">{validationErrors.title}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="alias">エイリアス</Label>
                        <TextInput
                            name="alias"
                            id="alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            required
                        />
                        {validationErrors?.alias && (
                            <p className="mt-2 text-sm text-red-600">{validationErrors.alias}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">説明</Label>
                        <Textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {validationErrors?.description && (
                            <p className="mt-2 text-sm text-red-600">
                                {validationErrors.description}
                            </p>
                        )}
                    </FormGroup>
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
    )
}
