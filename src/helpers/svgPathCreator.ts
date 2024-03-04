export const pathCreator = (avatarURL: string | undefined): string => {
  const error = "sorry wrong path";
  const avatarPath = `/${avatarURL?.split("/").slice(-2).join("/")}`;
  const srcToShow = avatarPath;
  if (srcToShow) return srcToShow;
  return error;
};
