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
} from "@/utils/timeISOString";
import { monthNameVN, monthNames } from "@/contants/general";
import { DatePicker } from "antd";
import { localeVN, timeVN } from "@/utils/timeVN";
import styled from "styled-components";
import { FALSE } from "sass";
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
  const [soldeProductFilter, setSoldProductFilter] = useState({});
  const handleRevenue = async () => {
    try {
      let allMonths = [];
      const today = await onGetRevenue({
        startDate: zeroTimeToday,
        endDate: endDay,
      });
      const startToCurrent = await onGetRevenue({
        startDate: startMonth,
        endDate: currentDayInMonth,
      });
      const zeroDayToCurrentDay = await onGetRevenue({
        startDate: zeroDay,
        endDate: currentDayInMonth,
      });
      const allDayInYear = await onGetRevenue({
        startDate: zeroDay,
        endDate: startToEndInYear,
      });
      for (let index = 0; index < monthNames.length; index++) {
        const startMonth = new Date(year, index, 1).toISOString();
        const endMonth = new Date(
          year,
          index,
          31 || 30 || 29 || 28,
          24,
          0
        ).toISOString();
        const response = await onGetRevenue({
          startDate: startMonth,
          endDate: endMonth,
        });
        allMonths.push(response);
      }
      setRevenueObj({
        today: today,
        startToCurrent: startToCurrent,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        allDayInYear: allDayInYear,
        allMonths: allMonths,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSoldProducts = async () => {
    try {
      let allMonths = [];
      const today = await onGetSoldProducts({
        startDate: zeroTimeToday,
        endDate: endDay,
      });
      const startToCurrent = await onGetSoldProducts({
        startDate: startMonth,
        endDate: currentDayInMonth,
      });
      const zeroDayToCurrentDay = await onGetSoldProducts({
        startDate: zeroDay,
        endDate: currentDayInMonth,
      });
      const allDayInYear = await onGetSoldProducts({
        startDate: zeroDay,
        endDate: startToEndInYear,
      });
      for (let index = 0; index < monthNames.length; index++) {
        const startMonth = new Date(year, index, 1).toISOString();
        const endMonth = new Date(
          year,
          index,
          31 || 30 || 29 || 28,
          24,
          0
        ).toISOString();
        const response = await onGetSoldProducts({
          startDate: startMonth,
          endDate: endMonth,
        });
        allMonths.push(response);
      }
      setSoldProductObj({
        today: today,
        startToCurrent: startToCurrent,
        zeroDayToCurrentDay: zeroDayToCurrentDay,
        allDayInYear: allDayInYear,
        allMonths: allMonths,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (Object.keys(revenueObj).length < 1) {
      handleRevenue();
      handleSoldProducts();
    }
  }, [revenueObj]);
  const customDataRevenueBar = useMemo(() => {
    if (Object?.keys(revenueFilter)?.length) {
      return [revenueFilter?.data];
    } else if (
      !Object?.keys(revenueFilter)?.length &&
      Object?.keys(revenueObj)?.length
    ) {
      return revenueObj?.allMonths?.map((month) => Math.round(month?.data));
    } else if (
      Object.keys(revenueObj).length < 1 &&
      Object.keys(revenueFilter).length < 1
    ) {
      return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
    }
  }, [revenueFilter, revenueObj]);
  const customDataSoldProductLine = useMemo(() => {
    if (Object?.keys(soldeProductFilter)?.length) {
      return [soldeProductFilter?.data];
    } else if (
      !Object?.keys(soldeProductFilter)?.length &&
      Object?.keys(soldProductObj)?.length
    ) {
      return soldProductObj?.allMonths?.map((month) => Math.round(month?.data));
    } else if (
      Object.keys(soldProductObj).length < 1 &&
      Object.keys(soldeProductFilter).length < 1
    ) {
      return [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    }
  }, [soldProductObj, soldeProductFilter]);
  const dataBars = {
    labels: Object.keys(revenueFilter).length
      ? [
          `${localeVN(revenueFilter?.start?.localeDate)} - ${localeVN(
            revenueFilter?.end?.localeDate
          )}`,
        ]
      : monthNameVN?.map((month) => month),
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
    labels: Object.keys(soldeProductFilter).length
      ? [
          `${localeVN(soldeProductFilter?.start?.localeDate)} - ${localeVN(
            soldeProductFilter?.end?.localeDate
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
    labels: Object.keys(soldeProductFilter).length
      ? [
          `${localeVN(soldeProductFilter?.start?.localeDate)} - ${localeVN(
            soldeProductFilter?.end?.localeDate
          )}`,
        ]
      : monthNameVN?.map((month) => month),
    datasets: [
      {
        type: "pie",
        label: "Đã bán",
        data: customDataSoldProductLine,
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
        borderWidth: Object.keys(soldeProductFilter).length ? 0 : 1,
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
      if (dates) {
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
              data: response?.data,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
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
              data: response?.data,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
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
      if (dates) {
        if (startDates?.$d.toString() === endDates?.$d.toString()) {
          const response = await onGetSoldProducts({
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
              data: response?.data,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
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
              data: response?.data,
              start: {
                day: startDates?.$D,
                month: startDates?.$M,
                hour: startDates?.$H,
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
  return (
    <>
      <div
        className={`  h-fit flex  items-center xs:justify-center  md:justify-between 
      gap-3 xs:fixed lg:static top-[60px] z-10 xs:bg-gray-100 lg:bg-white xs:px-[15px] lg:px-[30px] py-[14px]
      ${
        toggleSidebar
          ? "xs:w-[calc(100%-200px)] md:w-[calc(100%-280px)] lg:w-[100%] left-[200px]"
          : "xs:w-[100%]"
      }`}
      >
        <h2 className="text-16px font-mam xs:hidden md:block text-[#033C73]">
          Dashboard Analyst
        </h2>
      </div>
      <div className="lg:mt-0 xs:mt-[60px] p-[20px] ">
        <div className=" flex xs:flex-wrap xl:flex-nowrap items-center ] m-[-8px] justify-start xl:justify-normal ">
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/4 rounded-[5px] shadow-header p-[20px] m-[8px]">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">
                Doanh Thu
              </h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                          pb-[12px] border-solid border-b border-black-ebe flex items-center gap-[10px]"
            >
              {formatPriceVND(revenueObj?.zeroDayToCurrentDay?.data || 0)}
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Doanh thu hôm nay: {formatPriceVND(revenueObj?.today?.data || 0)}
            </div>
          </div>
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/4 rounded-[5px] shadow-header p-[20px] m-[8px] ">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">Kho</h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                      pb-[12px] border-solid border-b border-black-ebe flex items-center gap-[10px]"
            >
              340
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Xuất kho hôm nay: 32 sản phẩm
            </div>
          </div>
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/4 rounded-[5px] shadow-header p-[20px] m-[8px] ">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">
                Đã bán
              </h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                      pb-[12px] border-solid border-b border-black-ebe flex items-center gap-[10px]"
            >
              {soldProductObj?.zeroDayToCurrentDay?.data || 0}
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Bán được : {soldProductObj?.today?.data || 0} sản phẩm
            </div>
          </div>
          <div className="xs:w-full sm:w-[30%] md:w-[45%] xl:w-1/4 rounded-[5px] shadow-header p-[20px] m-[8px] ">
            <div className="flex items-center gap-[6px]">
              <h2 className="text-[rgba(0,0,0,.45)] text-sm font-osr ">Nhập</h2>
            </div>
            <div
              className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-lg
                      pb-[12px] border-solid border-b border-black-ebe flex items-center gap-[10px]"
            >
              {formatPriceVND(15356000)}
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Doanh thu hôm nay: {formatPriceVND(3459000)}
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
                    text: "Tổng doanh thu",
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
            <Pie
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
        <div className="mt-[20px] flex lg:flex-row xs:flex-col gap-[20px] items-center py-[20px]"></div>
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
