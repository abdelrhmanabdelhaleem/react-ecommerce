import "./Categories.module.css";
import UseCategories from "../../Hooks/useCategories";
import Loader from "../loader/Loader";
import { Helmet } from "react-helmet";

export default function Categories() {
  let { data: categories, isLoading, isError } = UseCategories();
  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="row my-2 g-3">
        {categories.length > 0 ? (
          categories.map((category) => {
            return (
              <div key={category._id} className="col-md-3 text-center ">
                <div className=" rounded-2 shadow-sm ">
                  <img
                    className="w-100  rounded-top-2"
                    height={250}
                    src={category.image}
                  />
                  <h6 className="py-1">{category.name}</h6>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-3">No catgories found.</p>
        )}
      </div>
    </>
  );
}
