import React, { useEffect, useState } from "react";
import useDashboard from "../useDashboard";
import { Checkbox, Collapse, Image, Table } from "antd";
import { MODAL_OPTION } from "@/utils/const";
import ModalCreateProduct from "./ModalCreateProduct";

const DashBoardProduct = () => {
  const { modalProps } = useDashboard();
  const {
    findPath,
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    toggleSidebar,
    width,
  } = modalProps || {};
  const [tableLayout, setTableLayout] = useState("");
  const columns = [
    {
      title: "ProductID",
      dataIndex: "productid",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
    },
  ];
  useEffect(() => {
    if (width > 1024) setTableLayout("auto");
    if (width <= 1024) setTableLayout("fixed");
  }, [width]);
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      productid:
        width > 1024 ? (
          `6${i}ab09uy${i}ba${i}pc`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Id:{" "}
            <span className="text-sm font-osr font-normal ml-[4px]">{` 6${i}ab09uy${i}ba${i}pc`}</span>
          </strong>
        ),
      name:
        width > 1024 ? (
          `Lorem ipsum dolor sit amet consectetur ${i}.`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Name:
            <span className="text-sm font-osr font-normal ml-[4px]">{`Lorem ipsum dolor sit amet consectetur ${i}.`}</span>
          </strong>
        ),
      description: (
        <ul>
          {width < 1024 && (
            <li className="text-center mb-[10px] text-sm font-osr font-semibold">
              Description:
            </li>
          )}
          <li>
            <Collapse>
              <Collapse.Panel
                style={{ textAlign: "left" }}
                header="Title:"
                key="1"
              >
                Lorem ipsum dolor sit amet.{i}
              </Collapse.Panel>
            </Collapse>
          </li>
          <li className="mt-[5px] cursor-pointer group overflow-hidden">
            <Collapse>
              <Collapse.Panel
                style={{ textAlign: "left" }}
                header="Intro:"
                key="1"
              >
                <>
                  <p> </p>
                  Lorem ipsum dolor sit amet.{i + 5}
                </>
              </Collapse.Panel>
            </Collapse>
          </li>
          <li className="mt-[5px]">
            <Collapse>
              <Collapse.Panel
                style={{ textAlign: "left" }}
                header="Subcase:"
                key="1"
              >
                {Array(5)
                  .fill("")
                  .map((sub, index) => {
                    return (
                      <div key={`${sub}${index}`}>
                        <a>
                          <strong className=" mr-[4px]">{index + 1}/</strong>
                          Lorem ipsum dolor sit. {index}
                        </a>
                        <br></br>
                      </div>
                    );
                  })}
              </Collapse.Panel>
            </Collapse>
          </li>
        </ul>
      ),
      price:
        width > 1024 ? (
          `120${i}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Price:
            <span className="text-sm font-osr font-normal ml-[4px]">{`120${i}`}</span>
          </strong>
        ),
      image: (
        <div className="  flex items-center xs:justify-center xs:gap-4 lg:gap-3 flex-wrap rounded-md ">
          <Image.PreviewGroup>
            {Array(7)
              .fill("")
              .map((img, index) => (
                <div
                  key={`${img}${index}`}
                  className=" flex items-center gap-2 "
                >
                  <Checkbox />
                  <Image
                    className="object-cover w-[60px] h-[60px]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/img/error.png";
                    }}
                    src={`/assets/img/product-${index + 1}.jpg`}
                    alt=""
                  />
                </div>
              ))}
          </Image.PreviewGroup>
        </div>
      ),
      action: (
        <>
          {width < 1024 && (
            <h4 className="text-center mb-[10px] text-sm font-osr font-semibold">
              Action:
            </h4>
          )}
          <div>
            <button
              className="border-solid border-[#033C73] border p-[6px_12px] text-sm duration-400 transition-colors
              hover:bg-[#033C73] hover:text-white"
            >
              Delete
            </button>
          </div>
        </>
      ),
    });
  }
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
  return (
    <div className="table__dashboard-product ">
      <ModalCreateProduct
        messageAndt={findPath?.success}
        open={openModalAndt}
        add={onAddProduct}
        setShowModal={onShowModal}
        cancel={onCloseModal}
      />
      <div
        className={`  h-fit py-[10px] flex  items-center xs:justify-center  md:justify-between
      gap-3 xs:fixed lg:static md:top-[60px] xs:top-[40px] z-10 xs:bg-gray-100 lg:bg-white xs:px-[15px] lg:px-[30px]
      ${
        toggleSidebar
          ? "xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)] lg:w-[100%] left-[200px]"
          : "xs:w-[calc(100%-120px)] lg:w-[100%]"
      }`}
      >
        <h2 className="text-16px font-mam xs:hidden md:block text-[#033C73]">
          Dashboard Product
        </h2>
        <div className="flex items-center gap-2">
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
          <button
            className=" bg-[#6c973e] text-white rounded-[5px] md:p-[6px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#80B04B] xs:p-[5.5px_11px]"
            onClick={() => onShowModal(MODAL_OPTION.PRODUCT)}
          >
            <span className="xs:text-[16px] md:text-[22px]  font-osr font-bold">
              &#43;
            </span>
            <span className="xs:text-xs md:text-sm font-osr  ">Create New</span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        tableLayout={tableLayout}
        pagination={{
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default DashBoardProduct;
