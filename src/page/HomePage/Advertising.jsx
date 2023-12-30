import Button from "@/components/Button";
import Textbox from "@/components/Textbox";

const Advertising = () => {
  return (
    <section className="scadvertising pt-section">
      <div className="container">
        <Textbox title={`DANH MỤC NỔI BẬT`} />
        <div className="scadvertising__list flex items-center lg:flex-nowrap xs:flex-wrap gap-[20px]">
          <div
            className="scadvertising__list-item  xs:w-full lg:w-1/2 relative
               after:w-full after:h-full after:bg-[rgba(0,0,0,0.45)] after:absolute
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[10px]  "
          >
            <div className="relative h-0 overflow-hidden pb-[66.6669%] rounded-[10px]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/bg-advertising-1.jpg"
                alt=""
              />
            </div>
            <div
              className="h-full flex gap-3 flex-col items-center justify-center content center-absolute z-10 w-full min-h-[180px]
            overflow-hidden p-[20px]"
            >
              <h3
                className=" relative xs:text-[34px] md:text-[46px] leading-normal font-gvr capitalize text-white  mx-auto w-fit
              tracking-wider"
              >
                Dành cho nam
              </h3>

              <a
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></a>
            </div>
          </div>
          <div
            className="scadvertising__list-item rounded-[10px] xs:w-full md:w-[calc(50%-10px)] lg:w-1/4 relative
          after:w-full after:h-full after:bg-[rgba(0,0,0,0.35)] after:absolute 
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[10px] "
          >
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%] rounded-[10px]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/bg-advertising-2.jpg"
                alt=""
              />
            </div>
            <div
              className="h-full flex gap-3 flex-col items-center justify-center content center-absolute z-10 w-full min-h-[180px]
            overflow-hidden p-[20px]"
            >
              <h3
                className=" relative xs:text-[34px] md:text-[46px] leading-normal font-gvr capitalize text-white  mx-auto w-fit
              tracking-wider"
              >
                Công sở
              </h3>

              <a
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></a>
            </div>
          </div>
          <div
            className="scadvertising__list-item rounded-[10px] xs:w-full md:w-[calc(50%-10px)] lg:w-1/4 relative
           after:w-full after:h-full after:bg-[rgba(0,0,0,0.35)] after:absolute 
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[10px] "
          >
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%] rounded-[10px]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/bg-advertising-3.jpg"
                alt=""
              />
            </div>
            <div
              className="h-full flex gap-3 flex-col items-center justify-center content center-absolute z-10 w-full min-h-[180px]
            overflow-hidden p-[20px]"
            >
              <h3
                className=" relative xs:text-[34px] md:text-[46px] leading-normal font-gvr capitalize text-white  mx-auto w-fit
              tracking-wider"
              >
                Trị mụn
              </h3>

              <a
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertising;
