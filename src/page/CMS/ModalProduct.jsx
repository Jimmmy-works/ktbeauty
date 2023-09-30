import Button from "@/components/Button";
import { Modal, message } from "antd";
import React, { useState } from "react";

const ModalProduct = ({ setListProduct, listProduct }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    const payload = {
      name: name,
      price: price,
      image: img,
    };
    console.log("payload", payload);
    setListProduct([...listProduct, payload]);
    message.success("Success add product");
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={showModal}
        className={`z-10 rounded-[50%] md:py-[6px] md:px-[15.93px] fixed bottom-[120px] right-[30px]`}
      >
        <span className="text-lg font-mar"> &#43;</span>
      </Button>
      <Modal
        title={<p className="font-mam text-16px">Create User</p>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ className: "custom-button-ok" }}
        cancelButtonProps={{ className: "custom-button-cancel" }}
      >
        <form className="form p-0" action="">
          <div className="form__container mt-0 ">
            <div className="form__container-wrapper w-full mb-[20px] ">
              <label htmlFor="first-name">Email</label>
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
              <label htmlFor="first-name">Password</label>
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
              <label htmlFor="first-name">Avatar</label>
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
