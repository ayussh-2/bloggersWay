import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
export default function TravelBlog({ findBlogById }: any) {
    const [params] = useSearchParams();
    const [blog, setBlog] = useState({
        cover: "",
        weather: "",
        avgTemp: "",
        cityAndCountry: "",
        author: "",
        title: "",
        about: "",
        multiImage: [],
        locations: "",
        stories: "",
        hotspots: "",
        route: "",
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const bid = params.get("bid");
        // console.log(bid);
        fetchBlog(bid);
        scrollToTop();
    }, []);
    async function fetchBlog(id: any) {
        try {
            const blogObject = await findBlogById(id);
            if (isEmpty(blogObject)) {
                alert("No such movie found");
                window.location.href = "/";
            }
            setBlog(blogObject);
            console.log("loaded");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function isEmpty(obj: object) {
        return Object.keys(obj).length === 0;
    }
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <>
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <ScaleLoader color="#000" />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: "100vh" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
                >
                    <div className="relative" id="top">
                        <motion.div
                            initial={{ opacity: 0, y: "-50vh" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.2, 1, 0.2, 1],
                            }}
                            className="overflow-hidden h-96 w-full relative"
                        >
                            <img
                                src={blog.cover}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 1,
                                ease: [0.2, 1, 0.2, 1],
                                delay: 0.5,
                            }}
                            className="absolute -bottom-24 flex items-center justify-center w-full"
                        >
                            <div className="bg-white h-40 gap-x-10 gap-y-5 rounded-md font-poppins px-10 py-5 grid grid-cols-2 drop-shadow-xl capitalize">
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-cloud text-3xl"></i>
                                    <p>{blog.weather || "Windy"}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-temperature-half text-3xl"></i>
                                    <p>{blog.avgTemp || "27"}&deg;</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-earth-asia text-3xl"></i>
                                    <p>
                                        {blog.cityAndCountry || "Kolkata,India"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-at text-3xl"></i>
                                    <p>{blog.author}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div
                        className="my-40 px-20 flex items-center justify-center"
                        id="aboutPlace"
                    >
                        <div className="w-1/2 flex flex-col items-baseline">
                            <h1 className="text-4xl font-lemonMed">
                                {blog.title}
                            </h1>

                            <p className="w-96 text-lg text-gray-600 my-5 font-poppins">
                                {blog.about}
                            </p>
                        </div>
                        <div className="w-1/2">
                            <div className="overflow-hidden h-[500px] w-full relative">
                                <img
                                    src={blog.multiImage[0]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ x: "-100vw" }}
                        whileInView={{ x: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.2, 1, 0.2, 1],
                        }}
                        className="px-20 flex items-center justify-center"
                        id="locations"
                    >
                        <h1 className="flex items-center gap-5 text-center">
                            <i className="fa-solid fa-map-location-dot text-5xl"></i>
                            <span className="font-lato italic text-xl ">
                                {blog.locations}
                            </span>
                        </h1>
                    </motion.div>

                    <div
                        className="my-40 px-20 flex items-center justify-center"
                        id="stories"
                    >
                        <div className="w-1/2">
                            <div className="overflow-hidden h-[500px] w-full relative">
                                <img
                                    src={blog.multiImage[1]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col items-end">
                            <h1 className="text-4xl font-lemonMed">Stories</h1>
                            <p className="w-96 text-lg text-right text-gray-600 my-5 font-poppins">
                                {blog.stories}
                            </p>
                        </div>
                    </div>

                    <div
                        className="flex items-center justify-center flex-col px-20"
                        id="hotspots"
                    >
                        <p className="text-4xl">
                            <span className="font-lemonMed text-4xl">
                                Hotspots&nbsp;
                            </span>
                            <i className="fa-solid fa-fire"></i>
                        </p>
                        <p className="text-lg font-poppins text-gray-500 mt-20 mb-40 w-[800px] text-center">
                            {blog.hotspots}
                        </p>
                    </div>

                    <div
                        className="px-20 mb-40 flex flex-col items-start"
                        id="route"
                    >
                        <p className="font-lemonMed text-4xl">
                            How to reach?&nbsp;
                            <i className="fa-solid fa-plane-arrival"></i>
                        </p>
                        <p className="font-poppins text-lg text-gray-500 my-10">
                            {blog.route}
                        </p>
                    </div>

                    <div
                        className="flex items-center justify-center gap-10 mb-40"
                        id="saveCreateLike"
                    >
                        <button className="flex flex-col items-center gap-5 active:scale-95 duration-150">
                            <i className="fa-regular fa-thumbs-up text-6xl"></i>
                            <span className="font-poppins font-bold text-3xl">
                                Like this?
                            </span>
                        </button>
                        <button className="flex flex-col items-center gap-5 active:scale-95 duration-150">
                            <i className="fa-regular fa-bookmark text-6xl"></i>
                            <span className="font-poppins font-bold text-3xl">
                                Save this!
                            </span>
                        </button>
                        <button className="flex flex-col items-center gap-5 active:scale-95 duration-150">
                            <i className="fa-solid fa-pencil text-6xl"></i>
                            <span className="font-poppins font-bold text-3xl">
                                Write one?
                            </span>
                        </button>
                    </div>

                    <div className="relative" id="end">
                        <div className="overflow-hidden h-96">
                            <img
                                src={blog.multiImage[2]}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center px-20 text-center">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{
                                    duration: 1,
                                }}
                                className="font-lemonBld text-5xl text-white"
                            >
                                So what's stopping you now?
                            </motion.h1>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}
