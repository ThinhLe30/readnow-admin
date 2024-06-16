import { Avatar, Dropdown } from "antd";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { AvatarDefault } from "@/assets/images";
import useAuth from "@/hooks/useAuth";
import "./style.css";

const UserMenu = () => {
  const { userInfo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-none">
      <Dropdown
        className={`relative flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-2 transition duration-200 hover:shadow-xl ${
          isOpen ? "shadow-xl" : "shadow-none"
        }`}
        placement="bottomRight"
        trigger={["click"]}
        arrow
        onOpenChange={() => setIsOpen(!isOpen)}
      >
        <div>
          <MdOutlineMenu className="h-5 w-5" />
          <Avatar
            className="cursor-pointer"
            src={userInfo ? userInfo.photo : AvatarDefault}
            size={36}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
