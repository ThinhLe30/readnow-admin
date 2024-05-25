import PageHeader from "@/container/PageHeader";
import TableToolbar from "@/container/Toolbar";
import { PAGE } from "@/utils/constants/GlobalConst";
import ModalArticle from "./modal";
import TableManageArticle from "./TableManageArticle";
const Article = () => {
  return (
    <div className="flex-1 px-6 py-4">
      <PageHeader title="Article Management" />
      <ModalArticle />
      <TableToolbar type={PAGE.ARTICLE} />
      <TableManageArticle />
    </div>
  );
};

export default Article;
