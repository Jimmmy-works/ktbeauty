export const timeVN = (dataDate) =>
  new Date(dataDate).toLocaleTimeString("vi-VN");
export const dateVN = (dataDate) =>
  new Date(dataDate).toLocaleDateString("vi-VN");
export const localeVN = (dataDate) =>
  new Date(dataDate).toLocaleString("vi-VN");
export const localeVN_Parse = (dataDate) => {
  console.log("dataDate", dataDate);
  return new Date(dataDate).getTime();
};
