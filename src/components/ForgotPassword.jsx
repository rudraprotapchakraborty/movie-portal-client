import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Get email from the state passed in the NavLink
    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);  // Set email to the input field
        }
    }, [location.state]);

    const handleReset = (e) => {
        e.preventDefault();
        // Here you can handle the reset password logic
        // For example, redirect to a page or send the reset request
        alert(`Reset password link sent to: ${email}`);
        navigate("/"); // Example to navigate back to the homepage after reset
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex justify-center items-center p-8">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>
                <form className="space-y-6" onSubmit={handleReset}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-600">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={email}  // Use email state here
                            placeholder="Enter your email address"
                            className="input input-bordered w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            required
                            readOnly // If you want to keep the email readonly
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg w-full p-3 hover:opacity-90 transition duration-300">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
