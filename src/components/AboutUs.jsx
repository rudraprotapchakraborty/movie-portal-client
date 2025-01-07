import { motion } from "framer-motion";
import { FaFilm, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <section
      className="w-full py-16 mt-16 text-center rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Wrapper without any inner background */}
      <motion.div
        className="max-w-5xl mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-semibold text-gray-800 dark:text-white mb-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We are a passionate team of movie lovers committed to bringing you the best cinema experience online. 
          Our goal is to provide an easy-to-use platform where you can discover, rate, and share your favorite movies
          with a community of like-minded enthusiasts. Whether you're looking for the latest blockbuster or a hidden gem,
          we're here to help you find your next movie to watch.
        </motion.p>

        <motion.div
          className="flex justify-center gap-12 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center p-8 rounded-xl shadow-lg">
            <FaFilm className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              To create a seamless movie discovery experience that empowers users to make informed decisions about the films they watch.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl shadow-lg">
            <FaUsers className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Our Team</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              A diverse group of creative minds, developers, designers, and movie experts who work tirelessly to bring you the best movie portal experience.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Join us on our journey to make movie discovery easy and enjoyable for everyone. Whether you're a cinephile or just someone looking for something to watch, we've got you covered!
          </p>

          <motion.button
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/allMovies")} // Add navigation logic here
          >
            Explore Movies
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
