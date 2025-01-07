import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
    const [activeLink, setActiveLink] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Get theme context

    const handleLogOut = () => {
        logOut();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    onClick={() => setActiveLink('home')}
                    className={`${activeLink === 'home'
                            ? 'text-green-500' // Active link color
                            : darkMode
                                ? 'text-gray-300 hover:text-green-300'
                                : 'text-gray-700 hover:text-green-500'
                        } transition-transform duration-200 ease-in-out transform hover:scale-105`}
                >
                    Home
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/allMovies"
                            onClick={() => setActiveLink('allMovies')}
                            className={`${activeLink === 'allMovies'
                                    ? 'text-green-500'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-green-300'
                                        : 'text-gray-700 hover:text-green-500'
                                } transition-transform duration-200 ease-in-out transform hover:scale-105`}
                        >
                            All Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/addMovie"
                            onClick={() => setActiveLink('addMovie')}
                            className={`${activeLink === 'addMovie'
                                    ? 'text-green-500'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-green-300'
                                        : 'text-gray-700 hover:text-green-500'
                                } transition-transform duration-200 ease-in-out transform hover:scale-105`}
                        >
                            Add Movie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favorites"
                            onClick={() => setActiveLink('favorites')}
                            className={`${activeLink === 'favorites'
                                    ? 'text-green-500'
                                    : darkMode
                                        ? 'text-gray-300 hover:text-green-300'
                                        : 'text-gray-700 hover:text-green-500'
                                } transition-transform duration-200 ease-in-out transform hover:scale-105`}
                        >
                            Favorites
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div
            className={`sticky z-50 backdrop-blur-md shadow-xl rounded-full w-11/12 mx-auto px-4 py-3 transition-all duration-300 ${scrolling ? 'top-0' : 'top-4'
                } ${darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}
        >
            <div className="flex justify-between items-center">
                {/* Left Section - Logo */}
                <NavLink>
                    <button
                        className={`text-xl md:text-2xl font-bold transition-transform duration-300 transform hover:scale-105 ${darkMode ? 'text-green-300 hover:text-green-400' : 'text-green-500 hover:text-green-600'
                            }`}
                    >
                        <p>
                            <span className={`${darkMode ? 'text-green-500' : 'text-green-700'}`}>&lt;M</span>
                            ovie Portal
                            <span className={`${darkMode ? 'text-green-500' : 'text-green-700'}`}>/&gt;</span>
                        </p>
                    </button>
                </NavLink>

                {/* Centered Menu for Desktop */}
                <div className="hidden lg:flex">
                    <ul className="flex gap-10">{links}</ul>
                </div>

                {/* Right Section - Theme Toggle, Login/Register, User Profile */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${darkMode ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                    >
                        {darkMode ? <FaMoon className="md:text-xl" /> : <FaSun className="md:text-xl" />}
                    </button>

                    {/* User Profile or Login */}
                    {user ? (
                        <div className="relative group">
                            <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="Profile" />
                            <div
                                className={`absolute top-14 left-1/2 transform -translate-x-1/2 hidden group-hover:block px-3 py-1 whitespace-nowrap rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {user.displayName}
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={`btn btn-ghost transition-all ${darkMode ? 'text-white hover:text-green-300' : 'text-gray-700 hover:text-green-500'
                                    }`}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={`btn btn-ghost transition-all ${darkMode ? 'text-white hover:text-green-300' : 'text-gray-700 hover:text-green-500'
                                    }`}
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    {/* Logout Button */}
                    {user && (
                        <button
                            onClick={handleLogOut}
                            className={`btn btn-ghost transition-all ${darkMode ? 'text-white hover:text-green-300' : 'text-gray-700 hover:text-green-500'
                                }`}
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="lg:hidden flex items-center">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <ul
                            className={`absolute right-4 top-12 p-4 space-y-4 rounded-lg shadow-xl z-50 ${darkMode ? 'bg-black bg-opacity-90 text-gray-300' : 'bg-white text-gray-700'
                                }`}
                        >
                            {links}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

