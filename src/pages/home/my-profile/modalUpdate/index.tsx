import { Button, Form, Input, Spin } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IUpdatePassword } from "@/interfaces/user.interface"
import { useUpdatePasswordMutation } from "@/redux/services/myProfile/my-profile.service"
import { useAppSelector } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalAntd from "@/components/Modal"

const ModalUpdatePassword = () => {
    const [updatePassword, { data, error, isLoading }] = useUpdatePasswordMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const body: IUpdatePassword = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        }
        await updatePassword(body)
    }
    const type = useAppSelector((state) => state.modal.type)

    if (type !== MODAL.UPDATE.PASSWORD) return null

    return (
        <ModalAntd>
            <Spin spinning={isLoading}>
                <Title>Update New Password</Title>
                <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    className="flex w-full flex-col items-center gap-2"
                >
                    <Form.Item
                        className="w-full"
                        name="currentPassword"
                        rules={[{ required: true, message: "Please input password!" }]}
                    >
                        <Input.Password placeholder="Current Password" />
                    </Form.Item>

                    <Form.Item
                        className="w-full"
                        name="newPassword"
                        rules={[{ required: true, message: "Please input password!" }]}
                    >
                        <Input.Password placeholder="New Password" />
                    </Form.Item>

                    <Form.Item
                        className="w-full"
                        name="confirmPass"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Please input password!"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error("The new password that you entered do not match!"))
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder="Confirm New Password" />
                    </Form.Item>

                    <Form.Item className="w-full">
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </ModalAntd>
    )
}

export default ModalUpdatePassword
