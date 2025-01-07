import { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <div className="carousel lg:h-[70vh] h-[60vh] w-full rounded-lg overflow-hidden shadow-lg relative group">
      {/* Slide 1 */}
      <div className={`carousel-item relative w-full ${currentSlide === 1 ? "block" : "hidden"}`}>
        <img
          src="https://m.media-amazon.com/images/M/MV5BMDE5M2ZlMTktZTliNC00YWUxLWFjOTUtODg1OTc4OTEwNDU2XkEyXkFqcGc@._V1_.jpg"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
          <button
            onClick={() => goToSlide(totalSlides)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❮
          </button>
          <button
            onClick={() => goToSlide(2)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className={`carousel-item relative w-full ${currentSlide === 2 ? "block" : "hidden"}`}>
        <img
          src="https://th-i.thgim.com/public/entertainment/movies/36w9xl/article68457039.ece/alternates/LANDSCAPE_1200/Fantastic%20Four.jfif"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
          <button
            onClick={() => goToSlide(1)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❮
          </button>
          <button
            onClick={() => goToSlide(3)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div className={`carousel-item relative w-full ${currentSlide === 3 ? "block" : "hidden"}`}>
        <img
          src="https://parade.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTk2OTQ2MTE1Mzk0ODA3NDM2/avengers-secret-wars.png"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
          <button
            onClick={() => goToSlide(2)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❮
          </button>
          <button
            onClick={() => goToSlide(4)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 4 */}
      <div className={`carousel-item relative w-full ${currentSlide === 4 ? "block" : "hidden"}`}>
        <img
          src="https://sm.ign.com/ign_in/news/b/blade-will/blade-will-be-the-mcus-second-r-rated-movie-after-deadpool-3_57z8.jpg"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
          <button
            onClick={() => goToSlide(3)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❮
          </button>
          <button
            onClick={() => goToSlide(1)}
            className="btn btn-circle text-white bg-black/50 hover:bg-green-500 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Overlay for background darkening, but doesn't block button interaction */}
      <div className="absolute inset-0 bg-black/30 lg:bg-transparent transition-all duration-300 group-hover:bg-black/60 z-0"></div>
    </div>
  );
};

export default Banner;
