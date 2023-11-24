import { THUNK_STATUS } from "@/contants/thunkstatus";
import { Checkbox } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { authActions } from "@/store/reducer/authReducer";

const Login = ({
  controlAuthen,
  onOpenRegister,
  onAuthenModal,
  onLogin,
  updateStatusLogin,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [savePassword, setSavePassword] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleChangeSavePassword = (e) => {
    setSavePassword(e.target.checked);
  };
  const handleSignin = (data) => {
    if (updateStatusLogin !== THUNK_STATUS.pending) {
      onLogin(data);
    }
    if (savePassword) {
      dispatch(authActions.checkSavePassword(true));
    } else {
      dispatch(authActions.checkSavePassword(false));
    }
  };

  return (
    <div
      className={`login md:shadow-[0px_5px_20px_5px_rgba(255,255,255,0.15)] p-[50px_30px] transition-all 
      ease-cubic-authen duration-[600ms] center-absolute w-full h-fit max-w-[500px] z-[1003] ${
        controlAuthen === "login"
          ? "translate-y-[-50%] visible opacity-100 "
          : "translate-y-[-200%] invisible opacity-0"
      }`}
    >
      <h2 className="text-center text-[44px] tracking-[2px] text-white font-gvr leading-[60px]">
        Đăng Nhập
      </h2>
      <div
        className="group/hover w-[40px] h-[40px] flex items-center justify-center 
      absolute top-2 right-2 cursor-pointer"
        onClick={onAuthenModal}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            className="fill-white group-hover/hover:fill-primary duration-400 transition-colors"
            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
          />
        </svg>
      </div>
      <div className="form pt-[40px]">
        <div className="flex items-center gap-3 text-white relative">
          <div className="form__container ">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.email ? "error" : ""
              }`}
            >
              <div className="relative">
                <svg
                  className="w-[18px] h-[18px] absolute left-[20px] top-1/2 -translate-y-1/2 "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                  />
                </svg>
                <input
                  {...register("email", {
                    required: "Email không được bỏ trống.",
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-0 p-[16px_16px_16px_45px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                            text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="Email"
                  type="text"
                />
              </div>
              <p className="ml-[10px]">{errors?.email?.message || ""}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white relative mt-[20px]">
          <div className="form__container">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.password ? "error" : ""
              }`}
            >
              <div className="relative ">
                <svg
                  className="w-[18px] h-[18px] absolute left-[20px] top-1/2 -translate-y-1/2 "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M10 16c0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.985-1-1.723zm11-6v14h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-13 0h8v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4zm11 2h-14v10h14v-10z"
                  />
                </svg>
                <input
                  className="mt-0 p-[16px_16px_16px_45px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                      text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="Mật khẩu"
                  type={`${!hiddenPassword ? "text" : "password"}`}
                  value={password}
                  {...register("password", {
                    required: "Mật khẩu không được bỏ trống.",
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => setHiddenPassword(!hiddenPassword)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer p-[10px]"
                >
                  {!hiddenPassword ? (
                    <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                      <path
                        className="fill-white"
                        d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
                      <path
                        className="fill-white"
                        d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="ml-[10px]">{errors?.password?.message || ""}</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between gap-6 text-white relative mt-[20px]">
          <div className="pl-[20px]">
            <Checkbox
              onChange={handleChangeSavePassword}
              checked={savePassword}
              value={savePassword}
            >
              Lưu mật khẩu
            </Checkbox>
          </div>
          <div className="pr-[20px]">
            <a
              className="text-white font-mar text-sm cursor-pointer duration-400 transition-colors
                      hover:text-primary"
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>
        <div className="mt-[20px]">
          <Button
            onClick={handleSubmit(handleSignin)}
            className={`p-[16px_16px_16px_16px] text-md bg-[#dddddd] text-black-333 border-transparent  w-full`}
          >
            Đăng nhập
          </Button>
        </div>
        <div className=" flex items-center justify-center gap-6 text-white relative mt-[30px]">
          <a className="text-white font-mar text-sm ">
            Bạn chưa có tài khoản?
            <strong
              onClick={onOpenRegister}
              className="ml-[4px] font-mab  cursor-pointer duration-400 transition-colors hover:text-primary "
            >
              Đăng ký
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
