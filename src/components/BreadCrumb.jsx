import { Link } from "react-router-dom";

// const BreadCrumb = ({ children, className }) => {
//   return (
//     <div className=" breadcrumb">
//       <div className="container">
//         <ul className="">{children}</ul>
//       </div>
//     </div>
//   );
// };
// const BreadCrumbItem = ({ children, isActive = false, link, className }) => {
//   if (link) {
//     return (
//       <li>
//         <Link
//           to={link}
//           className={` ${isActive ? "is-active" : ""} ${className ?? ""}`}
//         >
//           {children}
//         </Link>
//       </li>
//     );
//   }
//   return (
//     <li aria-hidden="true">
//       <a className={` ${isActive ? "is-active" : ""} ${className ?? ""}`}>
//         {children}
//       </a>
//     </li>
//   );
// };
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
