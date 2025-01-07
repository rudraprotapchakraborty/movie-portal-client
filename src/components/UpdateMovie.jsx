import { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import ReactStars from "react-rating-stars-component";  // Import new rating component
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const UpdateMovie = () => {
  const movie = useLoaderData();
  const { _id, title, poster, genre, duration, release, rating, summary } = movie;

  const handleUpdateMovie = (event) => {
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const poster = form.poster.value;
    const genre = form.genre.value;
    const duration = form.duration.value;
    const release = form.release.value;
    const summary = form.summary.value;

    const updatedMovie = { title, poster, genre, duration, release, summary };
    console.log(updatedMovie);

    fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Movie updated successfully.",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-8">
      <Toaster />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-3xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Update Movie</h2>
        <form onSubmit={handleUpdateMovie} className="space-y-8">
          {/* Title and Genre */}
          <div className="md:flex md:space-x-6">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Title</span>
              </label>
              <input
                className="input input-bordered w-full rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-auto"
                name="title"
                type="text"
                placeholder="Movie Title"
                defaultValue={title}
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Genre</span>
              </label>
              <select
                className="input input-bordered w-full rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-auto"
                name="genre"
                defaultValue={genre}
              >
                <option value="">Select Genre</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="action">Action</option>
                <option value="romance">Romance</option>
              </select>
            </div>
          </div>

          {/* Duration and Release Year */}
          <div className="md:flex md:space-x-6">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</span>
              </label>
              <input
                className="input input-bordered w-full rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-auto"
                name="duration"
                type="number"
                placeholder="e.g., 120"
                defaultValue={duration}
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Release Year</span>
              </label>
              <select
                className="input input-bordered w-full rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-auto"
                name="release"
                defaultValue={release}
              >
                <option value="">Select Year</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Summary</span>
            </label>
            <textarea
              className="input input-bordered w-full h-[150px] rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              name="summary"
              placeholder="Provide a short summary of the movie"
              defaultValue={summary}
            ></textarea>
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Rating</span>
            </label>
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating) => console.log(newRating)} // Handle rating change if needed
              size={30}
              activeColor="#FFD700"
            />
          </div>

          {/* Poster */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700 dark:text-gray-300">Poster URL</span>
            </label>
            <input
              className="input input-bordered w-full rounded-md p-4 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-auto"
              name="poster"
              type="text"
              placeholder="e.g., https://imageurl.com/poster.jpg"
              defaultValue={poster}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold text-lg rounded-md shadow-md hover:opacity-90 transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          >
            Update Movie
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
