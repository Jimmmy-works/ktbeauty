import React from "react";
const Review = () => {
  return (
    <div className="review">
      <h3 className="title font-osb text-black-555 text-[15px] leading-[24px] ">
        1 review for Luminizer Holiday Gift Set
      </h3>
      <div className="mt-[20px] flex flex-col gap-8">
        <div className="flex items-start gap-[30px]">
          <div className="p-3 bg-grey-f7f6 rounded-[50%]">
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path
                className="fill-black-555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
          </div>
          <div className="flex justify-between items-start w-full p-[20px] border border-solid border-[#e5e5e5]">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-osb text-black-555 text-[15px]">Guest</p>
                <span className=" bg-grey-999 h-[1px] w-[6px]"></span>
                <p className="font-osr text-grey-999 text-[15px]">
                  November 16, 2017
                </p>
              </div>
              <p className="text-[15px] font-osr text-black-333 mt-[20px]">
                The product is great to wish you good sales
              </p>
            </div>
            <div className="text-[20px] tracking-tighter text-gray-200  relative z-20 ">
              &#x2605; &#x2605; &#x2605; &#x2605; &#x2605;
              <div
                className="text-[20px] tracking-tighter flex gap-1 
               top-0 left-0 w-[60%] text-[#ffc105] absolute overflow-hidden"
              >
                <div> &#x2605;</div>
                <div> &#x2605;</div>
                <div> &#x2605;</div>
                <div> &#x2605;</div>
                <div> &#x2605;</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-[30px]">
          <div className="p-3 bg-grey-f7f6 rounded-[50%]">
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path
                className="fill-black-555"
                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
              />
            </svg>
          </div>
          <div className=" w-full p-[20px] border border-solid border-[#e5e5e5]">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-osb text-black-555 text-[15px]">Guest</p>
                <span className=" bg-grey-999 h-[1px] w-[6px]"></span>
                <p className="font-osr text-grey-999 text-[15px]">
                  November 16, 2017
                </p>
              </div>
              <textarea
                className="w-full font-osr text-black-333 text-[15px] mt-[20px] scrollbar-nav"
                placeholder="Review something..."
                name=""
                id=""
                cols="30"
                rows="5"
              />
            </div>
          </div>
        </div>

        {/* <div className="mt-[30px]">
                  <h4 className="font-osr text-md text-black-333 mb-[10px]">
                    Add a review
                  </h4>
                  <p className="font-osr text-[15px] text-black-555">
                    You must be logged in to post a review.
                  </p>
                </div> */}
      </div>
    </div>
  );
};

export default Review;
