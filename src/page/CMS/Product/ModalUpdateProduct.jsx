import { firebaseStorage } from "@/config/firebase";
import {
  MODAL_OPTION,
  OPTION_AGE,
  OPTION_LIFE_STYLE,
  OPTION_SEX,
  OPTION_SKIN_TYPE,
} from "@/contants/general";
import MDEditor from "@uiw/react-md-editor";
import { Button, Empty, Modal, Rate, Tooltip, message } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
  productDetail,
  onUpdateProduct,
  onDeleteImageFirebase,
  ///
  loadingUpdateProduct,
  executeUpdateProduct,
  ///
  loadingDeleteProduct,
  executeDeleteProduct,
  //
}) => {
  const optionCategories = categories
    .filter((cate) => {
      return cate?.name !== "all";
    })
    .map((cate) => {
      let value = {
        _id: cate?._id,
        label: cate?.label,
      };
      return value;
    });
  const [descIntro, setDescIntro] = useState("");
  const [price, setPrice] = useState(null);
  const [countInStock, setCountInStock] = useState();
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState(``);
  const [category, setCategory] = useState();
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState([]);
  const [descHeading, setDescHeading] = useState("");
  const [renderDesc, setRenderDesc] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [valueSex, setValueSex] = useState([]);
  const [valueAge, setValueAge] = useState([]);
  const [valueSkinType, setValueSkinType] = useState([]);
  const [valueLifeStyle, setValueLifeStyle] = useState([]);
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
  };
  const handleChangeCategories = (e, cate) => {
    e.preventDefault();
    setCategory(cate);
  };
  const handleChangeSex = (e, sexId) => {
    e.preventDefault();
    if (valueSex?.includes(sexId?.value)) {
      let filterCate = valueSex?.filter((sex) => {
        return sex !== sexId?.value;
      });
      setValueSex(filterCate);
    } else {
      let filterCate = valueSex?.filter((sex) => {
        return sex !== sexId?.value;
      });
      setValueSex([...filterCate, sexId?.value]);
    }
  };
  const handleChangeAge = (e, ageId) => {
    e.preventDefault();
    if (valueAge?.includes(ageId?.value)) {
      let filterCate = valueAge?.filter((sex) => {
        return sex !== ageId?.value;
      });
      setValueAge(filterCate);
    } else {
      let filterCate = valueAge?.filter((sex) => {
        return sex !== ageId?.value;
      });
      setValueAge([...filterCate, ageId?.value]);
    }
  };
  const handleChangeSkinType = (e, skinId) => {
    e.preventDefault();
    if (valueSkinType?.includes(skinId?.value)) {
      let filterCate = valueSkinType?.filter((sex) => {
        return sex !== skinId?.value;
      });
      setValueSkinType(filterCate);
    } else {
      let filterCate = valueSkinType?.filter((sex) => {
        return sex !== skinId?.value;
      });
      setValueSkinType([...filterCate, skinId?.value]);
    }
  };
  const handleChangeLifeType = (e, lifeId) => {
    e.preventDefault();
    if (valueLifeStyle?.includes(lifeId?.value)) {
      let filterCate = valueLifeStyle?.filter((sex) => {
        return sex !== lifeId?.value;
      });
      setValueLifeStyle(filterCate);
    } else {
      let filterCate = valueLifeStyle?.filter((sex) => {
        return sex !== lifeId?.value;
      });
      setValueLifeStyle([...filterCate, lifeId?.value]);
    }
  };
  ////
  const [images, setImages] = useState();
  const [URLs, setURLs] = useState([]);
  const [progress, setProgress] = useState("");
  ///
  const [fileURLs, setFileURLs] = useState([]);
  const [currentFileURLs, setCurrnetFileURLs] = useState([]);
  const [loadingUploadImage, setLoadingUploadImage] = useState();
  const uploadImages = async (files) => {
    const promises = [];
    try {
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
          .then((res) => {
            message.success("All images uploaded");
            setURLs([]);
          })
          .catch((err) => console.log(files));
      }
      return promises;
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };
  const handleDeleteImage = (name) => {
    const filter = currentImages?.filter((img) => img !== name);
    const find = currentImages?.find((img) => img === name);
    onDeleteImageFirebase(`${find}`);
    executeDeleteProduct(productDetail?._id, {
      ...productDetail,
      image: filter,
    });
    setCurrentImages(filter);
  };
  const handleDeleteFileUrls = (id) => {
    const filter = currentFileURLs?.filter((file) => file?.id !== id);
    setCurrnetFileURLs(filter);
  };
  const handleImageChange = (e) => {
    let allImages = [];
    let allUrls = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      ////
      const urls = URL.createObjectURL(newImage);
      allImages.push(newImage);
      ///
      if (e.target.files?.length > 0) allUrls.push(urls);
      ///
    }
    setImages(allImages);
    setFileURLs(allImages);
  };
  const handleCancel = () => {
    // for (let index = 0; index < URLs.length; index++) {
    //   onDeleteImageFirebase(URLs[index]);
    // }
    setURLs([]);
    setImages([]);
    setProgress("");

    setName(productDetail?.name);
    setRating(productDetail?.rating);
    setPrice(productDetail?.price);
    setCountInStock(productDetail?.countInStock);
    setDiscount(productDetail?.discount);
    setCategory(productDetail?.category_id);
    setValueSex(productDetail?.sex);
    setValueAge(productDetail?.age);
    setValueSkinType(productDetail?.skinType);
    setValueLifeStyle(productDetail?.hobby);
    setDesc(productDetail?.description?.descSub);
    setDescHeading(productDetail?.description?.descTitle);
    setDescIntro(productDetail?.description?.descIntro);
    setRenderDesc(productDetail?.description?.descSub);
    setCurrentImages(productDetail?.image);
    ///
    setImages([]);
    ///
    setFileURLs([]);
    ////
    setCurrnetFileURLs([]);
    ///
    cancel();
  };
  const handleUpdateProduct = () => {
    if (fileURLs?.length) {
      uploadImages(currentFileURLs);
      setLoadingUploadImage(true);
    } else {
      setLoadingUploadImage(true);
    }
  };
  useEffect(() => {
    if (loadingUploadImage && fileURLs?.length < 1) {
      console.log("111", 111);
      const payload = {
        name: name,
        price: price,
        countInStock: countInStock,
        discount: discount || 0,
        rating: rating,
        category_id: {
          name: category?.name,
          _id: category?._id,
        },
        descTitle: descHeading,
        descIntro: descIntro,
        descSub: renderDesc,
        age: valueAge,
        hobby: valueLifeStyle,
        sex: valueSex,
        skinType: valueSkinType,
      };
      executeUpdateProduct(productDetail?._id, payload);
      if (loadingUpdateProduct) {
        setURLs([]);
        setImages([]);
        setCurrentImages([]);
        setCurrnetFileURLs([]);
        setProgress("");
      }
      setLoadingUploadImage(false);
      return;
    }
    const timeout = setTimeout(() => {
      if (loadingUploadImage && fileURLs?.length >= 1) {
        const payload = {
          name: name,
          price: price,
          countInStock: countInStock,
          discount: discount || 0,
          rating: rating,
          category_id: {
            name: category?.name,
            _id: category?._id,
          },
          descTitle: descHeading,
          descIntro: descIntro,
          descSub: renderDesc,
          image: currentImages,

          age: valueAge,
          hobby: valueLifeStyle,
          sex: valueSex,
          skinType: valueSkinType,
        };
        executeUpdateProduct(productDetail?._id, payload);
        if (loadingUpdateProduct) {
          setURLs([]);
          setImages([]);
          setCurrentImages([]);
          setCurrnetFileURLs([]);
          setProgress("");
        }
        setLoadingUploadImage(false);
        return;
      }
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingUploadImage, currentImages]);
  useEffect(() => {
    setCurrnetFileURLs([...fileURLs, ...currentFileURLs]);
  }, [fileURLs]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (URLs?.length) {
        setCurrentImages([...URLs, ...currentImages]);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [URLs]);
  const convertToBlobUrl = useMemo(() => {
    let blobUrls = [];
    if (currentFileURLs) {
      for (let index = 0; index < currentFileURLs?.length; index++) {
        let newImage = currentFileURLs[index];
        let url = URL.createObjectURL(newImage);
        blobUrls.push(url);
      }
    }
    return blobUrls;
  }, [currentFileURLs]);
  useEffect(() => {
    setName(productDetail?.name);
    setPrice(productDetail?.price);
    setRating(productDetail?.rating);
    setCountInStock(productDetail?.countInStock);
    setDiscount(productDetail?.discount);

    setDesc(productDetail?.description?.descSub);
    setDescHeading(productDetail?.description?.descTitle);
    setDescIntro(productDetail?.description?.descIntro);
    setRenderDesc(productDetail?.description?.descSub);
    setValueSex(productDetail?.sex);
    setValueAge(productDetail?.age);
    setValueSkinType(productDetail?.skinType);
    setValueLifeStyle(productDetail?.hobby);
    setCategory(productDetail?.category_id);
    setCurrentImages(productDetail?.image);
    setCurrnetFileURLs([]);
  }, [productDetail]);
  return (
    <Modal
      centered
      okText="Update"
      title="Update Product"
      confirmLoading={loadingUpdateProduct}
      key={`${MODAL_OPTION.PRODUCT.UPDATE}`}
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
            <label className="mb-[12px]">Category - Chọn 1</label>
            <div className="flex items-center gap-2 flex-wrap">
              {optionCategories?.length &&
                optionCategories?.map((cate) => {
                  return (
                    <button
                      onClick={(e) => handleChangeCategories(e, cate)}
                      key={cate?._id}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#4096FF] hover:text-white xs:p-[8px]
                         ${
                           cate?._id === category?._id
                             ? "bg-[#4096FF] text-white"
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
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className="mb-[12px]">Sex - Có thể chọn 1 hoặc nhiều</label>
            <div className="flex items-center gap-2 flex-wrap">
              {OPTION_SEX?.length &&
                OPTION_SEX?.map((sex) => {
                  return (
                    <button
                      onClick={(e) => handleChangeSex(e, sex)}
                      key={sex?.value}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#4096FF] hover:text-white xs:p-[8px]
                         ${
                           valueSex?.includes(sex?.value)
                             ? "bg-[#4096FF] text-white"
                             : "bg-black-be text-black"
                         }`}
                    >
                      <span className="xs:text-xs md:text-sm font-osr  capitalize">
                        {sex?.label}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className="mb-[12px]">Age - Có thể chọn 1 hoặc nhiều</label>
            <div className="flex items-center gap-2 flex-wrap">
              {OPTION_AGE?.length &&
                OPTION_AGE?.map((age) => {
                  return (
                    <button
                      onClick={(e) => handleChangeAge(e, age)}
                      key={age?.value}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#4096FF] hover:text-white xs:p-[8px]
                         ${
                           valueAge?.includes(age?.value)
                             ? "bg-[#4096FF] text-white"
                             : "bg-black-be text-black"
                         }`}
                    >
                      <span className="xs:text-xs md:text-sm font-osr  capitalize">
                        {age?.label}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className="mb-[12px]">
              Skin Type - Có thể chọn 1 hoặc nhiều
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {OPTION_SKIN_TYPE?.length &&
                OPTION_SKIN_TYPE?.map((skin) => {
                  return (
                    <button
                      onClick={(e) => handleChangeSkinType(e, skin)}
                      key={skin?._id}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#4096FF] hover:text-white xs:p-[8px]
                         ${
                           valueSkinType?.includes(skin?.value)
                             ? "bg-[#4096FF] text-white"
                             : "bg-black-be text-black"
                         }`}
                    >
                      <span className="xs:text-xs md:text-sm font-osr  capitalize">
                        {skin?.label}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label className="mb-[12px]">
              LifeStyle - Có thể chọn 1 hoặc nhiều
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {OPTION_LIFE_STYLE?.length &&
                OPTION_LIFE_STYLE?.map((life) => {
                  return (
                    <button
                      onClick={(e) => handleChangeLifeType(e, life)}
                      key={life?.value}
                      className={` rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
                         flex items-center gap-1 hover:bg-[#4096FF] hover:text-white xs:p-[8px]
                         ${
                           valueLifeStyle?.includes(life?.value)
                             ? "bg-[#4096FF] text-white"
                             : "bg-black-be text-black"
                         }`}
                    >
                      <span className="xs:text-xs md:text-sm font-osr  capitalize">
                        {life?.label}
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
                      <div
                        key={`${i}${index}`}
                        className="flex items-start gap-3 "
                      >
                        <li className="flex  items-start gap-3">
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
                data-color-mode="light"
              />
            </MDEditorWrapper>
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px]  ">
            <label htmlFor="first-name">Rating</label>
            <Rate
              allowHalf
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
                      key={`${img}${index}`}
                      title={
                        <Button
                          disabled={loadingDeleteProduct}
                          style={{
                            color: "#fff",
                            border: "none",
                            padding: "5px",
                          }}
                          onClick={() => handleDeleteImage(img)}
                        >
                          Xóa
                        </Button>
                      }
                    >
                      <a>
                        <img
                          className=" md:w-[80px] md:h-[80px] xs:w-[60px] xs:h-[60px] object-cover"
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
        <div className="form__container mt-0  mb-[20px]">
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

            <div className="mt-[12px] flex items-center gap-3 flex-wrap">
              {currentFileURLs?.length && fileURLs?.length ? (
                currentFileURLs?.map((img, index) => {
                  let newImage = currentFileURLs[index];
                  return (
                    <Tooltip
                      key={`${img}${index}`}
                      title={
                        <Button
                          disabled={loadingDeleteProduct}
                          style={{
                            color: "#fff",
                            border: "none",
                            padding: "5px",
                          }}
                          onClick={() => handleDeleteFileUrls(newImage?.id)}
                        >
                          Xóa
                        </Button>
                      }
                    >
                      <a>
                        <img
                          className=" md:w-[80px] md:h-[80px] xs:w-[60px] xs:h-[60px] object-cover"
                          src={
                            convertToBlobUrl?.length
                              ? convertToBlobUrl[index]
                              : "/assets/img/error.png"
                          }
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
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
