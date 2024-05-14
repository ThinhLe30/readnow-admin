import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalUpdate from "./modalUpdate"
import ModalDelete from "./modalDelete"
import ModalView from "./modalView"

const ModalPayment = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data)
    const id = useAppSelector((state) => state.modal.id)

    const getModalContent = () => {
        switch (type) {
            case MODAL.UPDATE.PAYMENT:
                return <ModalUpdate title="Update Payment Information" data={data} />
            case MODAL.VIEW.PAYMENT:
                return <ModalView title="Payment Overview" data={data} />
            case MODAL.DELETE.PAYMENT:
                return <ModalDelete title="Delete Payment" id={id} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalPayment
