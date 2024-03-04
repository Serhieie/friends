import { LoginFormButtonProps } from "./Login.types";
import { PulseLoader } from "react-spinners";

export const LoginFormButton: React.FC<LoginFormButtonProps> = ({
  text,
  isLoading,
  onClick,
  resended,
  styles,
}) => {
  //styles for btn
  const themeStyles: string = `
  'shadow-none hover:bg-mediumDarkRed text-lightYellow bg-mainRed  '
     text-center text-lg md:w-48 font-semibold w-52 py-3 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-48 ssm:h-10 md2:text-sm disabled:opacity-30 ${styles} `;

  return (
    <button
      id="log-btn"
      type="submit"
      disabled={isLoading || resended ? true : false}
      onClick={onClick}
      className={themeStyles}
    >
      {isLoading ? <PulseLoader size={20} /> : <>{text}</>}
    </button>
  );
};
