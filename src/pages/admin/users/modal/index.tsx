import { MODAL, USER_STATUS } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalUpdate from "./modalUpdate"
import ModalAdd from "./modalAdd"
import ModalView from "./modalView"
import ModalDisable from "./modalDisable"
import { IUser } from "@/interfaces/user.interface"

const ModalUser = () => {
    const type = useAppSelector((state) => state.modal.type)
    const userData = useAppSelector((state) => state.modal.data) as IUser

    const isActive = userData?.status === USER_STATUS.ACTIVE

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.USER:
                return <ModalAdd title="Register New Account" />
            case MODAL.UPDATE.USER:
                return <ModalUpdate title="Edit Account Information" data={userData} />
            case MODAL.VIEW.USER:
                return <ModalView title="Account Overview" data={userData} />
            case MODAL.DISABLE.USER:
                return (
                    <ModalDisable
                        title={isActive ? "Deactivate Account" : "Activate Account"}
                        isActive={isActive}
                        data={userData}
                    />
                )
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalUser
