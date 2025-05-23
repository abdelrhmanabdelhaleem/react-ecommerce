import { Navigate } from "react-router";
export default function PublicRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
