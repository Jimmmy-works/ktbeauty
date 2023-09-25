import Button from "@/components/Button";
import React from "react";

const Account = () => {
  return (
    <form className="form p-0" action="">
      <div className="form__container mt-0 ">
        <div
          className="form__container-wrapper xs:w-full md:w-1/2 error 
          annimated-horizontal animated-bounceHorizontal"
        >
          <label htmlFor="first-name">First Name</label>
          <input className=" " type="text" id="first-name" />
          <p className=""> Please try again</p>
        </div>
        <div className="form__container-wrapper xs:w-full md:w-1/2">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
          <p className=""> Please try again</p>
        </div>
      </div>
      <div className="form__container">
        <div className="form__container-wrapper xs:w-full md:w-1/2">
          <label htmlFor="first-name">Phone</label>
          <input type="text" id="first-name" />
          <p className=""> Please try again</p>
        </div>
        <div className="form__container-wrapper xs:w-full md:w-1/2">
          <label htmlFor="last-name">Email</label>
          <input type="text" id="last-name" />
          <p className=""> Please try again</p>
        </div>
      </div>
      <div className="form__container xs:flex-wrap lg:flex-nowrap">
        <div className="form__container-wrapper xs:w-full lg:w-1/3">
          <label htmlFor="city">City</label>
          <input type="text" id="city" />
          <p className=""> Please try again</p>
        </div>
        <div className="form__container-wrapper xs:w-full lg:w-1/3">
          <label htmlFor="district">District</label>
          <input type="text" id="district" />
          <p className=""> Please try again</p>
        </div>
        <div className="form__container-wrapper xs:w-full lg:w-1/3">
          <label htmlFor="ward">Ward</label>
          <input type="text" id="ward" />
          <p className=""> Please try again</p>
        </div>
      </div>
      <div className="form__container-wrapper">
        <label htmlFor="address">Address</label>
        <input id="address" placeholder="ID home & Street name" type="text" />
        <p className=""> Please try again</p>
      </div>
      <h3 className="font-mab text-black-333 text-md m-[30px_0_20px_0]">
        Change Password
      </h3>
      <div className="form__container-wrapper">
        <label htmlFor="password">Current Password</label>
        <input id="password" type="password" />
        <p className=""> Please try again</p>
      </div>
      <div className="form__container-wrapper">
        <label htmlFor="new-password">New Password</label>
        <input id="new-password" type="password" />
        <p className=""> Please try again</p>
      </div>
      <div className="form__container-wrapper">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input id="confirm-password " type="password" />
        <p className=""> Please try again</p>
      </div>
      <div className=" lg:mt-[20px] flex">
        <Button className={`rounded-none flex items-center gap-3 py-[15px]`}>
          <p>SAVE CHANGES</p>
          <svg
            className="w-[24px] h-[24px] group-hover/hover:stroke-white  stroke-primary  transition-colors duration-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z" />
            <rect width="10" height="8" x="7" y="13" />
            <rect width="8" height="5" x="8" y="3" />
          </svg>
        </Button>
      </div>
    </form>
  );
};

export default Account;
