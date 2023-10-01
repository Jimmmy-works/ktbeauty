import React, { useEffect, useRef, useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderCMS from "@/page/CMS/HeaderCMS";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { PATHS } from "@/contants/path";
import useDashboard from "@/page/CMS/useDashboard";

const { Header, Content, Footer, Sider } = Layout;
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
  const { findPath, pathname } = modalProps || {};
  const findItems = items?.find((item) => item?.key === findPath?.id);
  useEffect(() => {
    if (findPath) {
      localStorage.setItem("id", `${findItems?.key}`);
    } else {
      return;
    }
  }, [pathname, findPath]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          className="font-mar"
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={localStorage.getItem("id")}
        />
      </Sider>
      <Layout className="">
        <Header
          className="bg-transparent"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderCMS />
        </Header>
        <Content
          className="font-mar mt-[20px]"
          style={{
            margin: "0 16px",
          }}
        >
          <Outlet></Outlet>
        </Content>
        <Footer
          className="font-mar"
          style={{
            textAlign: "center",
          }}
        >
          KT Beauty ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
