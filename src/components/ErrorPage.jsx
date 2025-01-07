import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <div className="flex flex-col justify-center items-center mt-24 lg:mt-32 px-4">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-800">Error 404</h2>
            <p className="mt-6 text-lg text-gray-500">
                Page not found. Go back to{" "}
                <Link className="text-purple-600 hover:text-purple-500 font-medium transition-all" to="/">Home</Link>.
            </p>
        </div>
    );
};

export default ErrorPage;
