import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./featuredMovieCard";
import { motion } from "framer-motion";
const FeaturedMovies = () => {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://movie-portal-server-two-pink.vercel.app/movies/top-rated")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching top-rated movies:", err));
    }, []);

    return (
        <div>
            <motion.h2
                className="text-2xl lg:text-3xl font-semibold mt-8 mb-4 text-black dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Featured Movies: {movies.length}
            </motion.h2>


            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <motion.div
                            key={movie._id}
                            className="flex flex-col h-full transform hover:scale-105 transition-transform"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col h-full"> {/* Wrapper to make card full height */}
                                <MovieCard
                                    movie={movie}
                                    onSeeDetails={() => navigate(`/movie/${movie._id}`)}
                                    className="flex-grow" // Ensure card content stretches to fill height
                                />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-300">Loading movies...</p>
                )}
            </motion.div>

            <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                <button
                    onClick={() => navigate("/allMovies")}
                    className="btn mt-4 px-6 py-3 rounded-lg text-white bg-green-800 hover:bg-green-700 transition-all transform hover:scale-105"
                >
                    See All Movies
                </button>
            </motion.div>
        </div>
    );
};

export default FeaturedMovies;