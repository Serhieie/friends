"use client";

import { handleRegistration } from "../../../helpers/validateRegistration";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { RegistrationFormButton } from "./RegistrationFormButton";
import { useEffect, useState } from "react";
import { Policy } from "./Policy";
import { RegLogInputs } from "./RegistrationInputs/RegistrInputs";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { registrationSchema } from "../../../helpers/schema";
import { registrationFormStyles } from "./Registration.styles";
import { initialValuesTypes } from "./Registration.types";
import { changeUserEmail } from "../../../lib/redux/auth/slice-auth";
import { alfaSlab } from "../fonts";
import { ResendVerify } from "./ResendVerify";

//Formik state
const initialValues: initialValuesTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//Registration form is not have setting to LS option
export const Registration: React.FC = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const dispatch = useDispatch();
  const { isRefreshing, isVerifyModalOpen } = useAuth();

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  //resize listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { name, email, password } = values;
    dispatch(changeUserEmail(email));
    const userData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    //validation for inputs
    const error = handleRegistration(userData, dispatch);
    if (!error) {
      resetForm();
    }
  };

  const formStyles: string = `bg-mainYellow   ${registrationFormStyles} `;

  return (
    <div
      className="grid  grid-cols-12 grid-rows-10
    w-full  justify-items-center items-center h-[calc(100vh-118px)]
      md:h-[calc(100vh-100px)]  mt-4 px-6 md:px-4 md:mt-2 gap-2 md:gap-1"
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

      {isVerifyModalOpen ? (
        <ResendVerify />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form autoComplete="off" className={formStyles}>
            <h1
              className={`${alfaSlab.className} text-center text-4xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkYellow`}
            >
              Registration
            </h1>
            <RegLogInputs windowSize={windowSize} />
            <Policy windowSize={windowSize} />
            <RegistrationFormButton isLoading={isRefreshing} text="Register" />
          </Form>
        </Formik>
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
