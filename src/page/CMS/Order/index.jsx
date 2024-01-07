import { OPTION_SORT_ORDER_ANTD } from "@/contants/general";
import { getDetailOrder } from "@/store/reducer/dashboardReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { removeAccents } from "@/utils/removeAccents";
import { localeVN } from "@/utils/timeVN";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, Popconfirm, Spin, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDashboard from "../useDashboard";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import {
  Document,
  Text,
  Page,
  StyleSheet,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import MyPDF from "@/components/MyPDF";

const styles = StyleSheet.create({
  page: {
    marginTop: 30,
    fontSize: 30,
    padding: 20,
  },
  layout: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#228b22",
  },
});
const DashboardOrder = () => {
  const { modalProps, orderProps } = useDashboard();
  const { toggleSidebar, width } = modalProps || {};
  const dispatch = useDispatch();
  const {
    orders,
    statusGetAllOrders,
    detailOrder,
    onDeleteOrder,
    profile,
    onConfirmOrder,
  } = orderProps || {};

  /// State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [controlDrawer, setControlDrawer] = useState();
  const [openPFD, setOpenPDF] = useState(false);
  const [controlPFD, setControlOpenPDF] = useState();
  const [statusButton, setStatusButton] = useState();
  const [titleButton, setTitleButton] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //////
  const handleShowDrawer = (id) => {
    setControlDrawer(id);
    dispatch(getDetailOrder(id));
    setOpenDrawer(true);
  };
  const handleCloseDrawer = (index) => {
    setOpenDrawer(false);
  };
  const handleButtonMessage = (status, title) => {
    setStatusButton(status), setTitleButton(title);
  };
  const handleConfirmOrder = (payload) => {
    onConfirmOrder(payload);
  };
  const handleShowPDF = (id) => {
    setControlOpenPDF(id);
    dispatch(getDetailOrder(id));
    setOpenPDF(true);
  };
  const handleClosePDF = (index) => {
    setOpenPDF(false);
  };
  const handleCancelConfirmOrder = (e) => {
    console.log(e);
  };
  //// handle Table
  const handleOnchangeTableOrder = (
    pagination,
    filter,
    sorter,
    currentTable
  ) => {
    const newCurrentTable = currentTable?.currentDataSource?.map((item) => {
      const value = {
        ...item,
        status: item?.status?.props?.children,
        action: null,
      };
      return value;
    });
    setCurrentTable(newCurrentTable);
    /// handle selected
  };
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
    },
    {
      title: "User",
      dataIndex: "user",
      align: "center",
      filters: orders?.map((item) => {
        return {
          text: item?.user?.email,
          value: item?.user?.email,
        };
      }),
      onFilter: (value, record) => {
        return record?.user?.indexOf(value) === 0;
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
      title: "Status",
      dataIndex: "status",
      align: "center",
      filters: OPTION_SORT_ORDER_ANTD?.map((item) => {
        return {
          text: item?.value,
          value: item?.value,
        };
      }),
      filterSearch: true,
      onFilter: (value, record) => {
        const status = removeAccents(record?.status?.props?.children);
        const newValue = removeAccents(value);
        return status.includes(newValue) === true;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      align: "center",
      sorter: (a, b) => {
        return new Date(b?.orderAt).getTime() - new Date(a?.orderAt).getTime();
      },
      sortDirections: ["descend"],
      ellipsis: true,
    },
    { title: "Action", dataIndex: "action", align: "center" },
  ];
  const data = orders?.map((order, index) => {
    return {
      key: `${order?._id}`,
      statusCurrent: order?.status,
      serial:
        width >= 1024 ? (
          `${index + 1}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Serial:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${
              index + 1
            }`}</span>
          </strong>
        ),
      user:
        width >= 768 ? (
          `${order?.user?.email}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            User:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${order?.user?.email}`}</span>
          </strong>
        ),
      createdAt:
        width >= 768 ? (
          `${localeVN(order?.createdAt)}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            createdAt:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${localeVN(
              order?.createdAt
            )}`}</span>
          </strong>
        ),
      orderAt: order?.createdAt,
      status: (
        <p
          className={`
          ${
            order?.status?.[order?.status?.length - 1]?.type === "canceled"
              ? "text-red-500"
              : ""
          } 
          ${
            order?.status?.[order?.status?.length - 1]?.type === "verifying"
              ? "text-yellow-400"
              : ""
          } 
          ${
            order?.status?.[order?.status?.length - 1]?.type === "verified"
              ? "text-blue-500"
              : ""
          } 
          ${
            order?.status?.[order?.status?.length - 1]?.type === "preparing"
              ? "text-violet-500"
              : ""
          } 
          ${
            order?.status?.[order?.status?.length - 1]?.type === "delivery"
              ? "text-amber-600"
              : ""
          } 
          ${
            order?.status?.[order?.status?.length - 1]?.type === "complete"
              ? "text-green-600"
              : ""
          } 
          `}
        >
          {order?.status?.[order?.status?.length - 1]?.label}
        </p>
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
              onClick={() => {
                handleShowDrawer(order?._id);
              }}
              className="border-solid border-slate-400 border xs:p-[6px_12px] xs:text-sm 
             md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm 
                hover:bg-slate-400 hover:text-white duration-400 transition-colors"
            >
              Chi tiết
            </button>
            {/* <button
              onClick={() => {
                handleShowPDF(order?._id);
              }}
              className="border-solid border-blue-300 border xs:p-[6px_12px] xs:text-sm 
             md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm 
                hover:bg-blue-300 hover:text-white duration-400 transition-colors"
            >
              PDF
            </button> */}
            <Popconfirm
              title={`Xác nhận ${titleButton}`}
              onConfirm={() =>
                handleConfirmOrder({
                  status: statusButton,
                  user_id: order?.user?.user_id,
                  _id: order?._id,
                })
              }
              okType={"default"}
              icon={
                <CheckOutlined
                  style={{
                    color: "green",
                  }}
                />
              }
              onCancel={handleCancelConfirmOrder}
              okText="Yes"
              cancelText="No"
            >
              {order?.status?.[order?.status?.length - 1]?.type ===
              "verifying" ? (
                <button
                  onClick={() => handleButtonMessage("verified", "đơn hàng")}
                  className="border-solid border-blue-500 text-blue-500  border 
                  xs:p-[6px_12px] xs:text-sm md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm 
                  duration-400 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  Xác nhận
                </button>
              ) : (
                ""
              )}
              {order?.status?.[order?.status?.length - 1]?.type ===
              "verified" ? (
                <button
                  onClick={() =>
                    handleButtonMessage("preparing", `chuẩn bị hàng`)
                  }
                  className="border-solid border-violet-500 text-violet-500 border 
                hover:bg-violet-500 hover:text-white  duration-400 transition-colors
                 xs:p-[6px_12px] xs:text-sm md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm "
                >
                  Chuẩn bị
                </button>
              ) : (
                ""
              )}
              {order?.status?.[order?.status?.length - 1]?.type ===
              "preparing" ? (
                <button
                  onClick={() => handleButtonMessage("delivery", `giao hàng`)}
                  className="border-solid border-amber-600 text-amber-600 border 
                hover:bg-amber-600 hover:text-white duration-400 transition-colors
                 xs:p-[6px_12px] xs:text-sm md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm"
                >
                  Giao
                </button>
              ) : (
                ""
              )}
              {order?.status?.[order?.status?.length - 1]?.type ===
              "delivery" ? (
                <button
                  onClick={() => handleButtonMessage("complete", `hoàn thành`)}
                  className="border-solid border-green-600 text-green-600 border
                  xs:p-[6px_12px] xs:text-sm md:p-[4px_8px] md:text-xs lg:p-[6px_12px] lg:text-sm
                hover:bg-green-600 hover:text-white duration-400 transition-colors"
                >
                  Hoàn thành
                </button>
              ) : (
                ""
              )}
            </Popconfirm>
            <Drawer
              key={order?._id}
              bodyStyle={{ padding: 0 }}
              title="Order"
              placement="right"
              onClose={() => handleCloseDrawer(index)}
              open={controlDrawer === order?._id && openDrawer}
            >
              <div className=" w-full xs:p-[0] md:py-[15px] md:px-[20px] md:bg-[#f9f9f9]">
                {width < 768 && (
                  <h3 className="font-osb text-black-333 text-md my-[20px]">
                    Giỏ hàng của bạn
                  </h3>
                )}
                <div className="pb-[20px] border-b border-solid border-[#e2e0e0]">
                  {detailOrder?.products?.length &&
                    detailOrder?.products?.map((item) => {
                      const { image, name, _id, quantity, price, discount } =
                        item || {};
                      return (
                        <div
                          key={_id}
                          className="flex items-center justify-between gap-[15px] not-firstChild:mt-[14px]"
                        >
                          <div className="flex items-center gap-[12px]">
                            <a
                              className="relative min-w-[64px] min-h-[64px] rounded-[6px] border border-solid
                          border-[#e2e0e0] duration-400 transition-colors hover:border-primary group/hover"
                            >
                              <img
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/error.png";
                                }}
                                className="h-full w-full object-cover center-absolute rounded-[6px]"
                                src={image?.[0]}
                                alt=""
                              />

                              <span
                                className="text-xs text-white font-om rounded-[50%] bg-[#908f8f]  h-[22px] w-[22px]
                                       flex items-center justify-center absolute right-[-8px] top-[2px] -translate-y-1/2
                                    group-hover/hover:bg-primary duration-400 transition-colors "
                              >
                                {quantity || 0}
                              </span>
                            </a>

                            <a
                              className="text-sm text-black-333 font-om truncate whitespace-normal line-clamp-4
                           duration-400 transition-colors hover:text-primary"
                            >
                              {name}
                            </a>
                          </div>
                          <div className="text-sm  flex flex-col gap-1 items-center mt-[6px]">
                            <span className="font-osb text-black-333">
                              {formatPriceVND(price - discount)}
                            </span>
                            {discount ? (
                              <span className="line-through font-om text-black-be  leading-[18px]">
                                {formatPriceVND(price)}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                  <div className="flex items-center justify-between ">
                    <h4 className="font-osb text-sm text-black-333">
                      Tổng chưa giảm giá
                    </h4>
                    <p className="font-osb text-sm text-primary tracking-wider">
                      {formatPriceVND(detailOrder?.subTotal)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-[20px]">
                    <h4 className="font-osb text-sm text-black-333">
                      Vận chuyển
                    </h4>
                    {detailOrder?.shipping?.label && (
                      <p className="capitalize font-osb text-sm text-primary">
                        {detailOrder?.shipping?.label}
                      </p>
                    )}
                  </div>
                </div>
                {detailOrder?.discount?.hasOwnProperty("price") && (
                  <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                    <div className="flex items-start justify-between font-osb text-sm text-black-333">
                      <p>Tổng giảm giá</p>
                      <p className="text-primary tracking-wider">
                        -
                        {detailOrder?.total >= 3 * 1000000 &&
                        detailOrder?.shipping?.price > 0
                          ? formatPriceVND(
                              detailOrder?.discount?.price +
                                detailOrder?.shipping?.price
                            )
                          : formatPriceVND(detailOrder?.discount?.price)}
                      </p>
                    </div>
                    <div className="flex items-start justify-between mt-[14px] ">
                      <p className="pl-[6px] font-om text-[12px] text-black-333">
                        {`1. ` + detailOrder?.discount?.type}
                      </p>
                      <p className="font-osb text-[12px] text-black-333 tracking-wider">
                        {formatPriceVND(detailOrder?.discount?.price)}
                      </p>
                    </div>
                    <div className="flex items-start justify-between mt-[14px] ">
                      <p className="pl-[6px] font-om text-[12px] text-black-333 ">
                        {` ${
                          detailOrder?.subTotal >= 3 * 1000000 &&
                          detailOrder?.shipping?.price > 0
                            ? `2. Miễn phí vận chuyển`
                            : ""
                        } `}
                      </p>
                      <p className="font-osb text-[12px] text-black-333 tracking-wider">
                        {` ${
                          detailOrder?.subTotal >= 3 * 1000000 &&
                          detailOrder?.shipping?.price > 0
                            ? formatPriceVND(detailOrder?.shipping?.price)
                            : ""
                        }`}
                      </p>
                    </div>
                  </div>
                )}
                <div className=" py-[20px] flex items-center justify-between">
                  <h4 className="font-osb text-md text-black-333">Tổng cộng</h4>
                  <p className="font-osb text-md text-primary tracking-wider">
                    {formatPriceVND(detailOrder?.total)}
                  </p>
                </div>
              </div>
            </Drawer>
            {/* <Drawer
              size="large"
              key={`pdf-drawer-${order?._id}`}
              bodyStyle={{ padding: 0 }}
              title=" Giỏ hàng của bạn"
              placement="right"
              onClose={handleClosePDF}
              open={controlPFD === order?._id && openPFD}
            >
              <MyPDF detailOrder={order}></MyPDF>
            </Drawer> */}
          </div>
        </>
      ),
    };
  });
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_INVERT,
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
    ],
  };
  const filterOrder = data?.filter((item) => {
    return selectedRowKeys.indexOf(item.key) !== -1;
  });
  const handleDeleteOrderSelected = () => {
    for (let index = 0; index < filterOrder.length; index++) {
      onDeleteOrder(filterOrder[index]?.key);
    }
  };
  //// handle Table excel
  const [currentTable, setCurrentTable] = useState();
  const newData = data?.map((item) => {
    const value = {
      ...item,
      status: item?.status?.props?.children,
      action: null,
    };
    return value;
  });
  const newColumn = columns?.filter((col) => {
    return col?.title !== "Action";
  });
  const handleClick = () => {
    const excel = new Excel();
    console.log("excel-->1", excel);
    excel
      .addSheet("test")
      .addColumns(newColumn)
      .addDataSource(currentTable || newData, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
    console.log("excel-->2", excel);
  };
  //// loading
  // useEffect(() => {
  //   return (
  //     <div className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center">
  //       <Spin size="default" />
  //     </div>
  //   );
  // }, []);

  return (
    <div className="table__dashboard table__dashboard-order">
      <div
        className={`  h-fit  flex items-center xs:justify-center  md:justify-between
      gap-3 xs:fixed lg:static top-[60px] z-10 xs:bg-gray-100 lg:bg-white xs:px-[15px] lg:px-[30px] py-[14px]
      ${
        toggleSidebar
          ? "xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)] lg:w-[100%] left-[200px]"
          : "xs:w-[100%]"
      }`}
      >
        <h2 className="text-16px font-mam xs:hidden md:block text-[#033C73]">
          Dashboard Order
        </h2>
        <div className="flex items-center gap-2  md:justify-normal xs:justify-center">
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
            onClick={handleDeleteOrderSelected}
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
            onClick={handleClick}
          >
            <span className="xs:text-xs md:text-sm font-osr  ">Excel</span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        tableLayout={"auto"}
        pagination={{
          pageSize: width >= 768 ? 12 : 8,
          total: data,
          position: ["bottomCenter"],
        }}
        key={`cms/order`}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={handleOnchangeTableOrder}
      />
    </div>
  );
};

export default DashboardOrder;
