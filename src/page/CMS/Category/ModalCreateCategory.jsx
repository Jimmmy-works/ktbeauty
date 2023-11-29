import { MODAL_OPTION } from "@/contants/general";
import { Modal } from "antd";
import { useState } from "react";

const ModalCreateCategory = ({ open, cancel, onCreateCategory }) => {
  const [name, setName] = useState("");
  /////
  const handleCreateCategory = async () => {
    try {
      const response = await onCreateCategory({ name: name.toLowerCase() });
      if (response?.status === 200) {
        setName("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Modal
      className="dashboard-modal"
      onOk={handleCreateCategory}
      onCancel={cancel}
      open={open === MODAL_OPTION.CATEGORY.CREATE}
      okButtonProps={{ className: "custom-button-ok" }}
      cancelButtonProps={{ className: "custom-button-cancel" }}
    >
      <form className="form p-0" action="">
        <div className="form__container mt-0 ">
          <div className="form__container-wrapper w-full mb-[20px] ">
            <label htmlFor="password">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" "
              id="password"
              type="text"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateCategory;
