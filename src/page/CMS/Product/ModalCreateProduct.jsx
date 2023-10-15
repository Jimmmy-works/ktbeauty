import { firebaseStorage, firebaseStore } from "@/config/firebase";
import { Modal, Rate, message } from "antd";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import useDashboard from "../useDashboard";
import { MODAL_OPTION } from "@/utils/const";
const ModalCreateProduct = ({ open, cancel, add, messageAndt }) => {
  const { modalProps } = useDashboard();
  const { getFirebaseStore } = modalProps || {};
  const [descIntro, setDescIntro] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [createAt, setCreateAt] = useState();
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState([]);
  const [descHeading, setDescHeading] = useState("");
  const [renderDesc, setRenderDesc] = useState([]);
  const addingDescription = (payload) => {
    setRenderDesc([...renderDesc, payload]);
    setDesc("");
  };
  const handleChangeInputDate = (e) => {
    setCreateAt(e.target.value);
  };
  ////
  const [images, setImages] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [progress, setProgress] = useState("");
  ////
  const productCollectionRef = collection(firebaseStore, "product-card");
  const uploadImages = (files) => {
    const promises = [];
    if (files?.length > 1) {
      files.map((file) => {
        const storageRef = ref(firebaseStorage, `images/${file.name}`);
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
    const initialState = {
      title: title,
      price: price,
      brand: brand,
      createAt: createAt,
      rating: rating,
      description: {
        heading: descHeading,
        intro: descIntro,
        subDesc: renderDesc,
      },
      image: [],
    };
    try {
      setPrice("");
      setTitle("");
      setBrand("");
      setCreateAt(0);
      setDesc([]);
      setDescHeading("");
      setDescIntro("");
      setRating(null);
      setRenderDesc([]);
      setProgress("0");
      setImages([]);
      //// Message
      message.success(messageAndt);
      /// Close Modal
      cancel();
    } catch (error) {
      console.log("error", error);
    }
  };
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
              <label htmlFor="title">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" "
                id="title"
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
                type="text"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="brand">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className=" "
                id="brand"
                type="text"
              />
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
              <label htmlFor="first-name">Create At</label>
              <input
                value={createAt}
                onChange={handleChangeInputDate}
                className=" "
                type="date"
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
                  accept=" image/png, image/jpg , image/avif, image/jpeg"
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
