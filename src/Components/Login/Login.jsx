import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const { saveUserData, notify } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (formValues) => {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          saveUserData();
          navigate("/");
        }
      })
      .catch((err) => {
        notify("error", err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^.{6,}$/, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="row justify-content-center align-items-center py-5 px-3">
        <div className="col-md-6">
          <h3 className="text-center text-main fw-bold mb-4">
            Welcome Back 👋
          </h3>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-4 shadow-md rounded needs-validation">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email
                    ? formik.errors.email
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="email"
                placeholder="you@example.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-danger pt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password
                    ? formik.errors.password
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="password"
                placeholder="••••••••"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-danger pt-1">{formik.errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn-main w-100 mb-3">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center">
              <p className="mb-1">
                Don’t have an account?{" "}
                <Link to="/register" className="text-main fw-medium">
                  Register here
                </Link>
              </p>
              <p className="mb-0">
                <Link
                  to="/forgotPassword"
                  className="text-decoration-none text-primary">
                  Forgot your password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
