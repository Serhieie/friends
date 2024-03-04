"use client";

import Link from "next/link";
import { alfaSlab, righteous } from "./fonts";
import { RiChatSmile2Fill } from "react-icons/ri";
import { useEffect } from "react";
import { fetchCurrentUser } from "@/lib/redux/auth/operations-auth";
import { useDispatch } from "react-redux";
import { NavButtons } from "./navBtns";
import { useAuth } from "@/helpers/hooks/authSelector";

import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser() as any);
  }, [dispatch]);

  const ButtonsStyles = "hover:bg-mediumDarkRed bg-mainRed text-lightYellow ";
  const displayStyles = "  ";

  const pathname = usePathname();

  return (
    <header
      className={` 
      flex items-center  h-20 shrink-0 gap-1  rounded-lg bg-mainBlue 
        ssm2:justify-center ssm2:p-2  p-4 md:h-14 justify-between mx-6 mt-4 md:mx-4 md:mt-1 ssm2:mx-1`}
    >
      <Link
        href="/"
        className={`${alfaSlab.className} text-mediumLightYellow ssm2:text-2xl md:text-4xl  text-5xl flex items-center gap-2`}
      >
        Friends <RiChatSmile2Fill />
      </Link>
      <div className="w-full items-center  flex-col hidden  md:flex p-1 ">
        <h2
          className={`${righteous.className} ssm2:text-lg  md:hidden text-mediumLightRed text-2xl  m-0 p-0 max-w-[400px]`}
        >
          Dont be shy and say Hi!
        </h2>
        <p className="text-lg md:hidden ssm2:text-sm flex flex-col items-center text-lightBlue mt-1">
          Friends chat designed by Serhieie
        </p>
      </div>
      <div>
        {" "}
        <NavButtons displayStyles={displayStyles} stl={ButtonsStyles} />
      </div>
    </header>
  );
};
