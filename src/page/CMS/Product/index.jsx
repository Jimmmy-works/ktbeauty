import { MODAL_OPTION } from "@/contants/general";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { getAllProduct } from "@/store/reducer/productReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { removeAccents } from "@/utils/removeAccents";
import { dateVN } from "@/utils/timeVN";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Image, Input, Slider, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDashboard from "../useDashboard";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import styled from "styled-components";
const StyleImage = styled.div`
  .ant-image-mask {
    border-radius: 6px;
  }
`;
const DashBoardProduct = () => {
  const dispatch = useDispatch();
  const { modalProps, productProps } = useDashboard();
  const { onDeleteProduct, statusGetAllProducts, totalProducts } =
    productProps || {};
  const {
    onShowModal,
    onCloseModal,
    openModalAndt,
    toggleSidebar,
    width,
    products,
    ///
  } = modalProps || {};
  const [valueSlider, setValueSiler] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const onChangeSlider = (value) => {
    setValueSiler(value);
  };
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      key: 1,
    },
    {
      title: "Name",
      key: 2,
      dataIndex: "name",
      align: "center",
      onFilter: (value, record) => {
        if (width >= 768) {
          const name = removeAccents(record?.name);
          const newValue = removeAccents(value);
          return name.includes(newValue) === true;
        } else {
          const name = removeAccents(
            record?.name?.props?.children?.[1]?.props?.children
          );
          const newValue = removeAccents(value);
          return name.includes(newValue) === true;
        }
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => {
        return (
          <div className="p-[10px] flex flex-col gap-2">
            <label className="font-ossb">Search Name </label>
            <Input
              name="name"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onBlur={() => {
                confirm();
              }}
              autoFocus={true}
              placeholder="Search..."
            />
            <div className="flex gap-1 items-center">
              <Button
                onClick={() => {
                  confirm();
                }}
                type="default"
                title="Search"
              >
                Search
              </Button>
              <Button
                type="dashed"
                title="Search"
                onClick={() => {
                  clearFilters();
                  close();
                  confirm();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      key: 3,
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      key: 4,
      onFilter: (value, record) => {
        if (
          record?.priceCurrent >= searchTerm[0] * 1000 &&
          record?.priceCurrent <= searchTerm[1] * 1000
        ) {
          return record;
        }
      },
      filterDropdown: ({
        setSelectedKeys,
        // selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => {
        return (
          <div className="p-[10px] flex flex-col gap-2">
            <label className="font-ossb">Search Price </label>
            <Slider
              range
              value={valueSlider}
              min={100}
              max={20000}
              step={100}
              defaultValue={[0, 2000]}
              onChange={(values) => {
                onChangeSlider(values);
                setSelectedKeys(searchTerm || []);
              }}
            />
            <div className="flex gap-3 ">
              <div className="flex items-center  gap-1 ">
                <strong className="font-om">Min:</strong>
                <p className="font-osr">{valueSlider?.[0]}</p>
              </div>
              <div className="flex items-center  gap-1 ">
                <strong className="font-om">Max:</strong>
                <p className="font-osr">{valueSlider?.[1]}</p>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <Button
                onClick={() => {
                  confirm();
                }}
                type="default"
                title="Search"
              >
                Search
              </Button>
              <Button
                type="dashed"
                title="Search"
                onClick={() => {
                  setSelectedKeys([0, 20000]);
                  onChangeSlider([0, 20000]);
                  clearFilters();
                  close();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: "CreateAt ",
      dataIndex: "createdAt",
      align: "center",
      key: 5,
      sorter: (a, b) =>
        new Date(b?.createdProduct).getTime() -
        new Date(a?.createdProduct).getTime(),
      sortDirections: ["descend"],
      ellipsis: true,
    },
  ];
  const data = products?.map((product, index) => {
    return {
      key: `${product?._id}`,
      priceCurrent: product?.price,
      createdProduct: product?.createdAt,
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
      price:
        width >= 768 ? (
          `${formatPriceVND(product?.price)}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Price:
            <span className="text-sm font-osr font-normal ml-[4px]">
              ${formatPriceVND(product?.price)}
            </span>
          </strong>
        ),
      createdAt:
        width >= 768 ? (
          `${dateVN(product?.createdAt)} `
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Create At:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${dateVN(
              product?.createdAt
            )}`}</span>
          </strong>
        ),
      name:
        width >= 768 ? (
          `${product?.name}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Name:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${product?.name}`}</span>
          </strong>
        ),
      image: (
        <div className="flex items-center xs:justify-center xs:gap-4 lg:gap-3 flex-wrap  ">
          <Image.PreviewGroup>
            {Array(product?.image?.length < 4 ? product?.image?.length : 2)
              ?.fill(product?.image)
              ?.map((item, index) => {
                return (
                  <StyleImage
                    key={`${index}`}
                    className="flex items-center gap-2 "
                  >
                    <Image
                      placeholder={
                        <div className="bg-black-ebe w-full h-full rounded-md"></div>
                      }
                      style={{ borderRadius: "6px" }}
                      className="object-cover w-[60px] h-[60px] rounded-md"
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
                  </StyleImage>
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
        onDeleteProduct(filterProducts[index]?.key);
      }
  };
  const handleDelectSelected = () => {
    handleDeleteProductSelected();
  };
  const findUpdateProduct = products?.find(
    (item) => item?._id === selectedRowKeys.toString()
  );
  const handleOnchangeTable = (pagination, filters, sorter, extra, e) => {
    console.log(e);
  };
  useEffect(() => {
    onChangeSlider([0, 2000]);
  }, []);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setSearchTerm(valueSlider);
    }, 500);
    return () => clearTimeout(myTimeout);
  }, [searchTerm, valueSlider]);
  const onChangePagination = (pageNumber) => {
    const payloadPagination = {
      limit: 9,
      page: pageNumber - 1,
    };
    setPageCurrent(pageNumber);
    if (pageNumber) {
      dispatch(getAllProduct(payloadPagination));
    }
  };
  if (statusGetAllProducts !== THUNK_STATUS.fulfilled) {
    return (
      <div className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center">
        <Spin size="default" />
      </div>
    );
  }

  return (
    <div className="table__dashboard table__dashboard-product ">
      <ModalCreateProduct
        key={`modal-product-1`}
        {...productProps}
        open={openModalAndt}
        onShowModal={onShowModal}
        cancel={onCloseModal}
      />
      <ModalUpdateProduct
        key={`modal-product-2`}
        productDetail={findUpdateProduct}
        {...productProps}
        open={openModalAndt}
        onShowModal={onShowModal}
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
            onClick={() => {
              if (selectedRowKeys?.length < 1) {
                message.error(`Chọn sản phẩm cần xóa`);
              } else {
                handleDelectSelected();
              }
            }}
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

      {statusGetAllProducts === THUNK_STATUS.fulfilled ? (
        <Table
          style={{ verticalAlign: "middle" }}
          key={`cms/product`}
          tableLayout={"auto"}
          pagination={{
            pageSize: 9,
            total: totalProducts,
            position: ["bottomCenter"],
            onChange: onChangePagination,
            current: Number(pageCurrent || 1),
          }}
          onChange={handleOnchangeTable}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DashBoardProduct;
