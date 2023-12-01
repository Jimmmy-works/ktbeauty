import { PATHS } from "@/contants/path";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main className="main-wrapper">
      <div className="container">
        <div className="h-full w-[800px] m-auto my-[50px]">
          <div className="flex gap-4 items-center justify-center">
            <h2 className="text-[40px] font-osb text-red-600">404 NOT FOUND</h2>
          </div>
          <p className="text-[20px] leading-[1.2] font-osr text-black-555 text-center mt-[20px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
            maxime hic? Obcaecati praesentium repudiandae vel. Velit vel
            quibusdam corporis itaque explicabo eos sequi ad aperiam amet, porro
            animi officiis repellat culpa id mollitia minima accusantium minus
            alias dolorum saepe distinctio maiores dolores quisquam? Vero quidem
            rerum voluptate quod impedit natus.
          </p>
          <div className="flex items-center justify-center mt-[30px] relative group/hover cursor-pointer">
            <div
              href=""
              className="absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_5px_0_#ad4141]  font-mab text-md
               text-white bg-primary p-[20px] flex items-center gap-3
              transition-all duration-400 group-hover/hover:shadow-[0_2px_0_#ad4141] group-hover/hover:top-[3px]"
            >
              <Link to={PATHS.HOME}>Trở lại trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page404;
