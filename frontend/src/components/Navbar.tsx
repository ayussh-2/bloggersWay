import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Navbar() {
    const [user, setUser] = useState({ name: "" });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user !== null) {
            setUser(user);
            // console.log(user);
        } else {
            setUser({ ...user, name: "Friend" });
        }
    }, []);
    const handleCloseSidebar = () => {
        document.getElementById("drawer").checked = false;
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.2, 1, 0.2, 1] }}
            className="navbar bg-base-100 md:px-36"
        >
            <div className="navbar-start">
                <Link to={"/"}>
                    <p className=" text-xl font-lemonBld font-bold py-5 mx-5">
                        <span className="font-extrabold text-4xl">B</span>
                        loggers Way
                    </p>
                </Link>
            </div>
            <div className="navbar-end"></div>

            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                <Link to={"/login"}>
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                    </button>
                </Link>
                <div className="drawer w-0 drawer-end z-20">
                    <label
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                        htmlFor="drawer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <input
                        id="drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-side">
                        <label
                            htmlFor="drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>

                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-poppins">
                            <h2 className="font-lemonMed text-center text-xl my-10">
                                Welcome, {user.name}
                            </h2>
                            <div className="mt-5">
                                <h3 className="font-lemonBld text-sm mb-3">
                                    Blog
                                </h3>
                                <li onClick={handleCloseSidebar}>
                                    <Link to={"/create"}>
                                        <span className="capitalize text-lg">
                                            Write a travel Blog?
                                        </span>
                                    </Link>
                                </li>
                                <li onClick={handleCloseSidebar}>
                                    <span className="capitalize text-lg">
                                        My Blogs
                                    </span>
                                </li>
                                <li onClick={handleCloseSidebar}>
                                    <span className="capitalize text-lg">
                                        My favorites
                                    </span>
                                </li>
                            </div>
                            <div className="mt-5">
                                <h3 className="font-lemonBld text-sm mb-3">
                                    BloggersWay
                                </h3>
                                <li onClick={handleCloseSidebar}>
                                    <span className="capitalize text-lg">
                                        Who are we?
                                    </span>
                                </li>
                                <li onClick={handleCloseSidebar}>
                                    <span className="capitalize text-lg">
                                        Having trouble?
                                    </span>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
