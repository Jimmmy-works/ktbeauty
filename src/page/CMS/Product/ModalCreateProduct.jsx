import { firebaseStorage, firebaseStore } from "@/config/firebase";
import { Modal, Rate, Select, Space, message } from "antd";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import useDashboard from "../useDashboard";
import { MODAL_OPTION } from "@/contants/general";
import { useSelector } from "react-redux";
import { THUNK_STATUS } from "@/contants/thunkstatus";
const ModalCreateProduct = ({ open, cancel, add, messageAndt, categories }) => {
  const { productProps } = useDashboard();
  const { onCreateProduct } = productProps || {};
  const [descIntro, setDescIntro] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState({});
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState([]);
  const [descHeading, setDescHeading] = useState("");
  const [renderDesc, setRenderDesc] = useState([]);
  const addingDescription = (payload) => {
    setRenderDesc([...renderDesc, payload]);
    setDesc("");
  };
  ////
  const { getStatusCreateProduct } = useSelector((state) => state.dashboard);
  ////
  const [images, setImages] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [progress, setProgress] = useState("");
  //// firebase
  const uploadImages = (files) => {
    const promises = [];
    if (files?.length >= 1) {
      files.map((file) => {
        const storageRef = ref(
          firebaseStorage,
          `ktbeauty/products/${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100 * 3.6
            );
            setProgress(progress);
            return progress;
          },
          (error) => {
            console.log(error);
          },
          async () => {
            try {
              await getDownloadURL(uploadTask?.snapshot?.ref).then(
                (downloadURL) => {
                  setURLs((prevState) => [...prevState, downloadURL]);
                  return downloadURL;
                }
              );
            } catch (error) {
              console.log("error", error);
            }
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          message.success("All images uploaded");
        })
        .catch((err) => console.log(files));
    }
  };
  ////
  const handleChangeCategories = (e, cate) => {
    e.preventDefault();
    setCategory(cate?.value);
  };

  const handleImageChange = (e) => {
    let allImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      allImages.push(newImage);
    }
    setImages(allImages);
    /// upload Image from onchange input files
    uploadImages(allImages);
  };
  const handleCreateProduct = async () => {
    const payload = {
      name: name,
      price: price,
      category_id: category,
      countInStock: countInStock,
      discount: discount,
      rating: rating,
      descTitle: descHeading,
      descIntro: descIntro,
      descSub: renderDesc,
      // description: {
      //   heading: descHeading,
      //   intro: descIntro,
      //   subDesc: renderDesc,
      // },
      image: URLs,
    };
    try {
      const res = await onCreateProduct(payload);
      console.log("res", res);
      if (res) {
        setPrice("");
        setName("");
        setDesc([]);
        setDescHeading("");
        setCountInStock("300");
        setDiscount("");
        setCategory("");
        setDescIntro("");
        setRating(null);
        setRenderDesc([]);
        setProgress(null);
        setImages([]);
        /// Close Modal
        // cancel();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const optionCategories = categories?.map((cate) => {
    let value = {
      value: cate?._id,
      label: cate?.name,
    };
    return value;
  });
  return (
    <>
      <Modal
        className="dashboard-modal"
        onOk={handleCreateProduct}
        onCancel={cancel}
        open={open === MODAL_OPTION.PRODUCT}
        okButtonProps={{ className: "custom-button-ok" }}
        cancelButtonProps={{ className: "custom-button-cancel" }}
      >
        <form className="form p-0" action="">
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px] ">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" "
                id="name"
                type="text"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="price">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className=" "
                id="price"
                type="number"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="count">Count In Stock</label>
              <input
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className=" "
                id="count"
                type="number"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="discount">Discount</label>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className=" "
                id="discount"
                type="number"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="category" className="mb-[12px]">
                Category
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {optionCategories?.length &&
                  optionCategories?.map((cate) => {
                    return (
                      <button
                        onClick={(e) => handleChangeCategories(e, cate)}
                        key={cate?.value}
                        className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#555] hover:text-white xs:p-[8px] 
                         ${
                           cate?.value === category
                             ? "bg-[#555] text-white"
                             : "bg-black-be text-black"
                         }`}
                      >
                        <span className="xs:text-xs md:text-sm font-osr  capitalize">
                          {cate?.label}
                        </span>
                      </button>
                    );
                  })}
              </div>
              {/* <Select
                onChange={handleChangeCategories}
                value={optionCategories?.value}
                defaultValue={optionCategories[1]}
                style={{
                  width: "100%",
                  textTransform: "capitalize",
                }}
                optionLabelProp=""
                allowClear
                options={optionCategories}
              /> */}
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label className=" mb-[12px]">Description</label>
              <input
                id={`desc-heading`}
                value={descHeading}
                placeholder={`Description Heading `}
                onChange={(e) => setDescHeading(e.target.value)}
                className="w-full mt-0"
                type="text"
              />
              <div className="w-full flex items-center gap-3 mt-[12px]">
                <input
                  id={`desc-child`}
                  value={desc}
                  placeholder={`Description child `}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full mt-0"
                  type="text"
                />
                <span
                  onClick={() => addingDescription(desc)}
                  className="border cursor-pointer hover:border-primary rounded-[50%] 
                  border-solid border-black-555 text-16px font-mam
                px-[8px] hover:text-primary duration-300 transition-colors"
                >
                  &#43;
                </span>
              </div>
              <ul>
                {renderDesc?.map((i, index) => {
                  return (
                    <li
                      key={`${i}${index}`}
                      className="flex items-center gap-3"
                    >
                      -
                      <span className="text-black-333 font-mar text-sm">
                        {i}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <textarea
                value={descIntro}
                id="desc-intro"
                placeholder="Description intro"
                onChange={(e) => setDescIntro(e.target.value)}
                className=""
                type="text"
              />
            </div>
          </div>

          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="first-name">Rating</label>
              <Rate value={rating} onChange={setRating} />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full">
              <label htmlFor="file">Image</label>
              <div className="flex items-center ">
                <input
                  title={
                    images?.length ? Number(images?.length) : "No file chosen"
                  }
                  onChange={handleImageChange}
                  multiple
                  className="invisible opacity-0 p-0 w-0 h-0  border-0 cursor-pointer bg-transparent"
                  type="file"
                  id="file"
                  accept=" image/png, image/jpg , image/avif, image/jpeg , image/webp"
                />
                <label
                  htmlFor="file"
                  className={`border-solid border-[1px] border-black-555 p-[8px_6px] 
                 mr-[12px] text-[13px] w-fit cursor-pointer hover:bg-primary duration-400 transition-colors
                 hover:text-white hover:border-primary`}
                >
                  Choose Files
                </label>
                <div className="mr-[12px] w-fit flex items-center">
                  {!images?.length && (
                    <span className="w-fit block">No file chosen</span>
                  )}
                  {images?.length == 1 && (
                    <span className="w-fit block">{images[0]?.name}</span>
                  )}
                  {images?.length > 1 && (
                    <div className="flex items-center  ">
                      {images?.length}
                      <span className="font-osr ml-[4px]">files</span>
                    </div>
                  )}
                </div>
                <div className="">
                  <div
                    style={{
                      background: `conic-gradient(#ff887b ${progress}deg, #ededed 0deg)`,
                    }}
                    className={` h-[50px] w-[50px] rounded-[50%] relative before:absolute 
                    before:rounded-[50%] before:w-[44px] before:h-[44px]
                  before:bg-white flex items-center justify-center`}
                  >
                    <span className="font-osr text-[12px] relative text-primary">
                      {Math.round(progress / 3.6)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalCreateProduct;
