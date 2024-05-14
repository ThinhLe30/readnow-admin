import { Button, Form, Input, Spin, DatePicker, InputNumber } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { IRentals } from "@/interfaces/rentals.interface"
import { useGetModInfoQuery, useUpdateRentalMutation } from "@/redux/services/rentals/rentals.service"
import { useEffect } from "react"
import { formatDate } from "@/utils/helpers"
import { dateFormat } from "@/utils/constants/GlobalConst"
import dayjs from "dayjs"

const ModalUpdate = (props: IModal) => {
    const { title, data: rental } = props
    const { rentalInfo } = rental as IRentals

    const [updateRental, { data, error, isLoading }] = useUpdateRentalMutation()

    const { data: modInfo, isLoading: isGetModLoading } = useGetModInfoQuery()

    const [form] = Form.useForm()

    useEffect(() => {
        if (modInfo?.data) {
            const { data: initialValues } = modInfo

            console.log(initialValues)

            const identityValue = initialValues.identityDateOfIssue
            const birthdayValue = initialValues.birthday
            const identityDate = dayjs(identityValue).format(dateFormat)
            const birthdayDate = dayjs(birthdayValue).format(dateFormat)

            form.setFieldsValue({
                firstName: initialValues.firstName,
                identityNumber: initialValues.identityNumber,
                identityDateOfIssue: identityValue !== "" ? dayjs(identityDate, dateFormat) : "",
                identityPlaceOfIssue: initialValues.identityPlaceOfIssue,
                birthday: birthdayValue !== "" ? dayjs(birthdayDate, dateFormat) : "",
                electricPrice: initialValues.electricPrice,
                waterPrice: initialValues.waterPrice
            })
        }
    }, [modInfo, form])

    const onFinish = async (values: any) => {
        const data = {
            hostInfo: {
                identityNumber: values.identityNumber,
                identityDateOfIssue: formatDate(values.identityDateOfIssue),
                identityPlaceOfIssue: values.identityPlaceOfIssue,
                birthday: formatDate(values.birthday)
            },
            rentalInfo: {
                electricPrice: Number(values.electricPrice),
                waterPrice: Number(values.waterPrice),
                leaseTerminationCost: Number(values.leaseTerminationCost),
                additionalPrice: Number(values.additionalPrice)
            }
        }

        await updateRental({ id: rentalInfo!.id, data })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading || isGetModLoading}>
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
                <h2 className="mb-1 w-full text-lg font-bold">Host information</h2>
                <Form.Item
                    className="w-full"
                    name="firstName"
                    rules={[{ required: true, message: "Please input firstName" }]}
                >
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="identityNumber"
                    rules={[
                        { required: true, message: "Please input Identity number", pattern: new RegExp(/^[0-9]+$/) }
                    ]}
                >
                    <Input placeholder="Identity number" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="identityDateOfIssue"
                    rules={[
                        {
                            required: true,
                            message: "Please input Identity number"
                        }
                    ]}
                >
                    <DatePicker placeholder="Identity date of issue" className="w-full" format={dateFormat} />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="identityPlaceOfIssue"
                    rules={[
                        {
                            required: true,
                            message: "Please input Identity number"
                        }
                    ]}
                >
                    <Input placeholder="Identity place of issue" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="birthday"
                    rules={[{ required: true, message: "Please input birthday" }]}
                >
                    <DatePicker picker="date" placeholder="Birthday" className="w-full" format={dateFormat} />
                </Form.Item>
                <h2 className="mb-1 w-full text-lg font-bold">Rental information</h2>
                <Form.Item
                    className="w-full"
                    name="electricPrice"
                    rules={[
                        {
                            required: true,

                            message: "Please input electricPrice!"
                        }
                    ]}
                >
                    <InputNumber type="number" className="w-full" placeholder="Electric Price" addonAfter="VND" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="waterPrice"
                    rules={[{ required: true, message: "Please input Water Price!" }]}
                >
                    <InputNumber type="number" className="w-full" placeholder="Water Price" addonAfter="VND" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="leaseTerminationCost"
                    rules={[{ required: true, message: "Please input Lease Termination Cost!" }]}
                >
                    <InputNumber
                        type="number"
                        className="w-full"
                        placeholder="Lease Termination Cost"
                        addonAfter="VND"
                    />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="additionalPrice"
                    rules={[
                        {
                            required: false,
                            message: "Please input Additional Price!"
                        }
                    ]}
                >
                    <InputNumber type="number" className="w-full" placeholder="Additional Price" addonAfter="VND" />
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
