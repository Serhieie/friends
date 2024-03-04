import { nanoid } from "@reduxjs/toolkit";
export const UsersListSkelleton: React.FC = () => {
  const arrOfNums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className=" flex flex-col h-full overflow-y-scroll p-2">
      {arrOfNums.map((_) => (
        <div
          key={nanoid()}
          className="bg-mediumLightBlue  flex justify-between items-center
       rounded-lg relative break-words px-2 py-1 border  border-darkBlue opacity-40 "
        >
          <div className="flex items-center justify-center  gap-1  break-words w-full pr-4">
            <div
              className="text-xs bg-mediumDarkBlue 
         p-1.5 rounded-lg lg:hidden  min-w-16 mr-auto h-[25px]"
            ></div>
          </div>

          <div className="bg-lightYellow w-8  h-7 md:h-6 rounded-full p-0 border-spacing-1  border-darkBlue"></div>
        </div>
      ))}
    </div>
  );
};
