import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
const TabContext = createContext({});
const Tab = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onChangeActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <TabContext.Provider value={{ activeTab, onChangeActiveTab }}>
      <div className={`tab ${className ?? ""}`}>{children}</div>
    </TabContext.Provider>
  );
};
const TabHeader = ({ children: childrenHeader, className }) => {
  const { activeTab, onChangeActiveTab } = useContext(TabContext);

  return (
    <ul className={twMerge(`tab__header ${className ?? ""}`)}>
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
const TabHeaderItem = ({
  children: childrenHeaderItem,
  onClick,
  isActive,
  className,
  isLink,
}) => {
  if (isLink)
    return (
      <li
        onClick={onClick}
        className={`tab__header-item ${className ?? ""}  ${
          isActive ? "active" : ""
        }`}
      >
        <div className={``}>{childrenHeaderItem}</div>
      </li>
    );
  return (
    <li
      onClick={onClick}
      className={`tab__header-item ${className ?? ""}  ${
        isActive ? "active" : ""
      }`}
    >
      <a className={`${isActive ? "active" : ""} `}> {childrenHeaderItem}</a>
    </li>
  );
};
const TabContent = ({ children: childrenContent, className }) => {
  const { activeTab, activeLinkTab } = useContext(TabContext);
  return (
    <div className={`tab__content ${className ?? ""}`}>
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
const TabContentItem = ({
  children: childrenContentItem,
  isActiveContent,
  isActiveLinkContent,
  className,
}) => {
  return (
    <div
      className={`tab__content-pane ${className ?? ""} ${
        isActiveContent ? "active" : " "
      } `}
    >
      {childrenContentItem}
    </div>
  );
};
Tab.Header = TabHeader;
Tab.HeaderItem = TabHeaderItem;
Tab.Content = TabContent;
Tab.ContentItem = TabContentItem;
export default Tab;
