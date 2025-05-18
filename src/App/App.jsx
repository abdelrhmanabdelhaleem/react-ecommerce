import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Layout from "./../Components/Layout/Layout";
import Home from "../Components/Home/Home";
import Products from "../Components/Products/Products";
import ProductDeatils from "../Components/ProductDeatils/ProductDeatils";
import Categories from "../Components/Categories/Categories";
import Brands from "../Components/Brands/Brands";
import Cart from "../Components/Cart/Cart";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import NotFound from "../Components/NotFound/NotFound";
import WishList from "../Components/WishList/WishList";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "../context/UserContext";

import CartProvider from "../context/cartContext";
import CheckOut from "./../Components/checkOut/checkOut";
import WishListProvider from "../context/WishListContext";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import { ToastContainer } from "react-toastify";
import AllOrders from "./../Components/AllOrders/AllOrders";
function App() {
  let query = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:productId/:categoryId",
          element: (
            <ProtectedRoute>
              <ProductDeatils></ProductDeatils>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "withList",
          element: (
            <ProtectedRoute>
              <WishList></WishList>
            </ProtectedRoute>
          ),
        },

        {
          path: "checkOut",
          element: (
            <ProtectedRoute>
              <CheckOut></CheckOut>
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <Login></Login>
            </PublicRoute>
          ),
        },
        {
          path: "register",
          element: (
            <PublicRoute>
              <Register></Register>
            </PublicRoute>
          ),
        },
        {
          path: "forgotPassword",
          element: (
            <PublicRoute>
              <ForgotPassword></ForgotPassword>
            </PublicRoute>
          ),
        },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer theme="colored" />
      <QueryClientProvider client={query}>
        <UserProvider>
          <WishListProvider>
            <CartProvider>
              <RouterProvider router={routes}></RouterProvider>
            </CartProvider>
          </WishListProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
