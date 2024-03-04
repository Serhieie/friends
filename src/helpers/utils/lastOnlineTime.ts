export const getLastOnline = (isoDateString: string): string | null => {
  const currentDate = new Date();
  const onlineDate = new Date(isoDateString);
  const diffMilliseconds = currentDate.getTime() - onlineDate.getTime();
  const diffHours = diffMilliseconds / (1000 * 60 * 60);

  if (diffHours < 24) {
    return `${Math.round(diffHours)}h ago`;
  } else {
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  }
};
