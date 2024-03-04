import { useAuth } from "../../../helpers/hooks/authSelector";
import { useState } from "react";
import {
  setChangingPass,
  setIsChangePasswordModalOpen,
  setResended,
} from "@/lib/redux/auth/slice-auth";
import { useDispatch } from "react-redux";
import { changePasswordRequest } from "@/lib/redux/auth/operations-auth";
import { alfaSlab } from "../fonts";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isRefreshing, user, resended, changingPass } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [email, setEmail] = useState<string>("");

  const closeChangePasswordModal = () => {
    dispatch(setIsChangePasswordModalOpen(false));
    dispatch(setResended(false));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleChangePassword = () => {
    if (!email) return;
    dispatch(setChangingPass(true));
    dispatch(setResended(true));
    dispatch(changePasswordRequest({ email }) as any);

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
    console.log(changingPass);
  };

  if (timeRemaining < 30) {
    if (isRefreshing) dispatch(setResended(false));
  }

  const themeStyles: string = `
   shadow-none  text-lightYellow   
     text-center text-lg md:w-48 font-semibold w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm disabled:opacity-30 font-montserrat `;

  return (
    <>
      <div
        className={`row-span-10 col-start-4 col-end-10 md:col-start-3 md:col-end-11 ssm:col-start-2 ssm:col-end-12 col-span-6
           flex gap-2 flex-col   pt-36  px-10 md:px-3 rounded-xl
          shadow-lg bg-mainYellow     md:pb-14  
          transition-all  z-20 w-full  h-full`}
      >
        <h1
          className={`  ${alfaSlab.className} text-3xl text-center  mb-6 mt-8 text-darkYellow font-montserrat `}
        >
          Forgot your Password?
        </h1>
        <p className="text-lg text-center text-darkYellow mb-3 font-montserrat ">
          Send email and confirm change password request
        </p>
        <form action="Form Validation">
          <label htmlFor="inputEmailChangePass">
            <input
              type="text"
              name="inputEmailChangePass"
              placeholder={user.email}
              onChange={handleChange}
              value={email}
              required
              className={`text-darkYellow bg-lightYellow placeholder:text-mainYellow 
 w-[80%] mx-auto py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base flex
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl `}
            />
          </label>

          <div className="flex mt-8 gap-4 max-w-96 mx-auto">
            <button
              type="button"
              onClick={closeChangePasswordModal}
              className={`${themeStyles} hover:bg-mediumDarkRed bg-mainRed `}
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={resended || timeRemaining < 30 ? true : false}
              className={`${themeStyles} bg-mainBlue hover:bg-mediumDarkBlue`}
            >
              {timeRemaining < 30 ? `${timeRemaining} sec` : "Send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
