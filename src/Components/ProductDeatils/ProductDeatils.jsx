import React, { useContext } from "react";
import "./ProductDeatils.module.css";
import { useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../loader/Loader";
import Slider from "react-slick";

import { cartContext } from "../../context/cartContext";
import { wishListContext } from "../../context/WishListContext";
import { Helmet } from "react-helmet";

export default function ProductDeatils() {
  const [productDetails, setproductDetails] = useState("");
  const [productRelated, setproductRelated] = useState([]);
  let { addProductsToCart, currentProduct, loading } = useContext(cartContext);
  let { addProductToWishList, isInWishListArray, removeProductFromWishList } =
    useContext(wishListContext);
  let { categoryId, productId } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  const settingsProductRelated = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let getProductDetails = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    setproductDetails(data.data);
  };
  let getProductRelated = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
    setproductRelated(data.data);
  };
  useEffect(() => {
    getProductDetails();
  }, [productId]);
  useEffect(() => {
    getProductRelated();
  }, []);
  if (productDetails) {
    return (
      <>
        <Helmet>
          <title>{productDetails.title}</title>
        </Helmet>
        <div className="row py-4 ">
          <div className="col-md-3 ">
            <div>
              <Slider {...settings}>
                {productDetails.images?.map((image) => (
                  <div className=" ">
                    <img
                      className="w-100 px-1  rounded-4"
                      height={300}
                      src={image}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-9 py-4">
            <div>
              <h5 className="text-main">{productDetails.title}</h5>
              <h6 className="  ">{productDetails.category?.name}</h6>
              <p className=" m-0 py-1 text-muted">
                {productDetails.description}
              </p>
              <div className="d-flex justify-content-between align-items-center py-1">
                <span className="text-muted small">
                  {productDetails.price} EGP
                </span>
                <span className="d-flex align-items-center">
                  <i className="fa-solid fa-star rating-color me-1"></i>
                  {productDetails.ratingsAverage}
                </span>
              </div>
            </div>

            <div className="mt-2 px-1">
              <button
                onClick={() => addProductsToCart(productDetails.id)}
                className="btn btn-main">
                {currentProduct === productDetails.id && loading ? (
                  <span
                    className="spinner-border spinner-border-sm px-1"
                    role="status"
                    aria-hidden="true"></span>
                ) : (
                  <>
                    <span>Add to Cart</span>
                    <i className="fa-solid fa-cart-plus ms-1"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {productRelated ? (
          <div className="row py-4">
            <h4 className="text-main text-center pb-2"> Related Products</h4>
            <Slider {...settingsProductRelated}>
              {productRelated.map((product) => (
                <div key={product.id} className="col-md-3 w-100 px-2">
                  <div className="border rounded shadow-sm d-flex flex-column h-100">
                    <div
                      className="position-relative overflow-hidden"
                      style={{ aspectRatio: "4 / 3" }}>
                      <Link
                        to={`/products/${product.id}/${product.category._id}`}
                        className="d-block h-100">
                        <img
                          className="w-100 h-100"
                          style={{ objectFit: "contain" }}
                          src={product.imageCover}
                          alt={product.title}
                        />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (isInWishListArray(product.id)) {
                            removeProductFromWishList(product.id);
                          } else {
                            addProductToWishList(product.id);
                          }
                        }}
                        className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle p-2 ${
                          isInWishListArray(product.id)
                            ? "btn-danger"
                            : "btn-dark bg-opacity-50 text-white"
                        }`}
                        style={{ zIndex: 2 }}
                        aria-label="Add to wishlist">
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>

                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                      <Link
                        to={`/products/${product.id}/${product.category._id}`}
                        className="text-decoration-none text-dark">
                        <h6 className="text-main mb-2">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>

                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted small">
                            {product.price} EGP
                          </span>
                          <span className="d-flex align-items-center">
                            <i className="fa-solid fa-star rating-color me-1"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="p-3">
                      <button
                        onClick={() => addProductsToCart(product.id)}
                        className="btn btn-main w-100">
                        {currentProduct === product.id && loading ? (
                          <span
                            className="spinner-border spinner-border-sm px-1"
                            role="status"
                            aria-hidden="true"></span>
                        ) : (
                          <>
                            <span>Add to Cart</span>
                            <i className="fa-solid fa-cart-plus ms-1"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  } else {
    return <Loader />;
  }
}
