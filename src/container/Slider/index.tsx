import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import ArrowCircle from "../../assets/icons/ArrowCircle";
import { useNavigate } from "react-router-dom";
import { SITE_MAP } from "@/utils/constants/Path";
import Logo from "@/components/Logo";
import { ROLE } from "@/utils/constants/GlobalConst";
import "./style.css";
import { MdLogout } from "react-icons/md";
import Button from "@/components/Button";
import { TbArticle, TbCategory2, TbUser } from "react-icons/tb";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/hook";
import { logOut } from "@/redux/features/auth/auth.slice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Slider = () => {
  const { role } = useAuth();
  const [isExpanding, setIsExpanding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let items: MenuProps["items"] = [
    { type: "divider" },
    getItem(
      `${isExpanding ? "Categories" : "Categories"}`,
      "categories",
      <TbCategory2 className="h-5 w-5" />
    ),
    getItem(
      `${isExpanding ? "Articles" : "Articles"}`,
      "articles",
      <TbArticle className="h-5 w-5" />
    ),
    getItem(
      `${isExpanding ? "Users" : "Users"}`,
      "users",
      <TbUser className="h-5 w-5" />
    ),

    { type: "divider" },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "categories":
        navigate(SITE_MAP.CATEGORIES);
        break;
      case "articles":
        navigate(SITE_MAP.ARTICLES);
        break;
      case "users":
        navigate(SITE_MAP.USERS);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={`${
        isExpanding ? "w-60" : "w-20"
      } trasition relative flex h-screen flex-col items-center rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white duration-200 peer-hover:bg-red-500`}
    >
      <div className="h-20 py-4">
        <Logo isOpen={isExpanding} />
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={role === ROLE.MOD ? ["blocks"] : ["users"]}
        mode="inline"
        items={items}
        style={{ borderInlineEnd: "none" }}
        className={`w-full rounded-br-3xl rounded-tr-3xl border-none`}
      />

      <div className="absolute bottom-4 w-full px-2">
        <Button
          onClick={() => {
            dispatch(logOut());
            navigate(SITE_MAP.INDEX);
          }}
          className="w-full rounded-xl bg-primary py-2.5 text-white shadow-md shadow-primary/60 transition duration-150 hover:shadow-md hover:shadow-primary/90"
        >
          <MdLogout className="h-5 w-5" /> {isExpanding ? "Logout" : ""}
        </Button>
      </div>

      <ArrowCircle
        isExpanding={isExpanding}
        onClick={() => setIsExpanding(!isExpanding)}
      />
    </div>
  );
};

export default Slider;
