import { useAppSelector } from "@/redux/hook"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { message } from "../contract"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { IUser } from "@/interfaces/user.interface"
import Rule from "./rule"
import Contract from "./contract"
import { useCreateRentalMutation } from "@/redux/services/rental/rental.service"
import useServerMessage, { TServerMessage } from "@/hooks/useServerMessage"
import { formatDate } from "@/utils/helpers"
import { dateFormat } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"

const Rental = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser
    const { moveInDate = "01/01/2015", leaseTerm, numberOfTenants } = useAppSelector((state) => state.contract)
    const { email, phoneNumber: phone, firstName, lastName } = userInfo || {}

    const [createRental, { data, error, isLoading }] = useCreateRentalMutation()

    const initialValues = {
        firstName,
        lastName,
        email,
        phone,
        identityNumber: "",
        identityDateOfIssue: "",
        identityPlaceOfIssue: "",
        birthday: "",
        leaseTerm,
        moveInDate,
        numberOfTenants
    }

    const onFinish = async (values: any) => {
        const rentalInfo = {
            roomId: id!,
            tenantInfo: {
                identityNumber: values.identityNumber,
                identityDateOfIssue: formatDate(values.identityDateOfIssue),
                identityPlaceOfIsse: values.identityPlaceOfIssue,
                birthday: formatDate(values.birthday),
                phoneNumber: values.phone
            },
            rentalInfo: {
                leaseTerm: parseInt(values.leaseTerm, 10),
                moveInDate: formatDate(values.moveInDate),
                numberOfTenants: parseInt(values.numberOfTenants, 10)
            }
        }

        const res = (await createRental({ data: rentalInfo })) as TServerMessage
        const data = res?.data

        if (data && (data.status === "success" || data.success === true)) {
            navigate(`/${SITE_MAP.MY_RENTAL}`)
        }
    }

    useServerMessage({ data, error })

    return (
        <div className="mb-16 mt-4 px-36">
            <div className="flex flex-row items-center">
                <span onClick={() => navigate(-1)}>
                    <MdOutlineArrowBackIosNew className="-ml-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-black transition duration-100 hover:scale-110 hover:bg-gray-100" />
                </span>
                <h1 className="text-xl font-bold">Confirm and Request Rent</h1>
            </div>
            <Rule />
            <div className="mt-4 flex gap-20">
                <div className="grow">
                    <Form onFinish={onFinish} initialValues={initialValues} layout="vertical" colon={false}>
                        <div>
                            <h2 className="text-lg font-bold">Personal Information</h2>
                            <div className="mx-2 mt-2 flex gap-12">
                                <div className="flex w-full flex-col">
                                    <Form.Item
                                        label="Firstname"
                                        name="firstName"
                                        className="text-sm"
                                        rules={[{ required: true, message }]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Lastname"
                                        name="lastName"
                                        className="text-sm"
                                        rules={[{ required: true, message }]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        className="text-sm"
                                        rules={[
                                            {
                                                type: "email",
                                                message: "The input is not valid email!"
                                            },
                                            { required: true, message }
                                        ]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        className="text-sm"
                                        rules={[{ required: true, message }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="flex w-full flex-col">
                                    <Form.Item
                                        label="Identity number"
                                        name="identityNumber"
                                        className="text-sm"
                                        rules={[{ required: true, message, pattern: new RegExp(/^[0-9]+$/) }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Identity date of issue"
                                        name="identityDateOfIssue"
                                        className="text-sm"
                                        rules={[
                                            {
                                                required: true,
                                                message
                                            }
                                        ]}
                                    >
                                        <DatePicker className="w-full" format={dateFormat} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Identity place of issue"
                                        name="identityPlaceOfIssue"
                                        className="text-sm"
                                        rules={[
                                            {
                                                required: true,
                                                message
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Birthday"
                                        name="birthday"
                                        className="text-sm"
                                        rules={[{ required: true, message }]}
                                    >
                                        <DatePicker className="w-full" format={dateFormat} />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-b border-gray-200" />
                        <div>
                            <h2 className="text-lg font-bold">Rental Information</h2>
                            <div className="mx-2 mt-2 w-1/2 pr-10">
                                <Form.Item name="leaseTerm" rules={[{ required: true, message }]}>
                                    <Select showSearch placeholder="Select months" optionFilterProp="children">
                                        <Select.Option value="3">3 months</Select.Option>
                                        <Select.Option value="6">6 months</Select.Option>
                                        <Select.Option value="9">9 months</Select.Option>
                                        <Select.Option value="12">12 months</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Move in date"
                                    name="moveInDate"
                                    className="text-sm"
                                    rules={[{ required: true, message }]}
                                >
                                    <DatePicker className="w-full" format={dateFormat} />
                                </Form.Item>
                                <Form.Item
                                    label="Number of tenants"
                                    name="numberOfTenants"
                                    className="text-sm"
                                    rules={[{ required: true, message }]}
                                >
                                    <Select showSearch placeholder="Select tenants" optionFilterProp="children">
                                        <Select.Option value="1">1 tenant</Select.Option>
                                        <Select.Option value="2">2 tenants</Select.Option>
                                        <Select.Option value="3">3 tenants</Select.Option>
                                        <Select.Option value="4">4 tenants</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="mt-8 flex w-full justify-center">
                            <Button
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                                className="h-full w-full rounded-lg bg-primary px-10 py-2 font-bold text-white hover:shadow-md hover:shadow-primary/60"
                            >
                                Request rent
                            </Button>
                        </div>
                    </Form>
                </div>
                <Contract />
            </div>
        </div>
    )
}

export default Rental
