import React from "react";
import ProductCMS from "./ProductCMS";
import useDashboard from "../useDashboard";

const DashBoardProduct = () => {
  const { modalProps } = useDashboard();
  return (
    <>
      <ProductCMS list={modalProps?.productList} {...modalProps} />
    </>
  );
};

export default DashBoardProduct;
