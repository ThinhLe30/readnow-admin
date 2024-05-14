import { Button, Form, Input, Select, Spin } from "antd"
import { useCreateRoomBlockMutation } from "@/redux/services/block/block.service"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoomBlockRequest } from "@/interfaces/block.interface"
import { IModal } from "@/interfaces/modal.interface"
import { useAppSelector } from "@/redux/hook"
import { SearchMap } from "../../search"
import Map from "@/components/Map"
import Title from "@/components/Modal/Title"
import "../style.css"
import { useGetLandLordQuery } from "@/redux/services/user/user.service"
import { ILandlord } from "@/interfaces/user.interface"
import { ROLE } from "@/utils/constants/GlobalConst"
const { TextArea } = Input

export const formRoomBlockRules = {
    description: [{ required: true, message: "Please input description!" }],
    landlord: [{ required: true, message: "Please input landlord!" }],
    address: [{ required: true, message: "Please input address!" }]
}

const ModalAdd = (props: IModal) => {
    const { title } = props
    const role = useAppSelector((state) => state.auth.userInfo!.role)
    const placeInfo = useAppSelector((state) => state.searchMap.placeInfo)
    const { lat, lng } = placeInfo.latlng

    const [createRoomBlock, { data, error, isLoading }] = useCreateRoomBlockMutation()
    const { data: landLordData, isLoading: isLandLordLoading } = useGetLandLordQuery()

    const landlords = landLordData?.data.modList as ILandlord[]

    const onFinish = async (values: any) => {
        const roomBlockRequest: IRoomBlockRequest = {
            address: placeInfo.address.replace(/, \d{5},/g, ","),
            district: placeInfo.district,
            city: placeInfo.city,
            country: placeInfo.country,
            coordinate: {
                latitude: placeInfo.latlng.lat,
                longitude: placeInfo.latlng.lng
            },
            description: values.description,
            landlordId: values.landlordId
        }

        console.log(roomBlockRequest)

        await createRoomBlock({ role, data: roomBlockRequest })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading}>
            <Title>{title}</Title>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                layout="horizontal"
                className="flex w-full flex-col items-center"
            >
                {role === ROLE.ADMIN && (
                    <Form.Item className="w-full" name="landlordId" rules={formRoomBlockRules.landlord}>
                        <Select placeholder="Landlord" loading={isLandLordLoading}>
                            {landlords?.map((landlord: ILandlord) => (
                                <Select.Option key={landlord.id} value={landlord.id}>
                                    {landlord.name} - {landlord.phoneNumber}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item className="w-full" name="description" rules={formRoomBlockRules.description}>
                    <TextArea rows={4} placeholder="Description" />
                </Form.Item>
                <Form.Item className="w-full" rules={formRoomBlockRules.address}>
                    <SearchMap />
                </Form.Item>
                <Form.Item className="w-full">
                    <Map center={[lat, lng]} />
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

export default ModalAdd
