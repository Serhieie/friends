"use client";

import { MouseEvent } from "react";
import { FaUsers } from "react-icons/fa";
import { Avatars } from "../avatarsContainer";
import { rubik } from "../fonts";
import Image from "next/image";

interface UserPanelProps {
  setShowAvatars: React.Dispatch<React.SetStateAction<boolean>>;
  componentState: {
    userName: string;
    userAvatar: string | undefined;
  };
  showAvatars: boolean;
  handleAvatarClick: (event: MouseEvent<HTMLImageElement>) => void;
  setIsUsersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserPanel: React.FC<UserPanelProps> = ({
  handleAvatarClick,
  setShowAvatars,
  componentState,
  showAvatars,
  setIsUsersOpen,
}) => {
  //   const buttonsStyles = "hover:bg-mediumDarkYellow bg-mainYellow text-lightYellow ";
  //   const displayStyles = " md:flex  hidden";
  const handleBtnClick = () => {
    if (showAvatars) {
      setShowAvatars((prevState) => !prevState);
    }
    setIsUsersOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full  flex items-center justify-between ">
      <div className="w-full h-full  flex items-center md:gap-3 gap-14">
        <div className=" w-14 h-14   md:ml-0   flex items-center rounded-full md:bg-lightYellow">
          <Image
            id="user-avatar"
            onClick={handleAvatarClick}
            src={
              componentState.userAvatar
                ? componentState.userAvatar
                : "animals/owl-svgrepo-com.svg"
            }
            width={100}
            height={100}
            className=" absolute md:left-3  select-none cursor-pointer md:w-20 md:h-20 z-50"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>

        <p
          className={`${rubik.className} text-2xl  md:text-sm text-lightRed md:text-lightYellow font-bold`}
        >
          {componentState.userName || "Усі ми трохи пугачі "}
        </p>
      </div>

      {showAvatars && (
        <Avatars showAvatars={showAvatars} setShowAvatars={setShowAvatars} />
      )}
      {/* <NavButtons displayStyles={displayStyles} stl={buttonsStyles} /> */}
      <button
        onClick={handleBtnClick}
        type="button"
        className={`hidden sm:flex
                        items-center justify-center text-center gap-5  self-center  rounded-lg
          p-2 text-lg font-semibold 
           hover:bg-mediumDarkYellow bg-mainYellow text-lightYellow
             md:text-sm transition-all duration-300 `}
      >
        <FaUsers size={24} />
      </button>
    </div>
  );
};
