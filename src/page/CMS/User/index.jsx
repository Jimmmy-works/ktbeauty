import { Button, Modal, Popconfirm, Table, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import useDashboard from "../useDashboard";
import { MODAL_OPTION } from "@/contants/general";

import ModalUpdateAvatar from "./ModalUpdateAvatar";
import styled from "styled-components";
import { clearAllListeners } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/store/reducer/dashboardReducer";
import { LOCAL_STORAGE } from "@/contants/localStorage";
const TableCustom = styled.div`
  .ant-table-cell {
    vertical-align: middle;
  }
`;
const DashboardUser = () => {
  const { modalProps, userProps } = useDashboard();
  const {
    findPath,
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    toggleSidebar,
    width,
  } = modalProps || {};
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.dashboard);
  const { onDeleteUser, onCreateUser } = userProps || {};
  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      align: "center",
      render: () => (
        <a
          className={`text-[24px] cursor-pointer duration-400 transition-colors
                         hover:text-[#033C73] hover:border-[#033C73] rounded-[50%] 
                         flex items-end justify-center `}
        >
          <img
            className="rounded-[50%] h-[60px] w-[60px] border-solid border-[1px] border-black-ebe "
            src={`/assets/img/avartar.png`}
          />
        </a>
      ),
    },
    {
      title: "UserID",
      dataIndex: "_id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
    },
  ];
  const data = users.map((user, index) => {
    return {
      key: `${user?._id}${index}`,
      number:
        width >= 768 ? (
          `${index + 1}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Key:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${user?._id}`}</span>
          </strong>
        ),
      _id:
        width >= 768 ? (
          `${user?._id}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Id:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${user?._id}`}</span>
          </strong>
        ),
      email:
        width >= 768 ? (
          `${user?.email}`
        ) : (
          <strong className="text-sm font-osr font-semibold">
            Email:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${user?.email}`}</span>
          </strong>
        ),
      phone:
        width >= 768 ? (
          `${user?.phone} `
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Phone:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${user?.phone}`}</span>
          </strong>
        ),
      avatar: (
        <a
          className={`text-[24px] cursor-pointer duration-400 transition-colors
                         hover:text-[#033C73] hover:border-[#033C73] rounded-[50%]
                         flex items-end justify-center `}
        >
          <img
            className="rounded-[50%] h-[60px] w-[60px] border-solid border-[1px] border-black-ebe "
            src={`/assets/img/avartar.png`}
          />
        </a>
      ),
      action: (
        <>
          {width < 768 && (
            <h4 className="text-center mb-[10px] text-sm font-osr font-semibold">
              Action:
            </h4>
          )}
          <div className="flex items-center justify-center gap-2 flex-wrap ">
            <button
              onClick={() => onShowModal(MODAL_OPTION.USER.AVATAR)}
              className="border-solid border-slate-400 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-slate-400 hover:text-white"
            >
              Avatar
            </button>
            <Popconfirm
              title="Bạn có muốn xóa?"
              onConfirm={() => onConfirmDelete(user?._id)}
              onCancel={null}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "custom-button-ok" }}
              cancelButtonProps={{ className: "custom-button-cancel" }}
            >
              <button
                className="border-solid border-red-500 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </Popconfirm>
          </div>
        </>
      ),
    };
  });
  ///// Confirm
  const onConfirmDelete = (id) => {
    onDeleteUser(id);
  };
  /// handle selected
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      Table.SELECTION_ALL,
    ],
  };
  const filterUsers = data?.filter((item) => {
    return selectedRowKeys.indexOf(item.key) !== -1;
  });
  const handleDeleteUserSelected = () => {
    for (let index = 0; index < filterUsers.length; index++) {
      onDeleteUser(filterUsers[index]?._id);
    }
  };

  return (
    <TableCustom className="table__dashboard-user">
      <ModalUpdateAvatar
        messageAndt={findPath?.success}
        open={openModalAndt}
        add={onAddProduct}
        setShowModal={onShowModal}
        cancel={onCloseModal}
      />
      <ModalCreateUser
        messageAndt={findPath?.success}
        open={openModalAndt}
        add={onAddProduct}
        setShowModal={onShowModal}
        onCreateUser={onCreateUser}
        cancel={onCloseModal}
      />
      <div
        className={`  h-fit  flex  items-center xs:justify-center  md:justify-between
      gap-3 xs:fixed lg:static top-[60px] z-10 xs:bg-gray-100 lg:bg-white xs:px-[15px] lg:px-[30px] py-[14px]
      ${
        toggleSidebar
          ? "xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)] lg:w-[100%] left-[200px]"
          : "xs:w-[100%]"
      }`}
      >
        <h2 className="text-16px font-mam xs:hidden md:block text-[#033C73]">
          Dashboard User
        </h2>
        <div className="flex items-center gap-2">
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
            onClick={handleDeleteUserSelected}
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
          <button
            className=" bg-[#6c973e] text-white rounded-[5px] md:p-[6px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#80B04B] xs:p-[5.5px_11px]"
            onClick={() => onShowModal(MODAL_OPTION.USER.INDEX)}
          >
            <span className="xs:text-[16px] md:text-[22px]  font-osr font-bold">
              &#43;
            </span>
            <span className="xs:text-xs md:text-sm font-osr  ">
              Create User
            </span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        pagination={{
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </TableCustom>
  );
};

export default DashboardUser;
