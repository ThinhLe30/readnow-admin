import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import Title from "@/components/Modal/Title"
import { useCreateUtilityMutation } from "@/redux/services/utilities/utilities.service"
import { ICreateUtilityRequest } from "@/interfaces/utility.interface"

const ModalAdd = (props: IModal) => {
    const { title } = props
    const [createUtility, { data, error, isLoading }] = useCreateUtilityMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const body: ICreateUtilityRequest = {
            name: values.name,
            note: values.note
        }
        await createUtility(body)
    }

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="flex w-full flex-col items-center gap-2"
            >
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
                        Finish
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalAdd
