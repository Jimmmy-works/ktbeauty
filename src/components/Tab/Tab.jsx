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
//       {React?.Children?.map(childrenHeader, (headerItem, index) => {
//         if (headerItem?.type?.name === "TabHeaderItem") {
//           return React.cloneElement(headerItem, {
//             isActive: activeTab === index,
//             onClick: () => {
//               onChangeActiveTab(index);
//             },
//           });
//         }
//       })}
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
//       {React?.Children?.map(childrenContent, (contentItem, index) => {
//         if (contentItem?.type?.name === "TabContentItem") {
//           return React.cloneElement?.(contentItem, {
//             isActiveContent: activeTab === index,
//           });
//         }
//       })}
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
// import ProductDetailReview from "@/pages/ProductDetail/ProductDetailReview";
import React, { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

const TabContext = createContext({});
const Tab = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onChangeActiveTab = (index) => {
    setActiveTab(index);
  };
  return (
    <TabContext.Provider value={{ activeTab, onChangeActiveTab }}>
      <div className={twMerge(`${className ?? ""} tab`)}>{children}</div>
    </TabContext.Provider>
  );
};
const TabHeader = ({ children, className }) => {
  const { activeTab, onChangeActiveTab } = useContext(TabContext);
  return (
    <ul className={`tab__header ${className ?? ""}`} role="tablist">
      {React.Children.map(children, (item, index) => {
        if (item?.type?.name === "TabHeaderItem") {
          return React.cloneElement(item, {
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
const TabHeaderItem = ({ children, className, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={twMerge(
        `tab__header-item ${className ?? ""}  ${isActive ? "active" : ""}`
      )}
    >
      <a>{children}</a>
    </li>
  );
};
const TabContent = ({ children, className }) => {
  const { activeTab } = useContext(TabContext);
  return (
    <div className={`tab__content ${className ?? ""}`}>
      {React.Children.map(children, (item, index) => {
        if (item?.type?.name === "TabContentItem") {
          return React.cloneElement(item, {
            isActive: activeTab === index,
          });
        }
      })}
    </div>
  );
};
const TabContentItem = ({ children, className, isActive }) => {
  return (
    <div
      className={twMerge(
        `tab__content-pane ${className ?? ""} ${isActive ? "active" : ""}`
      )}
    >
      {children}
    </div>
  );
};
Tab.Header = TabHeader;
Tab.HeaderItem = TabHeaderItem;
Tab.Content = TabContent;
Tab.ContentItem = TabContentItem;
export default Tab;
