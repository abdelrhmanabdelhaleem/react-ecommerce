import Slider from "react-slick";
import img1 from "../../assets/images/slider1.jpg";
import img2 from "../../assets/images/slider2.jpg";
import img3 from "../../assets/images/slider3.jpg";
import img4 from "../../assets/images/slider4.jpg";

const MainSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container pt-5">
      <Slider {...settings}>
        <div>
          <img height={320} className="w-100 px-2" src={img1} />
        </div>
        <div>
          <img height={320} className="w-100 px-2" src={img2} />
        </div>
        <div>
          <img height={320} className="w-100 px-2" src={img3} />
        </div>
        <div>
          <img height={320} className="w-100 px-2" src={img4} />
        </div>
      </Slider>
    </div>
  );
};

export default MainSlider;
