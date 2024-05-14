import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useAcceptBreakRentalMutation } from "@/redux/services/rentals/rentals.service"
import { Button, Spin } from "antd"

const ModalAcceptBreak = (props: IModal) => {
    const { title, id } = props

    const [acceptBreakRental, { data, error, isLoading }] = useAcceptBreakRentalMutation()

    const handleClick = async () => {
        await acceptBreakRental({ id: Number(id) })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center">
                Are you sure you want to accept the break in this rental? Please provide any additional notes if needed.
                This action cannot be undone.
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    Accept
                </Button>
            </div>
        </Spin>
    )
}

export default ModalAcceptBreak
