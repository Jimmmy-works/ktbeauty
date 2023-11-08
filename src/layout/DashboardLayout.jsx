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
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "@/contants/path";
import useDashboard from "@/page/CMS/useDashboard";
import styled from "styled-components";
import { MainProvider, useMainContext } from "@/components/MainContext";
import DashboardHeader from "@/page/CMS/Header";
import AuthenModal from "@/components/Authen";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { getProfileSlug } from "@/store/reducer/authReducer";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { getAllUsers } from "@/store/reducer/dashboardReducer";
import {
  getAllCategories,
  getAllProduct,
} from "@/store/reducer/productReducer";
const SidebarDashboard = styled.aside`
  z-index: 20;
  .ant-collapse {
    .anticon-right,
    .ant-collapse-expand-icon {
      display: none !important;
      margin-right: none !important;
    }
    border-radius: 0 !important;
    border-right: none !important;
    &-header {
      border-radius: 0 !important;
      &-text {
        p {
          transition: 400ms;
        }
      }
    }
    &-item {
      transition: 400ms;
      border-radius: 0 !important;
      transition: 0.4s;
      cursor: pointer;
      .box-item {
        font-size: 14px;
        gap: 8px;
        padding-left: 10px;
        cursor: pointer;
        color: #555;
        transition: 0.4s;
        display: flex;
        align-items: center;
        justify-content: ${({ pdCollapse, windowScrollX }) => {
          if (windowScrollX >= 1024) {
            if (pdCollapse) {
              return `start  !important`;
            } else {
              return `center !important`;
            }
          }
        }};
        padding: ${({ pdCollapse }) =>
          pdCollapse ? `8px 20px !important ` : ` 8px 16px !important `};
        &:hover {
          background-color: #d7d7d7;
        }
        &.active {
          background-color: #d1f3ff;
        }
      }
      .box-header {
        justify-content: ${({ pdCollapse, windowScrollX }) => {
          if (windowScrollX >= 1024) {
            if (pdCollapse) {
              return `space-between  !important`;
            } else {
              return `center !important`;
            }
          }
        }};
      }
      &-active {
        .ant-collapse-header-text {
          p {
            color: #033c73 !important;
          }
          .anticon {
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
const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { modalProps } = useDashboard();
  const { toggleSidebar, setToggleSidebar, width } = modalProps || {};
  const handleToggleOverplay = () => {
    setToggleSidebar(false);
  };
  useEffect(() => {
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    const resultDecode = decodeToken?.(_token || "");
    const _id = resultDecode?.id;
    if (_token) {
      dispatch(getAllUsers(_id));
      dispatch(getAllProduct(_id));
      // dispatch(getCart(_token));
    }
  }, []);
  const items = [
    {
      key: "1",
      label: (
        <div
          className={`box-header duration-400 transition-all flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <DashboardOutlined
              style={{
                fontSize: "14px",
              }}
            />
            {width >= 1024 ? (
              <>
                {toggleSidebar && (
                  <p className="text-sm font-osr  text-black-555">Dashboard</p>
                )}
              </>
            ) : (
              <p className="text-sm font-osr  text-black-555">Dashboard</p>
            )}
          </div>
          {width >= 1024 ? (
            <>
              {toggleSidebar && (
                <svg
                  className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              )}
            </>
          ) : (
            <svg
              className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
              viewBox="0 0 1024 1024"
            >
              <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
            </svg>
          )}
        </div>
      ),
      children: (
        <>
          <NavLink className="box-item " to={PATHS.CMS.USER}>
            <UserAddOutlined
              style={{
                fontSize: "14px",
              }}
            />
            {width >= 1024 ? (
              <>
                {toggleSidebar && (
                  <p className="text-sm font-osr  text-black-555">User</p>
                )}
              </>
            ) : (
              <p className="text-sm font-osr  text-black-555">User</p>
            )}
          </NavLink>
          <NavLink className="box-item " to={PATHS.CMS.PRODUCT}>
            <ShopOutlined
              style={{
                fontSize: "14px",
              }}
            />
            {width >= 1024 ? (
              <>
                {toggleSidebar && (
                  <p className="text-sm font-osr  text-black-555">Product</p>
                )}
              </>
            ) : (
              <p className="text-sm font-osr  text-black-555">Product</p>
            )}
          </NavLink>
          <NavLink className="box-item " to={PATHS.CMS.SHIPPING}>
            <ShoppingCartOutlined
              style={{
                fontSize: "14px",
              }}
            />
            {width >= 1024 ? (
              <>
                {toggleSidebar && (
                  <p className="text-sm font-osr  text-black-555">Order</p>
                )}
              </>
            ) : (
              <p className="text-sm font-osr  text-black-555">Order</p>
            )}
          </NavLink>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className={`box-header duration-400 transition-all flex items-center justify-between`}
        >
          <div className="flex items-center gap-2">
            <FileOutlined
              style={{
                fontSize: "14px",
              }}
            />
            {width >= 1024 ? (
              <>
                {toggleSidebar && (
                  <p className="text-sm font-osr  text-black-555">File</p>
                )}
              </>
            ) : (
              <p className="text-sm font-osr  text-black-555">File</p>
            )}
          </div>
          {width >= 1024 ? (
            <>
              {toggleSidebar && (
                <svg
                  className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                </svg>
              )}
            </>
          ) : (
            <svg
              className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
              viewBox="0 0 1024 1024"
            >
              <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
            </svg>
          )}
        </div>
      ),
      children: (
        <NavLink className="box-item" to={PATHS.CMS.IMAGE}>
          <FileImageOutlined
            style={{
              fontSize: "14px",
            }}
          />
          {width >= 1024 ? (
            <>
              {toggleSidebar && (
                <p className="text-sm font-osr  text-black-555">Image</p>
              )}
            </>
          ) : (
            <p className="text-sm font-osr  text-black-555">Image</p>
          )}
        </NavLink>
      ),
    },
  ];
  return (
    <MainProvider>
      <AuthenModal />
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
          windowScrollX={width}
          pdCollapse={toggleSidebar}
          className={`fixed xs:top-[60px] lg:top-0 left-0 overflow-hidden xs:w-[200px]
          ${
            toggleSidebar
              ? " lg:w-[280px] translate-x-0"
              : " lg:w-[60px]  xs:translate-x-[-100%] lg:translate-x-0"
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
              <Collapse size="middle" items={items}>
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
                  {/* <Collapse.Panel
                    showArrow={false}
                    key={1}
                    header={
                      <div
                        className={`box-header duration-400 transition-all flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2">
                          <DashboardOutlined
                            style={{
                              fontSize: "14px",
                            }}
                          />
                          {width >= 1024 ? (
                            <>
                              {toggleSidebar && (
                                <p className="text-sm font-osr  text-black-555">
                                  Dashboard
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm font-osr  text-black-555">
                              Dashboard
                            </p>
                          )}
                        </div>
                        {width >= 1024 ? (
                          <>
                            {toggleSidebar && (
                              <svg
                                className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                                viewBox="0 0 1024 1024"
                              >
                                <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                              </svg>
                            )}
                          </>
                        ) : (
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
                    <NavLink className="box-item " to={PATHS.CMS.USER}>
                      <UserAddOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      {width >= 1024 ? (
                        <>
                          {toggleSidebar && (
                            <p className="text-sm font-osr  text-black-555">
                              User
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-osr  text-black-555">User</p>
                      )}
                    </NavLink>
                    <NavLink className="box-item " to={PATHS.CMS.PRODUCT}>
                      <ShopOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      {width >= 1024 ? (
                        <>
                          {toggleSidebar && (
                            <p className="text-sm font-osr  text-black-555">
                              Product
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-osr  text-black-555">
                          Product
                        </p>
                      )}
                    </NavLink>
                  </Collapse.Panel>
                  <Collapse.Panel
                    showArrow={false}
                    key={2}
                    header={
                      <div
                        className={`box-header duration-400 transition-all flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-2">
                          <FileOutlined
                            style={{
                              fontSize: "14px",
                            }}
                          />
                          {width >= 1024 ? (
                            <>
                              {toggleSidebar && (
                                <p className="text-sm font-osr  text-black-555">
                                  File
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm font-osr  text-black-555">
                              File
                            </p>
                          )}
                        </div>
                        {width >= 1024 ? (
                          <>
                            {toggleSidebar && (
                              <svg
                                className="w-3 h-3 fill-black-333 duration-400 transition-colors rotate-[-90deg]"
                                viewBox="0 0 1024 1024"
                              >
                                <path d="M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z"></path>
                              </svg>
                            )}
                          </>
                        ) : (
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
                    <NavLink className="box-item" to={PATHS.CMS.IMAGE}>
                      <FileImageOutlined
                        style={{
                          fontSize: "14px",
                        }}
                      />
                      {width >= 1024 ? (
                        <>
                          {toggleSidebar && (
                            <p className="text-sm font-osr  text-black-555">
                              Image
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-osr  text-black-555">
                          Image
                        </p>
                      )}
                    </NavLink>
                  </Collapse.Panel> */}
                </>
              </Collapse>
              <div className="flex items-center gap-3"></div>
            </div>
          </div>
        </SidebarDashboard>
        <DashboardHeader {...modalProps} />
        <div
          className={`transition-all duration-400 flex-col flex gap-[10px]  ${
            toggleSidebar ? "xs:ml-0 lg:ml-[280px]" : " xs:ml-0 lg:ml-[60px]"
          }   `}
        >
          <div className="mt-[60px]">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </MainProvider>
  );
};
export default DashboardLayout;
