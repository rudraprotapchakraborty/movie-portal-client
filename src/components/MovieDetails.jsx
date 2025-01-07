import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const MovieDetails = () => {
  const { user } = useContext(AuthContext);
  const movie = useLoaderData();
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-xl text-gray-500 mt-8">Please log in to add movies to favorites.</p>;
  }

  // Add movie to favorites
  const handleAddToFavorites = () => {
    Swal.fire({
      title: "Add to Favorites?",
      text: "Do you want to add this movie to your favorites?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#38a169", // Subtle green
      cancelButtonColor: "#a0aec0", // Subtle gray
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://movie-portal-server-two-pink.vercel.app/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            movieId: movie._id,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Added!",
              text: "The movie has been added to your favorites.",
              icon: "success",
              confirmButtonColor: "#38a169", // Subtle green for success
            });
          })
          .catch((err) => console.error("Error adding movie to favorites:", err));
      }
    });
  };

  // Delete movie
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Movie?",
      text: "Are you sure you want to delete this movie? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e", // Red for danger
      cancelButtonColor: "#a0aec0", // Subtle gray
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${movie._id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "The movie has been deleted.",
                icon: "success",
                confirmButtonColor: "#38a169", // Subtle green for success
              });
              navigate("/allMovies");
            }
          })
          .catch((err) => console.error("Error deleting movie:", err));
      }
    });
  };

  if (!movie) {
    return <p className="text-center text-xl text-gray-500 mt-8">Loading movie details...</p>;
  }

  const { title, release, genre, summary, rating, poster } = movie;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8 mb-8 transition-all ease-in-out duration-300">
      <motion.img
        src={poster}
        alt={title}
        className="w-full h-56 object-cover rounded-lg mb-4 shadow-lg transform hover:scale-105 transition-transform duration-500"
      />
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300"><strong>Release Year:</strong> {release}</p>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300"><strong>Genre:</strong> {genre}</p>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300"><strong>Summary:</strong> {summary}</p>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300"><strong>Rating:</strong> {rating}/10</p>

        <div className="flex gap-4 mt-6 justify-center">
          <motion.button
            onClick={handleAddToFavorites}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in-out"
          >
            Add to Favorites
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in-out"
          >
            Delete Movie
          </motion.button>
          <Link to={`/updateMovie/${movie._id}`}>
            <motion.button
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300 ease-in-out"
            >
              Update Movie
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
