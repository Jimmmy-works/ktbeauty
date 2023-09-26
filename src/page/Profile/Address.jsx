import Accordion from "@/components/Accordion";
import React, { useRef, useState } from "react";

const Address = () => {
  const [isActive, setIsActive] = useState(null);
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
  ];
  const OPTIONS = [
    {
      title: `order id: 03a23d39d99o12p`,
      id: "1",
      subCate: [
        {
          id: "order-3",
          title: "Order Confirmation",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirm at: 9:30 22/9/2023",
            },
          ],
        },
        {
          id: "carrier",
          title: "Confirmed carrier",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirmed carrier at: 13:24 24/9/2023",
            },
          ],
        },
        {
          id: "start",
          title: "Start Delivery",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Delivery begins at: 9:30 25/9/2023",
            },
          ],
        },
        {
          id: "completed",
          title: "Completed",
          subCateChild: [
            {
              id: "order-child-1",
              title: "On time: 11:30 27/9/2023",
            },
          ],
        },
      ],
    },
    {
      title: `order id: 099ao1p2391p1dd`,
      id: "1",
      subCate: [
        {
          id: "order-3",
          title: "Order Confirmation",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirm at: 9:30 22/9/2023",
            },
          ],
        },
        {
          id: "carrier",
          title: "Confirmed carrier",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Confirmed carrier at: 13:24 24/9/2023",
            },
          ],
        },
        {
          id: "start",
          title: "Start Delivery",
          subCateChild: [
            {
              id: "order-child-1",
              title: "Delivery begins at: 9:30 25/9/2023",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="address">
      <h3 class="text-[24px] font-mab text-black-333 xs:my-[16px]">
        Your Whitelist
      </h3>
      <div
        className="flex items-center justify-between p-[0_0_8px_0] cursor-pointer group/hover"
        //   onClick={() => {
        //     setIsActive((prev) => (prev === index ? null : index));
        //   }}
      >
        {/* <div
          className={`p-[10px] rounded-[50%] cursor-pointer group/hover
                      group-hover/hover:bg-primary duration-400 transition-colors
                       ${isActive ? "bg-primary" : "bg-gray-300 "}`}
        >
          <svg
            className={`h-[12px] w-[12px] duration-400 transition-transform
                       ${isActive ? "rotate-[-180deg]" : "rotate-0"}`}
            viewBox="0 0 24 24"
          >
            <path
              className={` group-hover/hover:fill-white duration-400 transition-colors
                        ${isActive ? "fill-white" : "fill-black-333"}`}
              d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
            ></path>
          </svg>
        </div> */}
      </div>
      {/* <div className="flex items-center">
        <div className="w-1/2 p-[10px] bg-black-be">fdsfasd</div>
        <div className="w-1/2 p-[10px] bg-white">fdsfasd</div>
      </div> */}
      <div className="w-full  flex flex-col">
        {OPTIONS?.map((item, index) => {
          return (
            <Accordion key={`${item}${index}`} item={item} index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Address;
