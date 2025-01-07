import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import AddMovie from './components/AddMovie.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import AllMovies from './components/AllMovies.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import FavoriteMovies from './components/FavoriteMovies.jsx'; // Import FavoriteMovies
import PrivateRoute from './routes/PrivateRoute.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import UpdateMovie from './components/UpdateMovie.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('https://movie-portal-server-two-pink.vercel.app/movie'),
      },
      {
        path: "addMovie",
        element: <PrivateRoute><AddMovie></AddMovie></PrivateRoute>,
      },
      {
        path: 'updateMovie/:id',
        element: <PrivateRoute><UpdateMovie></UpdateMovie></PrivateRoute>,
        loader: ({ params }) => fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${params.id}`)
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allMovies",
        element: <AllMovies></AllMovies>,
        loader: () => fetch('https://movie-portal-server-two-pink.vercel.app/movie'),
      },
      {
        path: "/movieDetails/:id",
        element: <PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(`https://movie-portal-server-two-pink.vercel.app/movie/${params.id}`);
          if (!response.ok) {
            throw new Error('Movie not found');
          }
          return response.json();
        },
      },
      {
        path: "/favorites",  
        element: <PrivateRoute><FavoriteMovies></FavoriteMovies></PrivateRoute>,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider><AuthProvider><RouterProvider router={router} /></AuthProvider></ThemeProvider>
  </StrictMode>,
);
