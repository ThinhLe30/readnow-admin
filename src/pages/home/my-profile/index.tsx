import { Button, Form, Image, Input, Upload, UploadProps } from "antd"
import useAuth from "@/hooks/useAuth"
import { AiOutlineUpload } from "react-icons/ai"
import { createMyInfoFormData, normFile } from "@/utils/helpers"
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload"
import { useState } from "react"
import { useUpdateMyInfoMutation } from "@/redux/services/myProfile/my-profile.service"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import useServerMessage from "@/hooks/useServerMessage"
import { RiLockPasswordLine } from "react-icons/ri"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalUpdatePassword from "./modalUpdate"
import { ROLE } from "@/utils/constants/GlobalConst"

const MyProfile = () => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAuth()
    const [imageUrl, setImageUrl] = useState<string>()
    const [updateInfo, { data, error, isLoading }] = useUpdateMyInfoMutation()

    const onFinish = async (values: any) => {
        const body = createMyInfoFormData(values)

        const result = await updateInfo(body)

        if ("data" in result) {
            const { data } = result
            if (data?.token) {
                dispatch(setCredentials({ accessToken: data?.token.token }))
            }
        }
    }
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }
    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "uploading") {
            return
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setImageUrl(url)
            })
        }
    }
    useServerMessage({ data: data!, error: error })

    return (
        <>
            <section className="my-20">
                <div className="mx-auto w-full px-4 md:w-2/3 lg:w-4/12">
                    <div className="-mb-14 flex justify-end">
                        <Button
                            className="hover:text-primary"
                            icon={<RiLockPasswordLine className=" h-5 w-5 " />}
                            onClick={() => dispatch(openModal({ type: MODAL.UPDATE.PASSWORD }))}
                        ></Button>
                    </div>
                    <div className="relative mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="-mt-16 flex w-full justify-center px-4">
                                    <Image
                                        src={imageUrl ? imageUrl : userInfo?.photo}
                                        width={150}
                                        height={150}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="w-full px-4 text-center">
                                    <div className="mt-5 text-center">
                                        <h3 className="mb-4 text-xl font-semibold leading-normal text-gray-700">
                                            {userInfo?.firstName} {userInfo?.lastName}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-0 border-t border-gray-200 py-2">
                                <h3 className="mb-3 text-xl font-semibold leading-normal text-gray-700">
                                    My Infomation
                                </h3>
                                <div className="flex flex-wrap justify-center">
                                    <Form
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        className="flex w-full flex-col items-center gap-2"
                                        onFinish={onFinish}
                                        initialValues={{
                                            email: userInfo?.email,
                                            firstName: userInfo?.firstName,
                                            lastName: userInfo?.lastName,
                                            phoneNumber: userInfo?.phoneNumber,
                                            bankCode: userInfo?.bankCode,
                                            bankAccount: userInfo?.accountNumber
                                        }}
                                    >
                                        <Form.Item className="w-full" name="email">
                                            <Input className="w-full" placeholder="Email" readOnly />
                                        </Form.Item>

                                        <Form.Item className="w-full" name="firstName">
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
                                                    pattern: new RegExp(/^\+?(84|0[35789])\d{8,9}$/),
                                                    message: "Please input a valid Viet Nam phone number"
                                                }
                                            ]}
                                        >
                                            <Input placeholder="Phone" />
                                        </Form.Item>

                                        {userInfo?.role === ROLE.MOD && (
                                            <>
                                                <Form.Item className="w-full" name="bankCode">
                                                    <Input placeholder="Bank Code" readOnly />
                                                </Form.Item>
                                                <Form.Item className="w-full" name="bankAccount">
                                                    <Input placeholder="Bank Account" readOnly />
                                                </Form.Item>
                                            </>
                                        )}
                                        <Form.Item
                                            className="w-full"
                                            name="photo"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                listType="picture"
                                                onChange={handleChange}
                                                maxCount={1}
                                            >
                                                <Button
                                                    icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                                    className="flex flex-row-reverse items-center justify-between gap-2"
                                                >
                                                    Upload photo
                                                </Button>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item className="w-full">
                                            <Button
                                                loading={isLoading}
                                                type="primary"
                                                htmlType="submit"
                                                className="h-10 bg-primary text-white"
                                            >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalUpdatePassword />
        </>
    )
}

export default MyProfile
