import { useGetRoomsInBlocksQuery } from "@/redux/services/room/room.service"
import { Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import PageHeader from "@/container/PageHeader"
import TableToolbar from "@/container/Toolbar"
import TableManageRooms from "@/container/room/viewRooms/TableManageRooms"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalProps from "@/container/room/modal"
import { useParams } from "react-router-dom"
import { useGetRoomBlockQuery } from "@/redux/services/block/block.service"

const RoomsManagement = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const keyword = useAppSelector((state) => state.search.keyword)
    const { id } = useParams()
    const { data, isLoading } = useGetRoomsInBlocksQuery({ role, id: id || "", keyword })
    const { data: dataBlock } = useGetRoomBlockQuery({ role, id: id || "" })

    const roomBlock = dataBlock?.data.roomBlock
    const address = roomBlock?.address
    const rooms = data?.data?.roomBlocks || []

    return (
        <div className="flex-1 px-6 py-4">
            <Spin spinning={isLoading}>
                <ModalProps />
                <PageHeader title="Rooms Management" subTitle={address} />
                <TableToolbar type={PAGE.ROOM} />
                <TableManageRooms rooms={rooms} />
            </Spin>
        </div>
    )
}

export default RoomsManagement
