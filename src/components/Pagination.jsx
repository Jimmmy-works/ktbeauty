import React, { useEffect, useMemo, useState } from "react";

const Pagination = () => {
  /// Demo
  let limit = 9;
  let total = 1000;
  const PAGE_STEP = 2;
  const [pageNumber, setPageNumber] = useState(1);
  const onChangePage = (numbPage) => {
    setPageNumber(numbPage);
  };
  const onNext = () => {
    setPageNumber(pageNumber + 1);
    if (pageNumber >= totalPage) return;
  };
  const onPrev = () => {
    setPageNumber(pageNumber - 1);
    if (pageNumber <= 0) return;
  };
  //////
  const totalPage = useMemo(() => {
    if (!limit || !total) return 1;
    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [total, limit]);

  const myPagination = useMemo(() => {
    let startPage = pageNumber - PAGE_STEP;
    let endPage = pageNumber + PAGE_STEP;
    ///////  6-8-10 0-2-4 => 1-2-4
    //// 1
    if (startPage <= 0) {
      startPage = 1;
      endPage = startPage + PAGE_STEP * 2;
      // if (endPage > totalPage) {
      //   endPage = totalPage;
      // }
    }

    if (endPage >= totalPage) {
      endPage = totalPage;
      startPage = endPage - PAGE_STEP * 2;
      // if (startPage < 1) {
      //   startPage = 1;
      // }
    }
    let list = [];
    for (let index = startPage; index < endPage + 1; index++) {
      list.push(index);
    }
    return list;
  }, [totalPage, pageNumber]);
  return (
    <div className="pagination ">
      <div
        className={`pagination__prev group/hover ${
          pageNumber - 1 <= 0 ? "disable" : ""
        }`}
        onClick={onPrev}
      >
        <div className="pagination__prev-wrapper group-hover/hover:bg-white ">
          <svg viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
              className="group-hover/hover:fill-primary"
            ></path>
          </svg>
        </div>
      </div>
      <ul className="pagination__list">
        <PaginationItem
          className={`hover:text-primary border-0`}
          isDisable={pageNumber < 3 ? true : false}
          onClick={() => onChangePage(1)}
        >
          First
        </PaginationItem>
        {myPagination?.map((item, index) => {
          return (
            <PaginationItem
              isHover={true}
              key={index}
              onClick={() => onChangePage(item)}
              isActive={pageNumber === item}
            >
              {item}
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`hover:text-primary border-0`}
          isDisable={pageNumber > totalPage - 2}
          onClick={() => onChangePage(totalPage)}
        >
          Last
        </PaginationItem>
      </ul>
      <div
        className={`pagination__next group/hover  ${
          pageNumber >= totalPage ? "disable" : ""
        }`}
        onClick={onNext}
      >
        <div className="pagination__next-wrapper group-hover/hover:bg-white ">
          <svg viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
              className="group-hover/hover:fill-primary"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
const PaginationItem = ({
  children,
  isActive = false,
  isHover = false,
  isDisable = false,
  onClick,
  pageNumber,
  className,
}) => {
  return (
    <li
      className={`${
        isHover ? "hover" : "hover:text-primary"
      } pagination__list-item  ${isActive ? " active" : ""}
    ${isDisable ? "disable" : ""} ${className ?? ""}
    `}
      onClick={onClick}
    >
      <a>{children}</a>
    </li>
  );
};
export default Pagination;
