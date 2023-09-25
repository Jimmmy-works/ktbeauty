import { useMainContext } from "@/components/MainContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import Hamburger from "@/components/Hamburger";
const Header = () => {
  const { isNavbar, onToggleNav, onAuthenModal, onLogin, onRegister } =
    useMainContext();
  const refHeader = useRef(null);
  const [colorLogo, setColorLogo] = useState(0);
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
    "/assets/img/product-6.jpg",
    "/assets/img/product-7.jpg",
    "/assets/img/product-8.jpg",
    "/assets/img/product-9.jpg",
    "/assets/img/product-10.jpg",
    "/assets/img/product-10.jpg",
  ];
  const changeBackground = () => {
    if (window.scrollY > refHeader?.current?.clientHeight) {
      setColorLogo("fill-primary");
    } else {
      setColorLogo("fill-black-555");
    }
  };
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  });

  return (
    <header className={`header `} ref={refHeader}>
      <div className="container h-full flex items-center justify-between">
        <Link to={`${PATHS.HOME}`} className={`header__logo `}>
          <svg viewBox="0 0 189 42">
            <path
              className={`${colorLogo} transition-colors duration-[1000ms]`}
              d="M63.005 9.39707C63.005 11.1451 60.705 12.1571 57.807 11.7891C50.999 10.9151 47.181 9.25907 46.215 8.84507C40.695 17.6311 40.327 27.7051 33.565 35.4331C23.813 46.5191 -5.35092 43.2991 0.859079 23.6571C2.23908 19.3791 6.79304 17.4931 6.51704 19.4251C5.78104 20.3451 2.51508 21.4031 1.77908 25.7731C0.123079 35.2031 8.63304 40.2631 15.717 40.1251C22.939 39.9411 27.861 37.0431 31.357 33.2251C36.923 27.1991 42.949 10.9611 44.881 8.38507C40.051 6.86707 35.865 6.08506 30.943 5.85506C17.787 5.21106 12.497 18.6891 19.719 20.9891C25.377 22.7831 28.689 17.0791 28.505 15.7911V15.6991C28.965 15.2851 29.425 15.4691 29.425 16.0671C28.827 20.9891 23.583 23.6111 19.259 22.1391C9.87504 18.8731 13.371 1.94507 30.621 3.50907C36.141 3.96907 42.673 6.68306 45.617 7.51107C46.031 7.00507 48.009 4.70507 49.021 4.70507H48.975C50.447 4.24507 50.815 6.49906 49.297 6.03906C48.883 5.71706 47.503 7.28107 46.905 7.87907C50.861 9.16707 62.039 12.2491 62.039 9.12107C62.039 8.70707 62.131 8.43107 62.545 8.43107C62.867 8.43107 63.005 9.16707 63.005 9.39707ZM56.0116 29.0391C54.6776 31.7991 52.3316 36.6751 49.3416 37.4111C47.7776 37.7791 44.9716 36.3991 46.8116 31.6151C47.5016 29.7291 49.1576 27.3371 49.6636 26.1871C50.3076 24.6691 48.6976 24.0711 46.1216 24.0251L45.5696 25.4971C44.4656 28.3951 42.2576 33.5011 40.0036 35.6631C39.6356 35.9851 39.3596 35.4791 39.6356 35.0651C43.2696 30.2811 45.7996 23.3351 46.7196 18.1831C47.1796 15.6071 50.1696 16.7571 49.5256 19.8391C49.2496 21.1271 47.7776 22.3691 46.9956 22.9211C48.6976 23.0131 51.0896 22.9671 53.3436 22.7371C53.6656 23.3811 52.9296 25.1291 52.3776 26.2791C51.6876 27.7051 46.9956 36.1231 49.7556 36.2611C51.6416 36.3071 54.4936 30.5571 55.4596 28.5791C55.8736 27.7971 56.4716 28.1191 56.0116 29.0391ZM72.1468 28.9931C70.7668 31.7991 67.9608 37.3191 65.2008 37.5491C63.6828 37.6411 61.5208 36.4451 62.9008 31.6151C62.1648 32.8111 60.9228 34.6511 59.5888 35.9391C54.2988 40.9991 50.8028 32.9491 57.7488 24.6231C60.5088 21.3571 65.7988 19.6551 68.4208 22.5071C69.0648 23.1971 68.6968 23.9791 67.9148 23.8411C67.4088 22.1391 65.7068 21.7711 64.0048 22.6911C61.9348 23.8411 59.5428 26.5551 57.8868 29.2691C57.5188 29.9131 56.2768 32.1671 56.0008 33.9151C55.5408 37.1351 58.0708 36.7671 60.2328 34.1911C61.8428 32.2591 63.1308 30.0051 64.3268 27.7511C65.3388 25.8191 65.9828 24.7151 67.4548 24.8071C68.0528 24.8531 68.7428 25.1291 69.3868 24.9911C68.4208 25.9571 65.7068 30.7871 65.1088 33.5931C64.7408 35.4791 64.9708 36.3531 65.5688 36.3531C67.5008 36.4451 70.5368 30.6031 71.5028 28.6251C71.9168 27.7971 72.6068 28.0731 72.1468 28.9931ZM87.5389 28.9931C86.1589 31.7991 83.4909 37.6411 79.9489 37.6411C78.3389 37.6411 76.1309 36.5371 77.5109 32.2591C77.8789 31.0631 78.7529 29.4991 80.0409 27.4291C81.1449 25.6351 80.3169 24.3931 76.7749 27.7051C75.2109 29.1311 72.9569 31.7071 70.3809 36.8131C70.0129 37.4571 69.5989 37.5031 68.6329 37.5031C67.9429 37.5491 67.5289 37.5031 67.0689 37.7791C69.2769 33.4091 71.1629 29.0391 73.4169 24.8991C74.6129 22.6911 75.2109 21.9091 76.6829 22.0011C77.2809 22.0471 77.9709 22.3231 78.6149 22.1851C77.2349 22.9211 74.7049 27.5211 73.0489 30.8331C73.9689 29.6831 75.4409 27.9351 76.8669 26.6931C79.0749 24.7151 83.8129 21.8171 85.3769 22.3691C85.3769 22.3691 80.4549 31.0171 79.8569 34.2371C79.4889 36.1231 79.9949 36.5371 80.5929 36.5371C82.9849 36.5371 85.9289 30.5111 86.8949 28.5791C87.2629 27.7511 87.9989 28.0731 87.5389 28.9931ZM137.575 8.84507C136.839 9.44307 135.827 9.94907 134.493 10.3171C133.251 10.6391 133.205 9.58107 134.723 9.39707C140.473 8.70707 137.851 -2.70094 123.039 2.58907C117.565 4.56707 114.345 9.71907 120.555 13.5371C123.361 15.2391 128.007 16.8491 131.411 18.9651C140.795 24.7611 134.631 33.4091 126.857 38.0551C116.461 44.2651 96.865 42.9771 96.083 30.0051C95.853 25.6351 99.441 19.3791 103.949 17.2631C104.593 16.9871 105.927 16.8031 104.409 17.9531C103.167 18.9191 102.063 20.0691 101.235 21.4031C99.579 23.9791 98.705 27.0611 98.659 30.0051C98.567 41.4131 115.081 42.6091 124.281 37.8251C132.009 33.7771 135.275 25.8651 129.709 21.3571C126.857 19.0571 120.693 17.4011 117.243 15.1011C110.389 10.5471 114.575 3.73907 121.291 1.34707C125.891 -0.262935 132.745 -0.538935 136.057 1.11707C139.323 2.72707 140.427 6.49907 137.575 8.84507ZM151.576 19.9771C152.036 19.9771 151.944 20.9891 151.484 20.9891H148.816C147.252 23.6571 145.412 26.0951 142.698 28.5791C142.284 29.7751 141.64 33.2711 141.64 33.2711C140.95 36.3531 143.066 36.7671 144.584 35.6631C146.7 34.0991 148.218 31.2011 149.46 28.7171C149.828 27.8891 150.518 28.0731 150.058 28.9931C148.034 33.2251 147.252 34.4671 145.55 36.1691C143.066 38.5611 138.512 37.7791 139.202 32.7191C139.616 29.5911 141.318 24.5771 142.79 20.9891H140.398C139.892 20.9891 139.984 19.9771 140.49 19.9771H143.25C144.308 17.6771 145.458 15.4231 146.608 13.4451C149.782 7.87907 154.75 8.66106 151.346 16.0211C150.702 17.4011 150.058 18.6891 149.368 19.9771H151.576ZM150.656 15.2851C151.53 13.3531 152.174 9.25907 149.322 13.2611C148.218 14.8251 147.206 17.3551 146.056 19.9771H148.356C149.23 18.4131 150.012 16.8031 150.656 15.2851ZM147.758 20.9891H145.596C144.63 23.2431 143.756 25.4971 143.112 27.1071C144.86 25.3131 146.424 23.1971 147.758 20.9891ZM165.615 28.8091C164.833 30.5571 162.257 37.0891 158.393 37.0891C157.013 37.0891 156.047 36.5831 155.449 35.8931C154.161 36.8591 152.781 37.5031 151.447 37.4571C147.951 37.3651 147.445 33.1791 149.193 29.0851C150.987 24.8531 154.805 21.2651 157.933 21.3571C161.429 21.4031 161.935 25.6351 160.187 29.7291C159.497 31.3391 158.071 33.5011 156.323 35.1571C156.691 35.8471 157.381 36.3071 158.485 36.3071C161.429 36.3071 163.821 30.6031 164.925 28.3951C165.155 27.9351 165.937 28.1191 165.615 28.8091ZM158.899 22.8751C156.921 22.3231 154.069 25.2671 152.367 28.9011C150.573 32.6731 150.159 35.8931 151.815 36.3991C152.689 36.6291 153.839 36.1691 154.943 35.2491C154.437 34.5131 154.207 33.6851 154.207 32.9951C154.253 31.9371 154.667 31.0171 155.817 31.0171C156.599 31.0171 157.197 31.6611 157.197 32.3971C157.197 32.5811 157.151 32.7191 157.105 32.9031C157.611 32.1671 158.117 31.2931 158.531 30.4191C160.325 26.6471 160.555 23.3811 158.899 22.8751ZM177.435 29.0391C176.101 31.7991 173.755 36.6751 170.765 37.4111C169.201 37.7791 166.395 36.3991 168.235 31.6151C168.925 29.7291 170.581 27.3371 171.087 26.1871C171.731 24.6691 170.121 24.0711 167.545 24.0251L166.993 25.4971C165.889 28.3951 163.681 33.5011 161.427 35.6631C161.059 35.9851 160.783 35.4791 161.059 35.0651C164.693 30.2811 167.223 23.3351 168.143 18.1831C168.603 15.6071 171.593 16.7571 170.949 19.8391C170.673 21.1271 169.201 22.3691 168.419 22.9211C170.121 23.0131 172.513 22.9671 174.767 22.7371C175.089 23.3811 174.353 25.1291 173.801 26.2791C173.111 27.7051 168.419 36.1231 171.179 36.2611C173.065 36.3071 175.917 30.5571 176.883 28.5791C177.297 27.7971 177.895 28.1191 177.435 29.0391ZM188.833 28.8551C187.131 32.5351 185.153 37.6411 180.047 37.6411C177.747 37.6411 175.677 36.1231 175.631 33.2251C175.585 30.4651 177.149 27.0151 179.173 24.6231C181.519 21.8631 185.015 20.1151 187.039 21.6331C188.787 22.9671 187.453 26.0951 184.509 28.3491C183.083 29.4071 180.093 30.3731 178.851 30.3731C178.161 32.0291 177.379 36.6751 180.415 36.6751C184.463 36.6751 186.947 31.2471 188.005 28.8091C188.373 27.9811 189.293 27.8891 188.833 28.8551ZM184.049 27.5671C187.821 24.3931 187.591 18.4131 181.933 25.2671C180.737 26.7391 179.587 28.7631 179.173 29.5911C180.001 29.5911 182.393 28.9471 184.049 27.5671Z"
            />
          </svg>
        </Link>
        <Hamburger isNavbar={isNavbar} onToggleNav={onToggleNav} />
        <ul className="header__menu xs:hidden lg:flex">
          <li className="header__menu-item ">
            <Link to={`${PATHS.HOME}`}> HOME</Link>
          </li>
          <li className="header__menu-item relative ">
            <Link to={`${PATHS.SHOP.INDEX}`}>
              SHOP
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
              <ul className="sub">
                {Array(5)
                  .fill("")
                  .map((item, index) => (
                    <li key={`${item}${index}`} className="sub__item ">
                      <a className="" href="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </a>
                    </li>
                  ))}
              </ul>
            </Link>
          </li>
          <li className="header__menu-item relative">
            <Link to={`${PATHS.BLOG.INDEX}`}>
              BLOG
              <div className="arrow-down">
                <svg
                  className="w-2 h-2 fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
            </Link>
            <ul className="sub">
              {Array(5)
                .fill("")
                .map((item, index) => (
                  <li key={`${item}${index}`} className="sub__item ">
                    <a href="#">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dignissimos quod numquam voluptate!
                    </a>
                  </li>
                ))}
            </ul>
          </li>
          <li className="header__menu-item ">
            <Link to={`${PATHS.ABOUT}`}> ABOUT</Link>
          </li>
          <li className="header__menu-item ">
            <Link to={`${PATHS.CONTACT}`}> CONTACT</Link>
          </li>
        </ul>
        <div className="header__info xs:hidden md:flex h-full items-center relative">
          <div className="header__info-search  group/hover peer/hover">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                fill="#555"
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
              />
            </svg>
            <form
              action=""
              className="absolute md:min-w-[300px] 2xl:min-w-[400px] lg:top-[108px] md:top-[96px] left-[-200%] group/input group/hover xs:hidden md:flex  items-center
              bg-[rgba(255,255,255,0.3)] max-w-[400px] p-[10px] gap-2  opacity-0 invisible
               group-hover/hover:opacity-100 group-hover/hover:visible g
               lg:group-hover/hover:top-[92px] md:group-hover/hover:top-[76px] 
               transition-all duration-300"
            >
              <input
                type="text"
                className=" border-black-be border font-mam text-black-555 text-sm duration-500 transition-all 
                w-full h-[34px] pl-[10px] rounded-none"
              />
              <Button className={`px-[12px] py-[6.5px] rounded-none`}>
                Search
              </Button>
            </form>
          </div>
          <div className="header__info-whitelist group/hover mb-[2px] relative">
            <span
              className="text-[13px] text-white font-mam rounded-[50%] bg-primary h-[20px] w-[20px]
            flex items-center justify-center absolute right-[3px] top-[42%] -translate-y-1/2"
            >
              3
            </span>
            <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555 "
                d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
              />
            </svg>
            <ul
              className="absolute top-[150%] md:-right-[30%] lg:-right-[100%]
               invisible opacity-0 group-hover/hover:visible group-hover/hover:opacity-100
              group-hover/hover:top-[calc(100%+2px)] transition-all duration-400 shadow-[0_5px_5px_0_rgba(0,0,0,0.15)] bg-white"
            >
              <h3 className="font-mab text-md text-black-555 p-[20px_14px_20px]">
                (5) Item in my cart
              </h3>
              <ul className="flex flex-col min-w-max max-h-[390px] overflow-y-scroll scrollbar-cart  p-[0px_14px_0px]  ">
                {images.map((item, index) => (
                  <li
                    key={`${item}${index}`}
                    className="flex items-center w-full gap-3 max-w-[280px] not-firstChild:pt-[10px] pb-[10px]"
                  >
                    <Link
                      to={PATHS.SHOP.DETAIL}
                      className="relative block min-h-[100px] min-w-[100px] "
                    >
                      <img
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/error.png";
                        }}
                        className="center-absolute hover:scale-105 transition-transform duration-300"
                        src={item}
                        alt=""
                      />
                    </Link>
                    <div>
                      <Link
                        to={PATHS.SHOP.DETAIL}
                        className="text-[16px] text-black-555 font-mar font-semibold truncate line-clamp-2 
                      whitespace-normal hover:text-primary transition-colors duration-400"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa, nihil.
                      </Link>
                      <p className="font-mar font-bold  text-[15px] text-primary mt-[6px]">
                        $300
                      </p>
                      <div
                        className="font-mam text-[15px] text-black-555 mt-[6px] flex items-start gap-[6px]
                        flex-col"
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className=" flex items-center justify-center">
                <Button
                  link={PATHS.CART}
                  variant="filled"
                  className={`w-full text-center py-[14px]`}
                >
                  VIEW MY WHILE LIST
                </Button>
              </div>
            </ul>
          </div>
          <div className="header__info-cart group/hover mb-[2px] relative">
            <span
              className="text-[13px] text-white font-mam rounded-[50%] bg-primary h-[20px] w-[20px]
            flex items-center justify-center absolute right-[3px] top-[42%] -translate-y-1/2"
            >
              3
            </span>
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555"
                d="M6 23.73l-3-2.122v-14.2l3 1.359v14.963zm2-14.855v15.125l13-1.954v-15.046l-13 1.875zm5.963-7.875c-2.097 0-3.958 2.005-3.962 4.266l-.001 1.683c0 .305.273.54.575.494.244-.037.425-.247.425-.494v-1.681c.003-1.71 1.416-3.268 2.963-3.268.537 0 1.016.195 1.384.564.422.423.654 1.035.653 1.727v1.747c0 .305.273.54.575.494.243-.037.423-.246.423-.492l.002-1.749c.002-1.904-1.32-3.291-3.037-3.291zm-6.39 5.995c.245-.037.427-.247.427-.495v-2.232c.002-1.71 1.416-3.268 2.963-3.268l.162.015c.366-.283.765-.513 1.188-.683-.405-.207-.858-.332-1.35-.332-2.096 0-3.958 2.005-3.962 4.266v2.235c0 .306.272.538.572.494z"
              />
            </svg>
            <ul
              className="absolute top-[150%] md:-right-[30%] lg:-right-[100%]
               invisible opacity-0 group-hover/hover:visible group-hover/hover:opacity-100
              group-hover/hover:top-[calc(100%+2px)] transition-all duration-400 shadow-[0_5px_5px_0_rgba(0,0,0,0.15)] bg-white"
            >
              <h3 className="font-mab text-md text-black-555 p-[20px_14px_20px]">
                (5) Item in my cart
              </h3>
              <ul className="flex flex-col min-w-max max-h-[390px] overflow-y-scroll scrollbar-cart  p-[0px_14px_0px]  ">
                {images.map((item, index) => (
                  <li
                    key={`${item}${index}`}
                    className="flex items-center w-full gap-3 max-w-[280px] not-firstChild:pt-[10px] pb-[10px]"
                  >
                    <Link
                      to={PATHS.SHOP.DETAIL}
                      className="relative block min-h-[100px] min-w-[100px] "
                    >
                      <img
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/error.png";
                        }}
                        className="center-absolute hover:scale-105 transition-transform duration-300"
                        src={item}
                        alt=""
                      />
                    </Link>
                    <div>
                      <Link
                        to={PATHS.SHOP.DETAIL}
                        className="text-[16px] text-black-555 font-mar font-semibold truncate line-clamp-2 
                      whitespace-normal hover:text-primary transition-colors duration-400"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa, nihil.
                      </Link>
                      <p className="font-mar font-bold  text-[15px] text-primary mt-[6px]">
                        $300
                      </p>
                      <div
                        className="font-mam text-[15px] text-black-555 mt-[6px] flex items-start gap-[6px]
                        flex-col"
                      >
                        <p> Quantity: 100</p>
                        <button
                          className="px-[6px] block text-[13px] text-white rounded-md py-[3px] hover:bg-red-500
                      bg-black-333 transition-all duration-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className=" flex items-center justify-center">
                <Button
                  link={PATHS.CART}
                  variant="filled"
                  className={`w-full text-center py-[14px]`}
                >
                  VIEW MY CART
                </Button>
              </div>
            </ul>
          </div>
          <div className="header__info-profile group/hover relative">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
            <ul className="sub min-w-[200px] p-0 shadow-header right-0 left-[unset]">
              <li
                className=" sub__item w-full justify-start gap-2  
              group/sub border-b border-[#e3e3e3] border-solid p-[10px_10px] 
              duration-300 transition-colors hover:bg-black-ebe"
              >
                <Link
                  className="flex items-center gap-2 group-hover/hover:text-[#222] text-[#222]"
                  to={PATHS.PROFILE.INDEX}
                >
                  <div className="p-[1px] rounded-[50%]">
                    <img
                      className="w-[50px] h-[50px] rounded-[50%]"
                      src="/assets/img/avartar.png"
                      alt=""
                    />
                  </div>
                  Jimmy Adrino
                </Link>
              </li>
              <li
                className=" sub__item w-full justify-start gap-2
              group/sub p-[10px_10px_10px_20px] duration-300 transition-colors hover:bg-black-ebe  border-b border-[#e3e3e3] border-solid"
              >
                <svg className="h-[24px] w-[24px] " viewBox="0 0 24 24">
                  <path
                    className="fill-[#222]"
                    d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
                  />
                </svg>
                <Link
                  to={PATHS.PROFILE.ORDER}
                  className="text-[#222] group-hover/sub:text-black-555"
                >
                  Your Order
                </Link>
              </li>
              <li
                className=" sub__item w-full justify-start
              group/sub border-b border-[#e3e3e3] border-solid p-[10px_10px_10px_20px] duration-300 transition-colors hover:bg-black-ebe"
              >
                <svg className="w-[22px] h-[22px] " viewBox="0 0 24 24">
                  <path
                    className="fill-[#222]"
                    d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
                  ></path>
                </svg>
                <Link
                  to={PATHS.PROFILE.WHITELIST}
                  className="text-[#222] group-hover/sub:text-black-555"
                >
                  White List
                </Link>
              </li>

              <li
                className=" sub__item w-full justify-start gap-2
              group/sub p-[10px_10px_10px_24px] duration-300 transition-colors hover:bg-black-ebe"
              >
                <svg className=" h-[24px] w-[24px] " viewBox="0 0 256 256">
                  <path
                    className="fill-[#222]"
                    d="M14.7,12.7c-1.6,0.8-2.8,1.9-3.5,3.3L10,18.1v89.8c0,86.9,0.1,89.9,1,92c0.7,1.5,1.7,2.6,3.3,3.4c59.2,33.5,72,40.6,73.4,40.9c2.5,0.5,6.1-1,7.8-3.3l1.4-1.8l0.2-17.1l0.2-17.1l34.8-0.2c34-0.2,34.9-0.2,36.7-1.3c1-0.6,2.4-1.8,3-2.8l1.2-1.7v-28.4v-28.4h-8.1h-8.1v23v23H127H97.2l-0.1-65.7L97,56.7L95.6,55c-0.9-1.2-7.6-5.3-22.5-13.7c-11.6-6.6-21.5-12.2-21.9-12.5c-0.5-0.3,20.2-0.5,52.4-0.5h53.1v29.5v29.5h8.1h8.1V52.4V17.5l-1.1-1.7c-0.7-0.9-1.9-2.2-2.7-2.8l-1.5-1.1l-75.3-0.2L17,11.6L14.7,12.7z"
                  />
                  <path
                    className="fill-[#222]"
                    d="M191.9,78.1l-1.5,1.3l-0.2,11.8l-0.2,11.8h-22c-13.1,0-23,0.3-24.4,0.6c-5.5,1.3-9.1,5.7-9.1,11.2c0.1,4.7,2.1,8.1,6.3,10.3c2,1.1,2.7,1.1,25.7,1.3l23.6,0.2l0.2,11.7l0.2,11.8l1.8,1.6c1.5,1.3,2.1,1.5,3.5,1.3c2.1-0.4,48.7-33.9,49.8-36c0.5-1,0.6-1.8,0.3-3.3c-0.5-1.8-2-3-24.5-19.4c-21.4-15.5-24.2-17.4-26-17.4C194,76.9,192.9,77.3,191.9,78.1z"
                  />
                </svg>
                <a className="text-[#222] group-hover/sub:text-black-555">
                  Logout
                </a>
              </li>
            </ul>
            <ul className="sub min-w-[120px] p-0 shadow-header right-0 left-[unset]">
              <li
                onClick={() => onAuthenModal("login")}
                className=" sub__item w-full justify-start
              group/sub border-b border-[#e3e3e3] border-solid p-[10px] 
              duration-300 transition-colors hover:bg-black-ebe"
              >
                <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                  <path
                    className="fill-[#222]"
                    d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"
                  ></path>
                </svg>
                <a className="text-[#222] group-hover/sub:text-black-555">
                  Login
                </a>
              </li>
              <li
                onClick={() => onAuthenModal("register")}
                className=" sub__item w-full justify-start
              group/sub border-b border-[#e3e3e3] border-solid p-[10px] 
              duration-300 transition-colors hover:bg-black-ebe"
              >
                <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                  <path
                    className="fill-[#222]"
                    d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                  ></path>
                </svg>
                <a className="text-[#222] group-hover/sub:text-black-555">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
