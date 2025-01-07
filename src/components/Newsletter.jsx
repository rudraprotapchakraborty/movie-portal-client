import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }

        // Simulate successful subscription
        setTimeout(() => {
            setIsSubscribed(true);
            setEmail("");
            setError("");
        }, 1000);
    };

    return (
        <section
            className="w-full rounded-3xl mt-8 py-16 bg-gradient-to-r from-green-200 to-green-300 dark:from-gray-800 dark:to-gray-900 text-center"
            style={{
                backgroundImage: "linear-gradient(to right, #A8D5BA, #72BB60)",
            }}
        >
            <motion.div
                className="max-w-3xl mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Stay Updated with Our Latest News
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Sign up for our newsletter and get exclusive updates and offers directly to your inbox.
                </motion.p>

                {isSubscribed ? (
                    <motion.div
                        className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-lg shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <FaCheckCircle className="text-2xl" />
                        <p>Thanks for subscribing!</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubscribe} className="flex justify-center gap-4 items-center">
                        {/* Envelope Icon Added Here */}
                        <FaEnvelope className="text-xl text-gray-800 dark:text-white" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-2/3 sm:w-1/2 p-4 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <motion.button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 transition-all transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            Subscribe
                        </motion.button>
                    </form>
                )}

                {error && (
                    <motion.p
                        className="text-red-500 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {error}
                    </motion.p>
                )}
            </motion.div>
        </section>
    );
};

export default Newsletter;
