import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";

export const cartContext = createContext("");

const CartProvider = ({ children }) => {
  let { token, notify } = useContext(userContext);
  const [cartItems, setcartItems] = useState(null);
  const [currentProduct, setcurrentProduct] = useState();
  const [loading, setloading] = useState(false);

  let addProductsToCart = async (id) => {
    try {
      setcurrentProduct(id);
      setloading(true);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: { productId: id },
      };
      let { data } = await axios.request(options);
      setcartItems(data);
      notify("success", "Product Added to your cart");
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log("🚀 ~ CartProvider ~ error:", error);
    }
  };
  let getProductsCart = async () => {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);

      if (data.data.products.length > 0) {
        setcartItems(data);
      } else {
        setcartItems([]);
      }
    } catch (error) {
      console.log("🚀 ~ CartProvider ~ error:", error);
    }
  };
  let removeProductsfromCart = async (id) => {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.numOfCartItems == 0) {
        setcartItems([]);
      } else {
        setcartItems(data);
      }
      notify("error", "Product Removed from your cart");
    } catch (error) {
      console.log("🚀 ~ CartProvider ~ error:", error);
    }
  };
  let updateProductsfromCart = async ({ id, count }) => {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: { count },
      };
      let { data } = await axios.request(options);
      setcartItems(data);
    } catch (error) {
      setloading(false);
      console.log("🚀 ~ CartProvider ~ error:", error);
    }
  };
  let clearCart = async () => {
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token,
        },
      });
      setcartItems([]);
      notify("error", " Removed your cart");
    } catch (error) {
      console.log("🚀 ~ CartProvider ~ error:", error);
    }
  };

  return (
    <>
      <cartContext.Provider
        value={{
          addProductsToCart,
          getProductsCart,
          cartItems,
          currentProduct,
          loading,
          removeProductsfromCart,
          updateProductsfromCart,
          clearCart,
          setcartItems,
        }}>
        {children}
      </cartContext.Provider>
    </>
  );
};

export default CartProvider;
