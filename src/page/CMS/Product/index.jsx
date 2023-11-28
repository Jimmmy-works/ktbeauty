import { MODAL_OPTION } from "@/contants/general";
import { formatPriceVND } from "@/utils/formatPrice";
import { Image, Table, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useDashboard from "../useDashboard";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import styled from "styled-components";
import productService from "@/service/productService";
import useQuery from "@/hooks/useQuery";

const TableStyle = styled.div`
  .ant-table {
    min-height: 750px;
  }
`;
const DashBoardProduct = () => {
  const { modalProps, productProps } = useDashboard();
  const { onDeleteProduct, searchProducts } = productProps || {};
  const {
    onShowModal,
    onCloseModal,
    openModalAndt,
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
      title: "Price",
      dataIndex: "price",
      align: "center",
    },
  ];
  const data = searchProducts.map((product, index) => {
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
        <div className="flex items-center xs:justify-center xs:gap-4 lg:gap-3 flex-wrap rounded-md ">
          <Image.PreviewGroup>
            {Array(product?.image?.length)
              ?.fill(product?.image)
              ?.map((item, index) => {
                return (
                  <div key={item?._id} className=" flex items-center gap-2 ">
                    {/* <Checkbox value={item[index]} onChange={onSelectImages} /> */}
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
    if (selectedRowKeys)
      for (let index = 0; index < filterProducts.length; index++) {
        onDeleteProduct(filterProducts[index]?.productid);
      }
  };
  const handleDelectSelected = () => {
    handleDeleteProductSelected();
  };
  const findUpdateProduct = products?.find(
    (item) => item?._id === selectedRowKeys.toString()
  );
  // const _limit = 9;
  // const _page = 0;
  // const { data: dataProducts, loading: loadingProducts } = useQuery(() =>
  //   productService.getAllProduct({ limit: _limit, page: _page })
  // );
  return (
    <div className="table__dashboard-product ">
      <ModalCreateProduct
        {...productProps}
        open={openModalAndt}
        setShowModal={onShowModal}
        cancel={onCloseModal}
      />
      <ModalUpdateProduct
        productDetail={findUpdateProduct}
        {...productProps}
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
          Dashboard Product
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelectSelected}
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
          <button
            onClick={() => {
              if (selectedRowKeys?.length > 1) {
                message.error(`Không thể thay đổi nhiều sản phẩm trong 1 lần`);
              } else if (!selectedRowKeys?.length) {
                message.error(`Chọn sản phẩm cần thay đổi`);
              } else {
                onShowModal(MODAL_OPTION.PRODUCT.UPDATE);
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
            onClick={() => onShowModal(MODAL_OPTION.PRODUCT.CREATE)}
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
      <TableStyle>
        <Table
          style={{ verticalAlign: "middle", minHeight: "800px" }}
          rootClassName=""
          tableLayout={"auto"}
          pagination={{
            pageSize: 7,
            total: Number(products?.length),
            position: ["bottomCenter"],
          }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </TableStyle>
    </div>
  );
};

export default DashBoardProduct;
