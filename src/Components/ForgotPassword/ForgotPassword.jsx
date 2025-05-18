import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { userContext } from "../../context/UserContext";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [flag, setflag] = useState(1);
  const [loading, setloading] = useState(false);
  let { saveUserData } = useContext(userContext);
  let navigate = useNavigate();
  let handleVerifyEmail = async (values) => {
    try {
      setloading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (data.statusMsg == "success") {
        setloading(false);
        toast.success(data.message);
        setflag(2);
      }
    } catch (err) {
      toast.error(err.message);
      console.log("🚀 ~ handleVerifyEmail ~ err:", err);
      setloading(false);
    }
  };
  let handleVerifyCode = async (values) => {
    try {
      setloading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      if (data.status == "Success") {
        toast.success("Code verified successfully!");
        setloading(false);
        setflag(3);
      }
    } catch (err) {
      toast.error(err.message);
      console.log("🚀 ~ handleVerifyEmail ~ err:", err);
      setloading(false);
    }
  };
  const validationSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      newPassword: Yup.string()
        .matches(/^.{6,}$/, "Password must be at least 6 characters long")
        .required("Password is required"),
    });
  let handleResetPassword = async (formValues) => {
    setloading(true);
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formValues
      )
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("userToken", res.data.token);
          saveUserData();
          navigate("/");
          setloading(false);
        }
      })

      .catch((err) => {
        setloading(false);
        toast.error(err.response?.data?.message);
      });
  };

  let verifyEmail = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleVerifyEmail,
  });
  let verifyCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleVerifyCode,
  });
  let ResetPassword = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });
  if (flag == 1) {
    return (
      <>
        <div className="row justify-content-center align-items-center p-3 py-4  ">
          <div className="col-md-6  ">
            <h3 className="text-center text-main pb-3 fw-bold">
              Reset Password
            </h3>
            <form
              onSubmit={verifyEmail.handleSubmit}
              className=" p-3 py-2 shadow rounded bg-white needs-validation ">
              <div className="my-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={verifyEmail.values.email}
                  onChange={verifyEmail.handleChange}
                  onBlur={verifyEmail.handleBlur}
                  required
                />
              </div>

              <button type="submit" className=" btn-main w-100">
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm px-1"
                      role="status"
                      aria-hidden="true"></span>
                    <span className="px-1">Loading...</span>
                  </>
                ) : (
                  "verify email"
                )}
              </button>

              <p className="text-center m-0  py-2">
                <Link to="/login"> Back To Login</Link>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  } else if (flag == 2) {
    return (
      <>
        <div className="row justify-content-center align-items-center p-3 py-4  ">
          <div className="col-md-6  ">
            <h3 className="text-center text-main pb-3 fw-bold">Verify Code</h3>
            <form
              onSubmit={verifyCode.handleSubmit}
              className=" p-3 py-2 shadow rounded bg-white needs-validation ">
              <div className="my-2">
                <label htmlFor="resetCode" className="form-label">
                  ResetCode
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="resetCode"
                  placeholder="Enter your resetCode"
                  name="resetCode"
                  value={verifyCode.values.resetCode}
                  onChange={verifyCode.handleChange}
                  onBlur={verifyCode.handleBlur}
                  required
                />
              </div>

              <button type="submit" className=" btn-main w-100">
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm px-1"
                      role="status"
                      aria-hidden="true"></span>
                    <span className="px-1">Loading...</span>
                  </>
                ) : (
                  "verify Code"
                )}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="row justify-content-center align-items-center p-3 py-4  ">
          <div className="col-md-6  ">
            <h3 className="text-center text-main pb-3 fw-bold">
              Reset Account Password
            </h3>
            <form
              onSubmit={ResetPassword.handleSubmit}
              className=" p-3 py-2 shadow rounded bg-white needs-validation ">
              <div className="my-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    ResetPassword.touched.email
                      ? ResetPassword.errors.email
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={ResetPassword.values.email}
                  onChange={ResetPassword.handleChange}
                  onBlur={ResetPassword.handleBlur}
                />
                {ResetPassword.errors.email && ResetPassword.touched.email && (
                  <div className="text-danger pt-1">
                    {ResetPassword.errors.email}
                  </div>
                )}
              </div>

              <div className="my-2">
                <label htmlFor="newPassword" className="form-label">
                  new Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    ResetPassword.touched.newPassword
                      ? ResetPassword.errors.newPassword
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  id="newPassword"
                  placeholder="Enter new Password"
                  name="newPassword"
                  value={ResetPassword.values.newPassword}
                  onChange={ResetPassword.handleChange}
                  onBlur={ResetPassword.handleBlur}
                />
                {ResetPassword.errors.newPassword &&
                  ResetPassword.touched.newPassword && (
                    <div className="text-danger pt-1">
                      {ResetPassword.errors.newPassword}
                    </div>
                  )}
              </div>

              <button type="submit" className=" btn-main w-100">
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm px-1"
                      role="status"
                      aria-hidden="true"></span>
                    <span className="px-1">Loading...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
              <p className="m-0 py-2 text-center">
                Don’t have an account?{" "}
                <Link to="/register" className="text-decoration-none ">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default ForgotPassword;
