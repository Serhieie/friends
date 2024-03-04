import { useAuth } from "@/helpers/hooks/authSelector";

interface PrivateRouteProps {
  children: React.ReactNode;
  redirect: any;
}

export const PrivateRoute = ({
  children,
  redirect,
}: PrivateRouteProps): JSX.Element | null => {
  const { token, isRefreshing } = useAuth();

  if (!token && !isRefreshing) {
    redirect("/login");
    return null;
  }

  return <>{children}</>;
};
