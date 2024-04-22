import { useEffect, useState } from "react";
import {Link, useSearchParams} from "react-router-dom";
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
    }, []);

    async function fetchBlog(id: any) {
        try {
            const blogObject = await findBlogById(id);
            if (isEmpty(blogObject)) {
                window.location.href = "/notfound";
            }
            setBlog(blogObject);
            // console.log("loaded");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            scrollToTop();
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
    function shortenSentence(sentence:string, maxLength:number) {

        const words = sentence.split(' ');


        if (words.length <= maxLength) {
            return sentence;
        }


        const shortenedWords = words.slice(0, maxLength);
        const shortenedSentence = shortenedWords.join(' ') + '...';

        return shortenedSentence;
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
                    className="font-poppins"
                >
                    <div className="px-10">
                        <div className="relative mb-60 md:mb-0 " id="top">
                            <motion.div
                                initial={{opacity: 0, y: "-50vh"}}
                                animate={{opacity: 1, y: 0}}
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
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{
                                    duration: 1,
                                    ease: [0.2, 1, 0.2, 1],
                                    delay: 0.5,
                                }}
                                className="absolute md:-bottom-24 text-sm md:text-base -bottom-40 flex items-center justify-center w-full lg:-bottom-12 px-5"
                            >
                                <div
                                    className="bg-black shadow-amber-300 shadow-sm  lg:h-40 h-auto gap-x-10 gap-y-5 rounded-md font-poppins lg:px-10 px-5 lg:py-5 py-8 grid lg:grid-cols-2 grid-cols-1 capitalize">
                                    <div className="flex items-center gap-5">
                                        <i className="fa-solid fa-cloud text-3xl"></i>
                                        <p>{shortenSentence(blog.weather, 3) || "Windy"}</p>
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
                    </div>

                    <div
                        className="md:my-10 bottom- lg:my-40 px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center"
                        id="aboutPlace"
                    >
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-baseline">
                            <h1 className="text-2xl lg:text-4xl font-lemonMed md:font-lemonMed text-center lg:text-left">
                                {blog.title}
                            </h1>

                            <p className="w-full lg:w-96 text-sm text-left text-gray-400  my-5 font-poppins md:text-base lg:text-lg md:text-center lg:text-left">
                                {blog.about}
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
                            <div className="overflow-hidden h-72 lg:h-[500px] w-full relative">
                                <img
                                    src={blog.multiImage[0]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-10 lg:px-20 my-20 md:my-0 flex flex-col lg:flex-row items-center justify-center"
                        id="locations"
                    >
                        <h1 className="flex items-center gap-5 text-center lg:text-left">
                            <i className="fa-solid fa-map-location-dot text-3xl lg:text-5xl"></i>
                            <span className="font-lato italic text-base lg:text-xl">
                                {blog.locations}
                            </span>
                        </h1>
                    </div>

                    <div
                        className="my-10 lg:my-40 px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-center"
                        id="stories"
                    >
                        <div className="w-full lg:w-1/2">
                            <div className="overflow-hidden h-72 lg:h-[500px] w-full relative">
                                <img
                                    src={blog.multiImage[1]}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 mt-5 lg:mt-0 flex flex-col items-center lg:items-end">
                            <h1 className="text-2xl lg:text-4xl font-lemonMed text-center lg:text-right mb-5">
                                Stories
                            </h1>
                            <p className="w-full lg:w-96 text-right text-sm md:text-base lg:text-lg text-gray-400  md:text-center lg:text-right">
                                {blog.stories}
                            </p>
                        </div>
                    </div>

                    <div
                        className="my-10 lg:my-40 px-10 lg:px-20 flex flex-col items-center justify-center"
                        id="hotspots"
                    >
                        <p className="text-2xl lg:text-4xl flex items-center text-left">
                            <span className="font-lemonMed text-2xl lg:text-4xl">
                                Hotspots&nbsp;
                            </span>
                            <i className="fa-solid fa-fire text-2xl lg:text-4xl"></i>
                        </p>
                        <p className="text-sm left md:text-base lg:text-lg text-gray-400 mt-5 lg:mt-10 mb-10 lg:mb-20 lg:w-3/4 md:text-center">
                            {blog.hotspots}
                        </p>
                    </div>

                    <div
                        className="px-14 md:px-20 md:mb-40 flex flex-col items-start"
                        id="route"
                    >
                        <p className="text-2xl lg:text-4xl font-lemonMed text-center lg:text-right mb-5">
                            How to reach?&nbsp;
                            <i className="fa-solid fa-plane-arrival"></i>
                        </p>
                        <p className="font-poppins  text-sm md:text-base lg:text-lg text-gray-400 mb-10">
                            {blog.route}
                        </p>
                    </div>

                    <div
                        className="mb-10 md:my-10 lg:my-40 px-10 lg:px-20 flex flex-row  items-center justify-center gap-5"
                        id="saveCreateLike"
                    >
                        <button className="flex flex-col items-center gap-2 lg:gap-5 active:scale-95 duration-150">
                            <i className="fa-regular fa-thumbs-up text-4xl lg:text-6xl"></i>
                            <span className="font-poppins font-bold text-base lg:text-3xl">
                                Like this?
                            </span>
                        </button>
                        <button className="flex flex-col items-center gap-2 lg:gap-5 active:scale-95 duration-150">
                            <i className="fa-regular fa-bookmark text-4xl lg:text-6xl"></i>
                            <span className="font-poppins font-bold text-base lg:text-3xl">
                                Save this!
                            </span>
                        </button>
                        <Link to={"/create"}>
                        <button className="flex flex-col items-center gap-2 lg:gap-5 active:scale-95 duration-150">
                            <i className="fa-solid fa-pencil text-4xl lg:text-6xl"></i>
                            <span className="font-poppins font-bold text-base lg:text-3xl">
                                Write one?
                            </span>
                        </button></Link>
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
