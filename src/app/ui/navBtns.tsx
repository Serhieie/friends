"use client";

import Link from "next/link";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "../../lib/redux/auth/slice-auth";
import { logout } from "@/lib/redux/auth/operations-auth";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdChatbubbles } from "react-icons/io";
import { usePathname } from "next/navigation";

interface NavButtonsProps {
  stl: string;
  displayStyles: string;
}

export const NavButtons: React.FC<NavButtonsProps> = ({ displayStyles, stl }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, isRefreshing } = useAuth();
  const handleLogout = async () => {
    dispatch(logout() as any);
    if (!token) dispatch(changeUserStatus(false));
  };
  const pathname = usePathname();

  return (
    <>
      {isLoggedIn ? (
        <div
          className={`
        ${isRefreshing ? " hidden " : " flex "}
        ${displayStyles} flex  items-center gap-5  md:gap-1`}
        >
          {" "}
          <Link
            href="/mainPage"
            className={`
            ${pathname === "/mainPage" ? " hidden " : " flex "}
            ${stl}
             items-center justify-center text-center gap-5  self-center   rounded-lg
 px-3 md:px-2 py-2 md:py-1 text-lg md:text-sm font-semibold  

             transition-all duration-300 ssm:p-1 ssm:m-0 ssm:text-xs`}
          >
            <IoMdChatbubbles size={24} />
          </Link>
          <button
            onClick={handleLogout}
            className={`
            ${stl} 
                      flex  items-center justify-center text-center gap-5  self-center   rounded-lg
          px-3 md:px-2 py-2 md:py-1 text-lg font-semibold 
           
             md:text-sm transition-all duration-300 ssm:p-1 ssm:m-0 ssm:text-xs`}
          >
            <HiOutlineLogout size={24} />
          </button>
        </div>
      ) : (
        <div className={` ${isRefreshing ? " hidden " : " flex "}  flex gap-2`}>
          <Link
            href="/login"
            className={`
            ${pathname === "/" ? " md:hidden " : ""}
          ${
            pathname === "/login" ? " bg-mediumDarkRed  hover:bg-darkRed     flex " : "  "
          }
          ${stl}
                       items-center justify-center text-center gap-5  self-center md:min-w-20  rounded-lg
               px-3 md:px-2 py-2 md:py-1 text-lg font-semibold  
                md:text-sm transition-all duration-300 ssm:p-1 ssm:m-0 ssm:text-xs`}
          >
            <span>Login</span>
          </Link>
          <Link
            href="/registration"
            className={`
            ${pathname === "/" ? " hidden  " : ""}
          ${
            pathname === "/registration"
              ? "bg-mediumDarkRed  hover:bg-darkRed  flex "
              : "  "
          }
          ${stl}
                       items-center justify-center text-center gap-5  self-center md:min-w-20  rounded-lg
               px-3 md:px-2 py-2 md:py-1 text-lg font-semibold  
                md:text-sm transition-all duration-300 ssm:p-1 ssm:m-0 ssm:text-xs`}
          >
            <span>SignUp</span>
          </Link>
        </div>
      )}
    </>
  );
};
