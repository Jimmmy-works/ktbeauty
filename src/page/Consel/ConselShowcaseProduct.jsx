import {
  getAllCategories,
  getAllProduct,
} from "@/store/reducer/productReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { removeAccents } from "@/utils/removeAccents";
import { dateVN } from "@/utils/timeVN";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Image, Input, Slider, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
const StyleImage = styled.div`
  .ant-image-mask {
    border-radius: 6px;
  }
`;
const ConselShowcaseProduct = ({ width }) => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [valueSlider, setValueSiler] = useState();
  const onChangeSlider = (value) => {
    setValueSiler(value);
  };
  const customCategories = categories?.map((cate) => cate?._id);
  const columns = [
    {
      title: "Stt",
      dataIndex: "serial",
      align: "center",
      key: 1,
      width: 50,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      align: "center",
      key: 6,

      filters: categories?.map((item) => {
        return {
          text: item?.name,
          value: item?._id,
        };
      }),
      onFilter: (value, record) => {
        const findAll = categories?.find((cate) => cate?.name === "all");
        if (value === findAll?._id) {
          return record;
        } else {
          return record?.category_id === value;
        }
      },
    },
    {
      title: "Tên sản phẩm",
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
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      key: 3,
    },
    {
      title: "Giá",
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
      title: "Thêm sản phẩm",
      dataIndex: "createdAt",
      align: "center",
      key: 5,
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
      createdAt: <Button className="font-osr">Thêm vào giỏ</Button>,
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
            {Array(1)
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
      category_id: product?.category_id?._id,
      category: product?.category_id?.name,
    };
  });
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategories());
  }, []);
  useEffect(() => {
    onChangeSlider([0, 2000]);
  }, []);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setSearchTerm(valueSlider);
    }, 500);
    return () => clearTimeout(myTimeout);
  }, [searchTerm, valueSlider]);
  return (
    <div className="table__dashboard ">
      <Table
        key={`page/consel`}
        style={{ verticalAlign: "middle" }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
      {/* <Table
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
         /> */}
    </div>
  );
};

export default ConselShowcaseProduct;
