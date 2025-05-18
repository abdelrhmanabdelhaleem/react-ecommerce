import { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import axios from "axios";
import Loader from "./../loader/Loader";
import { Helmet } from "react-helmet";

const AllOrders = () => {
  let { userData } = useContext(userContext);
  const [orders, setorders] = useState(null);
  let getAllOrders = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`
    );

    setorders(data);
  };
  useEffect(() => {
    if (userData) {
      getAllOrders();
    }
  }, [userData]);
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {orders === null ? (
        <Loader />
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card shadow-sm  my-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="text-muted mb-1">Order ID</h6>
                  <h5 className="fw-bold">#{order.id}</h5>
                </div>
                <div className="text-end">
                  <span
                    className={`badge rounded-pill me-2 ${
                      order.isDelivered ? "bg-primary" : "bg-warning text-dark"
                    }`}>
                    {order.isDelivered ? "Delivered" : "In Delivery"}
                  </span>
                  <span
                    className={`badge rounded-pill ${
                      order.isPaid ? "bg-success" : "bg-danger"
                    }`}>
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </div>
              </div>

              <div className="row g-3">
                {order.cartItems.map((product) => (
                  <div key={product._id} className="col-md-2 col-6">
                    <div className="border rounded p-2 text-center h-100">
                      <img
                        src={
                          product.product.imageCover ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.product.title}
                        className="img-fluid object-fit-contain mb-2"
                        style={{ height: "100px" }}
                      />
                      <h6 className="small">{product.product.title}</h6>
                      <span className="text-muted small">
                        {product.price} EGP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default AllOrders;
