import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { userContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const CheckOut = () => {
  const [typeOrder, settypeOrder] = useState("cash");
  let { cartItems, setcartItems } = useContext(cartContext);
  let navigate = useNavigate();
  let { token, notify } = useContext(userContext);

  const handleOnlineOrder = async (values) => {
    let url = location.origin;
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.cartId}?url=${url}`,
      values,
      {
        headers: {
          token,
        },
      }
    );

    if (data.status == "success") {
      notify("loading", "redirect to paymentgateway");

      location.href = data.session.url;
    }
  };

  const handlecashOrder = async (values) => {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartItems.cartId}`,
      values,
      {
        headers: {
          token,
        },
      }
    );
    if (data.status == "success") {
      setcartItems([]);
      navigate("/allorders");
    }
  };

  const onSubmitFunction =
    typeOrder === "cash" ? handlecashOrder : handleOnlineOrder;

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: onSubmitFunction,
  });

  return (
    <>
      <Helmet>
        <title>Check out</title>
      </Helmet>
      <div className="container my-4">
        <h3 className="mb-3 text-main">Checkout Form</h3>

        <div className="mb-3" role="group" aria-label="Select payment type">
          <button
            type="button"
            className={`btn me-2 ${
              typeOrder === "cash" ? "btn-success" : "btn-outline-secondary"
            }`}
            aria-pressed={typeOrder === "cash"}
            onClick={() => settypeOrder("cash")}>
            Cash
          </button>

          <button
            type="button"
            className={`btn ${
              typeOrder === "online" ? "btn-primary" : "btn-outline-secondary"
            }`}
            aria-pressed={typeOrder === "online"}
            onClick={() => settypeOrder("online")}>
            Online
          </button>
        </div>

        <p className="text-muted">
          Selected: <strong>{typeOrder}</strong> payment
        </p>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <input
              type="text"
              name="shippingAddress.details"
              id="details"
              className={`form-control ${
                formik.touched.shippingAddress?.details &&
                formik.errors.shippingAddress?.details
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="address-line1"
            />
            {formik.touched.shippingAddress?.details &&
              formik.errors.shippingAddress?.details && (
                <div className="invalid-feedback">
                  {formik.errors.shippingAddress.details}
                </div>
              )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              name="shippingAddress.phone"
              id="phone"
              className={`form-control ${
                formik.touched.shippingAddress?.phone &&
                formik.errors.shippingAddress?.phone
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="tel"
            />
            {formik.touched.shippingAddress?.phone &&
              formik.errors.shippingAddress?.phone && (
                <div className="invalid-feedback">
                  {formik.errors.shippingAddress.phone}
                </div>
              )}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              name="shippingAddress.city"
              id="city"
              className={`form-control ${
                formik.touched.shippingAddress?.city &&
                formik.errors.shippingAddress?.city
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Enter city"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="address-level2"
            />
            {formik.touched.shippingAddress?.city &&
              formik.errors.shippingAddress?.city && (
                <div className="invalid-feedback">
                  {formik.errors.shippingAddress.city}
                </div>
              )}
          </div>

          <button type="submit" className="btn btn-dark px-2">
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckOut;
