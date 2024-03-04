"use client";

import Link from "next/link";
import { LoginFormButton } from "./LoginFormButton";
import { LoginInputs } from "./LoginInputs";
import { login } from "../../../lib/redux/auth/operations-auth";
import { useEffect, useState, FormEvent } from "react";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { CredentialsLogin } from "../../../lib/redux/auth/redux-auth.type";
import {
  changeUserStatus,
  setIsChangePasswordModalOpen,
} from "@/lib/redux/auth/slice-auth";
import { useDispatch } from "react-redux";
import { alfaSlab } from "../fonts";
import { useAuth } from "@/helpers/hooks/authSelector";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isRefreshing, token, isChangePasswordModalOpen } = useAuth();
  const openChangePasswordModal = () => {
    dispatch(setIsChangePasswordModalOpen(true));
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const formElement = evt.currentTarget;
    const userEmail = formElement.elements.namedItem("userEmail") as HTMLInputElement;
    const userPassword = formElement.elements.namedItem(
      "userPassword"
    ) as HTMLInputElement;

    const userData: CredentialsLogin = {
      email: userEmail.value.trim().toLowerCase(),
      password: userPassword.value.trim(),
    };

    await dispatch(login(userData) as any);
    if (token) dispatch(changeUserStatus(true));
    userPassword.value = "";
  };

  return (
    <div
      className="grid  grid-cols-12 grid-rows-10
    w-full justify-items-center items-center mt-4 px-6 md:px-4 md:mt-2 gap-2 md:gap-1 h-[calc(100vh-118px)]
     md:h-[calc(100vh-100px)] "
    >
      <div
        className="col-start-1 col-end-1 row-start-1 
      row-end-11 bg-mainYellow w-full h-full rounded-xl ssm:bg-mainRed"
      ></div>
      <div
        className="col-start-2 col-end-2 row-start-1 
      row-end-11 bg-mainRed w-full h-full rounded-xl ssm:hidden"
      ></div>
      <div
        className="col-start-3 col-end-3 row-start-1 
      row-end-11 bg-mediumDarkBlue w-full h-full rounded-xl md:hidden"
      ></div>
      {isChangePasswordModalOpen ? (
        <ForgotPasswordPage />
      ) : (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={`

         row-span-10 col-start-4 col-end-10 md:col-start-3 md:col-end-11 ssm:col-start-2 ssm:col-end-12 col-span-6
           flex gap-2 flex-col   pt-20  px-10 md:px-3 rounded-xl
          shadow-lg bg-mainYellow   md2:pt-8  md:pb-14  
          transition-all  z-20 w-full  h-full`}
        >
          <h1
            className={` ${alfaSlab.className} text-center text-4xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-10 text-darkYellow`}
          >
            Login
          </h1>
          <LoginInputs />
          <button
            onClick={openChangePasswordModal}
            aria-label="change password button"
            id="forgot-password"
            type="button"
            //   onClick={}
            className={`text-mainRed font-medium  
        border-none bg-transparent  outline-none select-none `}
          >
            Forgot your password?
          </button>
          <Link
            className={`text-mainRed font-medium  mt-4 mb-28 flex gap-4 `}
            href={"/registration"}
          >
            <p className={`text-darkYellow font-medium`}>Have no account?</p>
            Registrate now
          </Link>

          <LoginFormButton text="Sign in" isLoading={isRefreshing} />
        </form>
      )}

      <div
        className="col-start-10 col-end-10 row-start-1 
      row-end-11 bg-mediumDarkBlue w-full h-full rounded-xl md:hidden"
      ></div>
      <div
        className="col-start-11 col-end-11 row-start-1 
      row-end-11 bg-mainRed w-full h-full rounded-xl ssm:hidden"
      ></div>
      <div
        className="col-start-12 col-end-12 row-start-1 
      row-end-11 bg-mainYellow w-full h-full rounded-xl ssm:bg-mainRed"
      ></div>
    </div>
  );
};
