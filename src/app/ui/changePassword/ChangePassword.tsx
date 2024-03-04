import { PasswordAndConfirm } from "../registration/RegistrationInputs/PasswordAndConfirm";
import { changePasswordSchema } from "../../../helpers/schema";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "@/lib/redux/auth/operations-auth";
import { inputsStyles } from "../registration/Registration.styles";
import { alfaSlab } from "../fonts";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { initialValuesTypes } from "../registration/Registration.types";
import { LoginFormButton } from "../login/LoginFormButton";
import { setChangingPass } from "@/lib/redux/auth/slice-auth";
import { redirect } from "next/navigation";

const initialValues: initialValuesTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const ChangePasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const changePasswordCode = usePathname().split("/").slice(-1).join("");
  const { isRefreshing, changingPass } = useAuth();

  const withInputClass = " ";
  const fieldsStyle: string = `  ${inputsStyles}`;

  const handleSubmit = async (
    values: { password: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { password } = values;
    if (!changePasswordCode) return;
    const newPassword = {
      password: password.trim(),
      changePasswordCode,
    };
    dispatch(changePassword(newPassword) as any);
    dispatch(setChangingPass(false));
    resetForm();
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form
          autoComplete="off"
          className="row-span-10 col-start-4 col-end-10 md:col-start-3 
              md:col-end-11 ssm:col-start-2 ssm:col-end-12 col-span-6
           flex gap-2 flex-col   pt-20  px-10 md:px-3 rounded-xl
          shadow-lg bg-mainYellow   md2:pt-8  md:pb-14  
          transition-all  z-20 w-full  h-full"
        >
          <h1
            className={`  ${alfaSlab.className} text-3xl text-center  mb-6 mt-8 text-darkYellow font-montserrat `}
          >
            Change your password
          </h1>{" "}
          <PasswordAndConfirm
            withInputClass={withInputClass}
            fieldsStyle={fieldsStyle}
            labelText={"New password"}
          />
          <LoginFormButton
            isLoading={isRefreshing}
            text="Change Password"
            styles=" py-6 mt-4"
          />
        </Form>
      </Formik>

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
