import React, { useEffect, useRef, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  UserAddOutlined,
  ShopOutlined,
  FileImageOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "@/contants/path";
import useDashboard from "@/page/CMS/useDashboard";
import styled from "styled-components";
import HamburgerDashboard from "@/page/CMS/HamburgerDashboard";
import Overplay from "@/components/Overplay";
const SidebarDashboard = styled.aside`
  z-index: 20;
  .ant-collapse {
    border-radius: 0 !important;
    border-right: none !important;
    &-header {
      border-radius: 0 !important;
    }
    &-item {
      transition: 400ms;
      border-radius: 0 !important;
      .box-item {
        &:hover {
          background-color: #d7d7d7;
        }
        transition: 0.4s;
        cursor: pointer;
        padding: 8px 20px !important;
        &.active {
          background-color: #d1f3ff;
        }
      }
      .box-header {
      }
      &-active,
      &:hover {
        .ant-collapse-header-text {
          transition: 400ms;
          p {
            font-weight: 600;
            color: #033c73 !important;
          }
        }
      }
    }

    &-content {
      &-box {
        padding: 0 !important;
      }
    }
  }
`;
function getItem(label, key, icon, children, labelChildren) {
  return {
    key,
    icon,
    children,
    label,
    labelChildren,
  };
}
const items = [
  getItem(
    <Link to={PATHS.CMS.INDEX}>
      <span>User</span>
    </Link>,
    `1`,
    <UserOutlined />
  ),
  getItem(
    <Link to={PATHS.CMS.PRODUCT}>
      <span>Product</span>
    </Link>,
    `2`,
    <DesktopOutlined />
  ),

  getItem(
    <Link to={PATHS.CMS.IMAGE}>
      <span>IMAGE</span>
    </Link>,
    "3",
    <PieChartOutlined />
  ),
  getItem(
    <Link to={PATHS.CMS.TEAM}>
      <span>TEAM</span>
    </Link>,
    "4",
    <TeamOutlined />
  ),
  getItem(
    <Link to={PATHS.CMS.FILE}>
      <span>FILE</span>
    </Link>,
    "5",
    <FileOutlined />
  ),
];
const DashboardLayout = () => {
  const { modalProps } = useDashboard();
  const {
    findPath,
    pathname,
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    toggleSidebar,
    setToggleSidebar,
    toggleInputSearch,
    setToggleInputSearch,
    toggleInputSeacrhMobile,
    setToggleInputSeacrhMobile,
  } = modalProps || {};
  console.log("toggleSidebar", toggleSidebar);
  const handleToggleOverplay = () => {
    setToggleSidebar(false);
  };
  return (
    <main>
      <div
        className={`overplay h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.3)] 
          transition-all duration-300 z-20 lg:invisible lg:opacity-0 ${
            toggleSidebar
              ? "xs:visible xs:opacity-100"
              : "xs:invisible xs:opacity-0"
          }`}
        onClick={handleToggleOverplay}
      />
      <div className="relative">
        <SidebarDashboard
          className={`fixed xs:top-[60px] lg:top-0 left-0 overflow-hidden xs:w-[200px]
          ${
            toggleSidebar
              ? " lg:w-[280px]  translate-x-0"
              : " lg:w-[120px]  xs:translate-x-[-100%] lg:translate-x-0"
          } h-screen bg-white border-r border-solid border-black-ebe  duration-400 transition-all`}
        >
          <div>
            <div
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className={`xs:hidden lg:flex  items-center justify-center bg-[#033C73] xs:p-[10px] md:p-[20px] cursor-pointer group
              duration-400 transition-colors hover:bg-[#d1f3ff] `}
            >
              <svg
                className={`w-5 h-5 fill-white group-hover:fill-[#033C73] duration-400 transition-all ${
                  toggleSidebar ? "rotate-y-180" : "rotate-y-0"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
              </svg>
            </div>
            <div>
              <Collapse size="middle">
                <>
                  <h3
                    className={`text-[#033C73] font-osr font-semibold text-sm  ${
                      toggleSidebar
                        ? "h-[34px] p-[12px_12px_0_12px]"
                        : "xs:h-[34px] xs:p-[12px_12px_0_12px] lg:h-0 lg:p-0"
                    }  transition-all duration-400 overflow-hidden`}
                  >
                    MAIN NAVIGATION
                  </h3>
                  <Collapse.Panel
                    showArrow={false}
                    key={1}
                    header={
                      <div
                        className={`box-header duration-400 transition-all flex items-center ${
                          toggleSidebar ? "justify-between" : "justify-start"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <DashboardOutlined
                            style={{
                              fontSize: "14px",
                            }}
                          />
                          <p className="text-sm font-osr  text-black-555">
                            Dashboard
                          </p>
                        </div>
                        {toggleSidebar && (
                          <svg
                            className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                            viewBox="0 0 1024 1024"
                          >
                            <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                          </svg>
                        )}
                      </div>
                    }
                  >
                    <NavLink
                      className="box-item text-sm font-osr text-black-555  flex items-center gap-2 pl-[10px]  cursor-pointer"
                      to={PATHS.CMS.USER}
                    >
                      <UserAddOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      User
                    </NavLink>
                    <NavLink
                      className="box-item text-sm font-osr text-black-555  flex items-center gap-2 pl-[10px]  cursor-pointer"
                      to={PATHS.CMS.PRODUCT}
                    >
                      <ShopOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      Product
                    </NavLink>
                  </Collapse.Panel>
                  <Collapse.Panel
                    showArrow={false}
                    key={3}
                    header={
                      <div
                        className={`box-header duration-400 transition-all flex items-center ${
                          toggleSidebar ? "justify-between" : "justify-start"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileOutlined
                            style={{
                              fontSize: "14px",
                            }}
                          />
                          <p className="text-sm font-osr  text-black-555">
                            File
                          </p>
                        </div>
                        {toggleSidebar && (
                          <svg
                            className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                            viewBox="0 0 1024 1024"
                          >
                            <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                          </svg>
                        )}
                      </div>
                    }
                  >
                    <NavLink
                      className="box-item text-sm font-osr text-black-555  flex items-center gap-2 pl-[10px]  cursor-pointer"
                      to={PATHS.CMS.IMAGE}
                    >
                      <FileImageOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      Image
                    </NavLink>
                  </Collapse.Panel>
                </>
              </Collapse>
              <div className="flex items-center gap-3"></div>
            </div>
          </div>
        </SidebarDashboard>
        <div
          className={` flex items-center justify-between shadow-header h-[60px] bg-white fixed top-0 left-0
          duration-400 transition-all px-[20px] z-[30] xs:w-full xs:ml-[0px] 
         ${
           toggleSidebar
             ? " lg:ml-[280px] lg:w-[calc(100%-280px)]"
             : " lg:ml-[120px]  lg:w-[calc(100%-120px)]"
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
            className={`flex items-center justify-between lg:static xs:absolute transition-all duration-400
            xs:left-1/2 lg:left-0  xs:-translate-x-1/2 lg:translate-x-0
            xs:bg-white xs:p-[10px] lg:p-0 xs:w-[90%] lg:w-full xs:rounded-[50px] lg:rounded-none xs:shadow-dashboard lg:shadow-none
            ${
              toggleInputSeacrhMobile
                ? "xs:top-[70px] lg:top-0"
                : "xs:top-[-150%] lg:top-0"
            }`}
          >
            <div className="relative w-fit">
              <input
                className={` rounded-[50px] text-sm text-black-555 font-osr duration-400 transition-all
                
                 ${
                   toggleInputSearch
                     ? "xs:w-[200px] md:w-[300px]  bg-[#EDEEEF] pl-[20px] p-[11.5px_50px_11.5px_12px] visible opacity-100"
                     : "w-0 bg-transparent invisible opacity-0"
                 } `}
                type="text"
                placeholder="Type of Search..."
                name=""
                id=""
              />
              <div
                className={`absolute z-10 top-1/2 -translate-y-1/2   flex items-center justify-center
                 w-[42px] h-[42px] rounded-[50%]  hover:opacity-70 
                
                  ${
                    !toggleInputSearch
                      ? "bg-[#EBECED] left-0"
                      : "bg-[#DFE0E1] left-[calc(100%-42px)]"
                  }  cursor-pointer   transition-all duration-400 `}
                onClick={() => setToggleInputSearch(true)}
              >
                <button>
                  <SearchOutlined
                    style={{ color: "#033c73", fontSize: "20px" }}
                  />
                </button>
              </div>
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
            <div className="flex justify-end items-center gap-1 w-fit  cursor-pointer mr-[20px]">
              <a className="block w-[42px] h-[42px]">
                <img src="/assets/img/avartar.png" alt="" />
              </a>
              <div className="">
                <svg
                  className="w-[10px] h-[10px] fill-black-555 duration-400 transition-colors "
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-400 flex-col flex gap-[10px]  ${
            toggleSidebar ? "xs:ml-0 lg:ml-[280px]" : " xs:ml-0 lg:ml-[120px]"
          }   `}
        >
          <div className="mt-[60px]">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
