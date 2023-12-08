export const now = new Date(Date.now()).toISOString();
export const month = new Date().getMonth();
export const day = new Date().getDate();
export const hour = new Date().getHours();
export const minute = new Date().getMinutes();
export const year = new Date().getFullYear();
export const zeroTimeToday = new Date(
  new Date().setHours(0, 0, 0, 0)
).toISOString();
export const startMonth = new Date(year, month, 1).toISOString();
export const endMonth = new Date(
  year,
  month,
  31 || 30 || 29 || 28,
  24,
  0
).toISOString();
export const endDay = new Date(year, month, day, 24, 0).toISOString();
export const currentDayInMonth = new Date(
  year,
  month,
  day,
  hour,
  minute
).toISOString();
export const zeroDay = new Date(year, 0, 1).toISOString();
export const startToEndInYear = new Date(
  year,
  11,
  31 || 30 || 29 || 28,
  24,
  0
).toISOString();
// console.log("dfdds", new Date("2023-12-31T17:00:00.000Z").toLocaleString());
