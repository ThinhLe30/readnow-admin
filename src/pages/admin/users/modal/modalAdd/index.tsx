import { Button, Form, Input, Select, Spin, Upload } from "antd"
import { ROLE } from "@/utils/constants/GlobalConst"
import { AiOutlineUpload } from "react-icons/ai"
import { useCreateUserMutation } from "@/redux/services/user/user.service"
import { createUserFormData, normFile } from "@/utils/helpers"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import Title from "@/components/Modal/Title"
import parsePhoneNumberFromString from "libphonenumber-js"

const ModalAdd = (props: IModal) => {
    const { title } = props
    const [createUser, { data, error, isLoading }] = useCreateUserMutation()

    useServerMessage({ data: data!, error: error })

    const onFinish = async (values: any) => {
        const phoneNumber = parsePhoneNumberFromString(values.phoneNumber, "VN")
        values.phoneNumber = phoneNumber?.number || ""
        const formData = createUserFormData(values)
        await createUser(formData)
        // console.log(JSON.stringify(Object.fromEntries(formData.entries())))
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
                    <Input className="w-full" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="password"
                    rules={[{ required: true, message: "Please input password!" }]}
                >
                    <Input.Password placeholder="Password" />
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
                    rules={[
                        { required: true, message: "Please input phone number!" },
                        {
                            pattern: new RegExp(/^[0-9]{10}$/),
                            message: "Please input a valid phone number with 10 digits"
                        }
                    ]}
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
                        Finish
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalAdd
