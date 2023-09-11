import Accordion from "@/components/Accordion";
import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/contants/path";
import React from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const SIDEBAR_OPTIONS = ["product cartegories", "filter price"];
  const PRODUCT_OPTIONS = [
    "Base categories (3)",
    "Mascara (2)",
    "Lipstick (1)",
    "Peel (3)",
  ];
  return (
    <main className="main-wrapper">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          <Link to={PATHS.SHOP.INDEX}>Shop</Link>
        </BreadCrumb.Item>
      </BreadCrumb>
      <div className="container flex">
        <aside className="sidebar-shop w-1/4">
          <div className=" flex flex-col pr-[15px]">
            {SIDEBAR_OPTIONS?.map((item, index) => {
              return (
                <Accordion
                  key={`${item}${index}`}
                  item={item}
                  index={index}
                  itemChildren={PRODUCT_OPTIONS}
                />
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Shop;
