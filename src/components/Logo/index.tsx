import { useNavigate } from "react-router-dom";
import { SITE_MAP } from "@/utils/constants/Path";
import { ReadNowIcon, RentallyLogo } from "@/assets/images";

interface ILogo {
  isOpen?: boolean;
}

const Logo = (props: ILogo) => {
  const { isOpen = true } = props;

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.stopPropagation();
    navigate(SITE_MAP.INDEX);
  };

  return (
    <img
      onClick={(e) => handleClick(e)}
      className={`${
        isOpen ? "h-full" : "h-8"
      } max-h-8 cursor-pointer transition duration-100`}
      src={isOpen ? RentallyLogo : ReadNowIcon}
      alt="ReadNow Logo"
    />
  );
};

export default Logo;
