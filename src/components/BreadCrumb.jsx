import React from "react";

const BreadCrumb = ({ children, className }) => {
  return (
    <div
      className={`breadcrumb 
      ${className ?? ""}`}
    >
      <div className="container">
        <ol className="breadcrumb__list ">{children}</ol>
      </div>
    </div>
  );
};
const BreadCrumbItem = ({ children, isActive = false, label }) => {
  return (
    <li className={`breadcrumb__list-item  ${isActive ? "active" : ""}`}>
      {children}
    </li>
  );
};
BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb;
