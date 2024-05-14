import { Button, Form, Input } from "antd"
import { useAppDispatch } from "@/redux/hook"
import useServerMessage from "@/hooks/useServerMessage"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useBecomeHostMutation } from "@/redux/services/becomeHost/become-host.service"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import useAuth from "@/hooks/useAuth"
import parsePhoneNumberFromString from "libphonenumber-js"
import { BecomeAHost, Step1, Step2, Step3 } from "@/assets/images"

const BecomeHost = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [becomeHost, { data, error, isLoading }] = useBecomeHostMutation()

    const { userInfo } = useAuth()

    const onFinish = async (values: any) => {
        const phoneNumber = parsePhoneNumberFromString(values.phoneNumber, "VN")
        values.phoneNumber = phoneNumber?.number || ""

        const body = {
            bankCode: values.bankCode.trim(),
            accountNumber: values.accountNumber.trim(),
            phoneNumber: values.phoneNumber.trim()
        }

        const result = await becomeHost(body)
        if ("data" in result) {
            const { data } = result
            if (data?.token) {
                dispatch(setCredentials({ accessToken: data?.token.token }))
                navigate(`${SITE_MAP.MOD}/blocks`)
            }
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <>
            <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
                <div className="grid grid-cols-2 gap-32">
                    <div>
                        <strong className="mb-4 text-3xl font-bold text-secondary">Become a host in Rentally</strong>
                        <p className="mb-8 mt-2 text-gray-500">
                            Becoming a host on a platform offers several advantages, providing individuals with the
                            tools and features to effectively manage their accommodations.
                        </p>
                        <div className="flex w-full items-center justify-between gap-8">
                            <div className="flex items-start gap-3">
                                <span className="text-xl font-bold">1</span>

                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-bold">Basic Information</p>
                                    <p className="text-gray-500">
                                        Phone number, bank details, and codes for smooth communication.
                                    </p>
                                </div>
                            </div>
                            <img src={Step1} alt="Step 1" className="h-24 w-24" />
                        </div>
                        <hr className="my-4 border border-t border-gray-100" />
                        <div className="flex w-full items-center justify-between gap-8">
                            <div className="flex items-start gap-3">
                                <span className="text-xl font-bold">2</span>

                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-bold"> Set the Scene</p>
                                    <p className="text-gray-500">
                                        Engaging photos, compelling description, and clear title for your rental.
                                    </p>
                                </div>
                            </div>
                            <img src={Step2} alt="Step 2" className="h-24 w-24" />
                        </div>
                        <hr className="my-4 border border-t border-gray-100" />
                        <div className="flex w-full items-center justify-between gap-8">
                            <div className="flex items-start gap-3">
                                <span className="text-xl font-bold">3</span>

                                <div className="flex flex-col gap-1">
                                    <p className="text-xl font-bold">Get Ready for Renters</p>
                                    <p className="text-gray-500">
                                        Competitive pricing, updated calendar, and transparent rental terms.
                                    </p>
                                </div>
                            </div>
                            <img src={Step3} alt="Step 3" className="h-24 w-24" />
                        </div>

                        <div className="mt-10">
                            <strong className="text-3xl font-bold text-secondary">What's you got?</strong>
                            <div className="mt-4 flex max-w-md list-inside list-decimal flex-col gap-4 text-gray-500">
                                <span>1. Effortless Room Management</span>
                                <span>2. Room Block Management</span>
                                <span>3. Monthly Payment Tracking</span>
                                <span>4. Transaction Monitoring</span>
                                <span>5. Guest Communication and Feedback</span>
                                <span>6. Automated Booking and Reservation System</span>
                                <span>7. Safety and Trust</span>
                                <span>8. Marketing and Exposure</span>
                                <span>9. Host Support and Resources</span>
                                <span>10. Flexibility and Control</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={BecomeAHost} alt="Become a host" className="rounded-lg shadow-md" />
                        <div className="mt-8">
                            <strong className="mb-4 text-3xl font-bold text-secondary">Start now!</strong>
                            <Form
                                onFinish={onFinish}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                initialValues={{
                                    phoneNumber: userInfo?.phoneNumber
                                }}
                                layout="horizontal"
                                className="mt-4 flex w-full flex-col items-center gap-2"
                            >
                                <Form.Item
                                    className="w-full"
                                    name="bankCode"
                                    rules={[{ required: true, message: "Please input bank code!" }]}
                                >
                                    <Input placeholder="Bank Code" />
                                </Form.Item>
                                <Form.Item
                                    className="w-full"
                                    name="accountNumber"
                                    rules={[{ required: true, message: "Please input account number!" }]}
                                >
                                    <Input placeholder="Account Number" />
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
                                    <Input className="w-full" type="tel" placeholder="Phone number" />
                                </Form.Item>

                                <Form.Item className="w-full">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="mt-4 h-10 bg-primary font-medium text-white"
                                        loading={isLoading}
                                    >
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BecomeHost
