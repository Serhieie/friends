import { PulseLoader } from "react-spinners";
import { RegistrationFormButtonProps } from "./Registration.types";
import { registrationSubmitBtnStyles } from "./Registration.styles";

export const RegistrationFormButton: React.FC<RegistrationFormButtonProps> = ({
  isLoading,
  onClick,
  text,
  timeRemaining,
  resended,
}) => {
  const btnStyles: string = `shadow-none hover:bg-mediumDarkRed
   text-lightYellow bg-mainRed rounded-md 
    font-semibold ${registrationSubmitBtnStyles}`;

  return (
    <button
      id="reg-btn"
      type="submit"
      disabled={isLoading}
      onClick={onClick}
      className={btnStyles}
    >
      {isLoading ? (
        <PulseLoader color={`#3f78cc `} size={20} />
      ) : (
        <>
          {" "}
          <>{resended ? `${timeRemaining} sec` : text}</>
        </>
      )}
    </button>
  );
};
