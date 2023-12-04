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
const BreadCrumbItem = ({ children, isActive = false, label, className }) => {
  return (
    <div className="breadcrumb__list-wrapper">
      <li
        className={`breadcrumb__list-item  ${isActive ? "active" : ""} ${
          className ?? ""
        }`}
      >
        {children}
      </li>
      <span className="line"></span>
    </div>
  );
};
BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb;
