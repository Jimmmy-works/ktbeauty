import Button from "@/components/Button";
import useWindowSize from "@/utils/windowResize";
import { Modal, Pagination, message } from "antd";
import { list } from "postcss";
import React, { useState } from "react";
import ModalProduct from "./ModalProduct";

const ProductCMS = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();

  const [listProduct, setListProduct] = useState([]);
  const handleDelete = (index) => {
    const newList = [...listProduct];
    newList.splice(index, 1);
    setListProduct(newList);
  };
  const modifyValue = (value) => {
    if (value > max) {
      return (value = max);
    } else if (value < min) {
      return (value = min);
    } else {
      return value;
    }
  };
  return (
    <div className="productcms flex flex-col  h-full justify-between pb-[20px]">
      <ModalProduct setListProduct={setListProduct} listProduct={listProduct} />
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
          {listProduct?.length ? (
            listProduct?.map((item, index) => {
              console.log("item", item);
              return (
                <tr>
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
