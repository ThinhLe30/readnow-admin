import { MODAL } from "@/utils/constants/GlobalConst";
import { useAppSelector } from "@/redux/hook";
import ModalAntd from "@/components/Modal";
import { IArticle } from "@/interfaces/article.interface";
import ModalAdd from "./modalAdd";
import ModalUpdate from "./modalUpdate";
import ModalView from "./modalView";
import ModalDelete from "./modalDelete";

const ModalArticle = () => {
  const type = useAppSelector((state) => state.modal.type);
  const data = useAppSelector((state) => state.modal.data) as IArticle;
  const getModalContent = () => {
    switch (type) {
      case MODAL.ADD.ARTICLE:
        return <ModalAdd title="Add New Article" />;
      case MODAL.UPDATE.ARTICLE:
        return <ModalUpdate title="Update Article" data={data} />;
      case MODAL.VIEW.ARTICLE:
        return <ModalView title="View Article" data={data} />;
      case MODAL.DELETE.ARTICLE:
        return <ModalDelete title="Delete Article" data={data} />;
      default:
        return null;
    }
  };

  return <ModalAntd>{getModalContent()}</ModalAntd>;
};

export default ModalArticle;
