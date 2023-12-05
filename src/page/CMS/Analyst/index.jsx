import { formatPriceVND } from "@/utils/formatPrice";
import React, { useMemo, useRef } from "react";
import useDashboard from "../useDashboard";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);
const DashboardAnalyst = () => {
  const { modalProps } = useDashboard();
  const {
    onShowModal,
    onCloseModal,
    openModalAndt,
    toggleSidebar,
    width,
    products,
  } = modalProps || {};
  const million = 1000000;
  const dataBars = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    datasets: [
      //   {
      //     label: "Doanh thu",
      //     data: [12, 19, 3, 5, 2, 3, 1],
      //     borderWidth: 1,
      //     borderColor: "rgb(255, 99, 132)",
      //     backgroundColor: "rgba(255, 99, 132, 0.5)",
      //     hoverBackgroundColor: "rgb(255, 99, 132)",
      //   },
      {
        label: "Đã bán",
        data: [
          1.2 * million,
          1.9 * million,
          3 * million,
          5 * million,
          2 * million,
          3 * million,
          1 * million,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        hoverBackgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  const dataLines = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        label: "Tháng 11",
        data: ["200", "300", "400", "550", "600", "750", "900", "1200"],
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        hoverBackgroundColor: "rgb(255, 99, 132)",
        yAxisID: "y",
      },
      {
        label: "Tháng 12",
        data: ["-100", "50", "300", "150", "-100", "-150", "200", "500"],
        borderColor: "##2ee8a0",
        borderWidth: 1,
        backgroundColor: "#62DAAB",
        hoverBackgroundColor: "#46f3b1",
        yAxisID: "y1",
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
              {formatPriceVND(15356000)}
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Doanh thu hôm nay: {formatPriceVND(3459000)}
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
              212
            </div>
            <div className="mt-[12px] text-[rgba(0,0,0,.85)] font-osr tracking-wider text-sm ">
              Bán được : 40 sản phẩm
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
        <div className="mt-[20px] flex lg:flex-row xs:flex-col gap-[20px] items-center  ">
          <div
            className=" lg:w-1/2  xs:w-full shadow-header  p-[10px]"
            style={{
              position: "relative",
              height: `${resizeChart}px `,
              width: "100vw",
            }}
          >
            <Bar
              typeof="bar"
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Doanh thu và sản phẩm đã bán trong tháng",
                  },
                },
              }}
              data={dataBars}
            />
          </div>
          <div
            className={` lg:w-1/2  xs:w-full shadow-header p-[10px]`}
            style={{
              position: "relative",
              height: `${resizeChart}px `,
              width: "100vw",
            }}
          >
            <Line
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAnalyst;
