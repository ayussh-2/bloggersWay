import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { Suspense, useState } from "react";
import Fallback from "./pages/Fallback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import Signup from "./pages/Signup";

export default function App() {
    const location = useLocation();
    const proxy: String = "http://localhost:4000";
    const [userStatus, setUserStatus] = useState<object>({
        type: "",
        message: "",
    });
    function signupUser(user: {
        name: String;
        email: string;
        password: String;
    }) {
        if (user.name === "" || user.email === "" || user.password === "") {
            setUserStatus({
                ...userStatus,
                type: "error",
                message: "Please fill all the fields",
            });
            return;
        }
        axios
            .post(proxy + "/api/users/signup", user)
            .then(function (res) {
                console.log(res);
                setUserStatus({
                    ...userStatus,
                    type: "success",
                    message: "Registration Succesfull",
                });
            })
            .catch(function (err) {
                // console.error(err.response.data.msg);
                setUserStatus({
                    ...userStatus,
                    type: "error",
                    message: err.response.data.msg,
                });
            });
    }

    function loginUser(user: { email: string; password: String }) {
        if (user.email === "" || user.password === "") {
            setUserStatus({
                ...userStatus,
                type: "error",
                message: "Please fill all the fields",
            });
            return;
        }
        axios
            .post(proxy + "/api/users/login", user)
            .then(function (res) {
                localStorage.setItem("id", res.data.user._id);
                setUserStatus({
                    ...userStatus,
                    type: "success",
                    message: "Login Succesfull",
                });
                window.location.href = "/";
            })
            .catch(function (err) {
                setUserStatus({
                    ...userStatus,
                    type: "error",
                    message: err.response.data.msg,
                });
            });
    }
    return (
        <>
            <Suspense fallback={<Fallback />}>
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                handleLogin={loginUser}
                                status={userStatus}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Signup
                                handleSignup={signupUser}
                                status={userStatus}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}
