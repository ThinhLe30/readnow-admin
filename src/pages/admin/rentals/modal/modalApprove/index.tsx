import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useApproveRentalMutation } from "@/redux/services/rentals/rentals.service"
import { Button, Spin } from "antd"

const ModalApprove = (props: IModal) => {
    const { title, id } = props

    const [approveRental, { data, error, isLoading }] = useApproveRentalMutation()

    useServerMessage({ data: data!, error: error })

    const handleClick = async () => {
        await approveRental({ id: Number(id) })
    }

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center">
                {" "}
                Are you sure you want to approve this rental? Please provide any additional notes if needed. This action
                cannot be undone.
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-green-500 text-white`}>
                    Approve
                </Button>
            </div>
        </Spin>
    )
}

export default ModalApprove
