import { useAuth } from "@/helpers/hooks/authSelector";
import { Message } from "@/lib/redux/message/initialState";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

interface ChatForm {
  onSubmit: (message: Message) => void;
}

export const ChatForm: React.FC<ChatForm> = ({ onSubmit }) => {
  const { user } = useAuth();

  const [state, setState] = useState({
    message: "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    if (!target || !target.message || !target.message.value) return;
    const message = target.message.value;
    if (user) {
      const messageData = {
        message,
        sender: user.id,
      };
      onSubmit(messageData);
      setState({ message: "" });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const messageData = {
        message: state.message,
        sender: user.id,
      };
      onSubmit(messageData);
      setState({ message: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-[20%] md:h-[12%] relative ">
      <label htmlFor="name" className="flex gap-1 w-full">
        <textarea
          className="rounded-xl text-darkYellow placeholder:text-darkYellow 
  placeholder:opacity-50 w-full px-4 py-4 outline-none 
  bg-lightYellow overflow-auto resize-none "
          value={state.message}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          name="message"
          placeholder="enter your message"
        />
        <button
          type="submit"
          className="flex items-center justify-center text-center gap-5  self-center   rounded-xl
             bg-mediumDarkYellow px-3 py-2 text-lg font-semibold  text-lightYellow 
              hover:bg-mainRed 
              md:text-base transition-all duration-300 
              outline-none absolute right-1 bottom-1"
        >
          <IoSend />
        </button>
      </label>
    </form>
  );
};
