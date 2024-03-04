import { User } from "@/lib/redux/users/User.types";
import { getLastOnline } from "@/helpers/utils/lastOnlineTime";
import { pathCreator } from "@/helpers/svgPathCreator";
import { useAuth } from "@/helpers/hooks/authSelector";
import Image from "next/image";
import { righteous } from "../fonts";

interface UserItemInterface {
  key: string;
  persone: User;
}

const defaultAvatar = "/animals/bat-svgrepo-com.svg";

export const UserItem: React.FC<UserItemInterface> = ({ persone }) => {
  const srcToShow = pathCreator(persone.avatarURL);

  return (
    <div
      className="bg-mediumLightBlue  flex justify-between items-center
       rounded-lg relative break-words px-2 py-1 border  border-darkBlue"
    >
      <div className="flex items-center justify-center  gap-1  break-words w-full pr-4">
        <p
          className="text-xs bg-mediumDarkBlue text-lightBlue
         p-1.5 rounded-lg lg:hidden mr-3 min-w-16 text-center"
        >
          {persone.online ? " online " : getLastOnline(persone.lastOnline)}
        </p>

        <span
          className={`${righteous.className} 
          ${persone.online ? " bg-green-600 " : " bg-mainRed "}
             h-2 w-2 rounded-full mr-auto`}
        ></span>
        <p className="text-xs gap-1 text-darkBlue font-semibold break-words">
          {persone.name}
        </p>
      </div>

      <div className="bg-lightYellow rounded-full p-0 border-spacing-1  border-darkBlue">
        <Image
          src={srcToShow.startsWith("/animals") ? srcToShow : defaultAvatar}
          width={34}
          height={34}
          className=" select-none"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </div>
    </div>
  );
};
