import { TbEdit, TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL, PAYMENT_STATUS, ROLE } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import useAuth from "@/hooks/useAuth"
import { IPayments } from "@/interfaces/payments.interface"

export const useMenuActions = () => {
    const dispatch = useAppDispatch()

    const { role } = useAuth()

    return (record: IPayments) => {
        const viewAction = [
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.VIEW.PAYMENT, data: record }))}
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
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.PAYMENT, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "update-rental"
            }
        ]

        const deleteAction = [
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.DELETE.PAYMENT, id: record.id }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "delete-payment"
            }
        ]

        if (role === ROLE.ADMIN || record.status === PAYMENT_STATUS.PAID) return [...viewAction] as MenuProps["items"]

        return [...viewAction, ...updateAction, ...deleteAction] as MenuProps["items"]
    }
}
