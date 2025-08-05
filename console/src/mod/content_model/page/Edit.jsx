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

export const Edit = () => {
    const { navigateTo } = useNavigation()
    const { id } = useParams()
    const { error, loading, validationErrors, sendRequest } = useAxios()

    const [name, setName] = useState('')
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
                    setName(response.data.payload.name)
                    setAlias(response.data.payload.alias)
                    setDescription(response.data.payload.description)
                }
            } catch (err) {
                // エラー処理
            }
        }
        fetchContentModel()
    }, [id, sendRequest])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await sendRequest({
                method: 'PUT',
                url: `content_model/${id}`,
                data: { name, alias, description },
            })
            navigateTo(config.path, { message: '更新しました' })
        } catch (err) {
            // エラー処理
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
                        <Label htmlFor="name">名前</Label>
                        <TextInput
                            name="name"
                            domId="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">説明</Label>
                        <Textarea
                            name="description"
                            domId="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </CardBody>
            <CardFooter>
                <div className="flex justify-end">
                    <Button size="xs" outline onClick={handleSubmit} disabled={loading}>
                        {loading ? <Spinner size="sm" /> : <HiOutlineSave className="me-1" />}
                        <HiOutlineSave className="me-1" />
                        保存
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
