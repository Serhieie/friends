import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface PolicyProps {
  windowSize: { height: number; width: number };
}

export const Policy: React.FC<PolicyProps> = ({ windowSize }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  //just stilization of checkbox
  const handleCheckboxChange = (): void => {
    setIsChecked((prevState) => !prevState);
  };

  const widthClass: string = ` ${
    windowSize.height > 460 ? "md3:mt-9" : "md3:mt-2"
  } md:mt-2 mt-3  w-full max-w-[500px] mx-auto flex relative   `;
  const checkBoxStyle: string = ` border-none checked:bg-mediumDarkRed
    bg-mainRed mr-4 mt-0.5   appearance-none rounded border
   checked:border-transparent focus:outline-none  `;

  return (
    <div className={widthClass}>
      <input
        className={checkBoxStyle}
        style={{ flex: "none", width: "24px", height: "24px" }}
        name="user-privacy"
        type="checkbox"
        id="user-privacy"
        value="true"
        required
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isChecked && (
        <span
          className="absolute top-1 text-lightYellow left-0.5 
        pointer-events-none p-0.5 w-full"
        >
          <FaCheck size={16} className="pointer-events-none" />
        </span>
      )}

      <label
        className=" select-none text-darkYellow font-medium md:text-sm"
        htmlFor="user-privacy"
      >
        I accept the terms and conditions of the{" "}
        <span className={`text-mediumDarkRed font-bold ml-2 cursor-pointer`}>
          Privacy Policy
        </span>
      </label>
    </div>
  );
};
