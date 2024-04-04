import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen px-5">
            <div className="text-center flex items-center gap-5 flex-col">
                <h1 className="text-6xl font-bold text-gray-800 font-lemonBld">
                    404
                </h1>
                <p className="text-2xl text-gray-600 font-lemonMed">
                    Page Not Found
                </p>
                <p className="text-gray-500 font-poppins">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link to={"/"}>
                    <button className="btn btn-info text-white font-poppins">
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
