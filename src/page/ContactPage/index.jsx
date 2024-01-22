import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { DatePicker, Select, TimePicker } from "antd";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const ContactPage = () => {
  const optionContact = [
    {
      title: "Gọi cho chúng tôi",
      desc: "020.566.6666",
      href: "tel:020.566.6666",
      targetBlank: true,
      icon: () => (
        <svg
          className="md:w-[24px] md:h-[24px] xs:w-[20px] xs:h-[20px] "
          viewBox="0 0 24 24"
        >
          <path
            className="fill-primary"
            d="M8 2c-1.105 0-2 .896-2 2v14.678c-.001 2.213 2.503 3.322 6.005 3.322 3.499 0 5.995-1.106 5.995-3.322v-14.678c0-1.104-.895-2-2-2h-8zm4 18c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm4-4h-8v-10h8v10zm4-7.459c.496.495.803 1.179.803 1.935.001.755-.305 1.44-.8 1.936l.814.814c.703-.704 1.139-1.677 1.139-2.751-.001-1.075-.436-2.046-1.141-2.749l-.815.815zm1.427-1.426c.86.859 1.393 2.046 1.393 3.358.001 1.313-.532 2.502-1.391 3.363l.834.835c1.074-1.075 1.738-2.56 1.737-4.198 0-1.639-.664-3.121-1.737-4.193l-.836.835zm-18.241.611c-.705.703-1.14 1.674-1.141 2.748s.435 2.047 1.139 2.751l.814-.814c-.495-.496-.8-1.18-.8-1.936s.307-1.44.802-1.935l-.814-.814zm-1.447-1.447c-1.075 1.073-1.738 2.554-1.739 4.194-.001 1.638.664 3.124 1.737 4.198l.834-.835c-.859-.861-1.391-2.05-1.39-3.363 0-1.312.531-2.5 1.392-3.358l-.834-.836z"
          />
        </svg>
      ),
    },
    {
      title: "Gửi email cho chúng tôi",
      desc: "support@ktbeauty.com",
      href: "mailto:support@shb.com",
      targetBlank: true,
      icon: () => (
        <svg
          className="md:w-[24px] md:h-[24px] xs:w-[20px] xs:h-[20px]"
          viewBox="0 0 24 24"
        >
          <path
            className="fill-primary"
            fillRule="evenodd"
            d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
          />
        </svg>
      ),
    },
    {
      title: "Fanpage",
      desc: "KT Beauty.Studio",
      href: "https://www.facebook.com/kata.beauty.studio",
      targetBlank: true,
      icon: () => (
        <svg className=" md:h-[24px] w-[20px] h-[20px]" viewBox="0 0 24 24">
          <path
            className="fill-primary"
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
          />
        </svg>
      ),
    },
    {
      title: "Chat với chúng tôi",
      desc: "24/7",
      href: "https://www.facebook.com/kata.beauty.studio",
      targetBlank: false,
      icon: () => (
        <svg
          className=" md:h-[24px] w-[20px] h-[20px]"
          viewBox="0 0 121.58 122.88"
        >
          <path
            className="fill-primary stroke-[2px]"
            d="M25.8,111.27,44.08,94.69a3.46,3.46,0,0,1,2.41-1h66.18a2,2,0,0,0,2-1.95V8.9a2,2,0,0,0-2-1.95H8.9A1.95,1.95,0,0,0,7,8.9V91.76a1.95,1.95,0,0,0,2,1.95H22.33a3.48,3.48,0,0,1,3.47,3.48v14.08Zm1.17-45a3.48,3.48,0,0,0,0,7H68a3.48,3.48,0,0,0,0-7Zm0-39.86a3.48,3.48,0,0,0,0,7H94.69a3.48,3.48,0,1,0,0-6.95Zm0,19.93a3.48,3.48,0,0,0,0,6.95H87.66a3.48,3.48,0,0,0,0-6.95Zm20.9,54.32-23,21.07a3.48,3.48,0,0,1-6.06-2.32V100.66H8.9A8.91,8.91,0,0,1,0,91.76V8.9A8.91,8.91,0,0,1,8.9,0H112.67a8.93,8.93,0,0,1,8.91,8.9V91.76a8.93,8.93,0,0,1-8.91,8.9Z"
          />
        </svg>
      ),
    },
  ];
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    reset,
    trigger,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm() || {};
  return (
    <main className="main-wrapper contactpage ">
      <div className="relative md:h-[350px] xs:h-[200px] bg-about-banner bg-[50%_20%] bg-cover"></div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Trang chủ</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          <Link>Liên hệ</Link>
        </BreadCrumb.Item>
      </BreadCrumb>
      <div className="container">
        <div className="">
          <h2 className="font-osb text-lg uppercase text-black-555 mb-[30px]">
            Liên hệ
          </h2>
        </div>
      </div>

      <section
        className="scbooking m-section p-[100px] bg-black-be w-full h-full bg-booking-banner bg-no-repeat
        bg-center bg-cover  min-h-[800px]"
      >
        <div className="scbooking__wrapper p-[40px_30px] container bg-[rgba(255,255,255,0.9)] ">
          <div className="scbooking__wrapper-content p-[20px_15px_0_15px] m-[0_100px_30px] ">
            <h3 className="heading text-center  font-gvr text-xl mb-[12px]">
              Booking chăm sóc da Online
            </h3>
            <div className="desc">
              <p className="mb-[30px] text-center max-w-[970px] mx-auto leading-[24px] font-om uppercase text-black-[#666]">
                KTBEAUTY studio & store cosmetics <br />
                địa chỉ: 433/16 sư vạn hạnh p14 q10, thành phố hồ chí minh
              </p>
              <a className=" flex justify-center">
                <img src="/assets/img/leaf-small.png" alt="" />
              </a>
            </div>
          </div>
          <div className="scbooking__wrapper-form m-[0_100px_30px]  form ">
            <div className="form__container gap-[30px]">
              <div
                className={`form__container-wrapper w-[50%]  ${
                  errors?.name?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                }`}
              >
                <label htmlFor="name">Họ và tên</label>
                <input
                  placeholder="Họ và tên"
                  {...register("name", {
                    required: "Họ và tên không được bỏ trống.",
                  })}
                  className=" "
                  type="text"
                  id="name"
                />
                <p className="">{errors?.name?.message || ""}</p>
              </div>
              <div
                className={`form__container-wrapper  xs:w-full md:w-[25%] ${
                  errors?.time?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                } `}
              >
                <label htmlFor="time">Chọn giờ</label>
                <TimePicker
                  placement="bottomRight"
                  className="input"
                  id="time"
                />
                <p className="">{errors?.time?.message || ""}</p>
              </div>
              <div
                className={`form__container-wrapper  xs:w-full md:w-[25%] ${
                  errors?.date?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                } `}
              >
                <label htmlFor="date">Chọn ngày</label>
                <DatePicker
                  format={`DD-MM-YYYY`}
                  placement="bottomRight"
                  className="input"
                  id="date"
                />
                <p className="">{errors?.email?.message || ""}</p>
              </div>
            </div>
            <div className="form__container gap-[30px]">
              <div
                className={`form__container-wrapper w-[50%]  ${
                  errors?.phone?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                }`}
              >
                <label htmlFor="phone">Dịch vụ</label>
                <Select
                  placement="bottomLeft"
                  defaultValue="1"
                  style={{
                    width: "100%",
                  }}
                  className="input px-0  py-[3.5px]"
                  options={[
                    {
                      value: "1",
                      label: "Chăm sóc da",
                    },
                    {
                      value: "2",
                      label: "Lấy nhân mụn chuẩn y khoa",
                    },
                    {
                      value: "3",
                      label: "Đốt laser mụn",
                    },
                    {
                      value: "4",
                      label: "Peel da",
                    },
                    {
                      value: "5",
                      label: "Điều trị meso",
                    },
                  ]}
                ></Select>
                <p className="">{errors?.phone?.message || ""}</p>
              </div>
              <div
                className={`form__container-wrapper w-[25%]  ${
                  errors?.phone?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                }`}
              >
                <label htmlFor="phone">Số lượng</label>
                <Select
                  placement="bottomLeft"
                  defaultValue="1"
                  style={{
                    width: "100%",
                  }}
                  className="input px-0  py-[3.5px]"
                  options={[
                    {
                      value: "1",
                      label: "1 người",
                    },
                    {
                      value: "2",
                      label: "2 người",
                    },
                    {
                      value: "3",
                      label: "3 người",
                    },
                    {
                      value: "4",
                      label: "4 người",
                    },
                  ]}
                ></Select>
                <p className="">{errors?.phone?.message || ""}</p>
              </div>
              <div
                className={`form__container-wrapper w-[25%]  ${
                  errors?.phone?.message
                    ? "annimated-horizontal error animated-bounceHorizontal"
                    : "success"
                }`}
              >
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  {...register("phone", {
                    required: "Số điện thoại không được bỏ trống",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "Số điện thoại không đúng định dạng VN",
                    },
                  })}
                  placeholder="+84"
                  type="number"
                  id="phone"
                />
                <p className="">{errors?.phone?.message || ""}</p>
              </div>
            </div>
            <div className="form__container gap-[30px]">
              <div className="form__container-wrapper w-full ">
                <label htmlFor="note">Ghi chú</label>
                <textarea
                  {...register("note")}
                  className="textarea resize-none"
                  placeholder="Ghi chú"
                  id="note"
                  cols="30"
                  rows="14"
                ></textarea>
                <p className="">{errors?.note?.message}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button>Booking</Button>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="scsupport flex items-center justify-start -mx-[10px]">
          {optionContact?.map((item) => (
            <a
              target={item?.targetBlank ? "_blank" : ""}
              href={item?.href ? item?.href : false}
              className="draw text-16px font-osr leading-[24px] p-[16px_20px] 
                          border border-primary border-solid rounded-lg relative 
                          after:w-[6px] after:absolute after:top-1/2 after:-translate-y-1/2 
                          after:left-0 after:bg-primary after:h-[70%] w-[calc(25%-30px)] mx-[10px]
                          flex justify-center gap-1 items-center flex-col cursor-pointer group"
            >
              {item?.icon()}
              <span className="group-hover:text-primary font-om text-black-333 duration-400 transition-colors">
                {item?.title}
              </span>
              <span className="group-hover:text-primary text-sm block duration-400 transition-colors ">
                {item?.desc}
              </span>
            </a>
          ))}
        </section>
      </div>
      <div className="container">
        <section className="scmap mt-[50px] border-[4px] border-solid border-[#f7f7f7]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.507054584115!2d106.66578147583827!3d10.772422659265922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fd931514ee9%3A0xf016c085433df551!2sKT%20Beauty.Studio!5e0!3m2!1sen!2s!4v1705571171498!5m2!1sen!2s"
            width="100%"
            height="550"
          ></iframe>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
