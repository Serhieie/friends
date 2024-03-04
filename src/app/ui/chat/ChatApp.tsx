import io from "socket.io-client";
import { useState, useEffect } from "react";
import { ChatForm } from "./ChatForm";
import { Chat } from "./Chat";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useGetAllMessagesQuery } from "@/lib/redux/message/messagesApi";
import { Message } from "@/lib/redux/message/initialState";
import { ChatSkelleton } from "./ChatSkelleton";

export const ChatApp: React.FC = () => {
  const { data: messages = [], isLoading, isError } = useGetAllMessagesQuery();
  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const socket = io("https://friends-back.onrender.com", {
    query: {
      userId: user.id,
    },
  });

  // const socket = io("http://localhost:3000", {
  //   query: {
  //     userId: user.id,
  //   },
  // });

  useEffect(() => {
    socket.on("chat-message", (message: Message) => {
      setHistoryMessages((prevState) => [message, ...prevState]);
    });
    return () => {
      socket.off("chat-message");
    };
  }, [socket]);

  const sendMessage = (message: Message) => {
    socket.emit("chat-message", message);
  };

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-full">
        <div className="w-full  relative overflow-y-scroll scrl h-[80%]  md:h-[88%]">
          <ChatSkelleton />
        </div>
        <div
          className="rounded-xl text-darkYellow placeholder:text-darkYellow 
  placeholder:opacity-50 w-full px-4 py-4 outline-none 
  bg-lightYellow overflow-auto resize-none h-[20%] md:h-[12%] opacity-40"
        ></div>
      </div>
    );
  if (isError) return <div>Error fetching messages</div>;

  const allMessages = [...historyMessages, ...messages.slice().reverse()];
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full md:h-[88%] h-[80%] relative overflow-y-scroll scrl  ">
        <Chat data={allMessages} />
      </div>
      <ChatForm onSubmit={sendMessage} />
    </div>
  );
};
