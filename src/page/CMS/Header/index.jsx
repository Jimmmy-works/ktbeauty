import { useMainContext } from "@/components/MainContext";
import { PATHS } from "@/contants/path";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const DashboardHeader = ({
  toggleSidebar,
  toggleInputSeacrhMobile,
  toggleInputSearch,
  setToggleInputSearch,
  setToggleSidebar,
  setToggleInputSeacrhMobile,
  profile,
}) => {
  const { onAuthenModal, onLogout } = useMainContext();
  return (
    <div
      className={` flex items-center justify-between shadow-header h-[60px] bg-white fixed top-0 left-0
          duration-400 transition-all px-[20px] z-[1000] xs:w-full xs:ml-[0px] 
         ${
           toggleSidebar
             ? " lg:ml-[280px] lg:w-[calc(100%-280px)]"
             : " lg:ml-[60px]  lg:w-[calc(100%-60px)]"
         } `}
    >
      <div
        className={`text-sm text-[#033C73] font-osr   border border-solid border-[#33699c]
                   xs:flex lg:hidden items-center justify-center rounded-[5px] cursor-pointer overflow-hidden relative p-[5px] 
                   duration-400 transition-all
                   ${toggleSidebar ? "px-[5px]" : "px-[20px]"} `}
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <span
          className={`block transition-all duration-400 absolute  top-1/2 -translate-y-1/2
             ${
               toggleSidebar
                 ? "translate-x-[-50px] invisible opacity-0 "
                 : "translate-x-0  visible opacity-100"
             }`}
        >
          MENU
        </span>
        <div
          className={`h-full items-center justify-center transition-all duration-400 
            ${
              toggleSidebar
                ? "translate-x-0  visible opacity-100"
                : "translate-x-[50px] invisible opacity-0 "
            }`}
        >
          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24">
            <path
              className="fill-[#033C73] "
              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        className="xs:flex lg:hidden  flex-col items-center justify-center gap-[2px] rounded-[5px]
                p-[6.5px_11.5px] bg-[#33699c]"
        onClick={() => setToggleInputSeacrhMobile(!toggleInputSeacrhMobile)}
      >
        <span className="h-[3px] w-[3px] block bg-white rounded-[50%]"></span>
        <span className="h-[3px] w-[3px] block bg-white rounded-[50%]"></span>
        <span className="h-[3px] w-[3px] block bg-white rounded-[50%]"></span>
      </div>
      <div
        className={`h-full flex items-center justify-between lg:static xs:absolute transition-all duration-400
            xs:left-1/2 lg:left-0  xs:-translate-x-1/2 lg:translate-x-0
            xs:bg-white xs:p-[10px] lg:p-0 xs:w-[90%] lg:w-full xs:rounded-[50px] lg:rounded-none xs:shadow-dashboard lg:shadow-none
            ${
              toggleInputSeacrhMobile
                ? "xs:top-[70px] lg:top-0"
                : "xs:top-[-150%] lg:top-0"
            }`}
      >
        <div className="relative w-fit">
          <svg
            className={`w-[22px] h-[22px] absolute top-1/2 -translate-y-1/2 right-[-26px] fdsfsdsdfsd cursor-pointer group
                  duration-400 transition-all
                  ${
                    toggleInputSearch
                      ? "opacity-100 visible "
                      : "visible opacity-0 "
                  }`}
            viewBox="0 0 24 24"
            onClick={() => setToggleInputSearch(false)}
          >
            <path
              className="fill-gray-400 group-hover:fill-[#033c73] duration-300 transition-colors"
              d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
            ></path>
          </svg>
        </div>
        <div className="relative h-full flex justify-end items-center gap-1 w-fit  cursor-pointer mr-[20px] group ">
          <div className=" h-full  flex items-center justify-center ">
            <img
              className="w-[42px] h-[42px]"
              src="/assets/img/avartar.png"
              alt=""
            />
          </div>
          <ul
            className=" group-hover:visible group-hover:opacity-100 bg-white absolute right-[-20px] 
            top-[100%] min-w-[120px] p-0 shadow-header invisible opacity-0 duration-300 transition-all"
          >
            {!profile ? (
              <>
                <li
                  onClick={() => onAuthenModal("login")}
                  className="min-w-max font-om text-sm leading-[20px]  border-[#e3e3e3] border-solid border-b flex items-center gap-2 p-[10px]  duration-300 transition-colors hover:bg-black-ebe"
                >
                  <svg className="w-[18px]  " viewBox="0 0 24 24">
                    <path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"></path>
                  </svg>
                  <a className="text-[#222] ">Đăng nhập</a>
                </li>
                <li
                  onClick={() => onAuthenModal("register")}
                  className="min-w-max font-om text-sm leading-[20px]  border-[#e3e3e3] border-solid border-b flex items-center gap-2 p-[10px]  duration-300 transition-colors hover:bg-black-ebe"
                >
                  <svg className="w-[18px]  " viewBox="0 0 24 24">
                    <path d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"></path>
                  </svg>
                  <a className="text-[#222] p-0">Đăng ký</a>
                </li>
              </>
            ) : (
              <>
                <li className="min-w-max font-om text-sm leading-[20px]  border-[#e3e3e3] border-solid border-b flex items-center gap-2 p-[10px]  duration-300 transition-colors hover:bg-black-ebe">
                  <Link to={PATHS.HOME} className="text-[#222] p-0">
                    Trang chủ
                  </Link>
                </li>
                <li
                  onClick={onLogout}
                  className="min-w-max font-om text-sm leading-[20px]  border-[#e3e3e3] border-solid border-b flex items-center gap-2 p-[10px]  duration-300 transition-colors hover:bg-black-ebe"
                >
                  <Link to={PATHS.HOME} className="text-[#222] p-0">
                    Đăng xuất
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
