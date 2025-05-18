import img1 from "../../assets/images/amazon-pay.png";
import img2 from "../../assets/images/get-google-play.png";
import img3 from "../../assets/images/get-apple-store.png";
import img4 from "../../assets/images/American-Express-Color.png";
import img5 from "../../assets/images/paypal.png";
import img6 from "../../assets/images/mastercard.webp";

export default function Footer() {
  return (
    <>
      <footer className="bg-light py-5">
        <div className="container">
          <h2 className="m-0 h4">Get The FreshCart App</h2>
          <p className="text-muted small">
            We Will Send You a Link, Open it on Your Phone to download the app
          </p>

          <div className="d-lg-flex align-items-center gap-3 text-nowrap">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Email"
            />
            <button className="btn-main">Share App Link</button>
          </div>

          <hr />

          <div className="pay-details d-lg-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 mt-3">
              <h3 className="h6 m-0">Payment partners</h3>
              <img src={img1} width="30px" alt="" />
              <img src={img4} width="30px" alt="" />
              <img src={img5} width="30px" alt="" />
              <img src={img6} width="30px" alt="" />
            </div>

            <div className="d-flex align-items-center gap-2 mt-3">
              <h3 className="h6 m-0">Get Deliveries with FreshCart</h3>
              <img src={img2} width="75px" alt="" />
              <img src={img3} width="75px" alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
