import { MODAL_OPTION } from "@/contants/general";
import { localeVN } from "@/utils/timeVN";
import { Table } from "antd";
import { useState } from "react";
import useDashboard from "../useDashboard";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateAvatar from "./ModalUpdateAvatar";
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
  const { onDeleteUser, onCreateUser, searchUsers, users } = userProps || {};
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",

      filters: users?.map((item) => {
        return {
          text: item?.email,
          value: item?.email,
        };
      }),
      filterSearch: true,
      onFilter: (value, record) => {
        if (width >= 768) {
          return record?.email?.indexOf(value) === 0;
        } else {
          return (
            record?.email?.props?.children?.[1]?.props?.children?.indexOf(
              value
            ) === 0
          );
        }
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
      filters: users?.map((item) => {
        return {
          text: item?.phone,
          value: item?.phone,
          key: item?._id,
        };
      }),
      filterSearch: true,
      onFilter: (value, record) => {
        if (width >= 768) {
          return record?.phone?.indexOf(value) === 0;
        } else {
          return (
            record?.phone?.props?.children?.[1]?.props?.children?.indexOf(
              value
            ) === 0
          );
        }
      },
    },
    {
      title: "CreateAt ",
      dataIndex: "createdAt",
      align: "center",
      sorter: (a, b) =>
        new Date(b?.createdUser).getTime() - new Date(a?.createdUser).getTime(),
      sortDirections: ["descend"],
      ellipsis: true,
    },
  ];

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {};
  const data = users.map((user, index) => {
    return {
      key: `${user?._id}`,
      createdUser: user?.createdAt,
      serial:
        width >= 768 ? (
          `${index + 1}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Serial:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${
              index + 1
            }`}</span>
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
      createdAt:
        width >= 768 ? (
          `${localeVN(user?.createdAt)} `
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Create At:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${localeVN(
              user?.createdAt
            )}`}</span>
          </strong>
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
      onDeleteUser(filterUsers[index]?.key);
    }
  };
  return (
    <div className="table__dashboard table__dashboard-user">
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
            onClick={() => onShowModal(MODAL_OPTION.USER.CREATE)}
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
        tableLayout={"auto"}
        key={`cms/user`}
        pagination={{
          pageSize: width >= 768 ? 12 : 8,
          total: data,
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={handleOnchangeTable}
      />
    </div>
  );
};
export default DashboardUser;
