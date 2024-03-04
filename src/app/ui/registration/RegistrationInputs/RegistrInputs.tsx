"use client";
import { NameAndEmail } from "./NameAndEmail";
import { inputsStyles } from "../Registration.styles";
import { RegLogInputsProps } from "../Registration.types";
import { PasswordAndConfirm } from "./PasswordAndConfirm";

export const RegLogInputs: React.FC<RegLogInputsProps> = ({ windowSize }) => {
  const widthClass = windowSize.height > 460 ? "md3:mt-2" : "md3:mt-0";
  const withInputClass = windowSize.height > 460 ? "md3:mt-2" : "md3:mt-0";

  const fieldsStyle: string = ` text-darkYellow bg-lightYellow placeholder:text-darkYellow  ${inputsStyles}`;

  return (
    <>
      <NameAndEmail
        widthClass={widthClass}
        withInputClass={withInputClass}
        fieldsStyle={fieldsStyle}
      />
      <PasswordAndConfirm
        withInputClass={withInputClass}
        fieldsStyle={fieldsStyle}
        labelText="Password"
      />
    </>
  );
};
