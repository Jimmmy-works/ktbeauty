// import React, {
//   Children,
//   cloneElement,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import { twMerge } from "tailwind-merge";
// const TabContext = createContext({});
// const Tab = ({ children, className }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   const onChangeActiveTab = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <TabContext.Provider value={{ activeTab, onChangeActiveTab }}>
//       <div className={`tab ${className ?? ""}`}>{children}</div>
//     </TabContext.Provider>
//   );
// };
// const TabHeader = ({ children: childrenHeader, className }) => {
//   const { activeTab, onChangeActiveTab } = useContext(TabContext);

//   return (
//     <ul className={twMerge(`tab__header ${className ?? ""}`)}>
//       {childrenHeader?.length &&
//         React?.Children?.map(childrenHeader, (headerItem, index) => {
//           if (headerItem?.type?.name === "TabHeaderItem") {
//             return React.cloneElement(headerItem, {
//               isActive: activeTab === index,
//               onClick: () => {
//                 onChangeActiveTab(index);
//               },
//             });
//           }
//         })}
//     </ul>
//   );
// };
// const TabHeaderItem = ({
//   children: childrenHeaderItem,
//   onClick,
//   isActive,
//   className,
//   isLink,
// }) => {
//   if (isLink)
//     return (
//       <li
//         onClick={onClick}
//         className={`tab__header-item ${className ?? ""}  ${
//           isActive ? "active" : ""
//         }`}
//       >
//         <div className={``}>{childrenHeaderItem}</div>
//       </li>
//     );
//   return (
//     <li
//       onClick={onClick}
//       className={`tab__header-item ${className ?? ""}  ${
//         isActive ? "active" : ""
//       }`}
//     >
//       <div className={`${isActive ? "active" : ""} `}>{childrenHeaderItem}</div>
//     </li>
//   );
// };
// const TabContent = ({ children: childrenContent, className }) => {
//   const { activeTab, activeLinkTab } = useContext(TabContext);
//   return (
//     <div className={`tab__content ${className ?? ""}`}>
//       {childrenContent?.length &&
//         React?.Children?.map(childrenContent, (contentItem, index) => {
//           if (contentItem?.type?.name === "TabContentItem") {
//             return React.cloneElement?.(contentItem, {
//               isActiveContent: activeTab === index,
//             });
//           }
//         })}
//     </div>
//   );
// };
// const TabContentItem = ({
//   children: childrenContentItem,
//   isActiveContent,
//   className,
// }) => {
//   return (
//     <div
//       className={`tab__content-pane ${className ?? ""} ${
//         isActiveContent ? "active" : " "
//       } `}
//     >
//       {childrenContentItem}
//     </div>
//   );
// };
// Tab.Header = TabHeader;
// Tab.HeaderItem = TabHeaderItem;
// Tab.Content = TabContent;
// Tab.ContentItem = TabContentItem;
// export default Tab;
import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [loadingTab, setLoadingTab] = useState(false);
  const onChangeActiveTab = (index) => {
    setActiveTab(null);
    setLoadingTab(true);
    const timeout = setTimeout(() => {
      setActiveTab(index);
      setLoadingTab(false);
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  };
  return (
    <div className={`tab ${className ?? ""}`}>
      <ul className={`tab__header`}>
        {children?.length &&
          children?.map((child) => {
            const isActive = child?.props?.label === activeTab;
            return (
              <li
                onClick={() => onChangeActiveTab(child?.props?.label)}
                className={twMerge(
                  `tab__header-item ${className ?? ""}  ${
                    isActive ? "active" : ""
                  }`
                )}
              >
                <a className={`${isActive ? "active" : ""} `}>
                  {child.props.label}
                </a>
              </li>
            );
          })}
      </ul>
      <div className={twMerge(`tab__content min-h-[300px]`)}>
        <div className={`${!loadingTab ? "active" : ""} tab__content-pane`}>
          {children?.length &&
            children.map((child) => {
              const isActiveContent = child?.props?.label === activeTab;
              if (isActiveContent) {
                return (
                  <div
                    className={twMerge(` ${isActiveContent ? "active" : ""}`)}
                    key={child?.props?.label}
                  >
                    {child?.props?.children}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return <div label={label}>{children}</div>;
};
export { Tab, Tabs };
