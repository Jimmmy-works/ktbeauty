import { useMainParamContext } from "@/components/MainParamShopContext";
import Textbox from "@/components/Textbox";
import {
  OPTION_LIFE_STYLE,
  OPTION_SEX,
  OPTION_SKIN_TYPE,
  _LIMIT,
} from "@/contants/general";
import { PATHS } from "@/contants/path";
import queryString from "query-string";
import { Link } from "react-router-dom";
const Advertising = () => {
  const forMen = OPTION_SEX?.find((sex) => sex?.value === "male");
  const forOffice = OPTION_LIFE_STYLE?.find((life) => {
    return life?.value === "office";
  });
  const forSkin = OPTION_SKIN_TYPE?.map((skin) => {
    return skin?.value;
  });
  const {
    setValueChecked,
    setRenderChecked,
    /////
    valueCheckedSex,
    renderCheckedSex,
    setValueCheckedSex,
    setRenderCheckedSex,
    onChangeCheckboxSex,
    onChangeRenderCheckboxSex,
    /////
    valueCheckedLifeStyle,
    renderCheckedLifeStyle,
    setValueCheckedLifeStyle,
    setRenderCheckedLifeStyle,
    onChangeCheckboxLifeStyle,
    onChangeRenderCheckboxLifeStyle,
    ////
    valueCheckedSkinType,
    renderCheckedSkinType,
    setValueCheckedSkinType,
    setRenderCheckedSkinType,
    onChangeCheckboxSkinType,
    onChangeRenderCheckboxSkinType,
  } = useMainParamContext();
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

              <Link
                onClick={() => {
                  setValueCheckedSex([forMen?.value]);
                  setRenderCheckedSex([forMen]);
                  setValueCheckedLifeStyle([]);
                  setRenderCheckedLifeStyle([]);
                  setValueCheckedSkinType([]);
                  setRenderCheckedSkinType([]);
                  setValueChecked([]);
                  setRenderChecked([]);
                }}
                to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                  limit: _LIMIT,
                  page: 0,
                  sex: forMen?.value,
                })}`}
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></Link>
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

              <Link
                onClick={() => {
                  setValueCheckedSex([]);
                  setRenderCheckedSex([]);
                  setValueCheckedSkinType([]);
                  setRenderCheckedSkinType([]);
                  setValueChecked([]);
                  setRenderChecked([]);
                  setValueCheckedLifeStyle([forOffice?.value]);
                  setRenderCheckedLifeStyle([forOffice]);
                }}
                to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                  limit: _LIMIT,
                  page: 0,
                  hobby: forOffice?.value,
                })}`}
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></Link>
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
              <Link
                onClick={() => {
                  setValueCheckedSex([]);
                  setRenderCheckedSex([]);
                  setValueChecked([]);
                  setRenderChecked([]);
                  setValueCheckedLifeStyle([]);
                  setRenderCheckedLifeStyle([]);
                  setValueCheckedSkinType([...forSkin]);
                  setRenderCheckedSkinType(OPTION_SKIN_TYPE);
                }}
                to={`${PATHS.SHOP.INDEX}?${queryString.stringify({
                  limit: _LIMIT,
                  page: 0,
                  skinType: forSkin?.toString(),
                })}`}
                className="btn-flip "
                data-back="Đến shop"
                data-front="Xem ngay"
                href="/shop"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Advertising;
