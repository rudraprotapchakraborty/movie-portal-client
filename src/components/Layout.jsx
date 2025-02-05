import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Accessing context here

    return (
        <div className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
            <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
