import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useAppSelector } from "@/redux/hook"
import { useDeleteRoomBlockMutation } from "@/redux/services/block/block.service"
import { Button, Spin } from "antd"

const ModalDelete = (props: IModal) => {
    const { title, data: blockData } = props
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const { id, address } = blockData

    const [deleteRoomBlock, { data, error, isLoading }] = useDeleteRoomBlockMutation()

    const onDelete = async () => {
        await deleteRoomBlock({ role, id })
    }

    useServerMessage({ data: data!, error: error })

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>

            <p className=" mb-6 text-center font-medium">
                Are you sure you want to delete the room block {id} <br />
                at {address}?
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={onDelete} loading={isLoading} className={`border-none bg-red-500  text-white`}>
                    Delete{" "}
                </Button>
            </div>
        </Spin>
    )
}

export default ModalDelete
