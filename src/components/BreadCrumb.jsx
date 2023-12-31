import { Link } from "react-router-dom";
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
const BreadCrumbItem = ({ children, isActive = false, link, className }) => {
  if (link) {
    return (
      <li
        className={`breadcrumb__list-item  ${isActive ? "active" : ""} ${
          className ?? ""
        }`}
      >
        <Link to={link}> {children}</Link>
      </li>
    );
  }
  return (
    <li
      className={`breadcrumb__list-item  ${isActive ? "active" : ""} ${
        className ?? ""
      }`}
    >
      <a> {children}</a>
    </li>
  );
};
BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb;
