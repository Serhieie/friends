import { useRef, useEffect } from "react";
import { MessageComponent } from "./MessageComponent";
import { useAuth } from "@/helpers/hooks/authSelector";
import { Message } from "@/lib/redux/message/initialState";
import { nanoid } from "@reduxjs/toolkit";

interface ChatProps {
  data: Message[];
}

export const Chat: React.FC<ChatProps> = ({ data }) => {
  const { user } = useAuth();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);
  return (
    <div className=" flex flex-col-reverse  px-3 md:pr-2 mb-1 ">
      <div ref={lastMessageRef}></div>
      {data &&
        data.map((item: Message) => (
          <div
            key={nanoid()}
            className={`${
              item.sender === user.id ? "  ml-auto   " : "  mr-auto  "
            } mb-1 min-w-[46%]`}
          >
            <MessageComponent item={item} />{" "}
          </div>
        ))}
    </div>
  );
};
