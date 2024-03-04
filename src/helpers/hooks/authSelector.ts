import { useSelector } from "react-redux";
import { AuthState } from "../../lib/redux/auth/redux-auth.type";
import { UserData } from "../../lib/redux/auth/redux-auth.type";

import {
  getUserAuth,
  getError,
  getisLoadingUser,
  getToken,
  getLogedIn,
  getUserData,
  getAvatar,
  getIsVerifyModalOpen,
  getIsChangePasswordModalOpen,
  getChangingPass,
  getResended,
  getTimeRemaining,
  getShowPassword,
  getLocalAvatar,
  getAvatarURL,
} from "../../lib/redux/auth/selectors-auth";

export interface useAuthReturn {
  isLoggedIn: boolean;
  isRefreshing: boolean;
  user: UserData;
  error: boolean;
  token: string | null;
  avatar: string;
  fullAuth: AuthState;
  isVerifyModalOpen: boolean;
  isChangePasswordModalOpen: boolean;
  changingPass: boolean;
  resended: boolean;
  timeRemaining: number;
  showPassword: boolean;
  localAvatar: string | undefined;
  avatarURL: string | undefined;
}

export const useAuth = (): useAuthReturn => {
  const isLoggedIn: boolean = useSelector(getLogedIn);
  const isRefreshing: boolean = useSelector(getisLoadingUser);
  const user: UserData = useSelector(getUserData);
  const error: boolean = useSelector(getError);
  const token: string | null = useSelector(getToken);
  const avatar: string = useSelector(getAvatar);
  const fullAuth: AuthState = useSelector(getUserAuth);
  const isVerifyModalOpen: boolean = useSelector(getIsVerifyModalOpen);
  const isChangePasswordModalOpen: boolean = useSelector(getIsChangePasswordModalOpen);
  const changingPass: boolean = useSelector(getChangingPass);
  const resended: boolean = useSelector(getResended);
  const timeRemaining: number = useSelector(getTimeRemaining);
  const showPassword: boolean = useSelector(getShowPassword);
  const localAvatar: string | undefined = useSelector(getLocalAvatar);
  const avatarURL: string | undefined = useSelector(getAvatarURL);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    fullAuth,
    token,
    error,
    avatar,
    isVerifyModalOpen,
    isChangePasswordModalOpen,
    changingPass,
    resended,
    timeRemaining,
    showPassword,
    localAvatar,
    avatarURL,
  };
};
