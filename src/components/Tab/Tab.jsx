import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
const TabContext = createContext({});
const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onChangeActiveTab = (index) => {
    setActiveTab(index);
  };
  return (
    <TabContext.Provider value={{ activeTab, onChangeActiveTab }}>
      <div className="tab">{children}</div>
    </TabContext.Provider>
  );
};
const TabHeader = ({ children: childrenHeader }) => {
  const { activeTab, onChangeActiveTab } = useContext(TabContext);
  return (
    <ul className="tab__header ">
      {Children.map(childrenHeader, (headerItem, index) => {
        if (headerItem?.type?.name === "TabHeaderItem") {
          return cloneElement(headerItem, {
            isActive: activeTab === index,
            onClick: () => {
              onChangeActiveTab(index);
            },
          });
        }
      })}
    </ul>
  );
};
const TabHeaderItem = ({ children: childrenHeaderItem, onClick, isActive }) => {
  return (
    <li
      onClick={onClick}
      className={`tab__header-item  ${isActive ? "active" : ""}`}
    >
      <a className={`${isActive ? "active" : ""} `}> {childrenHeaderItem}</a>
    </li>
  );
};
const TabContent = ({ children: childrenContent }) => {
  const { activeTab } = useContext(TabContext);
  return (
    <div className="tab__content ">
      {Children?.map(childrenContent, (contentItem, index) => {
        if (contentItem?.type?.name === "TabContentItem") {
          return cloneElement?.(contentItem, {
            isActiveContent: activeTab === index,
          });
        }
      })}
    </div>
  );
};
const TabContentItem = ({ children: childrenContentItem, isActiveContent }) => {
  return (
    <div className={`tab__content-pane ${isActiveContent ? "active" : ""}`}>
      {childrenContentItem}
    </div>
  );
};
Tab.Header = TabHeader;
Tab.HeaderItem = TabHeaderItem;
Tab.Content = TabContent;
Tab.ContentItem = TabContentItem;
export default Tab;