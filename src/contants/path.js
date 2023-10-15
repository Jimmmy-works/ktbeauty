const BLOG_PATH = "/blog";
const SHOP_PATH = "/shop";
const PROFILE_PATH = "/profile";
const CMS__PATH = "/cms";

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
    INDEX: CMS__PATH,
    PRODUCT: `${CMS__PATH}/product`,
    IMAGE: `${CMS__PATH}/image`,
    USER: `${CMS__PATH}/user`,
    FILE: `${CMS__PATH}/file`,
  },
  CHECKOUT: "/checkout",
  CART: "/cart",
  COMPLETE: "/complete" + "/:slug",
};
