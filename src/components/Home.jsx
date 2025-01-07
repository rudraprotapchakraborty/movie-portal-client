import Banner from "./Banner";
import FeaturedMovies from "./FeaturedMovies";
import Newsletter from "./Newsletter";

const Home = () => {


  return (
    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-8 lg:px-12">
      <Banner />
      <FeaturedMovies></FeaturedMovies>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;