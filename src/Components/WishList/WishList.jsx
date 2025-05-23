import { wishListContext } from "../../context/WishListContext";
import Loader from "../loader/Loader";
import { Link } from "react-router";
import Product from "./../Product/Product";
import { useContext } from "react";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { wishListProducts } = useContext(wishListContext);
  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      {wishListProducts === null ? (
        <Loader />
      ) : (
        <section className="my-3">
          <div>
            <h5>
              WishList <i className="fa-solid fa-heart text-danger"></i>
            </h5>
          </div>

          {wishListProducts?.count === 0 ? (
            <div
              className="py-3 d-flex flex-column justify-content-center align-items-center"
              aria-live="polite">
              <h6>There are no items yet</h6>
              <Link
                to="/"
                className="bg-success text-white px-2 py-1 rounded-2">
                Add your first product to WishList
              </Link>
            </div>
          ) : (
            <div className="row my-3 g-3">
              {wishListProducts?.data?.map((product) => (
                <Product product={product} key={product.id || product._id} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
