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
} from "@ant-design/icons";
import { Collapse } from "antd";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "@/contants/path";
import useDashboard from "@/page/CMS/useDashboard";
import styled from "styled-components";
const SidebarDashboard = styled.aside`
  z-index: 1000;
  .ant-collapse {
    &-header {
      border-radius: 0 !important;
    }
    &-item {
      transition: 400ms;
      border-radius: 0 !important;
      .box-item {
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
  } = modalProps || {};

  return (
    <main>
      <div className="relative">
        <SidebarDashboard
          className={`fixed top-0 ${
            toggleSidebar ? "xs:w-[200px] md:w-[280px]" : "w-[120px]"
          } h-screen bg-white border-r border-solid border-black-ebe  duration-400 transition-all`}
        >
          <div>
            <div
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className={` flex items-center justify-center bg-[#033C73] xs:p-[10px] md:p-[20px] cursor-pointer group
              duration-400 transition-colors hover:bg-[#d1f3ff] `}
            >
              <svg
                className={`w-5 h-5 fill-white group-hover:fill-[#033C73] duration-400 transition-colors`}
                viewBox="0 0 24 24"
              >
                <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
              </svg>
            </div>
            <div>
              <Collapse ghost>
                <>
                  <h3
                    className={`text-[#033C73] font-osr font-semibold text-sm  ${
                      toggleSidebar
                        ? " h-[34px] p-[12px_12px_0_12px]"
                        : "h-0 p-0"
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
          className={` flex items-center justify-between shadow-header xs:h-[40px] md:h-[60px] bg-white z-20 fixed top-0 left-0
          duration-400 transition-all px-[20px]
         ${
           toggleSidebar
             ? "xs:ml-[200px] md:ml-[280px] xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)]"
             : "ml-[120px] w-[calc(100%-120px)]"
         } `}
        >
          <div className="relative ">
            <input
              className={` rounded-[50px] xs:p-[8px_30px_8px_0px] md:p-[11.5px_50px_11.5px_0px] 
              text-sm text-black-555 font-osr ${
                toggleInputSearch
                  ? "xs:w-[150px] md:w-[300px] bg-[#EDEEEF] pl-[20px]"
                  : "w-0 bg-transparent"
              } duration-400 transition-all`}
              type="text"
              placeholder="Type of Search..."
              name=""
              id=""
            />
            <div
              className={`absolute z-10 top-1/2 -translate-y-1/2 right-[-1px]  flex items-center justify-center
               xs:w-[30px] xs:h-[30px] md:w-[42px] md:h-[42px] rounded-[50%]  hover:opacity-70
               
                ${
                  !toggleInputSearch ? "bg-[#EBECED]" : "bg-[#DFE0E1]"
                }  cursor-pointer   transition-all duration-400`}
              onClick={() => setToggleInputSearch(true)}
            >
              <button>
                <SearchOutlined
                  style={{ color: "#033c73", fontSize: "20px" }}
                />
              </button>
            </div>
            <svg
              className={`w-[22px] h-[22px] absolute top-1/2 -translate-y-1/2 right-[-26px] cursor-pointer group
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
          <div className="flex justify-end items-center gap-2 w-fit  cursor-pointer mr-[20px]">
            <a className="block xs:w-[30px] md:w-[42px] xs:h-[30px] md:h-[42px]">
              <img src="/assets/img/avartar.png" alt="" />
            </a>
            <h2 className="xs:text-xs md:text-sm font-mam text-black-555">
              Jimmy
            </h2>
          </div>
        </div>
        <div
          className={`transition-all duration-400 flex-col flex gap-[10px]  ${
            toggleSidebar ? "xs:ml-[200px] ml-[280px]" : "ml-[120px]"
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
