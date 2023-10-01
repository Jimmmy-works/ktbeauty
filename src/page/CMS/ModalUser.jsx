// import Button from "@/components/Button";
// import { Modal, message } from "antd";
// import React, { useState } from "react";

// const ModalUser = ({ setListProduct, listProduct }) => {
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [img, setImg] = useState("");
//   const [passwork, setPasswork] = useState("");
//   const [email, setEmail] = useState("");
//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     const payload = {
//       name: name,
//       price: price,
//       image: img,
//     };
//     setListProduct([...listProduct, payload]);
//     message.success("Success add product");
//     setOpen(false);
//     setConfirmLoading(false);
//   };
//   const handleCancel = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Button
//         onClick={showModal}
//         className={`z-10 rounded-[50%] xs:py-[6px] xs:px-[13.6px] md:py-[6px] md:px-[15.93px] bottom-[120px] right-[30px]`}
//       >
//         <span className="text-lg font-mar"> &#43;</span>
//       </Button>
//       <Modal
//         title={<p className="font-mam text-16px">Add Product</p>}
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//         okButtonProps={{ className: "custom-button-ok" }}
//         cancelButtonProps={{ className: "custom-button-cancel" }}
//       >
//         <form className="form p-0" action="">
//           <div className="form__container mt-0 ">
//             <div className="form__container-wrapper w-full mb-[20px]">
//               <label htmlFor="first-name">Username</label>
//               <input
//                 value={email}
//                 onChange={(e) => setName(e.target.value)}
//                 className=" "
//                 type="text"
//                 id="first-name"
//               />
//             </div>
//           </div>
//           <div className="form__container mt-0 ">
//             <div className="form__container-wrapper w-full mb-[20px]">
//               <label htmlFor="first-name">Password</label>
//               <input
//                 onChange={(e) => setPasswork(e.target.value)}
//                 className=" "
//                 value={passwork}
//                 type="text"
//                 id="first-name"
//               />
//             </div>
//           </div>
//           <div className="form__container mt-0 ">
//             <div className="form__container-wrapper w-full">
//               <label htmlFor="first-name">Image</label>
//               <input
//                 onChange={(e) => setImg(e?.target?.files[0])}
//                 className="p-0 border-0 cursor-pointer bg-transparent"
//                 type="file"
//                 id="first-name"
//               />
//             </div>
//           </div>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default ModalUser;
