import { useState } from "react";

export const FEATURED_OPTIONS = {
  FEATURED: "featured",
  TOP_SOLD: "top-sold",
  TOP_SALE: "top-discount",
};
export const CATEGORIES_OPTIONS = {
  ALL: "all",
  OTHER: "other",
  SUPPLEMENT: "supplement",
  BODY: "body",
  SKIN: "skin",
  FACE: "face",
};
export const OPTION_SORT = {
  POPULAR: "all",
  OLD: "old",
  NEWEST: "newest",
  HIGH_PRICE: "high",
  LOWER_PRICE: "lower",
};
export const OPTION_SORT_ORDER_ANTD = [
  { value: "Đang xác minh" },
  { value: "Đã xác minh" },
  { value: "Đang chuẩn bị hàng" },
  { value: "Đang giao hàng" },
  { value: "Hoàn thành đơn hàng" },
  { value: "Đã hủy đơn" },
];
export const OPTION_SORT_ORDER = {
  ALL: "all",
  VERIFY: "verify",
  VERIFIED: "verified",
  PREPARING: "preparing",
  DELIVERY: "delivery",
  COMPLETE: "complete",
  CANCEL: "cancel",
};
export const NAV_OPTION = {
  SHOP: "shop",
  BLOG: "blog",
};
export const MODAL_OPTION = {
  USER: {
    CREATE: "user/create",
    AVATAR: "user/avatar",
  },
  PRODUCT: {
    CREATE: "product/create",
    UPDATE: "product/update",
  },
  CATEGORY: {
    CREATE: "category/create",
    UPDATE: "category/update",
  },
};
export const SELECT_TOKEN = {
  token: "access_token",
  refreshToken: "refresh_token",
};
export const RANGER_VALUE = {
  min: 0,
  max: 10000,
};
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthNameVN = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
export const STATUS_OPTION = {
  VERIFIED: "verified",
  VERIFYING: "verifying",
  PREPARING: "preparing",
  DELIVERY: "delivery",
  COMPLETE: "complete",
  CANCEL: "canceled",
};
export const _LIMIT = 12;
export const OPTION_SEX = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
];
export const OPTION_AGE = [
  { label: "Dưới 25 Tuổi", value: "below25" },
  { label: "Từ 25-35 Tuổi", value: "from25to35" },
  { label: "Trên 35 Tuổi", value: "above35" },
];
export const OPTION_LIFE_STYLE = [
  {
    label: "Nhân viên văn phòng",
    value: "office",
  },
  {
    label: "Makeup thường xuyên",
    value: "makeup",
  },
  {
    label: "Học sinh - Sinh viên",
    value: "student",
  },
  {
    label: "Năng động hoặc Làm việc ngoài trời",
    value: "outside",
  },
];
export const OPTION_SKIN_TYPE = [
  { label: "Da thường", value: "nomal" },
  { label: "Da dầu", value: "oil" },
  { label: "Da khô", value: "dry" },
  {
    label: "Da hỗn hợp",
    value: "combination",
  },
];
