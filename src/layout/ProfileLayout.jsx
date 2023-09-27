import BreadCrumb from "@/components/BreadCrumb";
import { useMainContext } from "@/components/MainContext";
import Tab from "@/components/Tab/Tab";
import { PATHS } from "@/contants/path";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 35,
    }}
  />
);
const ProfileLayout = () => {
  const { pathname } = useLocation();
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    setLoadingPage(true);
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <main className="main-wrapper ">
      <div className="container">
        <BreadCrumb>
          <BreadCrumb.Item>
            <Link to={`${PATHS.HOME}`}>Home</Link>
          </BreadCrumb.Item>
          <BreadCrumb.Item isActive>Profile</BreadCrumb.Item>
        </BreadCrumb>
        <div className="bg-advertising-banner-2 bg-no-repeat bg-cover xs:h-[100px] md:h-[140px] w-full relative ">
          <h3 className="font-mam xs:text-[26px] w-full text-center md:text-[40px] text-white center-absolute z-20">
            Profile
          </h3>
        </div>
        <div className="flex md:flex-row xs:flex-col xs:gap-[10px] md:gap-[20px] lg:gap-[30px] mt-[30px]">
          <div className="sidebar-profile flex-col md:w-[20%] lg:w-1/4 xs:w-full  items-start justify-start">
            <ul className={`list`}>
              <li className="list__item flex-row items-center w-full">
                <NavLink end to={PATHS.PROFILE.INDEX}>
                  <svg viewBox="0 0 32 32">
                    <path d="M16,31C7.729,31,1,24.271,1,16S7.729,1,16,1s15,6.729,15,15S24.271,31,16,31z M16,2C8.28,2,2,8.28,2,16      s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z" />
                    <path d="M23.64,20.713l-4.762-1.652l-0.323-2.584c-0.215,0.307-0.523,0.546-0.924,0.671l0.293,2.345         c0.023,0.189,0.152,0.349,0.332,0.41l5.055,1.756c0.9,0.314,1.689,1.427,1.689,2.381v-0.007c0,0.276,0.224,0.5,0.5,0.5         c0.275,0,0.499-0.223,0.5-0.498C25.997,22.656,24.94,21.168,23.64,20.713z" />
                    <path d="M6.5,24.532c-0.276,0-0.5-0.224-0.5-0.5v0.007c0-1.379,1.059-2.871,2.359-3.326l4.762-1.641         l0.012-0.28c0.034-0.274,0.289-0.465,0.559-0.434c0.273,0.034,0.468,0.284,0.434,0.559l-0.051,0.589         c-0.023,0.189-0.153,0.348-0.333,0.41l-5.054,1.742C7.789,21.973,7,23.086,7,24.039v-0.007C7,24.309,6.776,24.532,6.5,24.532         z" />
                    <path d="M16,18.039c-2.779,0-4.192-1.844-4.201-6.469c-0.002-1.174,0.123-2.363,1.227-3.469          C13.729,7.396,14.729,7.039,16,7.039s2.271,0.357,2.975,1.063c1.104,1.105,1.229,2.295,1.227,3.469          C20.192,16.195,18.779,18.039,16,18.039z M16,8.039c-1.009,0-1.75,0.252-2.267,0.769c-0.632,0.633-0.938,1.2-0.935,2.761          c0.008,4.018,1.055,5.471,3.201,5.471s3.193-1.453,3.201-5.471c0.003-1.561-0.303-2.128-0.935-2.761          C17.75,8.291,17.009,8.039,16,8.039z" />
                  </svg>
                  <p>Account</p>
                </NavLink>
              </li>
              <li className="list__item flex-row items-center w-full">
                <NavLink to={PATHS.PROFILE.ORDER}>
                  <svg viewBox="0 0 24 24">
                    <path d="M4.20853 17.8104L3.46191 17.7393L4.20853 17.8104ZM19.7915 17.8104L20.5381 17.7393L19.7915 17.8104ZM19.0296 9.81038L18.2829 9.88149L19.0296 9.81038ZM4.97043 9.81038L5.71705 9.88149L4.97043 9.81038ZM7.24999 11C7.24999 11.4142 7.58578 11.75 7.99999 11.75C8.41421 11.75 8.74999 11.4142 8.74999 11H7.24999ZM15.25 11C15.25 11.4142 15.5858 11.75 16 11.75C16.4142 11.75 16.75 11.4142 16.75 11H15.25ZM6.96142 8.75H17.0386V7.25H6.96142V8.75ZM18.2829 9.88149L19.0448 17.8815L20.5381 17.7393L19.7762 9.73928L18.2829 9.88149ZM17.8005 19.25H6.19952V20.75H17.8005V19.25ZM4.95515 17.8815L5.71705 9.88149L4.22381 9.73928L3.46191 17.7393L4.95515 17.8815ZM6.19952 19.25C5.46234 19.25 4.88526 18.6153 4.95515 17.8815L3.46191 17.7393C3.30815 19.3538 4.57773 20.75 6.19952 20.75V19.25ZM19.0448 17.8815C19.1147 18.6153 18.5376 19.25 17.8005 19.25V20.75C19.4223 20.75 20.6918 19.3538 20.5381 17.7393L19.0448 17.8815ZM17.0386 8.75C17.683 8.75 18.2218 9.23994 18.2829 9.88149L19.7762 9.73928C19.6418 8.32788 18.4563 7.25 17.0386 7.25V8.75ZM6.96142 7.25C5.54364 7.25 4.35823 8.32788 4.22381 9.73928L5.71705 9.88149C5.77815 9.23994 6.31698 8.75 6.96142 8.75V7.25ZM8.74999 7C8.74999 5.20507 10.2051 3.75 12 3.75V2.25C9.37664 2.25 7.24999 4.37665 7.24999 7H8.74999ZM12 3.75C13.7949 3.75 15.25 5.20507 15.25 7H16.75C16.75 4.37665 14.6233 2.25 12 2.25V3.75ZM7.24999 7V11H8.74999V7H7.24999ZM15.25 7V11H16.75V7H15.25Z" />
                  </svg>
                  <p>Order</p>
                </NavLink>
              </li>
              <li className="list__item flex-row items-center w-full">
                <NavLink to={PATHS.PROFILE.WHITELIST}>
                  <svg viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                    <path
                      d="M48,6c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0
                            c0,0-3.971-3.97-3.979-3.961C24.418,7.791,20.418,6,16,6C7.163,6,0,13.163,0,22c0,3.338,1.024,6.436,2.773,9
                            c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,58.609,30.977,59,32,59s2.047-0.391,2.828-1.172
                            c0,0,23.93-23.93,24.797-24.797S61.227,31,61.227,31C62.976,28.436,64,25.338,64,22C64,13.163,56.837,6,48,6z M58.714,30.977
                            c0,0-0.612,0.75-1.823,1.961S33.414,56.414,33.414,56.414C33.023,56.805,32.512,57,32,57s-1.023-0.195-1.414-0.586
                            c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,28.545,2,25.424,2,22C2,14.268,8.268,8,16,8
                            c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009
                            C40.634,9.566,44.134,8,48,8c7.732,0,14,6.268,14,14C62,25.424,60.755,28.545,58.714,30.977z"
                    />
                    <path
                      d="M48,12c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1
		                    C58,16.478,53.522,12,48,12z"
                    />
                  </svg>
                  <p>Whitelist</p>
                </NavLink>
              </li>
              <li className="list__item flex-row items-center w-full">
                <NavLink to={PATHS.PROFILE.ADDRESS}>
                  <svg viewBox="0 0 64 64">
                    <path
                      d="M62.364,0.773c-0.694-0.509-1.526-0.772-2.366-0.772c-0.403,0-0.809,0.061-1.202,0.185L41.033,5.795
                            l-16.769-5.59C23.854,0.068,23.427,0,22.999,0c-0.468,0-0.937,0.082-1.382,0.247l-19,7C1.045,7.826,0,9.324,0,11v49
                            c0,1.274,0.607,2.473,1.636,3.227C2.33,63.735,3.16,64,4,64c0.404,0,0.811-0.062,1.204-0.186L23,58.194l17.796,5.62
                            C41.188,63.938,41.593,64,41.999,64c0.428,0,0.855-0.068,1.266-0.205l18-6C62.898,57.25,64,55.722,64,54V4
                            C64,2.726,63.393,1.527,62.364,0.773z M59.396,2.094c0.195-0.062,0.398-0.093,0.603-0.093c0.425,0,0.845,0.137,1.184,0.386
                            C61.694,2.762,62,3.365,62,4v25.086c-0.234-0.036-0.477-0.083-0.732-0.132c-1.167-0.233-1.899-0.521-2.78-1.546
                            c-1.04-1.188-0.435-3.11-1.581-4.114c-0.442-0.378-0.866-0.504-1.294-0.504c-0.824-0.001-1.662,0.468-2.675,0.504
                            c-1.666,0.074-2.812,0.756-4.194,0.756c-0.427,0-0.877-0.064-1.372-0.233c-1.342-0.46-1.856-1.511-3.178-2.061
                            c-0.426-0.18-0.815-0.291-1.193-0.374V15.19c1.126,0.401,2.13,0.773,3.575,0.912c0.791,0.079,1.43,0.38,2.07,0.38
                            c0.36,0,0.721-0.096,1.108-0.38c1.199-0.894,2.229-2.522,1.592-4.108c-0.414-1.045-1.411-0.652-1.995-1.545
                            c-0.626-0.984-0.329-1.883-0.785-3.078c0.284-0.876,0.768-1.492,1.036-2.185L59.396,2.094z M46.697,8.084
                            c0.111,0.293,0.146,0.587,0.189,0.959c0.076,0.65,0.181,1.542,0.776,2.479c0.603,0.921,1.396,1.265,1.872,1.448
                            c0.015,0.529-0.5,1.163-0.948,1.507c-0.121-0.017-0.339-0.071-0.505-0.113c-0.354-0.09-0.794-0.2-1.309-0.252
                            c-1.154-0.111-1.96-0.398-2.979-0.763c-0.246-0.088-0.52-0.182-0.794-0.275V7.271l3.962-1.251
                            c-0.104,0.229-0.211,0.462-0.299,0.734C46.522,7.188,46.534,7.658,46.697,8.084z M41,21.214c-0.543,0.011-1.101,0.04-1.729,0.04
                            c-0.204,0-0.414-0.004-0.634-0.013c-0.118-0.005-0.233-0.007-0.347-0.007c-1.107,0-1.954,0.213-2.901,0.213
                            c-0.467,0-0.957-0.052-1.517-0.206c-1.29-0.358-2.361-0.188-3.179-1.532c-0.949-1.595-0.901-3.518,0-5.152
                            c0.944-1.69,2.367-1.306,3.975-1.539c0.296-0.04,0.575-0.059,0.843-0.059c1.997,0,3.314,1.027,5.488,1.592V21.214z M31.443,44.217
                            c-0.53,1.29-1.509,1.559-2.606,1.559c-0.188,0-0.379-0.008-0.572-0.02c-1.178-0.069-1.708-0.907-2.78-1.539
                            c-1.021-0.602-1.726-1.426-2.484-2.075v-12.98c0.747,1.009,1.04,2.037,2.081,2.711c0.404,0.262,0.789,0.354,1.165,0.354
                            c0.901,0,1.754-0.529,2.706-0.529c0.289,0,0.588,0.049,0.899,0.176c1.597,0.666,2.955,1.078,3.57,3.098
                            c0.403,1.3,0.414,2.296,0,3.587c-0.408,1.305-1.603,1.236-1.979,2.569C31.108,42.266,31.873,43.145,31.443,44.217z M2,19.156
                            c0.875-0.007,1.722-0.066,2.839-0.123c1.395-0.077,2.395-0.816,3.539-0.816c0.384,0,0.784,0.083,1.221,0.302
                            c1.337,0.652,1.586,2.073,2.785,3.077c1.81,1.518,3.247,1.292,5.163,2.577c1.428,0.959,2.418,1.758,3.453,2.786v14.21
                            c-0.095-0.013-0.18-0.039-0.28-0.043c-0.372-0.011-0.71-0.055-1.025-0.055c-0.485,0-0.921,0.102-1.357,0.576
                            c-0.753,0.811-0.105,2.186-0.79,3.078c-0.498,0.662-1.057,0.868-1.666,0.868c-0.592,0-1.231-0.193-1.91-0.353
                            c-1.364-0.311-1.815-1.725-3.173-2.055c-0.509-0.122-0.916-0.22-1.329-0.22c-0.329,0-0.661,0.062-1.054,0.22
                            c-1.688,0.687-1.969,2.589-2.786,4.63c-0.668,1.69-0.005,3.489-1.188,4.616c-0.575,0.549-1.126,0.718-1.722,0.718
                            c-0.231,0-0.471-0.026-0.719-0.064V19.156z M3.309,9.124L21,2.606V24.25c-0.702-0.588-1.444-1.137-2.338-1.737
                            c-1.082-0.726-2.019-1.056-2.845-1.348c-0.836-0.294-1.439-0.507-2.148-1.102c-0.3-0.251-0.536-0.607-0.811-1.021
                            c-0.507-0.764-1.138-1.715-2.383-2.322c-0.661-0.331-1.373-0.504-2.098-0.504c-0.902,0-1.653,0.257-2.314,0.484
                            c-0.488,0.167-0.91,0.312-1.335,0.335L3.922,17.08C3.188,17.12,2.598,17.152,2,17.156V11C2,10.166,2.525,9.412,3.309,9.124z
                            M4.603,61.907C4.407,61.969,4.204,62,4,62c-0.428,0-0.837-0.134-1.182-0.387C2.306,61.238,2,60.635,2,60v-4.904
                            c0.235,0.028,0.472,0.055,0.719,0.055c1.191,0,2.207-0.416,3.103-1.271c1.256-1.195,1.357-2.717,1.433-3.827
                            c0.037-0.561,0.073-1.09,0.235-1.5c0.18-0.449,0.338-0.899,0.489-1.333c0.482-1.375,0.74-1.996,1.19-2.18
                            c0.178-0.072,0.257-0.072,0.3-0.072c0.18,0,0.496,0.076,0.861,0.164c0.147,0.036,0.396,0.274,0.659,0.526
                            c0.554,0.529,1.312,1.255,2.537,1.534l0.363,0.088c0.597,0.147,1.273,0.314,1.991,0.314c1.315,0,2.444-0.576,3.265-1.666
                            c0.714-0.931,0.746-1.975,0.769-2.666c0.002-0.054,0.004-0.117,0.006-0.181c0.056,0.003,0.112,0.008,0.17,0.012
                            c0.183,0.014,0.372,0.026,0.57,0.032c0.118,0.005,0.229,0.027,0.34,0.068v13.535L4.603,61.907z M23.603,56.287L23,56.097V44.85
                            c0.422,0.373,0.894,0.751,1.47,1.091c0.24,0.142,0.469,0.32,0.71,0.51c0.656,0.515,1.555,1.219,2.968,1.302
                            c0.229,0.015,0.461,0.023,0.689,0.023c2.193,0,3.692-0.941,4.456-2.798c0.448-1.117,0.263-2.077,0.14-2.712
                            c-0.045-0.23-0.095-0.492-0.07-0.576l0.017-0.052c0.03-0.04,0.184-0.16,0.295-0.249c0.476-0.374,1.271-1.001,1.657-2.234
                            c0.526-1.645,0.528-3.077,0.001-4.777c-0.843-2.765-2.795-3.565-4.364-4.208l-0.347-0.143c-0.541-0.221-1.098-0.33-1.669-0.33
                            c-0.773,0-1.433,0.196-1.961,0.354c-0.291,0.087-0.592,0.176-0.745,0.176c-0.02-0.001-0.038-0.007-0.078-0.032
                            c-0.288-0.187-0.476-0.492-0.81-1.06c-0.279-0.476-0.627-1.066-1.146-1.657c-0.434-0.493-0.83-0.927-1.213-1.329V2
                            c0.216,0,0.428,0.034,0.632,0.103L40.4,7.692L41,7.892v4.565c-0.504-0.16-0.979-0.337-1.462-0.53
                            c-1.183-0.476-2.407-0.968-4.026-0.968c-0.364,0-0.739,0.025-1.114,0.077c-0.293,0.042-0.587,0.061-0.898,0.079
                            c-1.308,0.079-3.284,0.199-4.551,2.466c-1.275,2.313-1.263,4.982,0.027,7.151c1.096,1.803,2.63,2.09,3.646,2.281
                            c0.253,0.047,0.492,0.092,0.717,0.154c0.681,0.188,1.352,0.279,2.052,0.279c0.569,0,1.074-0.058,1.562-0.113
                            c0.451-0.051,0.877-0.1,1.339-0.1c0.086,0,0.175,0.002,0.265,0.005c0.249,0.011,0.486,0.015,0.716,0.015
                            c0.416,0,0.804-0.014,1.177-0.026c0.189-0.007,0.369-0.01,0.552-0.014v38.567L23.603,56.287z M60.632,55.897L43,61.774V23.449
                            c0.136,0.044,0.271,0.089,0.418,0.15c0.354,0.147,0.628,0.378,1.007,0.698c0.554,0.467,1.243,1.049,2.298,1.41
                            c0.677,0.23,1.336,0.342,2.021,0.342c0.955,0,1.78-0.222,2.508-0.418c0.597-0.161,1.16-0.312,1.775-0.34
                            c0.733-0.026,1.366-0.202,1.875-0.343c0.249-0.068,0.529-0.146,0.676-0.158c0.078,0.142,0.15,0.592,0.198,0.893
                            c0.139,0.859,0.328,2.037,1.207,3.042c1.218,1.417,2.395,1.89,3.893,2.189l0.104,0.021c0.331,0.062,0.672,0.118,1.021,0.16V54
                            C62,54.862,61.45,55.625,60.632,55.897z"
                    />
                    <path
                      d="M55.306,39.322c-0.678-0.208-1.318-0.404-2.01-0.404c-0.652,0-1.241,0.177-1.804,0.543
                                c-0.632,0.417-0.814,0.932-0.856,1.289c-0.111,0.965,0.604,1.723,1.361,2.525c0.506,0.536,1.27,1.346,1.122,1.731
                                c-0.096,0.256-0.386,0.396-0.979,0.633c-0.737,0.296-1.853,0.741-2.094,2.071c-0.136,0.738,0.032,1.416,0.485,1.96
                                c0.637,0.763,1.791,1.183,3.253,1.183c1.49,0,2.955-0.43,3.928-1.156c1.653-1.268,2.287-3.12,1.884-5.503
                                C59.194,41.763,57.732,40.085,55.306,39.322z M56.505,48.103c-0.61,0.456-1.679,0.751-2.721,0.751
                                c-0.919,0-1.523-0.232-1.717-0.464c-0.034-0.041-0.093-0.111-0.055-0.32c0.037-0.199,0.191-0.301,0.87-0.572
                                     c0.715-0.286,1.694-0.678,2.107-1.782c0.593-1.553-0.639-2.858-1.539-3.812c-0.238-0.252-0.57-0.604-0.735-0.843
                        c0.525-0.277,1.124-0.096,2.054,0.19c1.642,0.517,2.575,1.586,2.854,3.274C57.905,46.19,57.557,47.296,56.505,48.103z"
                    />
                  </svg>
                  <p>Address</p>
                </NavLink>
              </li>
              <li className="list__item flex-row items-center w-full">
                <a className="" href="">
                  <svg viewBox="0 0 30 32">
                    <path
                      d="M0,30.5C0,31.327,0.673,32,1.5,32h21c0.827,0,1.5-0.673,1.5-1.5V22c0-0.276-0.224-0.5-0.5-0.5
                        S23,21.724,23,22v8.5c0,0.275-0.224,0.5-0.5,0.5h-21C1.224,31,1,30.775,1,30.5v-29C1,1.225,1.224,1,1.5,1h21
                        C22.776,1,23,1.225,23,1.5V10c0,0.276,0.224,0.5,0.5,0.5S24,10.276,24,10V1.5C24,0.673,23.327,0,22.5,0h-21C0.673,0,0,0.673,0,1.5
                        V30.5z"
                    />
                    <path
                      d="M25.799,20.085c0.098,0.098,0.226,0.146,0.354,0.146s0.256-0.049,0.354-0.146l3.231-3.231
                        c0.195-0.195,0.195-0.512,0-0.707l-3.231-3.231c-0.195-0.195-0.512-0.195-0.707,0s-0.195,0.512,0,0.707L28.177,16H14
                        c-0.276,0-0.5,0.224-0.5,0.5S13.724,17,14,17h14.177l-2.378,2.378C25.604,19.573,25.604,19.89,25.799,20.085z"
                    />
                  </svg>
                  <p> Sign Out</p>
                </a>
              </li>
            </ul>
          </div>
          <div className="relative xs:w-full md:w-[80%] lg:w-3/4">
            {/* {loadingPage ? (
              <div className="h-[100%] left-[35%] flex items-center justify-center center-absolute">
                <Spin indicator={antIcon} />
              </div>
            ) : (
              <Outlet />
            )} */}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
