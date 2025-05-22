import "./Products.module.css";
import Product from "./../Product/Product";
import Loader from "../loader/Loader";
import { useState, useEffect, useContext } from "react";
import UseProducts from "../../Hooks/useProducts";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Products() {
  let { data, isError, isLoading } = UseProducts();
  const [productsList, setProductsList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProductsList(data);
      setAllProducts(data);
    }
  }, [data]);

  let handleSort = async (value) => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?sort=${value}`
    );
    console.log("🚀 ~ handleSort ~ data:", data.data);
    setProductsList(data.data);
    setAllProducts(data.data);
  };
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value)
    );
    setProductsList(filtered);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="row align-items-center">
        <div className="col-md-6 mt-3">
          <div className="input-group">
            <input
              type="search"
              onChange={handleChange}
              className="form-control shadow-none "
              placeholder="Search products..."
              aria-label="Search products"
              aria-describedby="basic-addon2"
            />
            <span
              className="input-group-text bg-main text-white"
              id="basic-addon2">
              search
            </span>
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <div className="dropdown">
            <button
              className="btn btn-main dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Sort Products
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("-price")}>
                  High Price
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleSort("price")}>
                  low Price
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row my-2 g-3">
        {productsList.length > 0 ? (
          productsList?.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <p className="mt-3">No products found.</p>
        )}
      </div>
    </>
  );
}
