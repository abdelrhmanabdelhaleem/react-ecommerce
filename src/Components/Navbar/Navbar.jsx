import { useContext, useEffect } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, Link, useNavigate } from "react-router";
import { userContext } from "../../context/UserContext";
import { cartContext } from "../../context/cartContext";
import { wishListContext } from "../../context/WishListContext";

export default function Navbar() {
  const { userData, setuserData } = useContext(userContext);
  const { getProductsCart, cartItems } = useContext(cartContext);
  const { getWishListProducts, wishListProducts, wishListArray } =
    useContext(wishListContext);

  useEffect(() => {
    if (userData) {
      getProductsCart();
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      getWishListProducts();
    }
  }, [wishListArray, userData]);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userToken");
    setuserData(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="text-main fw-bold">
            {" "}
            Fresh Cart <i className="fa-solid fa-cart-plus"></i>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {userData && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/allorders" className="nav-link">
                  Orders
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
            {!userData ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <div className="d-flex justify-content-around">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fa-brands fa-youtube mx-1"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fa-brands fa-facebook mx-1"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fa-brands fa-instagram mx-1"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fa-brands fa-tiktok mx-1"></i>
                    </a>
                  </li>
                </div>
              </>
            ) : (
              <>
                {/* Cart Icon */}
                <li className="nav-item mx-2 my-3 position-relative">
                  <Link to="/cart" className="nav-link position-relative p-0">
                    <i
                      className="fa-solid fa-cart-plus text-success"
                      style={{ fontSize: "20px" }}></i>
                    <span
                      className="position-absolute bottom-50 start-100 translate-middle badge rounded-pill bg-success"
                      style={{
                        fontSize: "15px",
                        minWidth: "22px",
                        height: "22px",
                        lineHeight: "22px",
                        padding: "0",
                        textAlign: "center",
                      }}>
                      {cartItems === null ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"></span>
                      ) : (
                        cartItems?.numOfCartItems || 0
                      )}
                    </span>
                  </Link>
                </li>

                {/* Wishlist Icon */}
                <li className="nav-item mx-2 my-3  position-relative">
                  <Link
                    to="/withList"
                    className="nav-link position-relative p-0">
                    <i
                      className="fa-solid fa-heart text-danger"
                      style={{ fontSize: "20px" }}></i>
                    <span
                      className="position-absolute bottom-50 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        fontSize: "15px",
                        minWidth: "22px",
                        height: "22px",
                        lineHeight: "22px",
                        padding: "0",
                        textAlign: "center",
                      }}>
                      {wishListProducts === null ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"></span>
                      ) : (
                        wishListProducts?.count || 0
                      )}
                    </span>
                  </Link>
                </li>

                {/* Logout Icon */}
                <li onClick={logOut} className="nav-item mx-1">
                  <Link className="nav-link p-0">
                    <i
                      className="fa-solid fa-right-from-bracket text-dark"
                      style={{ fontSize: "20px" }}></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
