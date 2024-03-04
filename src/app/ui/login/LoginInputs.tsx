"use client";

import { useDispatch, useSelector } from "react-redux";
import { changeUserEmail } from "../../../lib/redux/auth/slice-auth";
import { getUserData } from "../../../lib/redux/auth/selectors-auth";
import { useAuth } from "@/helpers/hooks/authSelector";
import { setShowPassword } from "../../../lib/redux/auth/slice-auth";
import { RiEye2Line } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

export const LoginInputs: React.FC = () => {
  const { showPassword } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(getUserData);

  //by the way better to leave it here with use state
  //Im not shure need I set it in LS or not that why its with redux
  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  //setting email to LS
  const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    dispatch(changeUserEmail(value));
  };

  //resize styles

  return (
    <>
      <label
        className={`
 
         mt-9 text-xl flex items-center gap-2 md:ml-2 font-light
       sm:mt-1  text-darkYellow  md:text-sm `}
        htmlFor="userEmail"
      >
        {" "}
        Email{" "}
      </label>
      <input
        onChange={handleInputEmailChange}
        className={`text-darkYellow bg-lightYellow placeholder:text-darkYellow 
         mx-auto w-full py-1 rounded-sm px-5  h-12 
          border-0 outline-none 
           placeholder:font-light
           md:placeholder:text-sm
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:font-extralight md:text-sm  font-light  transition-all  2xl2:text-2xl`}
        type="email"
        name="userEmail"
        id="userEmail"
        placeholder="Balambino@mail.com"
        value={user.email || ""}
        required
      />
      <label
        className={` mt-2 text-xl flex items-center gap-2 md:ml-2 
        text-darkYellow font-light sm:mt-1 md:text-sm`}
        htmlFor="userPassword"
      >
        {" "}
        Password{" "}
      </label>
      <div className="flex">
        <input
          className={` text-darkYellow bg-lightYellow placeholder:text-darkYellow 
             mx-auto  py-1 px-5 rounded-l-sm h-12 border-0 outline-none   
           placeholder:font-light 
            md:h-10 text-xl md:py-0.5  md:px-2 placeholder:opacity-50 
            md:placeholder:text-sm md:text-sm
           ssm:font-extralight w-full  font-light  transition-all  2xl2:text-2xl`}
          type={`${!showPassword ? "password" : "text"}`}
          name="userPassword"
          id="userPassword"
          placeholder="Enter your password"
          min={7}
          required
        />
        <button
          id="login-psw-btn"
          className={`text-darkYellow  
           placeholder:text-darkYellow placeholder:font-extralight
           rounded-r-sm w-12 transition-all bg-lightYellow`}
          type="button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <RiEye2Line size={24} /> : <RiEyeCloseLine size={24} />}
        </button>
      </div>
    </>
  );
};
