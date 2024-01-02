import { MODAL_OPTION } from "@/contants/general";
import { Spin, Table, message } from "antd";
import { useState } from "react";
import useDashboard from "../useDashboard";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";
import { THUNK_STATUS } from "@/contants/thunkstatus";
const DashboardCategory = () => {
  const { modalProps, categoryProps } = useDashboard();
  const { onShowModal, onCloseModal, openModalAndt, toggleSidebar, width } =
    modalProps || {};
  const { categories, onDeleteCategory, statusGetAllCategories } =
    categoryProps || {};
  /// handle Table
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      filters: categories?.map((item) => {
        console.log("item", item);
        return {
          text: item?.label,
          value: item?.name,
        };
      }),
      filterSearch: true,
      onFilter: (value, record) => {
        return record?.nameFilter?.indexOf(value) === 0;
      },
    },
  ];
  const data = categories?.map((category, index) => {
    return {
      key: `${category?._id}`,
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
      _id:
        width >= 768 ? (
          `${category?._id}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Id:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${category?._id}`}</span>
          </strong>
        ),
      nameFilter: category?.name,
      name:
        width >= 768 ? (
          <p className="font-om capitalize"> {`${category?.label}`}</p>
        ) : (
          <strong className="text-sm font-osr font-semibold capitalize ">
            Name:
            <span className="text-sm font-osr font-normal ml-[4px] capitalize">{`${category?.label}`}</span>
          </strong>
        ),
    };
  });
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
  const filterCategories = data?.filter((item) => {
    return selectedRowKeys.indexOf(item.key) !== -1;
  });

  const handleDeleteCategorySelected = () => {
    for (let index = 0; index < filterCategories.length; index++) {
      onDeleteCategory(filterCategories[index]?._id);
    }
  };
  //// loading
  if (statusGetAllCategories !== THUNK_STATUS.fulfilled) {
    return (
      <div className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center">
        <Spin size="default" />
      </div>
    );
  }
  return (
    <div className="table__dashboard table__dashboard-category">
      <ModalCreateCategory
        {...categoryProps}
        open={openModalAndt}
        setShowModal={onShowModal}
        cancel={onCloseModal}
      />
      <ModalUpdateCategory
        selected={selectedRowKeys?.toString()}
        {...categoryProps}
        open={openModalAndt}
        setShowModal={onShowModal}
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
          Dashboard Category
        </h2>
        <div className="flex items-center gap-2">
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
            onClick={handleDeleteCategorySelected}
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
          <button
            onClick={() => {
              if (selectedRowKeys?.length > 1) {
                message.error(`Không thể thay đổi nhiều category trong 1 lần`);
              } else if (!selectedRowKeys?.length) {
                message.error(`Chọn category cần thay đổi`);
              } else {
                onShowModal(MODAL_OPTION.CATEGORY.UPDATE);
              }
            }}
            className=" bg-yellow-600 text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-yellow-500 xs:p-[8px]"
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Update Seleted
            </span>
          </button>
          <button
            className=" bg-[#6c973e] text-white rounded-[5px] md:p-[6px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#80B04B] xs:p-[5.5px_11px]"
            onClick={() => onShowModal(MODAL_OPTION.CATEGORY.CREATE)}
          >
            <span className="xs:text-[16px] md:text-[22px]  font-osr font-bold">
              &#43;
            </span>
            <span className="xs:text-xs md:text-sm font-osr  ">
              Create Category
            </span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        tableLayout={"auto"}
        pagination={{
          pageSize: 12,
          total: data,
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        columns={columns}
        key={`cms/category`}
        dataSource={data}
      />
    </div>
  );
};

export default DashboardCategory;
