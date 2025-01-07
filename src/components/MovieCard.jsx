import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Movie = ({ movie, loadedMovies, setLoadedMovies }) => {
  const { _id, title, release, genre, rating, summary, poster } = movie;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${_id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              // Update the loaded movies state
              const remainingMovies = loadedMovies.filter((movie) => movie._id !== _id);
              setLoadedMovies(remainingMovies);
            }
          });
      }
    });
  };

  return (
    <div className="card lg:w-72 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 flex flex-col h-full">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={poster}
          alt="Movie Poster"
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </figure>
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{title || "N/A"}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Release Year: <span className="font-normal">{release || "N/A"}</span></p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Genre: <span className="font-normal">{genre || "N/A"}</span></p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Summary: <span className="font-normal">{summary || "No summary available"}</span></p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Rating: <span className="font-normal">{rating || "Not rated"}</span></p>
        </div>
        <div className="mt-3 flex space-x-3">
          <Link to={`/movieDetails/${movie._id}`} className="w-full">
            <button className="w-full py-2 text-sm font-medium text-white bg-green-600 dark:bg-green-500 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-all">
              See Details
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="w-full py-2 text-sm font-medium text-white bg-red-600 dark:bg-red-500 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
