import React, { useContext, useEffect } from "react";
import "./Cart.module.css";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router";
import Loader from "./../loader/Loader";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { cartItems, removeProductsfromCart, updateProductsfromCart, clearCart } =
    useContext(cartContext);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems === null ? (
        <Loader />
      ) : (
        <section className="bg-light p-2 my-3">
          <div>
            <h5 className="text-main">
              Shop Cart <i className="fa-solid fa-cart-plus"></i>
            </h5>
          </div>

          {cartItems?.length === 0 ? (
            <div
              className="py-3 d-flex flex-column justify-content-center align-items-center"
              aria-live="polite">
              <h6>There are no items yet</h6>
              <Link to="/" className="bg-success text-white p-1 rounded-2">
                Add your first product to cart
              </Link>
            </div>
          ) : (
            <>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="text-success mb-0">
                    Total Cart Price: {cartItems?.data?.totalCartPrice} EGP
                  </p>
                  <button
                    onClick={clearCart}
                    className="btn btn-outline-danger p-1"
                    aria-label="Clear Cart">
                    Clear Cart
                  </button>
                </div>

                {cartItems?.data?.products.map((product) => (
                  <div key={product._id} className="my-2 row">
                    <div className="col-md-2">
                      <img
                        height="130px"
                        width="100%"
                        src={product?.product?.imageCover}
                        alt={product?.product?.title || "Product image"}
                      />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                      <div>
                        <p className="m-0 text-main">
                          {product?.product?.title}
                        </p>
                        <p className="py-1 m-0">Price: {product.price} EGP</p>
                        <button
                          onClick={() =>
                            removeProductsfromCart(product.product._id)
                          }
                          className="text-danger btn btn-link p-0"
                          aria-label={`Remove ${product?.product?.title} from cart`}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            updateProductsfromCart({
                              id: product.product._id,
                              count: product.count - 1,
                            })
                          }
                          className="btn btn-outline-success"
                          aria-label={`Decrease quantity of ${product?.product?.title}`}
                          disabled={product.count <= 1}>
                          -
                        </button>
                        <span className="px-2">{product.count}</span>
                        <button
                          onClick={() =>
                            updateProductsfromCart({
                              id: product.product._id,
                              count: product.count + 1,
                            })
                          }
                          className="btn btn-outline-success"
                          aria-label={`Increase quantity of ${product?.product?.title}`}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-end my-3">
                <Link to="/checkOut" className="btn btn-success p-1 rounded-2">
                  Next Step
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
