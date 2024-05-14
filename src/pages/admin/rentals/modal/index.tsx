import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalUpdate from "./modalUpdate"
import ModalView from "./modalView"
import ModalApprove from "./modalApprove"
import ModalCancel from "./modalCancel"
import ModalEnd from "./modalEnd"
import ModalAcceptBreak from "./modalAccept"
import ModalPayment from "./modalPayment"

const ModalRental = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data)
    const id = useAppSelector((state) => state.modal.id)

    const getModalContent = () => {
        switch (type) {
            case MODAL.VIEW.RENTAL:
                return <ModalView title="Rental Overview" data={data} />
            case MODAL.UPDATE.RENTAL:
                return <ModalUpdate title="Update Rental Information" data={data} />
            case MODAL.ADD.PAYMENT:
                return <ModalPayment title="Create Monthly Payment" data={data} />
            case MODAL.RENTAL.APPROVE:
                return <ModalApprove title="Approve Rental" id={id} />
            case MODAL.RENTAL.CANCEL:
                return <ModalCancel title="Cancel Rental" id={id} />
            case MODAL.RENTAL.ACCEPT_BREAK:
                return <ModalAcceptBreak title="Accept Break Rental" id={id} />
            case MODAL.RENTAL.END:
                return <ModalEnd title="End Rental" id={id} />

            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalRental
