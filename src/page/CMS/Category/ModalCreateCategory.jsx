import { MODAL_OPTION } from "@/contants/general";
import { Modal } from "antd";
import { useState } from "react";

const ModalCreateCategory = ({ open, cancel, onCreateCategory }) => {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  /////
  const handleCreateCategory = async () => {
    try {
      const response = await onCreateCategory({
        name: name.toLowerCase(),
        label: label,
      });
      if (response?.status === 200) {
        setLabel("");
        setName("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCancel = () => {
    setName("");
    setLabel("");
    cancel();
  };
  return (
    <Modal
      key={MODAL_OPTION.CATEGORY.CREATE}
      className="dashboard-modal"
      onOk={handleCreateCategory}
      onCancel={handleCancel}
      open={open === MODAL_OPTION.CATEGORY.CREATE}
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
          <div className="form__container-wrapper w-full mb-[20px] ">
            <label htmlFor="label">Label (Dùng để hiển thị)</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className=" "
              id="label"
              type="text"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateCategory;
