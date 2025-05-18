import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { userContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";
export default function Register() {
  let { saveUserData, notify } = useContext(userContext);

  const [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const handleRegister = (formValues) => {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((res) => {
        if (res.data.message == "success") {
          setloading(false);
          localStorage.setItem("userToken", res.data.token);
          saveUserData();
          navigate("/");
        }
      })
      .catch((err) => {
        setloading(false);
        notify("error", err.response?.data?.message);
      });
  };
  const validationSchema = () =>
    Yup.object().shape({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must not exceed 20 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),

      password: Yup.string()
        .matches(/^.{6,}$/, "Password must be at least 6 characters long")
        .required("Password is required"),

      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

      phone: Yup.string()
        .matches(
          /^01[0125][0-9]{8}$/,
          "Phone number must be a valid Egyptian number"
        )
        .required("Phone number is required"),
    });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className=" row justify-content-center align-items-center px-3 py-4 ">
        <h3 className="text-center text-main fw-bold">Create Your Account</h3>
        <div className="col-md-6   ">
          <form
            onSubmit={formik.handleSubmit}
            className=" p-3 py-2 shadow rounded bg-white needs-validation ">
            <div className="my-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name
                    ? formik.errors.name
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="name"
                placeholder="Enter your name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-danger pt-1">{formik.errors.name}</div>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="email" className="form-label">
                Email
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
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-danger pt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="password" className="form-label">
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
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-danger pt-1">{formik.errors.password}</div>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="rePassword" className="form-label">
                RePassword
              </label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.rePassword
                    ? formik.errors.rePassword
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="rePassword"
                placeholder="Re-enter password"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="text-danger pt-1">
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className={`form-control ${
                  formik.touched.phone
                    ? formik.errors.phone
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                id="phone"
                placeholder="Enter your phone number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-danger pt-1">{formik.errors.phone}</div>
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
                "Register"
              )}
            </button>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-primary ">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
