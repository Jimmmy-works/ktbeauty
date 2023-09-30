import React, { useRef, useState } from "react";

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
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { PATHS } from "@/contants/path";
import Button from "@/components/Button";

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
    "1",
    <UserOutlined />
  ),
  getItem(
    <Link to={PATHS.CMS.PRODUCT}>
      <span>Product</span>
    </Link>,
    "2",
    <DesktopOutlined />
  ),

  getItem("Image", "3", <PieChartOutlined />),
  getItem("Team", "4", <TeamOutlined />),
  getItem("Files", "5", <FileOutlined />),
];
const CMSLayout = () => {
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
        <Menu className="font-mar" theme="dark" mode="inline" items={items} />
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
export default CMSLayout;
