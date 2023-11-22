const BLOG_PATH = "/blog";
const SHOP_PATH = "/shop";
const PROFILE_PATH = "/profile";
const CMS_PATH = "/cms";
export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROFILE: {
    INDEX: PROFILE_PATH,
    ORDER: `${PROFILE_PATH}/order`,
    WHITELIST: `${PROFILE_PATH}/whitelist`,
    ADDRESS: `${PROFILE_PATH}/address`,
  },
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:slug",
  },
  SHOP: {
    INDEX: SHOP_PATH,
    DETAIL: SHOP_PATH + "/:slug",
  },
  CMS: {
    INDEX: CMS_PATH,
    PRODUCT: `${CMS_PATH}/product`,
    IMAGE: `${CMS_PATH}/image`,
    USER: `${CMS_PATH}/user`,
    FILE: `${CMS_PATH}/file`,
    SHIPPING: `${CMS_PATH}/shipping`,
  },
  LOGIN: "/login",
  SIGNUP: "/signup",

  CHECKOUT: "/checkout",
  CART: "/cart",
  COMPLETE: "/complete" + "/:slug",
  NOT_FOUND: "/not-found",
};
