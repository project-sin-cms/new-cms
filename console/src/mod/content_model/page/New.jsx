import { useState } from 'react'
import { HiOutlineSave } from 'react-icons/hi'
import { Alert } from '../../../utils/components/ui/alert'
import { Spinner } from '../../../utils/components/ui/spinner'
import { Breadcrumb, BreadcrumbItem } from '../../../utils/components/ui/breadcrumb'
import { Button } from '../../../utils/components/ui/button'
import { Card, CardHeader, CardBody, CardFooter } from '../../../utils/components/ui/card'
import { config } from '../utils/config'
import { Form, FormGroup, Label, Textarea, TextInput } from '../../../utils/components/ui/form'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { useAxios } from '../../../utils/hooks/useAxios'

export const New = () => {
    const { navigateTo } = useNavigation()
    const { error, loading, validationErrors, sendRequest } = useAxios()

    const [name, setName] = useState('')
    const [alias, setAlias] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await sendRequest({
            method: 'post',
            url: 'content_model/store',
            data: { name, description },
        })

        if (result.success) {
            // 成功したらindexへ
            navigateTo(config.path, { message: `記事を作成しました。` })
        }
    }

    return (
        <Card>
            <CardHeader>
                <Breadcrumb>
                    <BreadcrumbItem onClick={() => navigateTo(config.path)}>
                        {config.name}
                    </BreadcrumbItem>
                    <BreadcrumbItem>新規作成</BreadcrumbItem>
                </Breadcrumb>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {error && !validationErrors && (
                            <Alert color="failure">エラーが発生しました: {error.message}</Alert>
                        )}

                        <FormGroup>
                            <Label htmlFor="name">名前</Label>
                            <TextInput
                                name="name"
                                domId="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {validationErrors?.name && (
                                <p className="mt-2 text-sm text-red-600">{validationErrors.name}</p>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="alias">エイリアス</Label>
                            <TextInput
                                name="alias"
                                domId="alias"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                required
                            />
                            {validationErrors?.alias && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validationErrors.alias}
                                </p>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">説明</Label>
                            <Textarea
                                name="description"
                                domId="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {validationErrors?.description && (
                                <p className="mt-2 text-sm text-red-600">
                                    {validationErrors.description}
                                </p>
                            )}
                        </FormGroup>
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
    )
}
