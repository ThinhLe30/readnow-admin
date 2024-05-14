import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalAdd from "./modalAdd"
import ModalUpdate from "./modalUpdate"
import ModalDelete from "./modalDelete"

const ModalBlocks = () => {
    const type = useAppSelector((state) => state.modal.type)
    const blockData = useAppSelector((state) => state.modal.data)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.BLOCK:
                return <ModalAdd title="Create Room Block" />
            case MODAL.UPDATE.BLOCK:
                return <ModalUpdate title="Upload Room Block" data={blockData} />
            case MODAL.DELETE.BLOCK:
                return <ModalDelete title="Delete Room Block" data={blockData} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalBlocks
