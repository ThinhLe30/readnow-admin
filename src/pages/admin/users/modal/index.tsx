import { MODAL } from "@/utils/constants/GlobalConst";
import { useAppSelector } from "@/redux/hook";
import ModalAntd from "@/components/Modal";
import { IArticle } from "@/interfaces/article.interface";
import ModalAdd from "./modalAdd";
import ModalDelete from "./modalDelete";

const ModalUser = () => {
  const type = useAppSelector((state) => state.modal.type);
  const data = useAppSelector((state) => state.modal.data) as IArticle;
  const getModalContent = () => {
    switch (type) {
      case MODAL.ADD.USER:
        return <ModalAdd title="Add New User" />;
      case MODAL.DELETE.USER:
        return <ModalDelete title="Delete User" data={data} />;
      default:
        return null;
    }
  };

  return <ModalAntd>{getModalContent()}</ModalAntd>;
};

export default ModalUser;
