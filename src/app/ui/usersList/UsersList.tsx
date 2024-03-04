import { useGetAllUsersQuery } from "@/lib/redux/users/userApi";
import { UserItem } from "./UsersItem";
import { useAuth } from "@/helpers/hooks/authSelector";
import { useEffect } from "react";
import { UsersListSkelleton } from "./UsersListSkelleton";

export const UsersList: React.FC = () => {
  const { data, refetch, isLoading } = useGetAllUsersQuery();
  const { avatarURL } = useAuth();

  useEffect(() => {
    refetch();
  }, [refetch, avatarURL]);

  if (isLoading) {
    return <UsersListSkelleton />;
  }

  return (
    <div className=" flex flex-col h-full overflow-y-scroll p-2">
      {data &&
        data.map((user) => (
          <div key={user._id}>
            <UserItem key={user._id} persone={user} />
          </div>
        ))}
    </div>
  );
};
