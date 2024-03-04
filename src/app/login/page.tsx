"use client";
import { Login } from "../ui/login/Login";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { token, isLoggedIn } = useAuth();
  useEffect(() => {
    if (token && isLoggedIn) {
      redirect("/mainPage");
    }
  }, [token, isLoggedIn]);

  return <Login />;
}
