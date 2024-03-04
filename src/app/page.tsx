"use client";
import Image from "next/image";
import Link from "next/link";
import { RiBearSmileFill } from "react-icons/ri";
import { righteous } from "./ui/fonts";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    if (token && isLoggedIn) {
      redirect("/mainPage");
    }
  }, [token, isLoggedIn]);

  return (
    <div className="flex flex-col p-6 md:p-4 ssm:p-2  pt-0">
      <div
        className="mt-4 md:mt-0 flex grow flex-col gap-4 md:flex-row h-[calc(100vh-120px)]
     md:h-[calc(100vh-88px)] "
      >
        <div
          className="flex md:flex-col  flex-row-reverse justify-around
         items-center  md:justify-center  gap-6 rounded-lg  
         px-6 py-8 md:w-2/5 ssm:px-2 ssm:py-4 md:px-20  text-lightBlue
          ssm2:w-full bg-mediumDarkBlue "
        >
          <p
            className={`${righteous.className}  text-5xl flex gap-2 md:flex-col 
            items-center md:text-center  text-lightBlue md:text-5xl ssm2:text-7xl md:leading-normal text-right`}
          >
            <RiBearSmileFill size={60} className=" md:hidden text-mainRed" />{" "}
            <RiBearSmileFill size={200} className=" hidden md:block text-mainRed" />{" "}
            Welcome Friend
          </p>
          <div className="flex items-center flex-col gap-1 ">
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center text-center gap-5  self-center md:min-w-44  rounded-lg
             bg-mainRed px-6 py-2 text-lg font-semibold  text-lightYellow 
              hover:bg-mediumDarkRed 
              md:text-base transition-all duration-300"
            >
              <span>Login</span>
            </Link>
            <span className="hidden md:block text-xl font-bold">or</span>
            <Link
              href="/registration"
              className="flex items-center justify-center text-center gap-5  self-center md:min-w-44  rounded-lg
             bg-mediumDarkRed md:bg-mainRed md:px-6 px-14 py-4 md:py-2 text-lg font-semibold  text-lightYellow 
              hover:bg-darkRed md:hover:bg-mediumDarkRed hover:text-mediumLightYellow
              md:text-base transition-all duration-300"
            >
              <span>Register</span>
            </Link>
          </div>
          <p className="text-lg hidden md:flex ssm2:text-sm  flex-col items-center text-lightBlue mt-4">
            Friends chat designed by Serhieie
          </p>
        </div>
        <div
          className="flex  ssm2:hidden overflow-hidden  bg-mainYellow rounded-lg  justify-around 
         items-center   md:w-3/5 px-4 h-full"
        >
          <div className="w-full flex   rounded-xl max-w-[500px]  flex-col  md:hidden py-24 px-2 ">
            <h2
              className={`${righteous.className}  text-darkYellow text-9xl lg:text-6xl  m-0 p-0  `}
            >
              Dont be shy and say Hi!
            </h2>
            <p className="text-lg    text-lightYellow mt-8">
              Friends chat designed by Serhieie
            </p>
          </div>
          <div className=" items-center flex-col hidden md:flex">
            <Image
              src="/animals/owl-svgrepo-com.svg"
              width={540}
              height={620}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <p className="mt-10 text-lg font-semibold text-mediumLightYellow">
              Special for Dan
            </p>
          </div>

          <Image
            src="/animals/sloth-svgrepo-com.svg"
            width={510}
            height={300}
            className="block md:hidden ssm2:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </div>
  );
}
