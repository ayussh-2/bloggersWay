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
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

    function signupUser(user: {
        name: String;
        email: string;
        password: String;
    }) {
        if (user.name === "" || user.email === "" || user.password === "") {
            alert("Please input every field");
            return;
        }
        console.log(user);
        axios
            .post(proxy + "/api/users/signup", user)
            .then(function (res) {
                console.log(res);
                setRegisterSuccess(true);
            })
            .catch(function (err) {
                console.error(err);
            });
    }
    return (
        <>
            <Suspense fallback={<Fallback />}>
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/signup"
                        element={
                            <Signup
                                handleSignup={signupUser}
                                success={registerSuccess}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}
