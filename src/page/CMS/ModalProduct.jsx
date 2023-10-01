import Button from "@/components/Button";
import { Modal, message } from "antd";
import React, { useState } from "react";

const ModalProduct = ({ open, cancel, add, messageAndt }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const handleOk = () => {
    const payload = {
      name: name,
      price: price,
      image: img,
    };
    add(payload);
    message.success(messageAndt);
    cancel();
    setConfirmLoading(false);
  };
  return (
    <>
      <Modal
        className="dashboard-modal"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={cancel}
        open={open}
        okButtonProps={{ className: "custom-button-ok" }}
        cancelButtonProps={{ className: "custom-button-cancel" }}
      >
        <form className="form p-0" action="">
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px] ">
              <label htmlFor="first-name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" "
                type="text"
                id="first-name"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px]  ">
              <label htmlFor="first-name">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className=" "
                type="text"
                id="first-name"
              />
            </div>
          </div>
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full">
              <label htmlFor="first-name">Image</label>
              <input
                onChange={(e) => setImg(e?.target?.files[0])}
                className="p-0 border-0 cursor-pointer bg-transparent"
                type="file"
                id="first-name"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalProduct;
