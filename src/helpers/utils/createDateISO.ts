export const createDateISO = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString);
  const formattedDate = `${isoDate.toDateString()} ${isoDate.toLocaleTimeString()} GMT`;
  return formattedDate;
};
