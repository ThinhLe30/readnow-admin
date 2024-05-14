import { TbEdit } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL, RENTAL_STATUS, ROLE } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import { RiCalendarCloseFill } from "react-icons/ri"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { LuFileX2 } from "react-icons/lu"
import { IRentals } from "@/interfaces/rentals.interface"
import useAuth from "@/hooks/useAuth"
import { MdOutlinePayment } from "react-icons/md"

export const useMenuActions = () => {
    const dispatch = useAppDispatch()

    const { role } = useAuth()

    return (record: IRentals) => {
        const viewAction = [
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.VIEW.RENTAL, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "view-rental"
            }
        ]

        const updateAction = [
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.RENTAL, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "update-rental"
            }
        ]

        const status = record.status

        let statusSpecificActions: MenuProps["items"] = []

        if (status === RENTAL_STATUS.CREATED) {
            statusSpecificActions = [
                {
                    type: "divider"
                },
                {
                    label: (
                        <div
                            onClick={() =>
                                dispatch(openModal({ type: MODAL.RENTAL.APPROVE, id: record.rentalInfo.id }))
                            }
                            className="flex justify-between font-medium text-green-500"
                        >
                            Approve <AiOutlineCheckCircle className="ml-2.5 h-5 w-5" />
                        </div>
                    ),
                    key: "2"
                },
                {
                    type: "divider"
                },
                {
                    label: (
                        <div
                            onClick={() => dispatch(openModal({ type: MODAL.RENTAL.CANCEL, id: record.rentalInfo.id }))}
                            className="flex justify-between font-medium text-red-500"
                        >
                            Cancle <AiOutlineCloseCircle className="ml-2.5 h-5 w-5" />
                        </div>
                    ),
                    key: "3"
                }
            ]
        }

        if (status === RENTAL_STATUS.REQUEST_BREAK) {
            statusSpecificActions = [
                {
                    type: "divider"
                },
                {
                    label: (
                        <div
                            onClick={() =>
                                dispatch(openModal({ type: MODAL.RENTAL.ACCEPT_BREAK, id: record.rentalInfo.id }))
                            }
                            className="flex justify-between font-medium text-red-500"
                        >
                            Accept break <LuFileX2 className="ml-2.5 h-5 w-5" />
                        </div>
                    ),
                    key: "4"
                }
            ]
        }

        if (status === RENTAL_STATUS.COMPLETED) {
            statusSpecificActions = [
                {
                    type: "divider"
                },
                {
                    label: (
                        <div
                            onClick={() => dispatch(openModal({ type: MODAL.ADD.PAYMENT, data: record }))}
                            className="flex justify-between font-medium text-secondary"
                        >
                            Payment <MdOutlinePayment className="ml-2.5 h-5 w-5" />
                        </div>
                    ),
                    key: "5"
                },
                {
                    type: "divider"
                },
                {
                    label: (
                        <div
                            onClick={() => dispatch(openModal({ type: MODAL.RENTAL.END, id: record.rentalInfo.id }))}
                            className="flex justify-between font-medium text-red-500"
                        >
                            End rental <RiCalendarCloseFill className="ml-2.5 h-5 w-5" />
                        </div>
                    ),
                    key: "6"
                }
            ]
        }

        if (role === ROLE.ADMIN) return viewAction as MenuProps["items"]

        return [...viewAction, ...updateAction, ...statusSpecificActions] as MenuProps["items"]
    }
}
