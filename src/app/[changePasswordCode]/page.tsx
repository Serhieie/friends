"use client";

import { useAuth } from "@/helpers/hooks/authSelector";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ChangePasswordPage } from "../ui/changePassword/ChangePassword";

export default function LoginPage() {
  const { changingPass, isRefreshing } = useAuth();

  useEffect(() => {
    if (!changingPass && !isRefreshing) {
      redirect("/login");
    }
  }, [changingPass, isRefreshing]);

  return <ChangePasswordPage />;
}
