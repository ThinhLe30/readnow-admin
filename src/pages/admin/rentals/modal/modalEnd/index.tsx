import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useEndRentalMutation } from "@/redux/services/rentals/rentals.service"
import { Button, Spin } from "antd"

const ModalEnd = (props: IModal) => {
    const { title, id } = props

    const [endRental, { data, error, isLoading }] = useEndRentalMutation()

    const handleClick = async () => {
        await endRental({ id: Number(id) })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center">
                {" "}
                Are you sure you want to end this rental? Please provide any additional notes if needed. This action
                cannot be undone.
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    End rental
                </Button>
            </div>
        </Spin>
    )
}

export default ModalEnd
