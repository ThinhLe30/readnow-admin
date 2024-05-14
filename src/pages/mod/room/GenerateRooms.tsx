import { RoomCard } from "@/components"
import PageHeader from "@/container/PageHeader"
import { useAppDispatch } from "@/redux/hook"
import { BsSave } from "react-icons/bs"
import { useAppSelector } from "@/redux/hook"
import { addRoom, changeImagesRoom, saveRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { FaPlus } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { useUploadImagesMutation } from "@/redux/services/help/help.service"
import { useCreateRoomsMutation } from "@/redux/services/room/room.service"
import { useEffect, useState } from "react"
import { Spin, message } from "antd"
import useServerMessage from "@/hooks/useServerMessage"
import { SITE_MAP } from "@/utils/constants/Path"
import { useGetRoomBlockQuery } from "@/redux/services/block/block.service"

const GenerateRooms = () => {
    const dispatch = useAppDispatch()
    const rooms = useAppSelector((state) => state.generateRoom.rooms)
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const [UploadImages, uploadImagesResult] = useUploadImagesMutation()
    const [createRooms, { data, error, isLoading }] = useCreateRoomsMutation()
    const navigate = useNavigate()
    const [isSave, setIsSave] = useState(false)
    const { id } = useParams()
    const { data: dataBlock } = useGetRoomBlockQuery({ role, id: id || "" })
    useServerMessage({ data: data!, error: error })

    useEffect(() => {
        const fetchData = async () => {
            if (isSave && id) {
                await createRooms({ role, body: { roomBlockId: +(id || 0), rooms } })
                setIsSave(false)
                navigate(`${SITE_MAP.MOD}/${SITE_MAP.BLOCKS}/${id}/rooms`)
                dispatch(saveRoom())
            }
        }
        fetchData()
    }, [isSave])

    const handleSubmit = async () => {
        for (const [index, room] of rooms.entries()) {
            const formData = new FormData()
            room.images?.forEach((image) => {
                formData.append("files", image)
            })
            const res = await UploadImages(formData).unwrap()
            if (res.status === "success" && res.data) {
                dispatch(changeImagesRoom({ index, images: res.data }))
            } else {
                console.log("upload error")
            }
        }
        setIsSave(true)
    }

    return (
        <div className="w-full flex-1 px-6 py-4">
            <Spin spinning={isLoading || uploadImagesResult.isLoading}>
                <PageHeader title="Rooms Management" subTitle={`${dataBlock?.data?.roomBlock.address}`} />
                <div className="mx-4 mb-4 flex justify-end gap-4">
                    <button
                        onClick={() => {
                            dispatch(addRoom())
                            message.success(`Added room`)
                        }}
                        className="flex items-center space-x-2 rounded-xl bg-secondary px-3 py-2 text-white"
                    >
                        <FaPlus className="h-3 w-3" />
                        <span className="text-xs font-bold tracking-wide">Add</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
                    >
                        <BsSave className="h-3 w-3" />
                        <span className="text-xs font-bold tracking-wide">Submit</span>
                    </button>
                </div>
                <div className="scrollbar-hide mx-14 h-[730px] overflow-y-auto rounded-2xl border-2">
                    <div className="grid_product flex w-full flex-col  justify-center gap-16 p-3 max-sm:justify-between md:grid">
                        {rooms?.map((room) => <RoomCard key={room.id} room={room} />)}
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default GenerateRooms
