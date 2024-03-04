import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useAuth } from "@/helpers/hooks/authSelector";
import { nanoid } from "@reduxjs/toolkit";
import { setLocalAvatar } from "@/lib/redux/auth/slice-auth";
import { useDispatch } from "react-redux";
import { MouseEvent } from "react";
import { choseServerAvatar } from "@/lib/redux/auth/operations-auth";

const avatarsList = [
  "/animals/bat-svgrepo-com.svg",
  "/animals/butterfly-svgrepo-com.svg",
  "/animals/camel-svgrepo-com.svg",
  "/animals/chameleon-svgrepo-com.svg",
  "/animals/cobra-svgrepo-com.svg",
  "/animals/crocodile-svgrepo-com.svg",
  "/animals/dog-svgrepo-com.svg",
  "/animals/duck-svgrepo-com.svg",
  "/animals/elephant-svgrepo-com.svg",
  "/animals/fish-svgrepo-com.svg",
  "/animals/giraffe-svgrepo-com.svg",
  "/animals/kangaroo-svgrepo-com.svg",
  "/animals/mouse-svgrepo-com.svg",
  "/animals/octopus-svgrepo-com.svg",
  "/animals/ostrich-svgrepo-com.svg",
  "/animals/owl-svgrepo-com.svg",
  "/animals/panda-svgrepo-com.svg",
  "/animals/pig-svgrepo-com.svg",
  "/animals/rhino-svgrepo-com.svg",
  "/animals/rooster-svgrepo-com.svg",
  "/animals/sea-ray-svgrepo-com.svg",
  "/animals/sloth-svgrepo-com.svg",
  "/animals/snake-svgrepo-com.svg",
  "/animals/spider-svgrepo-com.svg",
  "/animals/tiger-svgrepo-com.svg",
  "/animals/toucan-svgrepo-com.svg",
  "/animals/whale-svgrepo-com.svg",
  "/animals/white-rabbit-svgrepo-com.svg",
];

interface AvatarsProps {
  showAvatars: boolean;
  setShowAvatars: Dispatch<SetStateAction<boolean>>;
}

const isClientSide = typeof window !== "undefined";

export const Avatars: React.FC<AvatarsProps> = ({ showAvatars, setShowAvatars }) => {
  const dispatch = useDispatch();
  const { localAvatar, isRefreshing, avatar } = useAuth();

  const handleChoosenAvatarClick = (event: MouseEvent<HTMLImageElement>) => {
    const element = event.target as HTMLImageElement;
    if (element && element.src) {
      dispatch(setLocalAvatar(element.src));
    }
  };

  const handleSendChoosenAvatar = () => {
    const pathToSend = localAvatar?.split("/").slice(-2).join("/");
    if (pathToSend && !isRefreshing) {
      dispatch(choseServerAvatar(pathToSend) as any);
      setShowAvatars(false);
    }
  };

  return (
    <div
      id="avatars-container"
      onClick={handleChoosenAvatarClick}
      className={`
      ${showAvatars ? "grid" : "hidden"} 
      grid z-50 top-20 sm:top-[84px] sm:left-0  absolute
    grid-cols-5 grid-rows-5 w-[360px] h-[320px] sm:w-[320px] sm:h-[280px]  bg-lightYellow rounded-xl p-4 md:p-2`}
    >
      {avatarsList.map((avatar, index) => (
        <div
          key={nanoid()}
          className="w-[46px] h-[46px] flex justify-center items-center"
        >
          <Image
            src={isClientSide ? avatar : avatar.replace("/svg", "/public/svg")}
            width={54}
            height={54}
            className=" select-none cursor-pointer ml-4"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {index === avatarsList.length - 1 && (
            <button
              onClick={handleSendChoosenAvatar}
              id="save-avatar-btn"
              className="absolute bottom-4 right-4 md:right-3 md:bottom-3 rounded-lg
               bg-mainRed px-3 py-1 text-lg font-semibold text-lightYellow
                hover:bg-mediumDarkRed md:text-base transition-all duration-300"
            >
              Save
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
