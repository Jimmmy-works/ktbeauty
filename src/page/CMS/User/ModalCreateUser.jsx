import { Modal, Rate } from "antd";
import React, { useState } from "react";
import useDashboard from "../useDashboard";
import { MODAL_OPTION } from "@/utils/const";

const ModalCreateUser = ({ open, cancel, add, messageAndt, setShowModal }) => {
  const handleCreateUser = () => {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  ////
  const [image, setImage] = useState("");
  const [URL, setURL] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <Modal
      className="dashboard-modal"
      onOk={handleCreateUser}
      onCancel={cancel}
      open={open === MODAL_OPTION.USER.INDEX}
      okButtonProps={{ className: "custom-button-ok" }}
      cancelButtonProps={{ className: "custom-button-cancel" }}
    >
      <form className="form p-0" action="">
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px] ">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" "
              id="email"
              type="text"
            />
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px] ">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" "
              id="password"
              type="text"
            />
          </div>
        </div>
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full">
            <label htmlFor="file">Image</label>
            <div className="flex items-center mt-[12px]">
              <input
                onChange={handleImageChange}
                className="invisible opacity-0 p-0 w-0 h-0  border-0 cursor-pointer bg-transparent"
                id="file"
                type="file"
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
                {!image ? (
                  <span className="w-fit block">No file chosen</span>
                ) : (
                  <span className="w-fit block">{image?.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateUser;
