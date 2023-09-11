const BLOG_PATH = "/blog";
const SHOP_PATH = "/shop";
export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROFILE: "/profile",
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:slug",
  },
  SHOP: {
    INDEX: SHOP_PATH,
    DETAIL: SHOP_PATH + "/:slug",
  },
};
