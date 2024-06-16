import { TbTrashX } from "react-icons/tb";
import { useAppDispatch } from "@/redux/hook";
import { openModal } from "@/redux/features/modal/modal.slice";
import { MODAL } from "@/utils/constants/GlobalConst";
import { MenuProps } from "antd";
import { IUser } from "@/interfaces/user.interface";

export const useMenuActions = () => {
  const dispatch = useAppDispatch();

  return (record: IUser) =>
    [
      {
        label: (
          <div
            onClick={() =>
              dispatch(openModal({ type: MODAL.DELETE.USER, data: record }))
            }
            className="flex justify-between font-medium text-red-500"
          >
            Delete <TbTrashX className="ml-2.5 h-5 w-5" />
          </div>
        ),
        key: "0",
      },
    ] as MenuProps["items"];
};
