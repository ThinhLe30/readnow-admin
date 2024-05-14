import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useCancleRentalMutation } from "@/redux/services/rentals/rentals.service"
import { Button, Spin } from "antd"

const ModalCancel = (props: IModal) => {
    const { title, id } = props

    const [cancelRental, { data, error, isLoading }] = useCancleRentalMutation()

    const handleClick = async () => {
        await cancelRental({ id: Number(id) })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center">
                {" "}
                Are you sure you want to cancel this rental? Please provide any additional notes if needed. This action
                cannot be undone.
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    Cancel
                </Button>
            </div>
        </Spin>
    )
}

export default ModalCancel
