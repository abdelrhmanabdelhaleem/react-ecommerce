import "./Home.module.css";
import Loader from "../loader/Loader";
import Product from "../product/product";
import MainSlider from "../Main-slider/MainSlider";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import UseProducts from "../../Hooks/useProducts";
import UseCategories from "../../Hooks/useCategories";
import { Helmet } from "react-helmet";

export default function Home() {
  let {
    data: products,
    isError: productsError,
    isLoading: productsLoading,
  } = UseProducts();
  let {
    data: categories,
    isError: categoriesError,
    isLoading: categoriesLoading,
  } = UseCategories();

  if (productsLoading && categoriesLoading) return <Loader />;
  if (categoriesError && productsError) return <p>Error loading products.</p>;
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider categories={categories} />
      <div className=" row my-5 g-3">
        <h5 className="text-main">Popular products</h5>
        {products?.slice(0, 12).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
