import { useState } from "react";
import ReactStars from "react-rating-stars-component";  // Import new rating component
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from '../assets/lottie/lottie1.json';  // Import Lottie animation JSON file
import '../App.css';

const AddMovie = () => {

    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        duration: "",
        release: "",
        rating: 0,
        summary: "",
        poster: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRatingChange = (rate) => {
        setFormData({ ...formData, rating: rate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        if (!formData.poster || !isValidURL(formData.poster)) {
            toast.error("Please enter a valid poster URL.");
            return;
        }

        if (!formData.title || formData.title.length < 2) {
            toast.error("Movie title must be at least 2 characters.");
            return;
        }

        if (!formData.genre) {
            toast.error("Please select a genre.");
            return;
        }

        if (!formData.duration || formData.duration < 60) {
            toast.error("Duration must be greater than 60 minutes.");
            return;
        }

        if (!formData.release) {
            toast.error("Please select a release year.");
            return;
        }

        if (formData.rating === 0) {
            toast.error("Please select a rating.");
            return;
        }

        if (!formData.summary || formData.summary.length < 10) {
            toast.error("Summary must be at least 10 characters.");
            return;
        }

        toast.success("Movie added successfully!");
        console.log("Movie Data: ", formData);

        // Send data to the server
        fetch('https://movie-portal-server-two-pink.vercel.app/movie', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });

        // Clear form data
        setFormData({
            title: "",
            genre: "",
            duration: "",
            release: "",
            rating: 0,
            summary: "",
            poster: ""
        });
    };

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-8">
            <Toaster />

            {/* Form Card */}
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 w-full max-w-2xl flex flex-col items-center animate__animated animate__fadeIn animate__delay-1s">

                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Add Movie</h2>

                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                    {/* Title and Genre */}
                    <div className="md:flex md:space-x-4">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Title</span>
                            </label>
                            <input
                                className="input input-bordered w-full rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                                name="title"
                                type="text"
                                placeholder="Movie Title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Genre</span>
                            </label>
                            <select
                                className="input input-bordered w-full rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                                name="genre"
                                value={formData.genre}
                                onChange={handleInputChange}
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
                    <div className="md:flex md:space-x-4">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</span>
                            </label>
                            <input
                                className="input input-bordered w-full rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                                name="duration"
                                type="number"
                                placeholder="e.g., 120"
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700 dark:text-gray-300">Release Year</span>
                            </label>
                            <select
                                className="input input-bordered w-full rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                                name="release"
                                value={formData.release}
                                onChange={handleInputChange}
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
                            className="input input-bordered w-full h-[120px] rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                            name="summary"
                            placeholder="Provide a short summary of the movie"
                            value={formData.summary}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    {/* Rating */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700 dark:text-gray-300">Rating</span>
                        </label>
                        <div className="flex items-center space-x-2"> {/* Flexbox with center alignment and space between stars */}
                            <ReactStars
                                count={5}
                                value={formData.rating}
                                onChange={handleRatingChange}
                                size={30}
                                activeColor="#FFD700"
                            />
                        </div>
                    </div>




                    {/* Poster URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700 dark:text-gray-300">Poster URL</span>
                        </label>
                        <input
                            className="input input-bordered w-full rounded-md p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white dark:bg-gray-700"
                            name="poster"
                            type="text"
                            placeholder="e.g., https://imageurl.com/poster.jpg"
                            value={formData.poster}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg rounded-md shadow-md hover:opacity-90 transition-all"
                    >
                        Add Movie
                    </button>
                </form>
            </div>

            {/* Lottie Animation on the right side */}
            <div className="w-1/3 hidden md:block ml-8">
                <Lottie animationData={animationData} loop={true} className="w-full h-full" />
            </div>
        </div>
    );
};

export default AddMovie;
