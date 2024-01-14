import { formatPriceVND } from "@/utils/formatPrice";
import useWindowSize from "@/utils/windowResize";
import { Button, Table } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ExportPDF = ({ id, data, profile }) => {
  const { width } = useWindowSize();
  const pdfRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `${id || ""}`,
    onAfterPrint: () => alert(`Already`),
  });
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      align: "center",
    },
  ];
  const dataPDF = data?.products?.map((product, index) => {
    return {
      name: `${product?.name}`,
      quantity: `${product?.quantity}`,
      price: formatPriceVND(product?.price - product?.discount),
      total: formatPriceVND(
        (product?.price - product?.discount) * product?.quantity
      ),
    };
  });
  return (
    <div className="m-[20px] mypdf">
      <div className="" ref={pdfRef}>
        <div className="p-[20px]">
          <div className=" bg-[#1F3862] p-[20px] rounded-xl ">
            <div className="flex items-center gap-[50px]  relative z-10 ">
              <a className="">
                <img
                  className="rounded-[50%]"
                  srcSet="/assets/img/logo-ktbeauty-circle.png 1.5x "
                  alt=""
                />
              </a>
              <div className="">
                <h2
                  className="text-white font-gvr  text-[52px] text-center  capitalize 
                flex gap-2 items-center"
                >
                  Hóa đơn
                  <span className="ml-[4px] text-sm font-osr"> #{id}</span>
                </h2>
                <p className="text-center mt-[5px] text-[20px] tracking-widest text-white font-osr uppercase">
                  Beauty studio & cosmetics Store
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-[50px] items-start justify-between  py-[24px]">
            <div className="flex flex-col gap-1 w-1/2  ">
              <p className="text-16px text-black-333 leading-[20px] font-ossb uppercase">
                <strong className="capitalize text-sm"> Người gửi:</strong> kt
                beauty Studio & cosmetics store
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb capitalize  ">
                <strong className="capitalize text-sm"> Địa chỉ:</strong> 446/23
                sư vạn hạnh p10 q10
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb  ">
                <strong className="capitalize text-sm"> Email: </strong>
                ktbeautystudio@gmail.com
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb  ">
                <strong className="capitalize text-sm">Số điện thoại:</strong>{" "}
                0798295979
              </p>
            </div>
            <div className="flex items-end flex-col gap-1 w-1/2">
              <p className="text-16px text-black-333 leading-[20px] font-ossb uppercase">
                <strong className="capitalize text-sm"> Người nhận:</strong>{" "}
                {data?.order?.name || profile?.name}
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb capitalize text-right">
                <strong className="capitalize text-sm"> Địa chỉ:</strong>{" "}
                {data?.order?.name ||
                  `${profile?.address}, ${profile?.ward?.name}, ${profile?.district?.name}, ${profile?.province?.name}`}
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb ">
                <strong className="capitalize text-sm"> Email: </strong>
                {data?.order?.email || profile?.email}
              </p>
              <p className="text-16px text-black-333 leading-[20px] font-ossb ">
                <strong className="capitalize text-sm">Số điện thoại:</strong>{" "}
                {data?.order?.phone || profile?.phone}
              </p>
            </div>
          </div>
          <div className="">
            <Table
              footer={() => {
                return (
                  <div className=" flex flex-col items-end ">
                    <div className=" min-w-[300px] flex gap-3 justify-between items-center text-16px">
                      <p className=" text-black-555 font-om">
                        Tổng chưa ưu đãi:
                      </p>
                      <p className=" text-black font-ossb tracking-wider">
                        {formatPriceVND(data?.subTotal)}
                      </p>
                    </div>
                    {data?.discount?.price > 0 && (
                      <div className="min-w-[300px] flex flex-col items-start gap-1">
                        <div className=" min-w-[300px] flex gap-3 justify-between items-center text-16px ">
                          <p className=" text-black-555 font-om">Ưu đãi:</p>
                          <p className=" text-black font-ossb tracking-wider">
                            {formatPriceVND(data?.discount?.price)}
                          </p>
                        </div>
                        <ul className="">
                          {data?.discount?.price > 1000000 && (
                            <li className="font-osr text-black-222">
                              1. {data?.shipping?.label} (Miễn phí)
                            </li>
                          )}
                          <li className="font-osr text-black-222">
                            {data?.discount?.price > 1000000 ? "2." : "1."}{" "}
                            {data?.discount?.type}
                          </li>
                        </ul>
                      </div>
                    )}
                    <div className=" min-w-[300px] flex gap-3 justify-between items-center text-16px">
                      <p className=" text-black-555 font-om">
                        Tổng chưa giảm giá:
                      </p>
                      <p className=" text-black font-ossb tracking-wider">
                        {formatPriceVND(data?.total)}
                      </p>
                    </div>
                  </div>
                );
              }}
              pagination={false}
              style={{ verticalAlign: "middle" }}
              tableLayout={"auto"}
              key={`cms/pdf`}
              columns={columns}
              dataSource={dataPDF}
            />
          </div>
          <div className="flex items-start justify-between gap-[50px] py-[24px]">
            <div className="w-1/2 flex flex-col items-start gap-2">
              <p className="text-md font-om text-black uppercase">
                Thông tin ngân hàng
              </p>
              <p className="text-16px font-osr text-black-555 capitalize">
                Ngân Hàng Quốc Tế (VIB)
              </p>
              <p className="text-16px font-osr text-black-555 ">
                Tên tài khoản:{" "}
                <span className="capitalize">Trương Nguyễn Quang Huy</span>
              </p>
              <p className="text-16px font-osr text-black-555 ">
                Số tài khoản: 0607 2901 3210
              </p>
            </div>
            <div className="w-1/2 flex flex-col items-end gap-2">
              <p className="text-md font-om text-black uppercase">
                Thông tin liên hệ
              </p>
              <p className="text-16px font-osr text-black-555 ">
                Số điện thoại: 0798295979
              </p>
              <p className="text-16px font-osr text-black-555 text-right">
                Địa chỉ:{" "}
                <span className="capitalize">
                  433/13 Sư vạn hạnh, p12, q10, hồ chí minh, việt nam
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handlePrint}>Print</Button>
    </div>
  );
};
