import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Movie from './MovieCard';

const AllMovies = () => {
    const movies = useLoaderData();
    const [loadedMovies, setLoadedMovies] = useState(movies);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('title-asc'); // New state to track sort option

    // Handle the search query change
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter movies based on the search query
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(query)
        );
        setLoadedMovies(filteredMovies);
    };

    // Sorting function
    const handleSort = (option) => {
        setSortOption(option);
        const [sortBy, order] = option.split('-');
        const sortedMovies = [...loadedMovies].sort((a, b) => {
            if (sortBy === 'title') {
                if (order === 'asc') {
                    return a.title.localeCompare(b.title); // Ascending by title
                } else {
                    return b.title.localeCompare(a.title); // Descending by title
                }
            } else if (sortBy === 'release') {
                if (order === 'asc') {
                    return a.release - b.release; // Ascending by year
                } else {
                    return b.release - a.release; // Descending by year
                }
            }
            return 0;
        });
        setLoadedMovies(sortedMovies);
    };

    return (
        <div className="px-4 py-8 lg:px-12 bg-gray-50 dark:bg-gray-800 transition-all duration-300">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white mt-8 mb-4 text-center">
                All Movies: {loadedMovies.length}
            </h2>

            {/* Search and Sort (Side by Side) */}
            <div className="mb-6 flex justify-between items-center">
                {/* Search Input */}
                <div className="flex-1 max-w-[450px]">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-4 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-green-500"
                    />
                </div>

                {/* Sort By Dropdown */}
                <div className="ml-6 flex-1 max-w-[300px]">
                    <select
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                        className="p-3 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
                    >
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                        <option value="release-asc">Release Year (Old-New)</option>
                        <option value="release-desc">Release Year (New-Old)</option>
                    </select>
                </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    loadedMovies.length > 0 ? (
                        loadedMovies.map(movie => (
                            <Movie
                                movie={movie}
                                key={movie._id}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No movies found</p>
                    )
                }
            </div>
        </div>
    );
};

export default AllMovies;
