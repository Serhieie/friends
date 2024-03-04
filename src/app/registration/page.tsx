"use client";
import { useAuth } from "@/helpers/hooks/authSelector";
import { Registration } from "../ui/registration/Registration";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RegistrationPage() {
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    if (token && isLoggedIn) {
      redirect("/mainPage");
    }
  }, [token, isLoggedIn]);

  return (
    <div className="flex items-center justify-center ">
      <Registration />
    </div>
  );
}
