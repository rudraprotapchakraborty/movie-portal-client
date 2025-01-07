import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch(`https://movie-portal-server-two-pink.vercel.app/favorites/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          const moviePromises = data.map((favorite) =>
            fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${favorite.movieId || favorite._id}`).then((res) =>
              res.json()
            )
          );

          Promise.all(moviePromises).then((moviesWithDetails) => {
            setFavorites(moviesWithDetails.filter(Boolean));
          });
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = (movieId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38a169',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-two-pink.vercel.app/favorites/${user.uid}/${movieId}`, {
          method: 'DELETE',
        })
          .then(() => {
            Swal.fire('Deleted!', 'The movie has been removed from your favorites.', 'success');
            setFavorites(favorites.filter((favorite) => favorite._id !== movieId));
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please log in to view your favorite movies.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Your Favorite Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg text-gray-500 dark:text-gray-300 col-span-full"
          >
            No favorite movies found.
          </motion.p>
        ) : (
          favorites.map((movie) => (
            <motion.div
              key={movie._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {movie.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Duration:</strong> {movie.duration} minutes
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Release Year:</strong> {movie.release}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Rating:</strong> {movie.rating}/10
                </p>
                <motion.button
                  onClick={() => handleDelete(movie._id)}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-lg shadow hover:opacity-90 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  Delete Favorite
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
