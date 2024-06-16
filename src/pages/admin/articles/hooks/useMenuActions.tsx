import { TbEdit } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
// import { MdOutlineBedroomChild } from "react-icons/md"
import { useAppDispatch } from "@/redux/hook";
import { openModal } from "@/redux/features/modal/modal.slice";
import { MODAL } from "@/utils/constants/GlobalConst";
import { MenuProps } from "antd";
import { IArticle } from "@/interfaces/article.interface";

export const useMenuActions = () => {
  const dispatch = useAppDispatch();

  return (record: IArticle) =>
    [
      {
        label: (
          <div
            className="flex justify-between font-medium text-gray-500"
            onClick={() => {
              dispatch(openModal({ type: MODAL.VIEW.ARTICLE, data: record }));
            }}
          >
            View
            <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
          </div>
        ),
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: (
          <div
            onClick={() =>
              dispatch(openModal({ type: MODAL.UPDATE.ARTICLE, data: record }))
            }
            className="flex justify-between font-medium text-yellow-500"
          >
            Update <TbEdit className="ml-2.5 h-5 w-5" />
          </div>
        ),
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: (
          <div
            onClick={() =>
              dispatch(openModal({ type: MODAL.DELETE.ARTICLE, data: record }))
            }
            className="flex justify-between font-medium text-red-500"
          >
            Delete <TbTrashX className="ml-2.5 h-5 w-5" />
          </div>
        ),
        key: "2",
      },
    ] as MenuProps["items"];
};
