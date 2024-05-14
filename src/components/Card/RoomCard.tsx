import { IRoom } from "@/interfaces/room.interface"
import { IUtiltity } from "@/interfaces/utility.interface"
import { changeRoomName, changeUtilitiesRoom, deleteRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { message } from "antd"
import { useState } from "react"
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai"

interface Props {
    room: IRoom
}

const RoomCard = ({ room }: Props) => {
    const dispatch = useAppDispatch()
    const srcImage = JSON.parse(useAppSelector((state) => state.generateRoom.srcImage))
    const { area, price, depositAmount, utilities, id } = room
    const { data } = useGetUtilitiesQuery()

    const [roomName, setRoomName] = useState(room.roomName)

    const handleChange = (_: any, value: (IUtiltity | undefined)[]) => {
        const validValues = value.filter((item): item is IUtiltity => item !== undefined)
        dispatch(
            changeUtilitiesRoom({
                id: `${id}`,
                utilities: validValues.map((selectedOption) => String(selectedOption.id))
            })
        )
    }

    return (
        <div className="font-momo relative flex h-[320px] w-[240px] flex-col rounded-[16px] text-slate-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-2xl">
            <AiOutlineCloseCircle
                className="animate-1-s absolute right-3 top-2 h-6 w-6 cursor-pointer rounded-full bg-white opacity-30 hover:text-red-600 hover:opacity-80 "
                onClick={() => {
                    message.success(`Deleted room ${id}`)
                    dispatch(deleteRoom({ id: id || "" }))
                }}
            />

            <img className="h-[140px] rounded-t-[16px] object-cover" src={srcImage || ""} alt="Room image" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="flex gap-1 border-b px-2 ">
                    <AiOutlineHome className="h-4 w-4 text-primary" />
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)

                            dispatch(changeRoomName({ id: id || "", roomName: e.target.value }))
                        }}
                        placeholder="Room ID"
                        className="h-full w-[100px] text-[14px] outline-none placeholder:text-[14px] placeholder:font-normal"
                    />
                </div>
                <div className="mb-1 border-b pb-1">
                    <h5 className="text-[16px] font-bold text-[#128E07]">Vacant</h5>
                    <div className="flex flex-row justify-between text-[13px]">
                        <p>{`Price: ${price} dollar`}</p>
                        <p>{`Area: ${area} m2`}</p>
                    </div>

                    <p className="text-[13px]">{`Deposit amount: ${depositAmount} dollar`}</p>
                </div>
                <div className="h-4">
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id="tags-outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "0px solid #d9d9d9",
                                borderRadius: "px",
                                padding: "0",
                                lineHeight: "0px",
                                height: "70px",
                                width: "full"
                            },

                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                border: "0px solid #fff"
                            }
                        }}
                        options={data || []}
                        getOptionLabel={(option) => option?.name || ""}
                        value={
                            utilities
                                ? (utilities
                                      ?.map((value: string) => data?.find((utility) => String(utility.id) == value))
                                      .filter((option) => option !== undefined) as IUtiltity[])
                                : []
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label=""
                                placeholder="New util"
                                sx={{
                                    "& .MuiButtonBase-root": {
                                        lineHeight: "10px",
                                        fontSize: "11px"
                                    }
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomCard
