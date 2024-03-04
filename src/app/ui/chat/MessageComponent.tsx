import Image from "next/image";
import { righteous } from "../fonts";
import { createDateISO } from "@/helpers/utils/createDateISO";
import { useAuth } from "@/helpers/hooks/authSelector";
import { createDate } from "@/helpers/utils/createDate";
import { Message } from "@/lib/redux/message/initialState";
import { pathCreator } from "@/helpers/svgPathCreator";
import { useGetUserQuery } from "@/lib/redux/users/userApi";

interface MessageComponentProps {
  item: Message;
}
// const isClientSide = typeof window !== "undefined";
const defaultAvatar = "/animals/bat-svgrepo-com.svg";

export const MessageComponent: React.FC<MessageComponentProps> = ({ item }) => {
  const { user } = useAuth();
  const avatarSrc = pathCreator(item.senderInfo?.avatarURL);

  return (
    <>
      <p
        className={`
            ${item.sender === user.id ? " justify-start " : " justify-end "}
             flex text-xs  text-lightYellow  break-words`}
      >
        {item.createdAt ? createDateISO(item.createdAt) : createDate(Date.now())}
      </p>
      <div
        className={`
            ${
              item.sender === user.id
                ? " bg-mediumDarkBlue  md:pr-3 md:pl-4  rounded-br-none"
                : " bg-lightBlue  md:pl-3 md:pr-4  rounded-bl-none"
            }
              flex   items-center rounded-lg relative px-8 py-2.5 md:py-0 w-full `}
      >
        <div className="flex py-3 w-full">
          <div
            className={`
          ${item.sender === user.id ? " text-end " : "text-start "} 
          flex-col gap-1 w-full `}
          >
            <span
              className={`
             ${
               item.sender === user.id
                 ? " text-end text-mediumLightRed "
                 : "text-start text-mediumDarkRed "
             } 
             ${righteous.className} text-bold text-xl md:text-sm  `}
            >
              {item.senderInfo?.name}
            </span>
            <div
              className={`
            ${item.sender === user.id ? " float-right " : "float-left "} 
             w-14 h-14 md:w-12 md:h-12 block float-right`}
            ></div>
            <p
              className={`
              ${item.sender === user.id ? "  text-lightYellow " : " text-darkBlue "}
               text-base  md:text-xs
              font-semibold  break-all  w-full break-word   text-start `}
            >
              {item.message}
            </p>
          </div>
        </div>
        <div
          className={`
              ${item.sender === user.id ? " right-5  md:right-4 " : " left-5 md:left-4 "}
              bg-mediumLightYellow w-14 h-14 md:w-8 md:h-8 rounded-lg absolute top-5 `}
        ></div>
        <Image
          src={avatarSrc.startsWith("/animals") ? avatarSrc : defaultAvatar}
          width={80}
          height={80}
          className={`
              ${item.sender === user.id ? " md:right-2  right-2" : " md:left-2 left-2 "}
                select-none  md:w-12 md:h-12 absolute top-3`}
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </div>
    </>
  );
};
