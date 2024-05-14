import { Button, Form, Input, Spin, DatePicker, InputNumber, Typography } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { useEffect } from "react"
import { useUpdatePaymentMutation } from "@/redux/services/payments/payments.service"
import { IPayments } from "@/interfaces/payments.interface"
import { formatPrice } from "@/utils/helpers"
import dayjs from "dayjs"
import { monthFormat } from "@/utils/constants/GlobalConst"

const ModalUpdate = (props: IModal) => {
    const { title, data: payment } = props

    const { id, electricNumber, waterNumber, additionalPrice, month, year, rental } = payment as IPayments

    const [updatePayment, { data, error, isLoading }] = useUpdatePaymentMutation()

    const [form] = Form.useForm()

    const electricNumberCurrent = Form.useWatch("electricNumber", form)
    const waterNumberCurrent = Form.useWatch("waterNumber", form)
    const additionalPriceCurrent = Form.useWatch("additionalPrice", form)

    const electricPriceCurrent = electricNumberCurrent * Number(rental.rentalInfo?.electricPrice)
    const waterPriceCurrent = waterNumberCurrent * Number(rental.rentalInfo?.waterPrice)
    const totalPriceCurrent = electricPriceCurrent + waterPriceCurrent + Number(additionalPriceCurrent)

    useEffect(() => {
        if (payment) {
            const date = `${year}/${month.toString().padStart(2, "0")}`
            const paymentDate = dayjs(date).format(monthFormat)

            form.setFieldsValue({
                id,
                electricNumber,
                waterNumber,
                additionalPrice,
                paymentTime: dayjs(paymentDate, monthFormat)
            })
        }
        //eslint-disable-next-line
    }, [payment, form])

    const onFinish = async (values: any) => {
        const body = {
            electricNumber: values.electricNumber,
            waterNumber: values.waterNumber,
            additionalPrice: Number(values.additionalPrice),
            month: values.paymentTime.month() + 1,
            year: values.paymentTime.year()
        }

        await updatePayment({ id, body })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                key={id}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
                className="flex w-full flex-col items-center gap-2"
            >
                <Form.Item className="w-full" name="id">
                    <Input placeholder="Payment Id" disabled />
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
                        format={monthFormat}
                    />
                </Form.Item>
                <Typography className="w-full">
                    <pre>Total electric price: {electricPriceCurrent ? formatPrice(electricPriceCurrent) : "N/A"}</pre>
                    <pre>Total water price: {waterPriceCurrent ? formatPrice(waterPriceCurrent) : "N/A"}</pre>
                    <pre>Total price: {totalPriceCurrent ? formatPrice(totalPriceCurrent) : "N/A"}</pre>
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

export default ModalUpdate
