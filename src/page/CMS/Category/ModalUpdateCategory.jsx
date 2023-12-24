import { MODAL_OPTION } from "@/contants/general";
import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";

const ModalUpdateCategory = ({
  open,
  cancel,
  onUpdateCategory,
  selected,
  categories,
}) => {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  /////
  const findCategory = useMemo(() => {
    return categories?.find((cate) => cate?._id === selected);
  }, [selected, categories]);
  const handleUpdateCategory = async () => {
    try {
      const payload = {
        name: name.toLowerCase(),
        label: label,
        _id: selected,
      };
      const response = await onUpdateCategory(payload);
      if (response?.status === 200) {
        setName("");
        setLabel("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCancel = () => {
    if (findCategory) {
      if (findCategory?.name) {
        setName(findCategory?.name);
      } else {
        setName("");
      }
      if (findCategory?.label) {
        setLabel(findCategory?.label);
      } else {
        setLabel("");
      }
    }
    cancel();
  };
  useEffect(() => {
    if (findCategory) {
      if (findCategory?.name) {
        setName(findCategory?.name);
      } else {
        setName("");
      }
      if (findCategory?.label) {
        setLabel(findCategory?.label);
      } else {
        setLabel("");
      }
    }
  }, [findCategory]);

  return (
    <Modal
      key={MODAL_OPTION.CATEGORY.UPDATE}
      className="dashboard-modal"
      onOk={handleUpdateCategory}
      onCancel={handleCancel}
      open={open === MODAL_OPTION.CATEGORY.UPDATE}
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

export default ModalUpdateCategory;
