import PageHeader from "@/container/PageHeader";
import TableToolbar from "@/container/Toolbar";
import { PAGE } from "@/utils/constants/GlobalConst";
import ModalUser from "./modal";
import TableManageUser from "./TableManageUser";
const User = () => {
  return (
    <div className="flex-1 px-6 py-4">
      <PageHeader title="User Management" />
      <ModalUser />
      <TableToolbar type={PAGE.USER} />
      <TableManageUser />
    </div>
  );
};

export default User;
