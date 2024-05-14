import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { IUpdateUtilityRequest } from "@/interfaces/utility.interface"
import { useUpdateUtilityMutation } from "@/redux/services/utilities/utilities.service"

const ModalUpdate = (props: IModal) => {
    const { title, data: uti } = props
    const [updateUtility, { data, error, isLoading }] = useUpdateUtilityMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const body: IUpdateUtilityRequest = {
            id: values.id,
            body: {
                name: values.name,
                note: values.note
            }
        }
        await updateUtility(body)
    }

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                key={uti?.id}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{
                    id: uti?.id,
                    name: uti?.name,
                    note: uti?.note
                }}
                className="flex w-full flex-col items-center gap-2"
            >
                <Form.Item className="w-full" name="id">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input name!"
                        }
                    ]}
                >
                    <Input className="w-full" placeholder="Name" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="note"
                    rules={[
                        {
                            required: true,
                            message: "Please input note!"
                        }
                    ]}
                >
                    <Input className="w-full" placeholder="Note" />
                </Form.Item>

                <Form.Item className="w-full">
                    <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalUpdate
