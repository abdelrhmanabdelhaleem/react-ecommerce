import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
export const wishListContext = createContext();

const WishListProvider = ({ children }) => {
  let { token, notify } = useContext(userContext);
  const [wishListProducts, setwishListProducts] = useState(null);
  const [wishListArray, setwishListArray] = useState();
  let getWishListProducts = async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token,
        },
      }
    );
    if (data.status == "success" && data.count > 0) {
      setwishListProducts(data);
    } else {
      setwishListProducts([]);
    }
  };

  let addProductToWishList = async (id) => {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: id,
      },
      {
        headers: {
          token,
        },
      }
    );
    if (data.status == "success") {
      setwishListArray(data);
      notify("success", "Product added  to your wishlist");
    }
  };
  let removeProductFromWishList = async (id) => {
    let { data } = await axios.delete(
      ` https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token,
        },
      }
    );
    if (data.status == "success") {
      setwishListArray(data);
      notify("error", "Product removed to your wishlist");
    }
  };
  let isInWishListArray = (id) => {
    if (wishListProducts) {
      let resulat = wishListProducts?.data?.find(
        (product) => product.id === id
      );
      return resulat;
    }
  };

  return (
    <wishListContext.Provider
      value={{
        addProductToWishList,
        getWishListProducts,
        wishListProducts,
        wishListArray,
        isInWishListArray,
        removeProductFromWishList,
      }}>
      {children}
    </wishListContext.Provider>
  );
};

export default WishListProvider;
