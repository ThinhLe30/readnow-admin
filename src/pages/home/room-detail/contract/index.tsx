import { setContract } from "@/redux/features/contract/contract.slice"
import { useAppDispatch } from "@/redux/hook"
import { SITE_MAP } from "@/utils/constants/Path"
import { Form, DatePicker, Select, Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import { formatPrice } from "@/utils/helpers"
import useAuth from "@/hooks/useAuth"
import { dateFormat } from "@/utils/constants/GlobalConst"
interface IContract {
    price: string
}

export const message = "Please input this field!"

const Contract = (props: IContract) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { isAuth } = useAuth()

    const onFinish = (values: any) => {
        if (isAuth) {
            dispatch(setContract(values))
            navigate(`/${SITE_MAP.RENT}/${id}`)
        } else {
            navigate(`/${SITE_MAP.AUTH.LOGIN}`)
        }
    }

    const date = new Date()
    const currentDate = dayjs(date).format(dateFormat)

    return (
        <div className="relative z-[9999999] h-fit w-96 rounded-lg border border-gray-200 bg-white px-8 py-6 shadow-lg">
            <Form
                name="contractForm"
                layout="vertical"
                initialValues={{
                    moveInDate: dayjs(currentDate, dateFormat),
                    leaseTerm: "3",
                    numberOfTenants: "2"
                }}
                onFinish={onFinish}
            >
                <span className="text-sm">
                    <b className="text-xl font-bold">{formatPrice(props.price)}</b> /month
                </span>
                <div className="mt-4 flex flex-col rounded-lg border border-gray-300 font-medium">
                    <div className="flex border-b">
                        <div className="flex w-full flex-col gap-1 border-r px-4 pt-4 text-left text-sm">
                            Move in date
                            <Form.Item name="moveInDate" rules={[{ required: true, message }]}>
                                <DatePicker format={dateFormat} />
                            </Form.Item>
                        </div>
                        <div className="flex w-full flex-col gap-1 border-r px-4 pt-4 text-left text-sm">
                            Lease term
                            <Form.Item
                                name="leaseTerm"
                                rules={[{ required: true, message: "Please select lease term!" }]}
                            >
                                <Select showSearch placeholder="Select months" optionFilterProp="children">
                                    <Select.Option value="3">3 months</Select.Option>
                                    <Select.Option value="6">6 months</Select.Option>
                                    <Select.Option value="9">9 months</Select.Option>
                                    <Select.Option value="12">12 months</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1 border-r px-4 pt-4 text-left text-sm">
                        Number of tenants
                        <Form.Item
                            name="numberOfTenants"
                            rules={[{ required: true, message: "Please select number of tenants!" }]}
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
                <div className="mt-4 flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full rounded-lg bg-primary font-bold text-white hover:shadow-md hover:shadow-primary/60"
                    >
                        Prepare contract
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Contract
