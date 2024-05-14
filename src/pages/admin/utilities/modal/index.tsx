import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalAdd from "./modalAdd"
import ModalUpdate from "./modalUpdate"
import { IUtility } from "@/interfaces/room-detail.interface"
import ModalDelete from "./modalDelete"

const ModalUtility = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data) as IUtility
    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.UTILITY:
                return <ModalAdd title="Add New Utility" />
            case MODAL.UPDATE.UTILITY:
                return <ModalUpdate title="Edit Utility Infomation" data={data} />
            case MODAL.DELETE.UTILITY:
                return <ModalDelete title="Delete Utility" data={data} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalUtility
