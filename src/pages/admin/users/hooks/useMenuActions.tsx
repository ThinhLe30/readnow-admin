import { TbEdit } from "react-icons/tb"
import { FiShieldOff } from "react-icons/fi"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL, USER_STATUS } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.VIEW.USER, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "0"
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.UPDATE.USER, data: record }))}
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
                        onClick={() =>
                            dispacth(
                                openModal({
                                    type: MODAL.DISABLE.USER,
                                    data: record
                                })
                            )
                        }
                        className="flex justify-between font-medium text-orange-500"
                    >
                        {record.status === USER_STATUS.DISABLED ? "Active" : "Disable"}{" "}
                        <FiShieldOff className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
            // {
            //     type: "divider"
            // },
            // {
            //     label: (
            //         <div
            //             onClick={() => dispacth(openModal({ type: MODAL.DELETE, data: record }))}
            //             className="flex justify-between font-medium text-red-500"
            //         >
            //             Delete <TbTrashX className="ml-2.5 h-5 w-5" />
            //         </div>
            //     ),
            //     key: "3"
            // }
        ] as MenuProps["items"]
}
