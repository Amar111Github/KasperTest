import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Logo from "../../../img/logo.png";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen resgister">
      <div className=" w-400 p-3 formLogin">
        <div className="logoImages">
          {" "}
          <img
            src={Logo}
            alt="Logo"
            className=""
            style={{ height: "75px", margin: "2px 58px" }}
          />
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex">
            <h1 className="text-2xl">
              LOGIN <i class="ri-login-circle-line"></i>
            </h1>
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register" className="underline">
                Not a member? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import emailIcon from "../img/email.svg";
// import passwordIcon from "../img/password.svg";
// import styles from "./SignUp.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { notify } from "./toast";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const [touched, setTouched] = useState({});

//   const chaeckData = (obj) => {
//     const { email, password } = obj;
//     const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
//     const api = axios
//       .get(urlApi)
//       .then((response) => response.data)
//       .then((data) => (data.ok ? notify("You login to your account successfully", "success") : notify("Your password or your email is wrong", "error")));
//     toast.promise(api, {
//       pending: "Loading your data...",
//       success: false,
//       error: "Something went wrong!",
//     });
//   };

//   const changeHandler = (event) => {
//     if (event.target.name === "IsAccepted") {
//       setData({ ...data, [event.target.name]: event.target.checked });
//     } else {
//       setData({ ...data, [event.target.name]: event.target.value });
//     }
//   };

//   const focusHandler = (event) => {
//     setTouched({ ...touched, [event.target.name]: true });
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     chaeckData(data);
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
//         <h2>Sign In</h2>
//         <div>
//           <div>
//             <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
//             <img src={emailIcon} alt="" />
//           </div>
//         </div>
//         <div>
//           <div>
//             <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
//             <img src={passwordIcon} alt="" />
//           </div>
//         </div>

//         <div>
//           <button type="submit">Login</button>
//           <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
//             Don't have a account? <Link to="/signup">Create account</Link>
//           </span>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
