"use client";
import { Login } from "../../ui/login/Login";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ChangePasswordPage } from "../../ui/changePassword/ChangePassword";

export default function LoginPage() {
  const { isLoggedIn, changingPass } = useAuth();
  useEffect(() => {
    if (!changingPass && !isLoggedIn) {
      redirect("/login");
    }
  }, [changingPass, isLoggedIn]);

  return <ChangePasswordPage />;
}
