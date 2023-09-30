import React from "react";
import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Tab 1",
    children: <div>fdfds</div>,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];
const CMS = () => (
  <main className="main-wrapper">
    <div className="container">
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabPosition="left"
        onChange={onChange}
        // style={{
        //   height: 220,
        // }}
        indicatorSize={(origin) => origin}
      />
    </div>
  </main>
);
export default CMS;
