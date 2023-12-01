import { MODAL_OPTION } from "@/contants/general";
import { Modal } from "antd";
import { useState } from "react";

const ModalUpdateAvatar = ({
  open,
  cancel,
  add,
  messageAndt,
  setShowModal,
}) => {
  const [avatar, setAvatar] = useState("");
  const [URL, setURL] = useState("");
  const handleImageAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleChangeAvatar = () => {
    cancel();
  };
  return (
    <Modal
      className="dashboard-modal"
      onOk={handleChangeAvatar}
      onCancel={cancel}
      open={open === MODAL_OPTION.USER.AVATAR}
      okButtonProps={{ className: "custom-button-ok" }}
      cancelButtonProps={{ className: "custom-button-cancel" }}
    >
      <form className="form p-0" action="">
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full">
            <h3>Avatar</h3>
            <div className="flex items-center mt-[12px]">
              <input
                onChange={handleImageAvatar}
                className="invisible opacity-0 p-0 w-0 h-0  border-0 cursor-pointer bg-transparent"
                id="file-avatar"
                type="file"
                accept=" image/png, image/jpg , image/avif, image/jpeg"
              />
              <label
                htmlFor={`file-avatar`}
                className={`border-solid border-[1px] border-black-555 p-[8px_6px] 
                 mr-[12px] text-[13px] w-fit cursor-pointer hover:bg-primary duration-400 transition-colors
                 hover:text-white hover:border-primary`}
              >
                Choose Files
              </label>
              <div className="mr-[12px] w-fit flex items-center">
                {!avatar ? (
                  <span className="w-fit block">No file chosen</span>
                ) : (
                  <span className="w-fit block">{avatar?.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateAvatar;
