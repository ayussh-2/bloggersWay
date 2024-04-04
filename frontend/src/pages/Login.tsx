import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
    handleLogin: (user: { email: string; password: string }) => void;
};
export default function Login({ handleLogin }: Props) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
            // console.log("redirecting");
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
            className="flex items-center"
        >
            <div className="w-1/2">
                <div className="grid h-screen place-items-center font-poppins">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-3xl text-center font-light mb-5">
                            Welcome Back
                        </h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <Link to={"/signup"}>
                            <p className="text-right text-sm hover:tracking-widest my-2 duration-200 cursor-pointer hover:font-semibold active:tracking-normal">
                                New User?
                            </p>
                        </Link>
                        <button
                            className="btn text-xl"
                            onClick={() => handleLogin(user)}
                        >
                            GO
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <div className="overflow-hidden h-screen">
                    <img
                        src="https://images.pexels.com/photos/2884866/pexels-photo-2884866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                    />
                </div>
            </div>
        </motion.div>
    );
}
