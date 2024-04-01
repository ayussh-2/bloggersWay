import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Fallback from "./pages/Fallback";
import Home from "./pages/Home";
import TravelBlog from "./pages/TravelBlog";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import Signup from "./pages/Signup";
import CreateBlog from "./pages/CreateBlog";
import { storage } from "./config/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { ToastContainer, toast, Slide } from "react-toastify";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import AboutUs from "./pages/About";
import Contact from "./pages/ContactUs";
export default function App() {
    const location = useLocation();
    const proxy: String = import.meta.env.VITE_PROXY;
    const navigate = useNavigate();

    function signupUser(user: {
        name: String;
        email: string;
        password: String;
    }) {
        if (user.name === "" || user.email === "" || user.password === "") {
            toast.info("Please fill up all the fields");
            return;
        }
        axios
            .post(proxy + "/api/users/signup", user)
            .then(function (res) {
                console.log(res);
                toast.success("Account Created!");
            })
            .catch(function (err) {
                // console.error(err.response.data.msg);
                toast.error(err.response.data.msg);
            });
    }

    function loginUser(user: { email: string; password: String }) {
        if (user.email === "" || user.password === "") {
            toast.info("Please fill all the fields");
            return;
        }
        axios
            .post(proxy + "/api/users/login", user)
            .then(function (res) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        uid: res.data.user._id,
                        name: res.data.user.name,
                        mail: res.data.user.email,
                    })
                );

                navigate("/");
            })
            .catch(function (err) {
                toast.error(err.response.data.msg);
            });
    }

    function createBlog(blog: {
        uid: string;
        author: string;
        title: string;
        locations: string;
        hotspots: string;
        route: string;
        about: string;
        stories: string;
        cover: null;
        multiImage: null;
        weather: string;
        avgTemp: string;
        cityAndCountry: string;
    }) {
        console.log(blog);
        axios
            .post(proxy + "/api/blogs/create", blog)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    async function uploadImage(image: any) {
        const storageRef = ref(storage, `images/${image.name + Date.now()}`);
        const uploadTask = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(uploadTask.ref);
        console.log(url);

        return url;
    }

    async function getBlogs(pagination: { page: number; blogPerPage: number }) {
        const response = await axios.get(proxy + "/api/blogs/all", {
            params: pagination,
        });
        return response.data;
    }

    async function getNoOfBlogs() {
        try {
            const count = await axios.get(proxy + "/api/blogs/count");
            return count;
        } catch (err) {
            console.log(err);
        }
    }
    function changeBlog(blogId: string) {
        // console.log(blog);
        navigate(`./travel?bid=${blogId}`);
    }
    async function getBlogById(bid: string) {
        try {
            const result = await axios.get(
                proxy + `/api/blogs/getBlogById?bid=${bid}`
            );
            return result.data.blog;
        } catch (err) {
            console.log(err);
        }
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function handleLoginState(status: boolean) {
        setIsLoggedIn(status);
    }
    function logout() {
        localStorage.removeItem("user");
        toast.success("Logged Out Successfully!");
        handleLoginState(false);
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
                bodyStyle={{
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                }}
            />
            <Navbar
                handleLogout={logout}
                isLoggedIn={isLoggedIn}
                handleLoginState={handleLoginState}
            />
            <AnimatePresence mode="wait">
                <Suspense fallback={<Fallback />}>
                    <Routes key={location.pathname} location={location}>
                        <Route
                            path="/"
                            element={
                                <Home
                                    handleGetBlogs={getBlogs}
                                    totalBlogs={getNoOfBlogs}
                                    handleChangeBlog={changeBlog}
                                />
                            }
                        />
                        <Route
                            path="/login"
                            element={<Login handleLogin={loginUser} />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup handleSignup={signupUser} />}
                        />
                        <Route
                            path="/create"
                            element={
                                <CreateBlog
                                    handleCreateBlog={createBlog}
                                    handleUploadImage={uploadImage}
                                />
                            }
                        />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/travel"
                            element={<TravelBlog findBlogById={getBlogById} />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </AnimatePresence>
            <Footer />
        </>
    );
}
