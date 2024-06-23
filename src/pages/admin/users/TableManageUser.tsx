import { useAppSelector } from "@/redux/hook";
import { ColumnsType } from "antd/es/table";
import { Dropdown, Space, Spin } from "antd";
import { AlignType } from "rc-table/lib/interface";
import TableAntd from "@/components/Table";
import { IUser } from "@/interfaces/user.interface";
import { useGetUsersQuery } from "@/redux/services/users/users.service";
import { ROLE, ROLE_COLORS, RoleType } from "@/utils/constants/GlobalConst";
import { useMenuActions } from "./hooks/useMenuActions";
import { FaEllipsis } from "react-icons/fa6";
const TableManageArticle = () => {
  const getMenuActions = useMenuActions();
  const keyword = useAppSelector((state) => state.search.keyword);
  const { data, isLoading } = useGetUsersQuery(keyword);

  const columns: ColumnsType<IUser> = [
    {
      title: <span className="font-bold">Name</span>,
      key: "name",
      width: "18%",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      render: (record: IUser) => (
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src={record.photo}
            alt={record.name}
          />
          <span className="ml-2 text-sm font-semibold">{record.name}</span>
        </div>
      ),
    },
    {
      title: <span className="font-bold">Email</span>,
      dataIndex: "email",
      key: "email",
      width: "18%",
      sorter: (a, b) => a.email?.localeCompare(b.email),
      render: (email: string) => (
        <span className="text-sm font-medium">{email}</span>
      ),
    },

    {
      title: <span className="font-bold">Role</span>,
      key: "role",
      width: "8%",
      dataIndex: "role",
      filters: [
        { text: "Admin", value: ROLE.ADMIN },
        { text: "User", value: ROLE.USER },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: string) => (
        <span
          style={{ backgroundColor: ROLE_COLORS[role as RoleType] }}
          className={`rounded-2xl px-2 py-1.5 text-center text-xs font-semibold text-white`}
        >
          {role}
        </span>
      ),
    },
    {
      title: <span className="text-center font-bold">Action</span>,
      key: "action",
      width: "6%",
      align: "center" as AlignType,
      render: (record: IUser) => {
        const menuActions = getMenuActions(record);

        return (
          <Dropdown
            menu={{ items: menuActions }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Space>
              <FaEllipsis className="cursor-pointer text-center text-lg" />
            </Space>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <TableAntd
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </Spin>
  );
};

export default TableManageArticle;
