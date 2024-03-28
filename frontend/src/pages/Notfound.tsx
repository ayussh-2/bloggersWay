import React from "react";

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600">Page Not Found</p>
                <p className="text-gray-500">
                    Oops! The page you are looking for does not exist.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
