import { Button, Form, Rate, Spin } from "antd"
import Title from "@/components/Modal/Title"
import { useAppSelector } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalAntd from "@/components/Modal"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useReviewRentalMutation } from "@/redux/services/rentals/rentals.service"
import { useParams } from "react-router"
import useServerMessage from "@/hooks/useServerMessage"

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"]

const ModalReview = () => {
    const { id } = useParams()
    const type = useAppSelector((state) => state.modal.type)
    const [reviewRental, { data, error, isLoading }] = useReviewRentalMutation()
    const [rates, setRates] = useState({
        cleanRate: 5,
        supportRate: 5,
        locationRate: 5,
        securityRate: 5
    })

    const onFinish = async (values: any) => {
        const reviewData = {
            ...rates,
            rentalId: Number(id),
            comment: values.comment
        }
        await reviewRental(reviewData)
    }

    useServerMessage({ data, error })

    if (type !== MODAL.REVIEW.RENTAL) return null

    return (
        <ModalAntd>
            <Spin spinning={isLoading}>
                <Title>Review room</Title>
                <Form onFinish={onFinish} layout="horizontal" className="flex w-full flex-col items-center gap-2">
                    <Form.Item
                        label="Clean Rate"
                        className="!w-full"
                        name="cleanRate"
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                    >
                        <div className="flex items-center gap-4">
                            <Rate
                                allowClear={false}
                                key={1}
                                tooltips={desc}
                                onChange={(value) => setRates((prevValue) => ({ ...prevValue, cleanRate: value }))}
                                value={rates.cleanRate}
                            />
                            {rates ? <span className="text-[0.8rem]">{desc[rates.cleanRate - 1]}</span> : ""}
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Support Rate"
                        className="!w-full"
                        name="supportRate"
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                    >
                        <div className="flex items-center gap-4">
                            <Rate
                                allowClear={false}
                                key={1}
                                tooltips={desc}
                                onChange={(value) => setRates((prevValue) => ({ ...prevValue, supportRate: value }))}
                                value={rates.supportRate}
                            />
                            {rates ? <span className="text-[0.8rem]">{desc[rates.supportRate - 1]}</span> : ""}
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Location Rate"
                        className="!w-full"
                        name="locationRate"
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                    >
                        <div className="flex items-center gap-4">
                            <Rate
                                allowClear={false}
                                key={1}
                                tooltips={desc}
                                onChange={(value) => setRates((prevValue) => ({ ...prevValue, locationRate: value }))}
                                value={rates.locationRate}
                            />
                            {rates ? <span className="text-[0.8rem]">{desc[rates.locationRate - 1]}</span> : ""}
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Security Rate"
                        className="!w-full"
                        name="securityRate"
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                    >
                        <div className="flex items-center gap-4">
                            <Rate
                                allowClear={false}
                                key={1}
                                tooltips={desc}
                                onChange={(value) => setRates((prevValue) => ({ ...prevValue, securityRate: value }))}
                                value={rates.securityRate}
                            />
                            {rates ? <span className="text-[0.8rem]">{desc[rates.securityRate - 1]}</span> : ""}
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Comment"
                        className="!w-full"
                        name="comment"
                        labelAlign="left"
                        labelCol={{ span: 24 }}
                    >
                        <TextArea rows={4} style={{ display: "block", width: "100%" }} />
                    </Form.Item>

                    <Form.Item className="w-full">
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </ModalAntd>
    )
}

export default ModalReview
