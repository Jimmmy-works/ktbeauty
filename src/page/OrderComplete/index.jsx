import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import React from "react";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  return (
    <main className="main-wrapper">
      <div className="container">
        <div className="h-full w-[800px] m-auto my-[50px]">
          <div className="flex gap-4 items-center justify-center">
            <svg className="w-12 h-12" viewBox="0 0 24 24">
              <path
                className="fill-primary"
                d="M18 10c0 3.309-2.691 6-6 6s-6-2.691-6-6 2.691-6 6-6 6 2.691 6 6zm4 1.737l-1.895 1.168.687 2.095-2.187.46-.079 2.2-2.213-.304-.84 2.04-1.977-1.031-1.496 1.635-1.497-1.634-1.977 1.031-.84-2.04-2.213.304-.079-2.2-2.186-.461.687-2.095-1.895-1.168 1.374-1.737-1.374-1.737 1.895-1.168-.687-2.095 2.187-.46.079-2.2 2.213.304.84-2.04 1.977 1.031 1.496-1.635 1.497 1.634 1.977-1.031.84 2.04 2.213-.304.079 2.2 2.186.461-.687 2.095 1.895 1.168-1.374 1.737 1.374 1.737zm-3-1.737c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7 7-3.134 7-7zm-1.859 10.276l2.401 3.724 1.146-2h2.312l-2.655-4.103c-.917.969-1.999 1.775-3.204 2.379zm-13.486-2.379l-2.655 4.103h2.312l1.146 2 2.401-3.724c-1.205-.604-2.287-1.41-3.204-2.379z"
              />
            </svg>
            <h2 className="text-[40px] font-osb text-primary">
              Congratulations
            </h2>
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
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z"
                />
              </svg>
              <Link to={PATHS.HOME}>Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderComplete;
