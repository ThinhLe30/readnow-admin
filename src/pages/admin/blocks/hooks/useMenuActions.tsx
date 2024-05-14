import { TbEdit } from "react-icons/tb"
import { TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
// import { MdOutlineBedroomChild } from "react-icons/md"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import { IRoomBlock } from "@/interfaces/block.interface"
import { useNavigate } from "react-router-dom"

export const useMenuActions = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (record: IRoomBlock) =>
        [
            {
                label: (
                    <div
                        className="flex justify-between font-medium text-gray-500"
                        onClick={() => {
                            navigate(`${record.id}\\rooms`)
                        }}
                    >
                        View rooms <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "0"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.BLOCK, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "1"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.DELETE.BLOCK, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
        ] as MenuProps["items"]
}
