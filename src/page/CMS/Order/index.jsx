import SelectCustom from "@/components/Select/SelectCustom";
import { getDetailOrder } from "@/store/reducer/dashboardReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import { CheckOutlined } from "@ant-design/icons";
import { Drawer, Popconfirm, Table } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useDashboard from "../useDashboard";
const TableStyle = styled.div`
  .ant-table-cell {
    vertical-align: middle;
  }
  .ant-table {
    min-height: 750px;
  }
`;
const DashboardOrder = () => {
  const { modalProps, userProps, orderProps } = useDashboard();
  const { onShowModal, toggleSidebar, width } = modalProps || {};
  const dispatch = useDispatch();
  const {
    orders,
    detailOrder,
    onDeleteOrder,
    profile,
    onConfirmOrder,
    optionSortOrderCMS,
    onChangeSelectOrder,
    onSortOrder,
    optionSortSelectedOrder,
  } = orderProps || {};
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      align: "center",
    },
    {
      title: "OrderID",
      dataIndex: "orderid",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
    },

    { title: "Action", dataIndex: "action", align: "center" },
  ];
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleShowDrawer = (id) => {
    dispatch(getDetailOrder(id));
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const [statusButton, setStatusButton] = useState();
  const [titleButton, setTitleButton] = useState();
  const handleButtonMessage = (status, title) => {
    setStatusButton(status), setTitleButton(title);
  };
  const handleConfirmOrder = (payload) => {
    onConfirmOrder(payload);
  };
  const handleCancelConfirmOrder = (e) => {
    console.log(e);
  };

  const data = onSortOrder?.map((order, index) => {
    return {
      key: `${order?._id}`,
      user:
        width >= 768 ? (
          `${order?.user?.email}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Key:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${order?._id}`}</span>
          </strong>
        ),
      orderid:
        width > 1024 ? (
          `${order?.user?.user_id}`
        ) : (
          <strong className="text-sm font-osr font-semibold ">
            Id:
            <span className="text-sm font-osr font-normal ml-[4px]">{`${order?.user?.user_id}`}</span>
          </strong>
        ),
      status:
        width > 1024 ? (
          <p
            className={`
          ${order?.status === "Đã hủy đơn" ? "text-red-500" : ""} 
          ${order?.status === "Đang xác minh" ? "text-yellow-400" : ""} 
          ${order?.status === "Đã xác minh" ? "text-blue-500" : ""} 
          ${order?.status === "Đang chuẩn bị hàng" ? "text-violet-500" : ""} 
          ${order?.status === "Đang giao hàng" ? "text-amber-600" : ""} 
          ${order?.status === "Hoàn thành đơn hàng" ? "text-green-600" : ""} 
          `}
          >
            {order?.status}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <strong className="text-sm font-osr font-semibold ">Status:</strong>
            <p
              className={`
            ${order?.status === "Đã hủy đơn" ? "text-red-500" : ""} 
            ${order?.status === "Đang xác minh" ? "text-yellow-400" : ""} 
            ${order?.status === "Đã xác minh" ? "text-blue-500" : ""} 
            ${order?.status === "Đang chuẩn bị hàng" ? "text-violet-500" : ""} 
            ${order?.status === "Đang giao hàng" ? "text-amber-600" : ""} 
            ${order?.status === "Hoàn thành đơn hàng" ? "text-green-600" : ""} 
            `}
            >
              {order?.status}
            </p>
          </div>
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
              className="border-solid border-slate-400 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-slate-400 hover:text-white"
            >
              Chi tiết
            </button>
            <Popconfirm
              title={`Xác nhận ${titleButton}`}
              onConfirm={() =>
                handleConfirmOrder({
                  status: statusButton,
                  _id: order?._id,
                  user_id: profile?._id,
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
              {order?.status === "Đang xác minh" ? (
                <button
                  onClick={() => handleButtonMessage("Đã xác minh", `đơn hàng`)}
                  className="border-solid border-blue-500 text-blue-500  border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-blue-500 hover:text-white"
                >
                  Xác nhận
                </button>
              ) : (
                ""
              )}

              {order?.status === "Đã xác minh" ? (
                <button
                  onClick={() =>
                    handleButtonMessage("Đang chuẩn bị hàng", `chuẩn bị hàng`)
                  }
                  className="border-solid border-violet-500 text-violet-500 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-violet-500 hover:text-white"
                >
                  Chuẩn bị
                </button>
              ) : (
                ""
              )}
              {order?.status === "Đang chuẩn bị hàng" ? (
                <button
                  onClick={() =>
                    handleButtonMessage("Đang giao hàng", `giao hàng`)
                  }
                  className="border-solid border-amber-600 text-amber-600 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-amber-600 hover:text-white"
                >
                  Giao
                </button>
              ) : (
                ""
              )}

              {order?.status === "Đang giao hàng" ? (
                <button
                  onClick={() =>
                    handleButtonMessage("Hoàn thành đơn hàng", `hoàn thành`)
                  }
                  className="border-solid border-green-600 text-green-600 border p-[6px_12px] text-sm duration-400 transition-colors
                hover:bg-green-600 hover:text-white"
                >
                  Hoàn thành
                </button>
              ) : (
                ""
              )}
            </Popconfirm>
            <Drawer
              bodyStyle={{ padding: 0 }}
              title="Order"
              placement="left"
              onClose={handleCloseDrawer}
              open={openDrawer}
            >
              <div className="w-full xs:p-[0] md:py-[15px] md:px-[20px] md:bg-[#f9f9f9]">
                {width < 768 && (
                  <h3 className="font-osb text-black-333 text-md my-[20px]">
                    Giỏ hàng của bạn
                  </h3>
                )}
                <div className="pb-[20px] border-b border-solid border-[#e2e0e0]">
                  {detailOrder?.products?.length &&
                    detailOrder?.products?.map((item, index) => {
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
                          <p className="text-xs text-primary font-osb">
                            <div className=" text-xs text-primary font-osb flex gap-1 items-center justify-center">
                              <span className="line-through text-black-555">
                                {formatPriceVND(price)}
                              </span>
                              <span className="text-sm">
                                {formatPriceVND(price - discount)}
                              </span>
                            </div>
                          </p>
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
                  <p className="font-osb text-md text-primary ">
                    {formatPriceVND(detailOrder?.total)}
                  </p>
                </div>
              </div>
            </Drawer>
          </div>
        </>
      ),
    };
  });

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
  return (
    <TableStyle className="table__dashboard-order">
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
          <SelectCustom
            padding={`py-[13px]`}
            className={`min-w-[180px]`}
            onChangeSort={onChangeSelectOrder}
            data={optionSortOrderCMS}
          />
          <button
            className=" bg-[#b05a4b] text-white rounded-[5px] md:p-[11.5px_12px]  duration-400 transition-colors
          flex items-center gap-1 hover:bg-[#f84e4e] xs:p-[8px]"
            onClick={handleDeleteOrderSelected}
          >
            <span className="xs:text-xs md:text-sm font-osr  ">
              Delete Seleted
            </span>
          </button>
        </div>
      </div>
      <Table
        style={{ verticalAlign: "middle" }}
        pagination={{
          pageSize: 12,
          total: Number(orders?.length),
          position: ["bottomCenter"],
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </TableStyle>
  );
};

export default DashboardOrder;
