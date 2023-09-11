import React, { useEffect, useRef, useState } from "react";

const Accordion = ({ item, itemChildren, index }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChildrenIndex, setActiveChildrenIndex] = useState(0);
  const refAccordion = useRef(null);
  const heightAccodion = refAccordion?.current?.clientHeight;
  const handleAccordion = (index) => {
    setActiveIndex((prev) => {
      return prev === index ? null : index;
    });
  };
  const handleChildrenAccordion = (index) => {
    setActiveChildrenIndex((prev) => {
      return prev === index ? null : index;
    });
  };
  return (
    <div
      key={`${item}${index}`}
      className="accordion overflow-hidden  duration-400 transition-all"
    >
      <div
        className="accordion__heading"
        onClick={() => handleAccordion(index)}
      >
        <a>{item}</a>
        <div className="accordion__heading-dropdown">
          <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24">
            <path
              fill="#333"
              d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
            />
          </svg>
        </div>
      </div>
      <div
        ref={refAccordion}
        className={` accordion__content
        ${activeIndex === index ? ` max-h-[200px] mt-[10px]` : " max-h-0 "}`}
      >
        <div
          className={`accordion__content-heading ${
            activeIndex === index ? "active" : ""
          }`}
        >
          <div
            className="dropdown"
            onClick={() => handleChildrenAccordion(index)}
          >
            <svg className="w-[10px] h-[10px] " viewBox="0 0 24 24">
              <path
                fill="white"
                d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
              />
            </svg>
          </div>
          <a href="" className="">
            Categories (3)
          </a>
        </div>
        <div className="accordion__content-list">
          <div className="item item__child">
            <ul
              className={`item__child-list duration-400 transition-all pl-[28px]  ${
                activeChildrenIndex === index ? ` max-h-[200px] ` : " max-h-0 "
              }`}
            >
              {itemChildren?.length &&
                itemChildren?.map((item, index) => {
                  return (
                    <li key={`${item}${index}`} className="item item__child">
                      <a href="">{item}</a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
