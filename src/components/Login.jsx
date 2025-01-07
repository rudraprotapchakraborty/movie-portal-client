import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { motion } from "framer-motion";

const Login = () => {
  const { signInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        fetch(`https://movie-portal-server-two-pink.vercel.app/users/${email}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              const updatedUser = {
                ...data,
                lastSignInTime: new Date(),
              };

              fetch("https://movie-portal-server-two-pink.vercel.app/users", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
              })
                .then((res) => res.json())
                .then(() => {
                  setUser(updatedUser);
                  navigate("/");
                });
            } else {
              console.error("User not found in the database.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setFormError("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setFormError("Incorrect password.");
        } else {
          setFormError(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-md p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">
                Email
              </span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">
                Password
              </span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
            />
            <label className="label">
              <NavLink
                to="/forgot-password"
                state={{ email }}
                className="label-text-alt link link-hover text-green-600 dark:text-green-400"
              >
                Forgot password?
              </NavLink>
            </label>
            {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
          </div>
          <div className="form-control mt-6 flex justify-between items-center">
            <motion.button
              type="submit"
              className="px-8 py-3 w-full bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={handleGoogleSignIn}
              className="px-8 w-full mt-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Google
            </motion.button>
          </div>
        </form>
        <p className="text-center font-semibold text-gray-600 dark:text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            className="text-green-600 dark:text-green-400 hover:text-green-800"
            to="/register"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
