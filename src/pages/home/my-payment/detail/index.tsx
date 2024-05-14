import { Badge, Button, Form, Input, Spin } from "antd"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Rule from "./rule"
import Contract from "./contract"
import { useEffect } from "react"
import { PAYMENT_STATUS, PAYMENT_STATUS_TEXT, PAYMENT_STATUS_COLORS } from "@/utils/constants/GlobalConst"
import { message } from "antd"
import { useCheckoutPaymentMutation, useGetMyPaymentQuery } from "@/redux/services/payments/payments.service"
import { SITE_MAP } from "@/utils/constants/Path"

const MyPaymentDetail = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const checkout = new URLSearchParams(useLocation().search).get("checkout")

    useEffect(() => {
        if (checkout) {
            message.success("Checkout payment successfully!")
        }
    }, [checkout])

    const { data, isLoading } = useGetMyPaymentQuery({ id: Number(id) })
    const [checkoutPayment, { isLoading: isCheckoutLoading }] = useCheckoutPaymentMutation()

    const myPayment = data?.data
    const status = myPayment?.status

    useEffect(() => {
        if (myPayment) {
            form.setFieldsValue({
                expirationDate: myPayment.expirationDate,
                electricNumber: myPayment.electricNumber,
                totalElectricPrice: myPayment.totalElectricPrice,
                waterNumber: myPayment.waterNumber,
                totalWaterPrice: myPayment.totalWaterPrice,
                additionalPrice: myPayment.additionalPrice,
                totalPrice: myPayment.totalPrice
            })
        }
    }, [data, form, myPayment])

    const onFinish = async () => {
        const res = await checkoutPayment({ id: Number(id) })

        if ("data" in res && res.data) {
            window.open(res.data.data.toString(), "_blank")
        }
    }

    return (
        <div className="mb-16 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <div className="flex flex-row items-center">
                <span onClick={() => navigate(`/${SITE_MAP.MY_PAYMENT}`)}>
                    <MdOutlineArrowBackIosNew className="-ml-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-black transition duration-100 hover:scale-110 hover:bg-gray-100" />
                </span>

                <h1 className="text-xl font-bold">My payments</h1>
            </div>
            <Rule />
            <Spin spinning={isLoading}>
                <div className="mt-4 flex gap-20">
                    <div className="grow">
                        <Form form={form} onFinish={onFinish} layout="vertical" colon={false}>
                            <div>
                                <h2 className="text-lg font-bold">Payment Information</h2>
                                <div className="mx-2 mt-2 flex gap-12">
                                    <div className="flex w-full flex-col">
                                        <Form.Item label="Electric number" name="electricNumber" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Water number" name="waterNumber" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Additional price" name="additionalPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                    <div className="flex w-full flex-col">
                                        <Form.Item
                                            label="Total electric price"
                                            name="totalElectricPrice"
                                            className="text-sm"
                                        >
                                            <Input readOnly />
                                        </Form.Item>

                                        <Form.Item label="Total water price" name="totalWaterPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Total price" name="totalPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>

                            {status === PAYMENT_STATUS.UNPAID && (
                                <div className="mt-8 flex w-full justify-center">
                                    <Button
                                        loading={isCheckoutLoading}
                                        type="primary"
                                        htmlType="submit"
                                        className="h-full w-full rounded-lg bg-primary px-10 py-2 font-bold text-white hover:shadow-md hover:shadow-primary/60"
                                    >
                                        Checkout
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>
                    <Badge.Ribbon
                        style={{ top: "-11px" }}
                        text={PAYMENT_STATUS_TEXT[status as PAYMENT_STATUS]}
                        color={PAYMENT_STATUS_COLORS[status as PAYMENT_STATUS]}
                    >
                        <Contract
                            rentalInfo={myPayment?.rental.rentalInfo}
                            hostInfo={myPayment?.rental.hostInfo}
                            roomInfo={myPayment?.rental.roomInfo}
                        />
                    </Badge.Ribbon>
                </div>
            </Spin>
        </div>
    )
}

export default MyPaymentDetail
