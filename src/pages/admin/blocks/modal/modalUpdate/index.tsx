import Map from "@/components/Map"
import { Button, Form, Input, Spin } from "antd"
import { IModal } from "@/interfaces/modal.interface"
import "../style.css"
import { formRoomBlockRules } from "../modalAdd"
import { useUpdateRoomBlockMutation } from "@/redux/services/block/block.service"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoomBlock, IRoomBlockRequest } from "@/interfaces/block.interface"
import Title from "@/components/Modal/Title"
import { SearchMap } from "../../search"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import { setPlaceInfo } from "@/redux/features/search-map/search-map.slice"

const ModalUpdate = (props: IModal) => {
    const { title, data: block } = props
    const role = useAppSelector((state) => state.auth.userInfo!.role)
    const { id, address, coordinate, city, country, district, description, landlord } = block as IRoomBlock
    const [center, setCenter] = useState<[number, number]>([coordinate.latitude, coordinate.longitude])

    const dispatch = useAppDispatch()
    const placeInfo = useAppSelector((state) => state.searchMap.placeInfo)

    useEffect(() => {
        setCenter([placeInfo?.latlng.lat, placeInfo?.latlng.lng])
    }, [placeInfo])

    useEffect(() => {
        if (block) {
            dispatch(
                setPlaceInfo({
                    name: address,
                    city: city,
                    district: district,
                    country: country,
                    latlng: {
                        lat: coordinate.latitude,
                        lng: coordinate.longitude
                    }
                })
            )
        }
    }, [block, dispatch])

    const [updateRoomBlock, { data, error, isLoading }] = useUpdateRoomBlockMutation()

    const onFinish = async (values: any) => {
        const roomBlockRequest: IRoomBlockRequest = {
            ...(placeInfo
                ? {
                      address: placeInfo?.address.replace(/, \d{5},/g, ","),
                      district: placeInfo.district,
                      city: placeInfo.city,
                      country: placeInfo?.country,
                      coordinate: {
                          latitude: placeInfo?.latlng.lat,
                          longitude: placeInfo?.latlng.lng
                      }
                  }
                : { ...block }),
            description: values?.description,
            landlordId: landlord?.id
        }

        await updateRoomBlock({ role, id, data: roomBlockRequest })
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
                initialValues={{
                    id: id,
                    description: description
                }}
                className="flex w-full flex-col items-center"
            >
                <Form.Item className="w-full" name="id">
                    <Input disabled />
                </Form.Item>
                <Form.Item className="w-full" name="description" rules={formRoomBlockRules.description}>
                    <Input placeholder="Description" />
                </Form.Item>
                <Form.Item className="w-full" rules={formRoomBlockRules.address}>
                    <SearchMap myAddress={address} />
                </Form.Item>

                <Form.Item className="w-full">
                    <Map center={center} />
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
