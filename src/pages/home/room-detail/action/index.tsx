import { PiShareFat } from "react-icons/pi"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { IUser } from "@/interfaces/user.interface"
import { useCreateChecklistMutation } from "@/redux/services/checklist/checklist.service"
import { useNavigate } from "react-router-dom"
import { IRoomDetail } from "@/interfaces/room-detail.interface"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useState } from "react"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalShare from "./modal"
import useServerMessage from "@/hooks/useServerMessage"
import { Button } from "antd"

interface RoomActionProps {
    dataRoom: IRoomDetail
    onClick?: () => void
}

const RoomAction: React.FC<RoomActionProps> = ({ dataRoom }) => {
    const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser
    const [hasFavorited, setHasFavorited] = useState(dataRoom.isInCheckList)

    const [createChecklist, { data, error, isLoading }] = useCreateChecklistMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleOnClickLike = async () => {
        if (userInfo) {
            await createChecklist({
                data: {
                    roomId: dataRoom.id
                }
            })
            setHasFavorited((state: any) => !state)
        } else {
            navigate("/login")
        }
    }

    useServerMessage({ data, error })

    return (
        <div className="flex items-center gap-2">
            <ModalShare dataRoom={dataRoom} />
            <Button
                onClick={() => dispatch(openModal({ type: MODAL.SHARE.ROOM_DETAIL }))}
                className=" flex items-center gap-2 border-none font-medium shadow-none hover:!text-black hover:underline"
            >
                <PiShareFat /> Share
            </Button>
            <Button
                loading={isLoading}
                className="group flex items-center gap-2 border-none font-medium shadow-none hover:!text-black hover:underline"
                onClick={handleOnClickLike}
            >
                {hasFavorited ? (
                    <AiFillHeart className="fill-rose-500" />
                ) : (
                    <AiOutlineHeart className="group-hover:!text-rose-500" />
                )}{" "}
                Like
            </Button>
        </div>
    )
}
export default RoomAction
