import { formatPriceVND } from "@/utils/formatPrice";
import { CalendarOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useDashboard from "../useDashboard";
import {
  Bar,
  Line,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
  Chart,
  Pie,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
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
} from "chart.js";
import {
  startToEndInYear,
  currentDayInMonth,
  now,
  startMonth,
  zeroDay,
  zeroTimeToday,
  year,
  endDay,
  endMonth,
} from "@/utils/timeISOString";
import { monthNameVN, monthNames } from "@/contants/general";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { dateVN, localeVN, timeVN } from "@/utils/timeVN";
import styled from "styled-components";
import queryString from "query-string";
import useQuery from "@/hooks/useQuery";
import { Excel } from "antd-table-saveas-excel";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";

import dashboardService from "@/service/dashboardService";
import { useLocation, useSearchParams } from "react-router-dom";
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
  z-index: 10000;
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
  } = analystProps || {};
  const million = 1000000;
  const [revenueObj, setRevenueObj] = useState({});
  const [soldProductObj, setSoldProductObj] = useState({});
  const [revenueFilter, setRevenueFilter] = useState({});
  const [soldProductFilter, setSoldProductFilter] = useState({});
  const [inventoryObj, setInventoryObj] = useState({});
  const [renderLimit, setRenderLimit] = useState("");
  const [renderTop, setRenderTop] = useState("");
  const { search, pathname } = useLocation();
  const queryObject = queryString.parse(search);
  /// handle Update Query String
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  const handleRevenue = async () => {
    try {
      let allMonths = [];
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
      // const allDayInYear = await onGetRevenue({
      //   startDate: zeroDay,
      //   endDate: startToEndInYear,
      // });
      const currentMonth = await onGetRevenue({
        startDate: startMonth,
        endDate: endMonth,
        limit: 100000,
        page: 0,
      });
      ///
      const monthCurrentRender = new Date()?.getMonth();
      // for (let index = 0; index < monthCurrentRender + 1; index++) {
      //   const startMonth = new Date(year, index, 1).toISOString();
      //   const endMonth = new Date(
      //     year,
      //     index,
      //     31 || 30 || 29 || 28,
      //     24,
      //     0
      //   ).toISOString();
      //   const response = await onGetRevenue({
      //     startDate: startMonth,
      //     endDate: endMonth,
      //   });
      //   allMonths.push(response);
      // }
      setRevenueObj({
        today: today,
        // startToCurrent: startToCurrent,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        // allDayInYear: allDayInYear,
        currentMonth: currentMonth,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSoldProducts = async () => {
    try {
      let allMonths = [];
      const today = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: zeroTimeToday,
        endDate: endDay,
      });
      // const startToCurrent = await onGetSoldProducts({
      // limit: 100000,
      // page:0,
      //   startDate: startMonth,
      //   endDate: currentDayInMonth,
      // });
      const zeroDayToCurrentDay = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: zeroDay,
        endDate: currentDayInMonth,
      });
      const currentMonth = await onGetSoldProducts({
        limit: 100000,
        page: 0,
        startDate: startMonth,
        endDate: endMonth,
      });
      // const allDayInYear = await onGetSoldProducts({
      //   startDate: zeroDay, // limit: 100000,
      // page:0,
      //   endDate: startToEndInYear,
      // });
      // const currentMonth = await onGetSoldProducts({});
      // for (let index = 0; index < monthNames.length; index++) {
      //   const startMonth = new Date(year, index, 1).toISOString();
      //   const endMonth = new Date(
      //     year,
      //     index,
      //     31 || 30 || 29 || 28,
      //     24,
      //     0
      //   ).toISOString();
      //   const response = await onGetSoldProducts({
      //     startDate: startMonth,
      //     endDate: endMonth, // limit: 100000,
      // page:0,
      //   });
      //   allMonths.push(response);
      // }
      setSoldProductObj({
        today: today,
        // startToCurrent: startToCurrent,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        // allDayInYear: allDayInYear,
        currentMonth: currentMonth,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleRevenue();
    handleSoldProducts();
  }, []);
  // useEffect(() => {
  //   if (Object.keys(revenueObj).length < 1) {
  //     handleRevenue();
  //   }
  //   if (Object.keys(soldProductObj).length < 1) {
  //     handleSoldProducts();
  //   }
  // }, [revenueObj, soldProductObj]);
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
        return `${month?.date?.day?.toString()?.padStart(2, 0)}/${
          month?.date?.month
        }/${month?.date?.year}`;
      });
    } else if (
      !Object?.keys(revenueFilter)?.length &&
      Object?.keys(revenueObj)?.length
    ) {
      return revenueObj?.currentMonth?.data?.map((time) => {
        return `${time?.date?.day?.toString()?.padStart(2, 0)}/${
          time?.date?.month
        }/${time?.date?.year}`;
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
      return soldProductFilter?.data?.data?.map((month) => {
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
    labels: customLabelSoldLine,
    datasets: [
      {
        type: "doughnut",
        label: "Đã bán",
        data: customDataSoldProductLine,
        // backgroundColor: mapColor?.map((item) => item?.backgroundColor),
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
        ],
        borderWidth: Object.keys(soldProductFilter).length ? 0 : 1,
      },
    ],
  };
  const resizeChart = useMemo(() => {
    if (width >= 768) {
      return 650;
    } else if (width < 768 && width >= 568) {
      return 500;
    } else if (width < 568) {
      return 400;
    }
  }, [width]);
  const revenueRef = useRef();
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
  // const onChangeDatePickerSoldProducts = async (dates, dateStrings) => {
  //   const startDates = dates?.[0];
  //   const endDates = dates?.[1];
  //   try {
  //     if (dates) {
  //       if (startDates?.$d.toString() === endDates?.$d.toString()) {
  //         const response = await onGetSoldProducts({
  //           startDate: new Date(
  //             startDates?.$y,
  //             startDates?.$M,
  //             startDates?.$D,
  //             0,
  //             0
  //           ).toISOString(),
  //           endDate: new Date(
  //             endDates?.$y,
  //             endDates?.$M,
  //             endDates?.$D,
  //             23,
  //             59,
  //             59
  //           ).toISOString(),
  //         });
  //         if (response?.code === 200)
  //           setSoldProductFilter({
  //             data: response?.data,
  //             start: {
  //               day: startDates?.$D,
  //               month: startDates?.$M,
  //               hour: startDates?.$H,
  //               localeDate: new Date(
  //                 startDates?.$y,
  //                 startDates?.$M,
  //                 startDates?.$D,
  //                 0,
  //                 0
  //               ).toISOString(),
  //             },
  //             end: {
  //               day: endDates?.$D,
  //               month: endDates?.$M,
  //               hour: endDates?.$H,
  //               localeDate: new Date(
  //                 endDates?.$y,
  //                 endDates?.$M,
  //                 endDates?.$D,
  //                 23,
  //                 59,
  //                 59
  //               ).toISOString(),
  //             },
  //           });
  //       } else {
  //         const response = await onGetSoldProducts({
  //           startDate: new Date(
  //             startDates?.$y,
  //             startDates?.$M,
  //             startDates?.$D,
  //             0,
  //             0
  //           ).toISOString(),
  //           endDate: new Date(
  //             endDates?.$y,
  //             endDates?.$M,
  //             endDates?.$D,
  //             23,
  //             59,
  //             59
  //           ).toISOString(),
  //         });
  //         if (response?.code === 200)
  //           setSoldProductFilter({
  //             data: response?.data,
  //             start: {
  //               day: startDates?.$D,
  //               month: startDates?.$M,
  //               hour: startDates?.$H,
  //               localeDate: new Date(
  //                 startDates?.$y,
  //                 startDates?.$M,
  //                 startDates?.$D,
  //                 0,
  //                 0
  //               ),
  //             },
  //             end: {
  //               day: endDates?.$D,
  //               month: endDates?.$M,
  //               hour: endDates?.$H,
  //               localeDate: new Date(
  //                 endDates?.$y,
  //                 endDates?.$M,
  //                 endDates?.$D,
  //                 23,
  //                 59,
  //                 59
  //               ),
  //             },
  //           });
  //       }
  //     } else {
  //       console.log("Clear");
  //       setSoldProductFilter({});
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const onClick = (event) => {
    console.log("event", event);
  };
  /////
  const { data: dataTop10CountInStock } = useQuery(() => {
    return dashboardService.getTopRate(
      `?${queryString.stringify({
        limit: 10,
        type: "top-in-stock",
      })}`
    );
  });
  handleSoldProducts;
  const [renderDatePickerTop, setRenderDatePickerTop] = useState({});
  const { data: dataTop10Sold } = useQuery(() => {
    return dashboardService.getSoldProducts({
      limit: renderLimit ? renderLimit : 10,
      type: "top-sold",
      page: 0,
      startDate: Object?.keys(renderDatePickerTop)?.length
        ? new Date(renderDatePickerTop?.start?.localeDate)?.toISOString()
        : zeroDay,
      endDate: Object?.keys(renderDatePickerTop)?.length
        ? new Date(renderDatePickerTop?.end?.localeDate)?.toISOString()
        : startToEndInYear,
    });
  }, [renderLimit, renderDatePickerTop]);
  const handleChangeTopLimit = (value) => {
    setRenderLimit(value);
  };
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
  const columnTopSold = [
    {
      title: "Top Sold",
      align: "center",
      dataIndex: "top",
      width: 150,
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "name",
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
    },
  ];
  const columnTopCountInStock = [
    {
      title: "Top",
      dataIndex: "top",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
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
    },
  ];
  const dataTopCountInStock = dataTop10CountInStock?.data?.data?.map(
    (item, index) => {
      return {
        key: `${item?._id}`,
        name: `${item?.name}`,
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
      name: item?.productName,
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
      <div className="lg:mt-0 xs:mt-[60px] p-[0_20px_20px_20px] ">
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
              {formatPriceVND(revenueObj?.zeroDayToCurrentDay?.total || 0)}
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
              <p>{inventoryObj?.totalCountInStock}</p>
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
              Tổng các loại sản phẩm : {inventoryObj?.totalProduct}
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
              Bán được : {soldProductObj?.today?.total || 0} sản phẩm
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
            <Bar
              onClick={onClick}
              ref={revenueRef}
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
                      ? `Doanh thu: ${revenueFilter?.start.day}/${
                          revenueFilter?.start.month
                        }/${revenueFilter?.start.year} - ${
                          revenueFilter?.end?.day
                        }/${revenueFilter?.end?.month}/${
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
            <CustomCalendar className="">
              <DatePicker.RangePicker
                placement="bottomRight"
                className="w-full"
                onChange={onChangeDatePickerSoldProducts}
              />
            </CustomCalendar>
            <Line
              className="shadow-header p-[10px] rounded-[5px]"
              typeof="line"
              data={dataPies}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Tổng sản phẩm đã bán",
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="py-[20px] flex lg:flex-row xs:flex-col gap-[20px] items-center ">
          <div className="lg:w-1/2 xs:w-full   table__dashboard table__dashboard-analyst">
            <div className="flex items-center justify-between">
              <div className="font-om text-md text-black-555 my-[15px] text-center ">
                Top 10 CountInStock
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
                // total: totalProducts,
                position: ["bottomCenter"],
                // onChange: onChangePagination,
                // current: Number(pageCurrent || 1),
              }}
            />
          </div>
          <div className="lg:w-1/2 xs:w-full  table__dashboard table__dashboard-analyst">
            <div className="flex items-center gap-4 relative m-[12px]">
              <div className="font-om text-md text-black-555 text-center ">
                Top{" "}
                <Select
                  className=""
                  defaultValue={`10`}
                  style={{
                    width: 70,
                  }}
                  onChange={handleChangeTopLimit}
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
                Sold
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
              rowClassName={`items-center `}
              style={{ verticalAlign: "middle" }}
              tableLayout={"auto"}
              columns={columnTopSold}
              dataSource={dataTopSold}
              pagination={{
                pageSize: 5,
                // total: totalProducts,
                position: ["bottomCenter"],
                // onChange: onChangePagination,
                // current: Number(pageCurrent || 1),
              }}
            />
          </div>
        </div>
        {/* <div
          className={`w-full `}
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
              onChange={onChangeDatePickerSoldProducts}
            />
          </CustomCalendar>
          <Line
            className="shadow-header p-[10px] rounded-[5px]"
            typeof="line"
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false,
              },
              stacked: false,
              plugins: {
                title: {
                  display: true,
                  text: "Tổng sản phẩm đã bán",
                },
              },

              scales: {
                y: {
                  type: "linear",
                  display: true,
                  position: "left",
                },
                y1: {
                  type: "linear",
                  display: true,
                  position: "right",

                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
            }}
            data={dataLines}
          />
        </div> */}
      </div>
    </>
  );
};

export default DashboardAnalyst;
