import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold capitalize">
                        It's a dead end!
                    </h1>
                    <p className="mb-5 text-3xl">
                        The page you are looking for does not exist.
                    </p>
                    <Link to={"/"}>
                        <button className="btn">Head back home!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
