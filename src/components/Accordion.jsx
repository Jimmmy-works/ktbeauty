import React, { useEffect, useRef, useState } from "react";
const Accordion = ({ item, renderProps, className }) => {
  const [activeIndex, setActiveIndex] = useState("product-1");
  const [activeChildrenIndex, setActiveChildrenIndex] = useState("");
  const refAccordion = useRef(null);
  const handleAccordion = (id) => {
    if (activeIndex === id) {
      return setActiveIndex(null);
    }
    setActiveIndex(id);
  };
  const handleChildrenAccordion = (id) => {
    if (activeChildrenIndex === id) {
      return setActiveChildrenIndex(null);
    }
    setActiveChildrenIndex(id);
  };
  return (
    <div
      key={`${item?.id}`}
      className={`accordion ${activeIndex === item?.id ? "active" : ""} ${
        className ?? ""
      }`}
    >
      <div
        className="accordion__heading"
        onClick={() => handleAccordion(item?.id)}
      >
        <a>{item.title}</a>
        {(item?.subCate || item?.type === "range") && (
          <div className="accordion__heading-dropdown">
            <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24">
              <path
                fill="#333"
                d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
              />
            </svg>
          </div>
        )}
      </div>
      {item?.subCate?.length &&
        item?.subCate?.map((itemSub) => {
          return (
            <div
              key={itemSub?.id}
              ref={refAccordion}
              className={` accordion__content 
              ${activeChildrenIndex === itemSub?.id ? "active" : ""} 
            ${
              activeIndex === item?.id
                ? `max-h-[132px] overflow-y-visible opacity-100 `
                : "max-h-0 overflow-y-hidden opacity-0 "
            }`}
            >
              <div className={`accordion__content-heading `}>
                <div
                  className={`dropdown ${
                    itemSub?.subCateChild ? "" : "hidden"
                  }`}
                  onClick={() => handleChildrenAccordion(itemSub?.id)}
                >
                  <svg className="w-[10px] h-[10px] " viewBox="0 0 24 24">
                    <path
                      fill="white"
                      d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                    />
                  </svg>
                </div>

                <a href="" className="leading-[28px] block">
                  {itemSub?.title}{" "}
                  {itemSub?.quantity && `(${itemSub?.quantity})`}
                </a>
              </div>
              {itemSub?.subCateChild?.length &&
                itemSub?.subCateChild?.map((itemSubChild) => {
                  return (
                    <div
                      key={itemSubChild?.id}
                      className="accordion__content-list"
                    >
                      <div className="item">
                        <ul
                          className={`item__list duration-300 transition-all pl-[28px]   ${
                            activeChildrenIndex === itemSub?.id
                              ? `h-[48px] overflow-y-visible opacity-100`
                              : "h-0 overflow-y-hidden opacity-0"
                          }`}
                        >
                          <li className="item item__list-child  p-0">
                            <a className="leading-[22px] block" href="">
                              {itemSubChild?.title}{" "}
                              {itemSubChild?.quantity &&
                                `(${itemSubChild?.quantity})`}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      {item?.type === "range" && (
        <div
          className={` accordion__content
            ${
              activeIndex === item?.id
                ? `max-h-[132px] overflow-y-visible opacity-100`
                : "max-h-0 overflow-y-hidden opacity-0"
            }`}
        >
          {renderProps && renderProps?.()}
        </div>
      )}
    </div>
  );
};

export default Accordion;
