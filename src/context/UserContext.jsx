import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const userContext = createContext();
export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [userData, setuserData] = useState();
  let saveUserData = () => {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setuserData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
      saveUserData();
    }
  }, [localStorage.getItem("userToken")]);
  const notify = (type, message) => toast[type](message);

  return (
    <div>
      <userContext.Provider
        value={{ userData, saveUserData, setuserData, token, notify }}>
        {children}
      </userContext.Provider>
    </div>
  );
}
