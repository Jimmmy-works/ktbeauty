import Button from "@/components/Button";
import useWindowSize from "@/utils/windowResize";
import {
  Carousel,
  Collapse,
  Dropdown,
  Image,
  Modal,
  Pagination,
  message,
} from "antd";
import React, { useRef, useState } from "react";
import ModalProduct from "../ModalProduct";
import useDashboard from "../useDashboard";
import { deleteDoc, doc } from "firebase/firestore";
import { firebaseStore } from "@/config/firebase";

const ProductCMS = ({ productList, getFirebaseStore }) => {
  const { width } = useWindowSize();
  const handleDelete = async (id) => {
    const productDocFirebase = doc(firebaseStore, "product-card", id);
    await deleteDoc(productDocFirebase);
    getFirebaseStore();
  };
  const [toggleDescIntro, setToggleDescIntro] = useState(false);
  const refDescIntro = useRef(null);
  const refDescIntroChild = useRef(null);
  console.log("refDescIntro", refDescIntro?.current?.scrollHeight);
  console.log("refDescIntroChild", refDescIntroChild?.current?.scrollHeight);
  return (
    <div className="productcms gap-[30px]">
      <table className="table">
        <thead>
          <tr>
            <td>id</td>
            <td>Image</td>
            <td>Title</td>
            <td>Desc</td>
            <td>Price</td>
            <td>remove</td>
          </tr>
        </thead>
        <tbody>
          {productList?.length ? (
            productList?.map((item, index) => {
              const { image, price, title, id, description } = item || {};
              return (
                <tr className="" key={index}>
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam xs:text-center md:text-left">
                      {id}
                    </td>
                  ) : (
                    <td className="text-black-333 font-mam xs:text-center md:text-left">
                      ID: {index}
                    </td>
                  )}
                  <td className={``}>
                    <div className="flex items-center justify-start gap-2 flex-wrap">
                      <Image.PreviewGroup>
                        {image?.length &&
                          image?.map((img) => {
                            return (
                              <Image width={74} key={img} src={`${img}`} />
                            );
                          })}
                      </Image.PreviewGroup>
                    </div>
                  </td>
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam ">{title}</td>
                  ) : (
                    <td className="text-black-333 font-mam ">
                      Title: {`${title}`}
                    </td>
                  )}
                  {width >= 768 ? (
                    <td className="text-black-333 font-mam ">
                      <ul>
                        <li>
                          <Collapse>
                            <Collapse.Panel header="Heading:" key="1">
                              {description?.heading}
                            </Collapse.Panel>
                          </Collapse>
                        </li>
                        <li
                          className="mt-[5px] cursor-pointer group overflow-hidden"
                          onClick={() => setToggleDescIntro(!toggleDescIntro)}
                        >
                          <Collapse>
                            <Collapse.Panel header="Intro:" key="1">
                              <>
                                <p> </p>
                                <p>{description.intro}</p>
                              </>
                            </Collapse.Panel>
                          </Collapse>
                        </li>
                        <li className="mt-[5px]">
                          <Collapse>
                            <Collapse.Panel header="Sub:" key="1">
                              {description?.subDesc?.length
                                ? description?.subDesc?.map((sub, index) => {
                                    return (
                                      <>
                                        <a>
                                          <strong className=" mr-[4px]">
                                            {index + 1}/
                                          </strong>
                                          {sub}
                                        </a>
                                        <br></br>
                                      </>
                                    );
                                  })
                                : "No sub description"}
                            </Collapse.Panel>
                          </Collapse>
                        </li>
                      </ul>
                    </td>
                  ) : (
                    <td className="text-black-333 font-mam ">
                      Description: {`${description?.heading}`}
                    </td>
                  )}

                  {width >= 768 ? (
                    <td className="text-black-333 font-mam ">${price}</td>
                  ) : (
                    <td className="text-black-333 font-mam ">
                      Price: {`$${price}`}
                    </td>
                  )}

                  <td className="">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(id)}
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
