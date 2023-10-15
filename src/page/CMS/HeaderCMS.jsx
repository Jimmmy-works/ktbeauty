import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalProduct from "./ModalProduct";
import useDashboard from "./useDashboard";
const HeaderCMS = () => {
  const { modalProps } = useDashboard();
  const { onShowModal, onCloseModal, openModalAndt, onAddProduct, findPath } =
    modalProps || {};
  return (
    <div className="flex items-center justify-between relative px-[20px]">
      <>
        <ModalProduct
          messageAndt={findPath?.success}
          open={openModalAndt}
          add={onAddProduct}
          cancel={onCloseModal}
        />
        <Button onClick={onShowModal} className={`rounded-md`}>
          {findPath?.button}
        </Button>
      </>
      <div className="flex justify-end items-center gap-2 w-fit  cursor-pointer mr-[20px]">
        <a className="block w-[50px] h-[50px]">
          <img src="/assets/img/avartar.png" alt="" />
        </a>
        <h2 className=" text-sm font-mam text-black-555">Jimmy</h2>
      </div>
    </div>
  );
};

export default HeaderCMS;
