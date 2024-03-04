import { useAuth } from "../../../helpers/hooks/authSelector";
import { RegistrationFormButton } from "./RegistrationFormButton";
import { alfaSlab } from "../fonts";
import {
  registrationFormStyles,
  registrationSubmitBtnStyles,
} from "./Registration.styles";
import { useState } from "react";
import { resentEmailVerify } from "@/lib/redux/auth/operations-auth";
import { useDispatch } from "react-redux";
import { initialValuesTypes } from "./Registration.types";
import { setIsVerifyModalOpen, setResended } from "@/lib/redux/auth/slice-auth";

//Formik state
const initialValues: initialValuesTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//Registration form is not have setting to LS option
export const ResendVerify: React.FC = () => {
  const dispatch = useDispatch();
  const { isRefreshing, user, resended } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(30);

  const handleResentEmail = () => {
    if (!user.email) return;
    dispatch(setResended(true));
    dispatch(resentEmailVerify({ email: user.email }) as any);

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          dispatch(setResended(false));
          return 30;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  if (timeRemaining < 30) {
    if (isRefreshing) dispatch(setResended(false));
  }

  const closeVerifyModal = () => {
    dispatch(setIsVerifyModalOpen(false));
    dispatch(setResended(false));
  };

  const btnStyles: string = `shadow-none hover:bg-buttonHoverColorDark 
  text-buttonTextColorDark rounded-md  font-semibold
  bg-buttonColorDark  disabled:opacity-50  ${registrationSubmitBtnStyles}`;

  return (
    <div
      className={`${registrationFormStyles} 
    w-full pt-36 justify-items-center items-center h-[calc(100vh-120px)]  px-6 md:px-4 md:mt-2 gap-2 md:gap-1`}
    >
      <h1 className={` ${alfaSlab.className} text-3xl text-center  text-darkYellow mb-8`}>
        Registration is succes
      </h1>
      <p className="text-lg text-center text-darkYellow ">
        Before start you should verify email
      </p>
      <p className="mt-3 text-2xl md:text-lg text-center  text-mediumDarkBlue  break-all">
        {user.email}
      </p>
      <div className="flex mt-8 mb-4 items-center justify-center sm:gap-2 gap-12">
        <RegistrationFormButton
          isLoading={isRefreshing}
          onClick={closeVerifyModal}
          text="Accept"
          timeRemaining={timeRemaining}
        />
        <button
          id="reg-btn-resend"
          type="button"
          onClick={handleResentEmail}
          disabled={resended || timeRemaining < 30 ? true : false}
          className={`${btnStyles} bg-mainBlue hover:bg-mediumDarkBlue text-lightYellow`}
        >
          {timeRemaining < 30 ? `${timeRemaining} sec` : "Resend"}
        </button>
      </div>
    </div>
  );
};
