import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useDeletePaymentMutation } from "@/redux/services/payments/payments.service"
import { Button, Spin } from "antd"

const ModalDelete = (props: IModal) => {
    const { title, id } = props

    const [deletePayment, { data, error, isLoading }] = useDeletePaymentMutation()

    const handleClick = async () => {
        await deletePayment({ id: Number(id) })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center">
                {" "}
                Are you sure you want to end this payment? Please provide any additional notes if needed. This action
                cannot be undone.
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    Delete payment
                </Button>
            </div>
        </Spin>
    )
}

export default ModalDelete
