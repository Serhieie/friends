"use client";

import { ChatApp } from "../chat/ChatApp";
import { UsersList } from "../usersList/UsersList";
import { useAuth } from "@/helpers/hooks/authSelector";
import { redirect } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { UserPanel } from "../userPanel/UserPanel";

interface ComponentStateProps {
  userName: string;
  userAvatar: string | undefined;
}

export const MainPageUi: React.FC = () => {
  const { token, isRefreshing, user, localAvatar, isLoggedIn } = useAuth();
  const [showAvatars, setShowAvatars] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [componentState, setUserName] = useState<ComponentStateProps>({
    userName: "",
    userAvatar: "",
  });

  useEffect(() => {
    setUserName({ userName: user.name, userAvatar: localAvatar });
    if (!token && !isRefreshing && !isLoggedIn) {
      redirect("/login");
    }
  }, [token, isRefreshing, user, localAvatar]);

  const handleAvatarClick = (event: MouseEvent<HTMLImageElement>) => {
    const element = event.target as HTMLImageElement;
    if (!element.closest("#avatars-container") && element.id !== "user-avatar") {
      setShowAvatars(false);
    } else if (element.id === "user-avatar") {
      if (showAvatars) {
        setShowAvatars(false);
      } else {
        setShowAvatars(true);
        setIsUsersOpen(false);
      }
    }
  };

  return (
    <div onClick={handleAvatarClick} className="flex items-center justify-center ">
      <div
        className="grid  grid-cols-12 grid-rows-10
    w-full justify-items-center items-center mt-2 px-6 
    md:px-4 ssm2:px-1  gap-2 md:gap-1 h-[calc(100vh-120px)]
    ssm2:h-[calc(100vh-16px)] md:h-[calc(100vh-88px)] md:mt-1"
      >
        <div
          className="col-start-1 relative col-end-13 row-start-1 
      row-end-1   w-full h-full rounded-xl  bg-mainRed md:bg-mediumDarkBlue px-4 md:px-6"
        >
          <UserPanel
            handleAvatarClick={handleAvatarClick}
            componentState={componentState}
            setShowAvatars={setShowAvatars}
            showAvatars={showAvatars}
            setIsUsersOpen={setIsUsersOpen}
          />
        </div>

        <div
          className="col-start-1 col-end-10 row-start-2 
      row-end-11 sm:col-end-13 bg-mainYellow w-full h-full rounded-xl p-4 
      flex items-end justify-end  md:p-2"
        >
          <ChatApp />
        </div>
        <div
          className={`
          ${
            isUsersOpen
              ? "sm:absolute w-64 h-96 top-36 right-1"
              : "sm:hidden w-full h-full"
          }
                  col-start-10 col-end-13 row-start-2 
      row-end-11 bg-mediumDarkBlue rounded-xl `}
        >
          <UsersList />
        </div>
      </div>
    </div>
  );
};
