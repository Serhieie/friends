import { useAuth } from "@/helpers/hooks/authSelector";

interface RestrictedRouteProps {
  children: React.ReactNode;
  redirect: any;
}

export const RestrictedRoute = ({
  children,
  redirect,
}: RestrictedRouteProps): JSX.Element | null => {
  const { token, isLoggedIn } = useAuth();

  if (token && isLoggedIn) {
    redirect("/mainPage");
    return null;
  }

  return <>{children}</>;
};
