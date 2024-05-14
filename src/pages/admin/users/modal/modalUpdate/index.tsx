import { Button, Form, Input, Select, Upload, Image, Spin } from "antd"
import { ROLE } from "@/utils/constants/GlobalConst"
import { AiOutlineUpload } from "react-icons/ai"
import { useUpdateUserMutation } from "@/redux/services/user/user.service"
import { createUserFormData, normFile } from "@/utils/helpers"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"

const ModalUpdate = (props: IModal) => {
    const { title, data: user } = props
    const [updateUser, { data, error, isLoading }] = useUpdateUserMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const formData = createUserFormData(values)

        await updateUser({ id: user!.id, formData: formData })
    }

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                key={user?.id}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{
                    id: user?.id,
                    email: user?.email,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    phoneNumber: user?.phoneNumber,
                    role: user?.role
                }}
                className="flex w-full flex-col items-center gap-2"
            >
                <Form.Item className="w-full" name="id">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid email!"
                        },
                        {
                            required: true,
                            message: "Please input email!"
                        }
                    ]}
                >
                    <Input disabled className="w-full" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="firstName"
                    rules={[{ required: true, message: "Please input firstname!" }]}
                >
                    <Input placeholder="Firstname" />
                </Form.Item>
                <Form.Item className="w-full" name="lastName">
                    <Input placeholder="Lastname" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please input phone number!" }]}
                >
                    <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item className="w-full" name="photo" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="https://run.mocky.io/v3/932209e6-af4b-43b5-8d72-d30cf92e3027" listType="picture">
                        <Button
                            icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                            className="flex flex-row-reverse items-center justify-between gap-2"
                        >
                            Upload photo
                        </Button>
                        <Image
                            onClick={(e) => e.stopPropagation()}
                            src={user?.photo}
                            alt="avatar"
                            className="z-40 rounded-full"
                        />
                    </Upload>
                </Form.Item>
                <Form.Item className="w-full" name="role" rules={[{ required: true }]}>
                    <Select placement="topRight" placeholder="Role">
                        <Select.Option value={ROLE.ADMIN}>Admin</Select.Option>
                        <Select.Option value={ROLE.MOD}>Mod</Select.Option>
                        <Select.Option value={ROLE.USER}>User</Select.Option>
                    </Select>
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
