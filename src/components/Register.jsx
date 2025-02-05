import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";

const Register = () => {
  const { createNewUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const error = validatePassword(password);
    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            const createdAt = user.metadata.creationTime;
            const newUser = { name, email, photo, createdAt };

            fetch("https://movie-portal-server-two-pink.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  navigate("/");
                }
              })
              .catch((error) => console.log("Error creating user in database:", error));
          })
          .catch((error) => console.log("Error updating profile:", error));
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => console.log("Google sign-in failed", error));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-800 transition-colors duration-500 p-8">
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-md p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8">Register your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-600 dark:text-gray-300">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full p-3 rounded-lg bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-green-500"
              required
            />
            {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
          </div>
          <div className="form-control mt-6 flex justify-between items-center">
            <motion.button
              className="px-8 w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Register
            </motion.button>
            <motion.button
              onClick={handleGoogleSignIn}
              className="px-8 py-3 w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg shadow-md transform hover:scale-105 hover:opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Google
            </motion.button>
          </div>
        </form>
        <p className="text-center font-semibold text-gray-600 dark:text-gray-300 mt-6">
          Already Have An Account?{" "}
          <Link className="text-green-600 dark:text-green-400 hover:text-green-800" to="/login">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
