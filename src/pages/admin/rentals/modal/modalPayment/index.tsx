import { Button, Form, Input, Spin, DatePicker, InputNumber, Typography } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { IRentals } from "@/interfaces/rentals.interface"
import { useEffect } from "react"
import { useCreatePaymentMutation } from "@/redux/services/payments/payments.service"
import { formatPrice } from "@/utils/helpers"

const ModalPayment = (props: IModal) => {
    const { title, data: rental } = props

    const { rentalInfo, roomInfo } = rental as IRentals
    console.log(rentalInfo)
    console.log(rental)

    const monthlyPrice = roomInfo?.price

    const [createPayment, { data, error, isLoading }] = useCreatePaymentMutation()

    const [form] = Form.useForm()

    const electricNumber = Form.useWatch("electricNumber", form)
    const waterNumber = Form.useWatch("waterNumber", form)
    const additionalPrice = Form.useWatch("additionalPrice", form)

    const electricPrice = electricNumber * Number(rentalInfo?.electricPrice)
    const waterPrice = waterNumber * Number(rentalInfo?.waterPrice)
    const totalPrice = electricPrice + waterPrice + Number(additionalPrice) + Number(monthlyPrice)

    useEffect(() => {
        if (rentalInfo) {
            form.setFieldsValue({
                rental_id: rentalInfo.id
            })
        }
    }, [rentalInfo, form])

    const onFinish = async (values: any) => {
        const body = {
            rental_id: values.rental_id,
            electricNumber: values.electricNumber,
            waterNumber: values.waterNumber,
            additionalPrice: values.additionalPrice,
            month: values.paymentTime.month() + 1,
            year: values.paymentTime.year()
        }

        await createPayment(body)
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                key={rentalInfo?.id}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
                className="flex w-full flex-col items-center gap-2"
            >
                <Form.Item className="w-full" name="rental_id">
                    <Input placeholder="Rental Id" disabled />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="electricNumber"
                    rules={[{ required: true, message: "Please input electric number" }]}
                >
                    <InputNumber className="w-full" type="number" placeholder="Electric number" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="waterNumber"
                    rules={[{ required: true, message: "Please input water number" }]}
                >
                    <InputNumber className="w-full" placeholder="Water number" type="number" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="additionalPrice"
                    rules={[
                        {
                            required: true,
                            message: "Please input additional price"
                        }
                    ]}
                >
                    <InputNumber addonAfter="VND" className="w-full" type="number" placeholder="Additional price" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="paymentTime"
                    rules={[
                        {
                            required: true,
                            message: "Please input payment time"
                        }
                    ]}
                >
                    <DatePicker
                        placeholder="Payment time"
                        picker="month"
                        placement={"bottomRight"}
                        className="w-full"
                    />
                </Form.Item>
                <Typography className="w-full">
                    <pre>Monthly price: {monthlyPrice ? formatPrice(monthlyPrice) : ""}</pre>
                    <pre>Total electric price: {electricPrice ? formatPrice(electricPrice) : ""}</pre>
                    <pre>Total water price: {waterPrice ? formatPrice(waterPrice) : ""}</pre>
                    <pre>Total price: {totalPrice ? formatPrice(totalPrice) : ""}</pre>
                </Typography>
                <Form.Item className="w-full">
                    <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                        Create payment
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalPayment
