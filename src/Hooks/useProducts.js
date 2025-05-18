import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseProducts = () => {
  let getProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };
  let data = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });
  return data;
};

export default UseProducts;
