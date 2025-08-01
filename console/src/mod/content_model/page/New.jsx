import { Breadcrumb, BreadcrumbItem } from '../../../utils/components/ui/breadcrumb'
import { Button } from '../../../utils/components/ui/button'
import { Card, CardHeader, CardBody, CardFooter } from '../../../utils/components/ui/card'
import { config } from '../utils/config'
import { Form, FormGroup, Label, Textarea, TextInput } from '../../../utils/components/ui/form'
import { useNavigation } from '../../../utils/hooks/useNavigation'
import { HiOutlineSave } from 'react-icons/hi'

export const New = () => {
    const { navigateTo } = useNavigation()

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
                <Form>
                    <FormGroup>
                        <Label htmlFor="name">名前</Label>
                        <TextInput name="name" domId="name" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">説明</Label>
                        <Textarea name="description" domId="description" />
                    </FormGroup>
                </Form>
            </CardBody>
            <CardFooter>
                <div className="flex justify-end">
                    <Button size="xs" outline onClick={() => navigateTo(config.path)}>
                        <HiOutlineSave className="me-1" />
                        保存
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
