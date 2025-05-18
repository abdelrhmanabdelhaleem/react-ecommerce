import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseCategories = () => {
  let getCategories = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };
  let data = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });
  return data;
};

export default UseCategories;
