import Slider from "react-slick";
const CategoriesSlider = ({ categories }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container pt-5">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div className="text-center row">
            <div className="col-md-3 w-100  ">
              <div className=" rounded-2 shadow-sm ">
                <img
                  className="w-100  rounded-top-2"
                  height={250}
                  src={category.image}
                />
                <h6 className="py-1">{category.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSlider;
