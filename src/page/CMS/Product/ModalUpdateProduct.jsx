import { Empty, Modal, Rate, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import { MODAL_OPTION } from "@/contants/general";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
import { v4 as uuidv4 } from "uuid";

const MDEditorWrapper = styled.div`
  margin-top: 20px;
  p {
    visibility: visible !important;
    opacity: 1 !important;
  }
`;
const ModalUpdateProduct = ({
  open,
  cancel,
  add,
  categories,
  onGetProductDetail,
  products,
  productDetail,
  onUpdateProduct,
  onDeleteImageFirebase,
}) => {
  const optionCategories = categories
    .filter((cate) => {
      return cate?.name !== "all";
    })
    .map((cate) => {
      let value = {
        _id: cate?._id,
        name: cate?.name,
      };
      return value;
    });

  const [currentProduct, setCurrentProduct] = useState({});
  const [descIntro, setDescIntro] = useState("");
  const [price, setPrice] = useState(null);
  const [countInStock, setCountInStock] = useState();
  const [discount, setDiscount] = useState("");
  const [name, setName] = useState(``);
  const [category, setCategory] = useState();
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState([]);
  const [descHeading, setDescHeading] = useState("");
  const [renderDesc, setRenderDesc] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const addingDescription = (payload) => {
    if (payload) {
      setRenderDesc([...renderDesc, payload]);
      setDesc("");
    }
  };
  const deleteDescription = (payload) => {
    const filter = renderDesc.filter((item, index) => {
      return index !== payload;
    });
    setRenderDesc(filter);
    // setDesc("");
  };
  const handleChangeCategories = (e, cate) => {
    console.log("cate", cate);
    e.preventDefault();
    setCategory(cate);
  };

  ////
  const [images, setImages] = useState([]);
  const [URLs, setURLs] = useState([]);
  const [progress, setProgress] = useState("");
  const uploadImages = (files) => {
    const promises = [];
    if (files?.length >= 1) {
      files.map((file) => {
        const storageRef = ref(
          firebaseStorage,
          `ktbeauty/products/${file.name}-${uuidv4()}`
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
          setURLs([]);
        })
        .catch((err) => console.log(files));
    }
  };
  const handleDeleteImage = (name) => {
    const filter = currentImages?.filter((img) => img !== name);
    const find = currentImages?.find((img) => img === name);
    onDeleteImageFirebase(`${find}`);
    setCurrentImages(filter);
    onUpdateProduct(productDetail?._id, { ...productDetail, image: filter });
  };
  const [fileURLs, setFileURLs] = useState([]);
  const handleImageChange = (e) => {
    let allImages = [];
    let allUrls = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      const urls = URL.createObjectURL(newImage);
      allImages.push(newImage);
      allUrls.push(urls);
    }
    setImages(allImages);
    setFileURLs(allUrls);
    /// upload Image from onchange input files
    uploadImages(allImages);
  };
  const handleCancel = () => {
    cancel();
    for (let index = 0; index < URLs.length; index++) {
      onDeleteImageFirebase(URLs[index]);
    }
    setURLs([]);
    setImages([]);
    setProgress("");

    setName(productDetail?.name);
    setPrice(productDetail?.price);
    setCountInStock(productDetail?.countInStock);
    setDiscount(productDetail?.discount);

    setDesc(productDetail?.description?.descSub);
    setDescHeading(productDetail?.description?.descTitle);
    setDescIntro(productDetail?.description?.descIntro);
    setRenderDesc(productDetail?.description?.descSub);

    setCategory(productDetail?.category_id);
    setCurrentImages(productDetail?.image);
  };
  const handleUpdateProduct = async (data) => {
    const payload = {
      name: name,
      price: price,
      countInStock: countInStock,
      discount: discount,
      rating: rating,
      category_id: {
        name: category?.name,
        _id: category?._id,
      },
      descTitle: descHeading,
      descIntro: descIntro,
      descSub: renderDesc,
      image: currentImages,
    };
    try {
      await onUpdateProduct(productDetail?._id, payload);
      cancel();
      setURLs([]);
      setImages([]);
      setProgress("");
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
      throw error;
    }
  };
  console.log("URLs", URLs);
  console.log("images", images);
  console.log("currentImages", currentImages);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (URLs?.length) {
        setCurrentImages([...URLs, ...currentImages]);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [URLs]);
  useEffect(() => {
    setName(productDetail?.name);
    setPrice(productDetail?.price);
    setCountInStock(productDetail?.countInStock);
    setDiscount(productDetail?.discount);

    setDesc(productDetail?.description?.descSub);
    setDescHeading(productDetail?.description?.descTitle);
    setDescIntro(productDetail?.description?.descIntro);
    setRenderDesc(productDetail?.description?.descSub);

    setCategory(productDetail?.category_id);
    setCurrentImages(productDetail?.image);
  }, [productDetail]);
  console.log("productDetail", productDetail);
  return (
    <Modal
      className="dashboard-modal"
      onOk={handleUpdateProduct}
      onCancel={handleCancel}
      open={open === MODAL_OPTION.PRODUCT.UPDATE}
      okButtonProps={{ className: "custom-button-ok" }}
      cancelButtonProps={{ className: "custom-button-cancel" }}
    >
      <form className="form p-0" action="">
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px] ">
            <label htmlFor="name">Name</label>
            <input
              value={name || currentProduct?.name}
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
                      key={cate?._id}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#555] hover:text-white xs:p-[8px] 
                         ${
                           cate?._id === category?._id
                             ? "bg-[#555] text-white"
                             : "bg-black-be text-black"
                         }`}
                    >
                      <span className="xs:text-xs md:text-sm font-osr  capitalize">
                        {cate?.name}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className=" mb-[12px]">Description</label>
            <input
              id={`descHeading`}
              value={descHeading}
              placeholder={`Description Heading `}
              onChange={(e) => setDescHeading(e.target.value)}
              className="w-full mt-0"
              type="text"
            />
            <div className="w-full flex items-center gap-3 mt-[12px]">
              <input
                id={`descChild`}
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
            <ul className="mt-[5px]">
              {renderDesc?.length
                ? renderDesc?.map((i, index) => {
                    return (
                      <div className="flex items-start gap-3 ">
                        <li
                          key={`${i}${index}`}
                          className="flex  items-start gap-3"
                        >
                          -
                          <span className="text-black-333 font-mar text-sm">
                            {i}
                          </span>
                        </li>
                        <div>
                          <svg
                            onClick={() => deleteDescription(index)}
                            className="cursor-pointer group "
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="group-hover:fill-primary"
                              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </ul>
            <MDEditorWrapper>
              <h3 className="mb-[12px]">Description intro</h3>
              <MDEditor
                height={200}
                value={descIntro}
                onChange={setDescIntro}
              />
            </MDEditorWrapper>
          </div>
        </div>

        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label htmlFor="first-name">Rating</label>
            <Rate
              defaultValue={productDetail?.rating}
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className=" mb-[12px]">Images</label>
            <div className="flex items-center gap-3 flex-wrap">
              {currentImages?.length ? (
                currentImages?.map((img, index) => {
                  return (
                    <Tooltip
                      title={
                        <button
                          className="text-white"
                          onClick={() => handleDeleteImage(img)}
                        >
                          Xóa
                        </button>
                      }
                    >
                      <a className="block w-[80px] h-[80px]">
                        <img
                          src={img?.length ? img : "/assets/img/error.png"}
                          alt=""
                        />
                      </a>
                    </Tooltip>
                  );
                })
              ) : (
                <Empty
                  style={{ width: "80px", height: "80px" }}
                  description={false}
                />
              )}
            </div>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full">
            <label htmlFor="file">Upload Image</label>
            <div className="flex items-center mt-[12px]">
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
              {progress ? (
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
