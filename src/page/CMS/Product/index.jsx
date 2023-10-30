import React, { useEffect, useState } from "react";
import useDashboard from "../useDashboard";
import { Checkbox, Collapse, Image, Table } from "antd";
import ModalCreateProduct from "./ModalCreateProduct";
import { MODAL_OPTION } from "@/contants/general";
import { formatPriceVND } from "@/utils/formatPrice";

const DashBoardProduct = () => {
  const { modalProps, productProps } = useDashboard();
  const { onDeleteProduct } = productProps || {};
  const {
    findPath,
    onShowModal,
    onCloseModal,
    openModalAndt,
    onAddProduct,
    toggleSidebar,
    width,
    products,
  } = modalProps || {};
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
  const data = products.map((product, index) => {
    return {
      key: product?._id,
      productid:
        width > 1024 ? (
          `${product?._id}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Id:{" "}
            <span className="text-sm font-osr font-normal ml-[4px]">{`${product?._id}`}</span>
          </strong>
        ),
      name:
        width > 1024 ? (
          `${product?.name}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Name:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${product?.name}`}</span>
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
                header="Heading"
                key="1"
              >
                {product?.description?.heading}
              </Collapse.Panel>
            </Collapse>
          </li>
          <li className="mt-[5px] cursor-pointer group overflow-hidden">
            <Collapse>
              <Collapse.Panel
                style={{ textAlign: "left" }}
                header="Subcase"
                key="1"
              >
                {product?.description?.subDesc?.length &&
                  product?.description?.subDesc.map((sub, index) => {
                    return (
                      <div key={`${sub}${index}`}>
                        <a>
                          <strong className=" mr-[4px]">{index + 1}/</strong>
                          {sub || ""}
                        </a>
                        <br></br>
                      </div>
                    );
                  })}
              </Collapse.Panel>
            </Collapse>
          </li>
          <li className="mt-[5px]">
            <Collapse>
              <Collapse.Panel
                style={{ textAlign: "left" }}
                header="Intro"
                key="1"
              >
                <>
                  <p> </p>
                  {product?.description?.intro}
                </>
              </Collapse.Panel>
            </Collapse>
          </li>
        </ul>
      ),
      price:
        width > 1024 ? (
          `${formatPriceVND(product?.price)}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Price:
            <span className="text-sm font-osr font-normal ml-[4px]">{`120$`}</span>
          </strong>
        ),
      image: (
        <div className="  flex items-center xs:justify-center xs:gap-4 lg:gap-3 flex-wrap rounded-md ">
          <Image.PreviewGroup>
            {Array(product?.image?.length)
              ?.fill(product?.image)
              ?.map((item, index) => {
                return (
                  <div key={item?._id} className=" flex items-center gap-2 ">
                    <Checkbox />
                    <Image
                      className="object-cover w-[60px] h-[60px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/error.png";
                      }}
                      src={
                        product?.image?.length
                          ? item?.[index]
                          : "/assets/img/error.png"
                      }
                      alt=""
                    />
                  </div>
                );
              })}
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
  const filterProducts = data?.filter((item) => {
    return selectedRowKeys.indexOf(item.key) !== -1;
  });
  const handleDeleteProductSelected = () => {
    for (let index = 0; index < filterProducts.length; index++) {
      onDeleteProduct(filterProducts[index]?.productid);
    }
  };
  return (
    <div className="table__dashboard-product ">
      <ModalCreateProduct
        {...productProps}
        messageAndt={findPath?.success}
        open={openModalAndt}
        add={onAddProduct}
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
          Dashboard Product
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteProductSelected}
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
            <span className="xs:text-xs md:text-sm font-osr  ">
              Create Product
            </span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        tableLayout={"auto"}
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
