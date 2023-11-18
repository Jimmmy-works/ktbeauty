import React, { forwardRef, useRef, useState } from "react";

const Accordion = ({
  heading,
  data,
  renderProps,
  onChangeFilter,
  children,
  ...props
}) => {
  const [activeSubcase, setActiveSubcase] = useState(null);
  const [toggleContent, setToggleContent] = useState(false);
  const handleActiveContentSubcase = (index) => {
    setActiveSubcase((prevIndex) => (prevIndex === index ? null : index));
  };
  const refContent = useRef(null);
  const refContentSubcase = useRef(null);
  return (
    <div className={`accordion `}>
      <div
        className={`accordion__heading ${toggleContent ? "active" : ""}`}
        onClick={() => setToggleContent(!toggleContent)}
      >
        <h3>{heading}</h3>
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
        className="accordion__content overflow-hidden"
        ref={refContent}
        style={{
          maxHeight: `${
            toggleContent ? `${refContent?.current?.scrollHeight}px` : "0px"
          }`,
        }}
      >
        {data?.length &&
          data?.map((item, index) => {
            const { _id, name } = item || {};
            return (
              <div
                onClick={() => {
                  if (name !== "all") {
                    onChangeFilter([name]);
                  } else {
                    onChangeFilter([]);
                  }
                }}
                className={`accordion__content-wrapper `}
                // className={`accordion__content-wrapper
                // ${item?._id === activeSubcase ? "active" : ""}`}
                key={_id}
              >
                <div
                  className={`heading`}
                  onClick={() => handleActiveContentSubcase(item?._id)}
                >
                  {item?.subCase && (
                    <div className={`dropdown`}>
                      <svg className="w-[10px] h-[10px] " viewBox="0 0 24 24">
                        <path
                          fill="white"
                          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                        />
                      </svg>
                    </div>
                  )}
                  <h3>{name}</h3>
                </div>
                {item?.subCase?.length &&
                  item?.subCase?.map((subcase) => {
                    return (
                      <div
                        key={subcase?.id}
                        className="accordion__content-list"
                      >
                        <div className="item">
                          <ul
                            ref={refContentSubcase}
                            style={{
                              maxHeight: `${
                                activeChildrenIndex === itemSub?.id ||
                                itemSub?._id
                                  ? `${refContentSubcase?.current?.scrollHeight}px`
                                  : "0px"
                              }`,
                            }}
                            className={`item__list duration-300 transition-all pl-[28px] `}
                          >
                            <li className="item item__list-child  p-0">
                              <a className="leading-[22px] block" href="">
                                {subcase?.name}
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
      </div>
      {renderProps && (
        <div
          className="accordion__content overflow-hidden"
          ref={refContent}
          style={{
            maxHeight: `${
              toggleContent ? `${refContent?.current?.scrollHeight}px` : "0px"
            }`,
          }}
        >
          {renderProps?.({ ...props })}
        </div>
      )}
      {children}
    </div>
  );
};
// const Accordion = forwardRef(AccordionM);
export default Accordion;
