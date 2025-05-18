import { Link } from "react-router";
import { cartContext } from "../../context/cartContext";
import { useContext } from "react";
import { wishListContext } from "../../context/WishListContext";

const Product = ({ product }) => {
  let { addProductsToCart, currentProduct, loading } = useContext(cartContext);
  let { addProductToWishList, isInWishListArray, removeProductFromWishList } =
    useContext(wishListContext);

  return (
    <div className="col-md-3 mb-4">
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
              <span className="text-muted small">{product.price} EGP</span>
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
  );
};

export default Product;
