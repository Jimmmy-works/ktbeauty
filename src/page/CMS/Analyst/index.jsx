import { monthNameVN } from "@/contants/general";
import useQuery from "@/hooks/useQuery";
import { formatPriceVND } from "@/utils/formatPrice";
import {
  currentDayInMonth,
  endDay,
  endMonth,
  startMonth,
  startToEndInYear,
  zeroDay,
  zeroTimeToday,
} from "@/utils/timeISOString";
import { localeVN } from "@/utils/timeVN";
import { DatePicker, Image, Select, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import queryString from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import useDashboard from "../useDashboard";

import dashboardService from "@/service/dashboardService";
const StyleImage = styled.div`
  .ant-image-mask {
    border-radius: 6px;
  }
`;
const CustomCalendar = styled.div`
  display: flex !important;
  width: auto;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 10px;
  .ant-picker {
    width: auto !important;
    padding: 6px 10px !important;
    border-radius: 4px;
  }
  .ant-picker-range-separator,
  .ant-picker-input {
    display: none;
  }
  .ant-picker-suffix {
    margin-left: 0;
  }
`;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Legend
);
const DashboardAnalyst = () => {
  const { modalProps, analystProps } = useDashboard();
  const {
    onShowModal,
    onCloseModal,
    openModalAndt,
    toggleSidebar,
    width,
    products,
  } = modalProps || {};
  const {
    soldProducts,
    revenue,
    inventory,
    onGetSoldProducts,
    onGetInventory,
    onGetRevenue,
    categories,
  } = analystProps || {};
  const million = 1000000;
  ////// State
  const [revenueObj, setRevenueObj] = useState({});
  const [soldProductObj, setSoldProductObj] = useState({});
  const [revenueFilter, setRevenueFilter] = useState({});
  const [soldProductFilter, setSoldProductFilter] = useState({});
  const [inventoryObj, setInventoryObj] = useState({});
  const [renderLimitTopSold, setRenderLimitTopSold] = useState("");
  const [renderLimitTopCountInStock, setRenderLimitTopCountInStock] =
    useState("");
  ///// handle Analyst
  /// call API
  const handleRevenue = async () => {
    try {
      const today = await onGetRevenue({
        startDate: zeroTimeToday,
        endDate: endDay,
        limit: 100000,
        page: 0,
      });
      // const startToCurrent = await onGetRevenue({
      //   startDate: startMonth,
      //   endDate: currentDayInMonth,
      // });
      const zeroDayToCurrentDay = await onGetRevenue({
        startDate: zeroDay,
        endDate: currentDayInMonth,
        limit: 100000,
        page: 0,
      });
      const allDayInYear = await onGetRevenue({
        startDate: zeroDay,
        endDate: startToEndInYear,
        limit: 100000,
        page: 0,
      });
      const currentMonth = await onGetRevenue({
        startDate: startMonth,
        endDate: endMonth,
        limit: 100000,
        page: 0,
      });
      setRevenueObj({
        today: today,
        // startToCurrent: startToCurrent,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        allDayInYear: allDayInYear,
        currentMonth: currentMonth,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSoldProducts = async () => {
    try {
      const today = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: zeroTimeToday,
        endDate: endDay,
      });
      const zeroDayToCurrentDay = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: zeroDay,
        endDate: currentDayInMonth,
      });
      const allDayInYear = await onGetSoldProducts({
        startDate: zeroDay,
        endDate: startToEndInYear,
        limit: 100000,
        page: 0,
      });
      const currentMonth = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: startMonth,
        endDate: endMonth,
      });
      setSoldProductObj({
        today: today,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        allDayInYear: allDayInYear,
        currentMonth: currentMonth,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCountInStock = async () => {
    try {
      const totalProducts = await onGetInventory(
        `?${queryString.stringify({
          limit: 10,
          type: "top-in-stock",
        })}`
      );
      setInventoryObj({
        totalProducts: totalProducts,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  /// custom render Chart
  const customDataRevenueBar = useMemo(() => {
    if (Object?.keys(revenueFilter)?.length) {
      return revenueFilter?.data?.data?.map((month) => Math.round(month?.data));
    } else if (
      !Object?.keys(revenueFilter)?.length &&
      Object?.keys(revenueObj)?.length
    ) {
      return revenueObj?.currentMonth?.data?.map((month) =>
        Math.round(month?.data)
      );
    } else if (
      Object.keys(revenueObj).length < 1 &&
      Object.keys(revenueFilter).length < 1
    ) {
      return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
    }
  }, [revenueFilter, revenueObj]);
  const customDataSoldProductLine = useMemo(() => {
    if (Object?.keys(soldProductFilter)?.length) {
      return soldProductFilter?.data?.data?.map((month) =>
        Math.round(month?.sold)
      );
    } else if (
      !Object?.keys(soldProductFilter)?.length &&
      Object?.keys(soldProductObj)?.length
    ) {
      return soldProductObj?.currentMonth?.data?.map((month) =>
        Math.round(month?.sold)
      );
    } else if (
      Object.keys(soldProductObj).length < 1 &&
      Object.keys(soldProductFilter).length < 1
    ) {
      return [100, 250, 300, 450, 500, 650, 700, 850, 900, 1050, 1100, 1250];
    }
  }, [soldProductObj, soldProductFilter]);
  const customLabelRevenueBar = useMemo(() => {
    if (Object?.keys(revenueFilter)?.length) {
      return revenueFilter?.data?.data?.map((month) => {
        return `${month?.date?.day
          ?.toString()
          ?.padStart(2, 0)}/${month?.date?.month?.toString()?.padStart(2, 0)}/${
          month?.date?.year
        }`;
      });
    } else if (
      !Object?.keys(revenueFilter)?.length &&
      Object?.keys(revenueObj)?.length
    ) {
      return revenueObj?.currentMonth?.data?.map((time) => {
        return `${time?.date?.day
          ?.toString()
          ?.padStart(2, 0)}/${time?.date?.month?.toString()?.padStart(2, 0)}/${
          time?.date?.year
        }`;
      });
    } else if (
      Object.keys(revenueObj).length < 1 &&
      Object.keys(revenueFilter).length < 1
    ) {
      return monthNameVN?.map((item) => item);
    }
  }, [revenueFilter, revenueObj]);
  const customLabelSoldLine = useMemo(() => {
    if (Object?.keys(soldProductFilter)?.length) {
      return soldProductFilter?.data?.data?.map((time) => {
        return `${time.sold}`;
      });
    } else if (
      !Object?.keys(soldProductFilter)?.length &&
      Object?.keys(soldProductObj)?.length
    ) {
      return soldProductObj?.currentMonth?.data?.map((time) => {
        return `${time.sold}`;
      });
    } else if (
      Object.keys(soldProductObj).length < 1 &&
      Object.keys(soldProductFilter).length < 1
    ) {
      return monthNameVN?.map((item) => item);
    }
  }, [soldProductFilter, soldProductObj]);
  /// data Chart
  const dataBars = {
    labels: customLabelRevenueBar,
    datasets: [
      {
        type: "bar",
        label: "Doanh thu",
        data: customDataRevenueBar,
        borderColor: "rgba(53, 162, 235,1)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        hoverBackgroundColor: "rgba(53, 162, 235,1)",
      },
    ],
  };
  const dataLines = {
    labels: Object.keys(soldProductFilter).length
      ? [
          `${localeVN(soldProductFilter?.start?.localeDate)} - ${localeVN(
            soldProductFilter?.end?.localeDate
          )}`,
        ]
      : monthNameVN?.map((month) => month),
    datasets: [
      {
        fill: true,
        type: "line",
        label: "Đã bán",
        data: customDataSoldProductLine,
        borderColor: "##2ee8a0",
        borderWidth: 1,
        backgroundColor: "#62DAAB",
        hoverBackgroundColor: "#46f3b1",
        yAxisID: "y",
      },
    ],
  };
  const dataPies = {
    labels: categories?.map((cate) => cate?.label),
    datasets: [
      {
        type: "doughnut",
        label: "Danh mục sản phẩm bán được",
        data: categories?.map((cate) => cate?.totalProduct),
        backgroundColor: [
          "rgba(255, 99, 132,.2)",
          "rgba(255, 206, 86,.2)",
          "rgba(54, 162, 235,.2)",
          "rgba(152, 84, 99,.2)",
          "rgba(229, 229, 229, 0.2)",
          "rgba(75, 192, 192,.2)",
          "rgba(44, 129, 189, 0.2)",
          "rgba(153, 102, 255,.2)",
          "rgba(255, 159, 64,.2)",
          "rgba(173, 194, 65,.2)",
          "rgba(241, 176, 218,.2)",
          "rgba(60, 40, 75, .2)",
          "rgba(59, 4, 170, 0.5)",
          "#323232",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(152, 84, 99, 0.6)",
          "rgba(229, 229, 229, 0.7)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(20, 57, 83, 0.2)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(173, 194, 65, 0.7)",
          "rgba(241, 176, 218, 0.7)",
          "rgba(60, 40, 75, 0.4)",
          "rgba(77, 10, 211, 0.4)",
          "rgba(40, 40, 39, 0.4)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(152, 84, 99, 1)",
          "#585757",
          "rgba(75, 192, 192, 1)",
          "rgba(20, 57, 83, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(173, 194, 65, 1)",
          "rgba(241, 176, 218, 1)",
          "rgba(60, 40, 75, 1)",
          "rgba(59, 4, 170, 1)",
          "#000000",
        ],
        borderWidth: Object.keys(soldProductFilter).length ? 0 : 1,
      },
    ],
  };
  /// resizeChart
  const resizeChart = useMemo(() => {
    if (width >= 768) {
      return 650;
    } else if (width < 768 && width >= 568) {
      return 500;
    } else if (width < 568) {
      return 400;
    }
  }, [width]);
  /// handle Chart Calendar
  const onChangeDatePickerRevenue = async (dates, dateStrings) => {
    const startDates = dates?.[0];
    const endDates = dates?.[1];
    try {
      if (dates?.length) {
        if (startDates?.$d.toString() === endDates?.$d.toString()) {
          const response = await onGetRevenue({
            startDate: new Date(
              startDates?.$y,
              startDates?.$M,
              startDates?.$D,
              0,
              0
            ).toISOString(),
            endDate: new Date(
              endDates?.$y,
              endDates?.$M,
              endDates?.$D,
              23,
              59,
              59
            ).toISOString(),
          });
          if (response?.code === 200)
            setRevenueFilter({
              data: response,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
                year: startDates?.$y,
                localeDate: new Date(
                  startDates?.$y,
                  startDates?.$M,
                  startDates?.$D,
                  0,
                  0
                ).toISOString(),
              },
              end: {
                day: endDates?.$D,
                month: endDates?.$M,
                hour: endDates?.$H,
                year: endDates?.$y,
                localeDate: new Date(
                  endDates?.$y,
                  endDates?.$M,
                  endDates?.$D,
                  23,
                  59,
                  59
                ).toISOString(),
              },
            });
        } else {
          const response = await onGetRevenue({
            startDate: new Date(
              startDates?.$y,
              startDates?.$M,
              startDates?.$D,
              0,
              0
            ).toISOString(),
            endDate: new Date(
              endDates?.$y,
              endDates?.$M,
              endDates?.$D,
              23,
              59,
              59
            ).toISOString(),
          });
          if (response?.code === 200)
            setRevenueFilter({
              data: response,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
                year: startDates?.$y,
                localeDate: new Date(
                  startDates?.$y,
                  startDates?.$M,
                  startDates?.$D,
                  0,
                  0
                ),
              },
              end: {
                day: endDates?.$D,
                month: endDates?.$M,
                hour: endDates?.$H,
                year: endDates?.$y,
                localeDate: new Date(
                  endDates?.$y,
                  endDates?.$M,
                  endDates?.$D,
                  23,
                  59,
                  59
                ),
              },
            });
        }
      } else {
        console.log("Clear");
        setRevenueFilter({});
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeDatePickerSoldProducts = async (dates, dateStrings) => {
    const startDates = dates?.[0];
    const endDates = dates?.[1];
    try {
      if (dates?.length) {
        if (startDates?.$d.toString() === endDates?.$d.toString()) {
          const response = await onGetSoldProducts({
            limit: 100000,
            page: 0,
            startDate: new Date(
              startDates?.$y,
              startDates?.$M,
              startDates?.$D,
              0,
              0
            ).toISOString(),
            endDate: new Date(
              endDates?.$y,
              endDates?.$M,
              endDates?.$D,
              23,
              59,
              59
            ).toISOString(),
          });
          if (response?.code === 200)
            setSoldProductFilter({
              data: response,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
                year: startDates?.$y,
                localeDate: new Date(
                  startDates?.$y,
                  startDates?.$M,
                  startDates?.$D,
                  0,
                  0
                ).toISOString(),
              },
              end: {
                day: endDates?.$D,
                month: endDates?.$M,
                hour: endDates?.$H,
                year: endDates?.$y,
                localeDate: new Date(
                  endDates?.$y,
                  endDates?.$M,
                  endDates?.$D,
                  23,
                  59,
                  59
                ).toISOString(),
              },
            });
        } else {
          const response = await onGetSoldProducts({
            limit: 100000,
            page: 0,
            startDate: new Date(
              startDates?.$y,
              startDates?.$M,
              startDates?.$D,
              0,
              0
            ).toISOString(),
            endDate: new Date(
              endDates?.$y,
              endDates?.$M,
              endDates?.$D,
              23,
              59,
              59
            ).toISOString(),
          });
          if (response?.code === 200)
            setSoldProductFilter({
              data: response,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
                year: startDates?.$y,
                localeDate: new Date(
                  startDates?.$y,
                  startDates?.$M,
                  startDates?.$D,
                  0,
                  0
                ),
              },
              end: {
                day: endDates?.$D,
                month: endDates?.$M,
                hour: endDates?.$H,
                year: endDates?.$y,
                localeDate: new Date(
                  endDates?.$y,
                  endDates?.$M,
                  endDates?.$D,
                  23,
                  59,
                  59
                ),
              },
            });
        }
      } else {
        console.log("Clear");
        setSoldProductFilter({});
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onClick = (event) => {
    console.log("event", event);
  };
  ///// handle render top-rate
  const { data: dataTop10CountInStock } = useQuery(() => {
    return dashboardService.getTopRate(
      `?${queryString.stringify({
        limit: renderLimitTopCountInStock ? renderLimitTopCountInStock : 10,
        type: "top-in-stock",
      })}`
    );
  }, [renderLimitTopCountInStock]);
  const [renderDatePickerTop, setRenderDatePickerTop] = useState({});
  const { data: dataTop10Sold } = useQuery(() => {
    return dashboardService.getSoldProducts({
      limit: renderLimitTopSold ? renderLimitTopSold : 10,
      type: "top-sold",
      page: 0,
      startDate: Object?.keys(renderDatePickerTop)?.length
        ? new Date(renderDatePickerTop?.start?.localeDate)?.toISOString()
        : zeroDay,
      endDate: Object?.keys(renderDatePickerTop)?.length
        ? new Date(renderDatePickerTop?.end?.localeDate)?.toISOString()
        : startToEndInYear,
    });
  }, [renderLimitTopSold, renderDatePickerTop]);
  const handleChangeLimitTopSold = (value) => {
    setRenderLimitTopSold(value);
  };
  const handleChangeLimitTopCountInStock = (value) => {
    console.log("value", value);
    setRenderLimitTopCountInStock(value);
  };
  /// handle top-rate Calendar
  const onChangeDatePickerTop = async (dates, dateStrings) => {
    const startDates = dates?.[0];
    const endDates = dates?.[1];
    try {
      if (dates?.length) {
        if (startDates?.$d.toString() === endDates?.$d.toString()) {
          setRenderDatePickerTop({
            start: {
              day: startDates?.$D,
              month: startDates?.$M,
              hour: startDates?.$H,
              year: startDates?.$y,
              localeDate: new Date(
                startDates?.$y,
                startDates?.$M,
                startDates?.$D,
                0,
                0
              ).toISOString(),
            },
            end: {
              day: endDates?.$D,
              month: endDates?.$M,
              hour: endDates?.$H,
              year: endDates?.$y,
              localeDate: new Date(
                endDates?.$y,
                endDates?.$M,
                endDates?.$D,
                23,
                59,
                59
              ).toISOString(),
            },
          });
        } else {
          setRenderDatePickerTop({
            start: {
              day: startDates?.$D,
              month: startDates?.$M,
              hour: startDates?.$H,
              year: startDates?.$y,
              localeDate: new Date(
                startDates?.$y,
                startDates?.$M,
                startDates?.$D,
                0,
                0
              ),
            },
            end: {
              day: endDates?.$D,
              month: endDates?.$M,
              hour: endDates?.$H,
              year: endDates?.$y,
              localeDate: new Date(
                endDates?.$y,
                endDates?.$M,
                endDates?.$D,
                23,
                59,
                59
              ),
            },
          });
        }
      } else {
        console.log("Clear");
        setRenderDatePickerTop({});
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //// Table top-rate
  const columnTopSold = [
    {
      title: "Serial",
      align: "center",
      dataIndex: "top",
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "name",
      width: 600,
    },

    {
      title: "Image",
      align: "center",
      dataIndex: "image",
    },
    {
      title: "Sold",
      align: "center",
      dataIndex: "sold",
      width: 100,
      sorter: (a, b) => b?.sold - a?.sold,
      sortDirections: ["descend"],
      ellipsis: true,
    },
  ];
  const columnTopCountInStock = [
    {
      title: "Serial",
      dataIndex: "top",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      width: 600,
    },

    {
      title: "Image",
      dataIndex: "image",
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      align: "center",
      width: 100,
      sorter: (a, b) => {
        return b?.stock - a?.stock;
      },
      sortDirections: ["descend"],
      ellipsis: true,
    },
  ];
  const dataTopCountInStock = dataTop10CountInStock?.data?.data?.map(
    (item, index) => {
      return {
        key: `${item?._id}`,
        name: (
          <p className="truncate whitespace-normal line-clamp-3">
            {item?.name}
          </p>
        ),
        stock: item?.countInStock,
        top: index + 1,
        image: (
          <Image.PreviewGroup items={item?.image}>
            <StyleImage>
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
                src={`${item?.image[0]}`}
                alt={`${item?.image[0]}`}
              />
            </StyleImage>
          </Image.PreviewGroup>
        ),
        priceCurrent: item?.price,
      };
    }
  );
  const dataTopSold = dataTop10Sold?.data?.data?.map((item, index) => {
    return {
      key: item?._id,
      name: (
        <p className=" truncate whitespace-normal line-clamp-3">
          {item?.productName}
        </p>
      ),
      sold: item?.sold,
      top: index + 1,
      image: (
        <Image.PreviewGroup items={item?.image}>
          <StyleImage>
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
              src={`${item?.image[0]}`}
              alt={`${item?.image[0]}`}
            />
          </StyleImage>
        </Image.PreviewGroup>
      ),
      priceCurrent: item?.price,
    };
  });
  //////////////
  //// handle Table Excel
  const [messageConfirm, setMessageConfirm] = useState();
  const handleClick = (payload) => {
    const newColums = payload?.colums?.filter(
      (item) => item?.title !== "Image"
    );
    const excel = new Excel();
    excel
      .addSheet(messageConfirm)
      .addColumns(newColums)
      .addDataSource(payload?.data, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
    setMessageConfirm("");
  };
  /// Effect
  useEffect(() => {
    handleRevenue();
    handleSoldProducts();
    handleCountInStock();
  }, []);
  return (
    <>
      <div
        className={`h-fit flex  items-center xs:justify-center  md:justify-between 
      gap-3 xs:fixed lg:static top-[60px] z-10 xs:bg-gray-100 lg:bg-white xs:px-[15px] lg:px-[30px] py-[14px]
      ${
        toggleSidebar
          ? "xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)] lg:w-[100%] left-[200px]"
          : "xs:w-[100%]"
      } h-[70px]`}
      >
        <h2 className="text-16px font-mam xs:hidden md:block text-[#033C73] ">
          Dashboard Analyst
        </h2>
      </div>
      <div className="lg:mt-0 xs:mt-[60px] p-[0_20px_0px_20px] ">
        <div className=" flex xs:flex-wrap xl:flex-nowrap items-center  m-[-8px] justify-start xl:justify-normal ">
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/3 rounded-[5px] shadow-header p-[20px] m-[8px]">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">
                Doanh Thu
              </h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                          pb-[12px] border-solid border-b border-black-ebe flex justify-between items-center gap-[10px]"
            >
              {formatPriceVND(revenueObj?.allDayInYear?.total || 0)}
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Doanh thu hôm nay: {formatPriceVND(revenueObj?.today?.total || 0)}
            </div>
          </div>
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/3 rounded-[5px] shadow-header p-[20px] m-[8px] ">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">Kho</h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                      pb-[12px] border-solid border-b border-black-ebe flex justify-between  items-center gap-[10px]"
            >
              <p>
                {inventoryObj?.totalProducts?.data?.reduce((acc, cur) => {
                  return acc + cur?.countInStock;
                }, 0)}
              </p>
              <button
                onClick={() =>
                  handleClick({
                    data: dataTopCountInStock,
                    colums: columnTopCountInStock,
                  })
                }
                className="text-sm border border-solid border-black-555 p-[4px_8px] rounded-md
              hover:text-white hover:bg-[#033C73] hover:border-[#033C73] duration-400"
              >
                Top tồn kho
              </button>
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Các loại sản phẩm: {categories?.length}
            </div>
          </div>
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/3 rounded-[5px] shadow-header p-[20px] m-[8px] ">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">
                Đã bán
              </h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                      pb-[12px] border-solid border-b border-black-ebe flex justify-between items-center gap-[10px]"
            >
              <p> {soldProductObj?.zeroDayToCurrentDay?.total || 0}</p>

              <button
                onClick={() =>
                  handleClick({ data: dataTopSold, colums: columnTopSold })
                }
                className="text-sm border border-solid border-black-555 p-[4px_8px] rounded-md
              hover:text-white hover:bg-[#033C73] hover:border-[#033C73] duration-400"
              >
                Top bán chạy
              </button>
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Sản phẩm bán được hôm nay : {soldProductObj?.today?.total || 0}{" "}
              sản phẩm
            </div>
          </div>
        </div>
        <div className="mt-[20px] flex lg:flex-row xs:flex-col gap-[20px] items-center py-[20px]">
          <div
            className="lg:w-1/2  xs:w-full "
            style={{
              position: "relative",
              height: `${resizeChart}px `,
              width: "100vw",
            }}
          >
            <CustomCalendar className="">
              <DatePicker.RangePicker
                placement="bottomRight"
                className="w-full"
                onChange={onChangeDatePickerRevenue}
              />
            </CustomCalendar>
            {console.log("revenueFilter", revenueFilter)}
            <Bar
              onClick={onClick}
              className="shadow-header p-[10px] rounded-[5px]"
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: Object?.keys(revenueFilter)?.length
                      ? `Doanh thu: ${revenueFilter?.start.day
                          ?.toString()
                          ?.padStart(2, 0)}/${(revenueFilter?.start.month + 1)
                          ?.toString()
                          ?.padStart(2, 0)}/${
                          revenueFilter?.start.year
                        } - ${revenueFilter?.end?.day
                          ?.toString()
                          ?.padStart(2, 0)}/${(revenueFilter?.end?.month + 1)
                          ?.toString()
                          ?.padStart(2, 0)}/${
                          revenueFilter?.end?.year
                        }: ${formatPriceVND(revenueFilter?.data?.total)}`
                      : "Tổng doanh thu",
                  },
                  scales: {
                    y: {
                      type: "linear",
                      display: true,
                      max: 10 * million,
                    },
                    x: {
                      type: "linear",
                    },
                  },
                },
              }}
              data={dataBars}
            />
          </div>
          <div
            className={` lg:w-1/2  xs:w-full `}
            style={{
              position: "relative",
              height: `${resizeChart}px `,
              width: "100vw",
            }}
          >
            <Doughnut
              className="shadow-header p-[10px] rounded-[5px]"
              typeof="line"
              data={dataPies}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Tổng sản phẩm đã bán theo Category",
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="py-[20px] flex lg:flex-row xs:flex-col gap-[20px] items-start ">
          <div className="lg:w-1/2 xs:w-full   table__dashboard table__dashboard-analyst xs:mt-[10px] ">
            <div className="flex items-center justify-between">
              <div className="font-om text-md text-black-555  m-[15px_12px] text-center ">
                Top{" "}
                <Select
                  defaultValue={`10`}
                  style={{
                    width: 70,
                  }}
                  onChange={handleChangeLimitTopCountInStock}
                  options={[
                    {
                      value: "5",
                      label: "5",
                    },
                    {
                      value: "10",
                      label: "10",
                    },
                    {
                      value: "20",
                      label: "20",
                    },
                    {
                      value: "100",
                      label: "100",
                    },
                  ]}
                />{" "}
                sản phẩm còn trong kho
              </div>
              <div></div>
            </div>
            <Table
              rowClassName={`items-center `}
              style={{ verticalAlign: "middle" }}
              tableLayout={"auto"}
              columns={columnTopCountInStock}
              dataSource={dataTopCountInStock}
              pagination={{
                pageSize: 5,
                position: ["bottomRight"],
              }}
            />
          </div>
          <div className="lg:w-1/2 xs:w-full  table__dashboard table__dashboard-analyst xs:mt-[10px] ">
            <div className="flex items-center gap-4 relative m-[15px_12px]">
              <div className="font-om text-md text-black-555 text-center ">
                Top{" "}
                <Select
                  defaultValue={`10`}
                  style={{
                    width: 70,
                  }}
                  onChange={handleChangeLimitTopSold}
                  options={[
                    {
                      value: "5",
                      label: "5",
                    },
                    {
                      value: "10",
                      label: "10",
                    },
                    {
                      value: "20",
                      label: "20",
                    },
                    {
                      value: "100",
                      label: "100",
                    },
                  ]}
                />{" "}
                sản phẩm bán chạy
              </div>
              {Object.keys(renderDatePickerTop)?.length ? (
                <div className="flex items-center gap-2">
                  <p className="font-osr text-black-333">
                    {localeVN(renderDatePickerTop?.start?.localeDate)}
                  </p>
                  <p className="font-osr text-black-333">
                    {localeVN(renderDatePickerTop?.end?.localeDate)}
                  </p>
                </div>
              ) : (
                ""
              )}
              <CustomCalendar className="top-0 right-0">
                <DatePicker.RangePicker
                  placement="bottomRight"
                  className="w-full"
                  onChange={onChangeDatePickerTop}
                />
              </CustomCalendar>
            </div>
            <Table
              rowClassName={`items-center`}
              style={{ verticalAlign: "middle" }}
              tableLayout={"auto"}
              columns={columnTopSold}
              dataSource={dataTopSold}
              pagination={{
                pageSize: 5,
                position: ["bottomRight"],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAnalyst;
