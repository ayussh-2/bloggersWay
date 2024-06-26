import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import Likes from "./pages/Likes";

import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";
export default function App() {
    const location = useLocation();
    const proxy: String = import.meta.env.VITE_PROXY;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    function signupUser(user: {
        name: String;
        email: string;
        password: String;
    }) {
        if (user.name === "" || user.email === "" || user.password === "") {
            toast.info("Please fill up all the fields");
            return;
        }
        scrollToTop();
        setLoading(true);
        axios
            .post(proxy + "/api/users/signup", user)
            .then(function (res) {
                console.log(res);
                toast.success("Account Created!");
                navigate("/login");
            })
            .catch(function (err) {
                // console.error(err.response.data.msg);
                toast.error(err.response.data.msg);
            })
            .finally(() => setLoading(false));
    }

    function loginUser(user: { email: string; password: String }) {
        if (user.email === "" || user.password === "") {
            toast.info("Please fill all the fields");
            return;
        }
        scrollToTop();
        setLoading(true);
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
            })
            .finally(() => setLoading(false));
    }

    async function fetchBlogsByUser(uid: string) {
        try {
            const response = await axios.get(
                proxy + "/api/blogs/getBlogByUser?uid=" + uid
            );
            return response.data;
        } catch (error) {
            console.log("Error fetching blogs:", error);
            throw error;
        }
    }
    async function getUser(uid: string) {
        try {
            const response = await axios.post(proxy + "/api/users/findUser", {
                uid: uid,
            });
            return response.data;
        } catch (error) {
            console.log("Error fetching user:", error);
            throw error;
        }
    }
    async function deleteBlog(bid: string) {
        try {
            const response = await axios.delete(
                proxy + "/api/blogs/deleteBlogById?bid=" + bid
            );
            toast.success("Blog Deleted Successfully!");
            return response.data;
        } catch (error) {
            console.log("Error deleting blog:", error);
            toast.error("Failed to delete the blog!");
            throw error;
        }
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
        axios
            .post(proxy + "/api/blogs/create", blog)
            .then(function (res) {
                console.log(res);
                navigate("/travel?bid=" + res.data.bid);
                // return res.data.bid;
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

    function likeBlog(bid: string) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        // console.log(localStorage.getItem("user"));

        if (user.uid === "" || user.uid === undefined) {
            toast.error("Please login to like the blog");
            return;
        }
        if (bid === "") {
            toast.error("No blog found to like!");
            return;
        }

        axios
            .post(proxy + "/api/users/like", { blog: bid, email: user.uid })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to like the blog!");
            });
    }
    async function updateBlog(
        bid: string,
        blog: {
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
        }
    ) {
        try {
            setLoading(true);
            axios.patch(proxy + "/api/blogs/updateBlogById?bid=" + bid, blog);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    transition={{
                        opacity: 1,
                        duration: 0.7,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="backdrop-blur-md h-full w-full flex items-center justify-center z-10 absolute"
                >
                    <span className="loading loading-spinner loading-lg"></span>
                </motion.div>
            )}
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
                            element={
                                <TravelBlog
                                    findBlogById={getBlogById}
                                    likeBlog={likeBlog}
                                    findUser={getUser}
                                />
                            }
                        />
                        <Route
                            path="/likes"
                            element={
                                <Likes
                                    findUser={getUser}
                                    getBlog={getBlogById}
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Profile
                                    fetchBlogsByUser={fetchBlogsByUser}
                                    deleteBlog={deleteBlog}
                                />
                            }
                        />
                        <Route
                            path="/edit"
                            element={
                                <EditBlog
                                    handleFetchBlog={getBlogById}
                                    handleUpdateBlog={updateBlog}
                                    handleUploadImage={uploadImage}
                                />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </AnimatePresence>
            <Footer />
        </>
    );
}
