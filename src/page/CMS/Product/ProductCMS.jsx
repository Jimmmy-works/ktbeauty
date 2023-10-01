import Button from "@/components/Button";
import useWindowSize from "@/utils/windowResize";
import { Modal, Pagination, message } from "antd";
import { list } from "postcss";
import React, { useState } from "react";
import ModalProduct from "../ModalProduct";
import useDashboard from "../useDashboard";

const ProductCMS = ({
  list,
  onShowModal,
  onCloseModal,
  openModalAndt,
  onAddProduct,
  productList,
  setProductList,
}) => {
  const { width } = useWindowSize();
  const handleDelete = (index) => {
    const newList = [...productList];
    newList.splice(index, 1);
    setProductList(newList);
  };
  console.log("list", list);
  return (
    <div className="productcms ">
      <table className="table">
        <thead>
          <tr>
            <td>id</td>
            <td>Image</td>
            <td>Name</td>
            <td>Price</td>
            <td>remove</td>
          </tr>
        </thead>
        <tbody>
          {productList?.length ? (
            productList?.map((item, index) => {
              console.log("item", item);
              return (
                <tr key={index}>
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam xs:text-center md:text-left">
                      {index}
                    </td>
                  ) : (
                    <td className="text-black-333 font-mam xs:text-center md:text-left">
                      ID: {`${index}`}
                    </td>
                  )}
                  <td>
                    <a className="block mx-auto ">
                      <img
                        className="h-[50px] w-[50px]"
                        src={`/assets/img/${item?.image?.name}`}
                        alt=""
                      />
                    </a>
                  </td>
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam ">{item?.name}</td>
                  ) : (
                    <td className="text-black-333 font-mam ">
                      Name: {`${item?.name}`}
                    </td>
                  )}
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam ">${item?.price}</td>
                  ) : (
                    <td className="text-black-333 font-mam ">
                      Price: {`$${item?.price}`}
                    </td>
                  )}

                  <td className="">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-[6px] block text-[13px] text-white rounded-md py-[6px] hover:bg-red-500
                      bg-black-333 transition-all duration-400"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <div className="h-[300px] w-100% flex items-center justify-center">
              No Product
            </div>
          )}
        </tbody>
      </table>
      <div className="mx-auto">
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </div>
  );
};

export default ProductCMS;
