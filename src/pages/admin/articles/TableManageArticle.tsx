import { useAppSelector } from "@/redux/hook";
import { ColumnsType } from "antd/es/table";
import { AlignType } from "rc-table/lib/interface";
import { Dropdown, Space, Spin } from "antd";
import TableAntd from "@/components/Table";
import { FaEllipsis } from "react-icons/fa6";
import { useGetArticleQuery } from "@/redux/services/articles/article.service";
import { IArticle } from "@/interfaces/article.interface";
import { useMenuActions } from "./hooks/useMenuActions";
import moment from "moment";
const TableManageArticle = () => {
  const keyword = useAppSelector((state) => state.search.keyword);
  const { data, isLoading } = useGetArticleQuery(keyword);
  const getMenuActions = useMenuActions();

  const columns: ColumnsType<IArticle> = [
    {
      title: <span className="font-bold">Author</span>,
      key: "author",
      width: "10%",
      sorter: (a, b) => a.author.length - b.author.length,
      render: (record: IArticle) => (
        <span className="text-sm font-medium">{record?.author}</span>
      ),
    },
    {
      title: <span className="font-bold">Title</span>,
      key: "title",
      width: "15%",
      sorter: (a, b) => a.title.length - b.title.length,
      render: (record: IArticle) => (
        <span className="text-sm font-medium">{record?.title}</span>
      ),
    },
    {
      title: <span className="font-bold">Summary</span>,
      key: "description",
      width: "40%",
      render: (record: IArticle) => (
        <span className="text-sm font-medium">{record?.summary}</span>
      ),
    },
    {
      title: <span className="font-bold">Category</span>,
      key: "category",
      width: "10%",
      sorter: (a, b) => a.category!.name.length - b.category!.name.length,
      render: (record: IArticle) => (
        <span className="text-sm font-medium">{record?.category?.name}</span>
      ),
    },
    {
      title: <span className="font-bold">Published At</span>,
      key: "publishedAt",
      width: "10%",
      sorter: (a, b) => a.publishedAt.localeCompare(b.publishedAt),
      render: (record: IArticle) => (
        <div className="flex items-center">
          <span className="ml-2 text-sm font-semibold">
            {/* <Moment format="YYYY/MM/DD">1976-04-19T12:59-0500</Moment> */}
            {moment(record?.publishedAt)
              .utc()
              .format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-center font-bold">Action</span>,
      key: "action",
      width: "6%",
      align: "center" as AlignType,
      render: (record: IArticle) => {
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
