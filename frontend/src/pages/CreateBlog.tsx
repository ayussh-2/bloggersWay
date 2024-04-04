import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreateBlog({
    handleCreateBlog,
    handleUploadImage,
}: {
    handleCreateBlog: Function;
    handleUploadImage: Function;
}) {
    const [blog, setBlog] = useState({
        uid: "",
        author: "",
        title: "",
        cityAndCountry: "",
        weather: "",
        avgTemp: "",
        locations: "",
        hotspots: "",
        route: "",
        about: "",
        stories: "",
        cover: "",
        multiImage: Array,
    });
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.uid) {
            setBlog({ ...blog, uid: user.uid, author: user.name });
        } else {
            // toast.info("Login first");
            navigate("/login");
        }
    }, []);

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [multiImage, setMultiImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    async function uploadImages(images: any[]) {
        console.log(images);

        if (images.length !== 3) {
            toast.error("Exactly three images are required.");
            return;
        }

        const uploadedImages = await Promise.all(
            images.map(async (img: any) => {
                // return await handleUploadImage(img, "multiImage");
                console.log(img);
            })
        );
        return uploadedImages;
    }
    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        scrollToTop();
        try {
            if (
                blog.title === "" ||
                blog.locations === "" ||
                blog.hotspots === "" ||
                blog.route === "" ||
                blog.about === "" ||
                blog.stories === "" ||
                blog.weather === "" ||
                blog.avgTemp === "" ||
                blog.cityAndCountry === ""
            ) {
                toast.info("Please fill all the fields");
                return;
            }

            const multiImgUrls = await uploadImages(
                multiImage !== null ? [multiImage] : []
            );
            console.log(multiImgUrls);

            let coverImgUrl = "";
            if (multiImgUrls && multiImgUrls.length !== 0) {
                coverImgUrl = await handleUploadImage(coverImage, "cover");
            } else {
                coverImgUrl = "";
            }

            if (coverImgUrl !== "") {
                handleCreateBlog({
                    ...blog,
                    cover: coverImgUrl,
                    multiImage: multiImgUrls,
                });
                setBlog({
                    ...blog,
                    title: "",
                    cityAndCountry: "",
                    locations: "",
                    hotspots: "",
                    weather: "",
                    avgTemp: "",
                    route: "",
                    about: "",
                    stories: "",
                    cover: "",
                    multiImage: Array,
                });
                toast.success("Blog Uploaded!");
            }
        } catch (error) {
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
                    <ScaleLoader color="#000" />
                </motion.div>
            )}
            <motion.div
                initial={{ opacity: 0, y: "100vh" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
                className="container relative mx-auto p-20 font-poppins"
            >
                <h1 className="text-2xl font-bold mb-5">Create New Blog</h1>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="A trip to Hawaii"
                                className="input-med "
                                value={blog.title}
                                onChange={(e) =>
                                    setBlog({ ...blog, title: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                City,Country
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Hawaii,USA"
                                className="input-med "
                                value={blog.cityAndCountry}
                                onChange={(e) =>
                                    setBlog({
                                        ...blog,
                                        cityAndCountry: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Weather
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Scorching Summers"
                                className="input-med "
                                value={blog.weather}
                                onChange={(e) =>
                                    setBlog({
                                        ...blog,
                                        weather: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Average Temperature in &deg;
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="37"
                                className="input-med "
                                value={blog.avgTemp}
                                onChange={(e) =>
                                    setBlog({
                                        ...blog,
                                        avgTemp: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="locations"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Locations
                            </label>
                            <input
                                type="text"
                                id="locations"
                                placeholder="Some intresting locations"
                                className="input-med"
                                value={blog.locations}
                                onChange={(e) =>
                                    setBlog({
                                        ...blog,
                                        locations: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className="">
                            <label
                                htmlFor="hotspots"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Hotspots
                            </label>
                            <textarea
                                id="hotspots"
                                placeholder="What are the things to do?"
                                className="txtArea"
                                rows={5}
                                value={blog.hotspots}
                                onChange={(e) =>
                                    setBlog({
                                        ...blog,
                                        hotspots: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="route"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Route
                            </label>
                            <textarea
                                id="route"
                                placeholder="How do we reach there?"
                                className="txtArea"
                                rows={5}
                                value={blog.route}
                                onChange={(e) =>
                                    setBlog({ ...blog, route: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                        >
                            About
                        </label>
                        <textarea
                            id="about"
                            placeholder="Tell us something about the place"
                            className="txtArea"
                            rows={8}
                            value={blog.about}
                            onChange={(e) =>
                                setBlog({ ...blog, about: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="stories"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Stories
                        </label>
                        <textarea
                            id="stories"
                            placeholder="Some intresting stories"
                            className="txtArea"
                            rows={8}
                            value={blog.stories}
                            onChange={(e) =>
                                setBlog({ ...blog, stories: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between flex-col md:flex-row gap-5 my-10">
                        <div className="flex flex-col">
                            <label
                                htmlFor="cover"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Cover Image
                            </label>
                            <input
                                type="file"
                                id="cover"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        setCoverImage(files[0]);
                                    }
                                }}
                                accept="image/*"
                                max={1}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="multiImage"
                                className="block text-sm font-medium text-gray-700"
                            >
                                More images upto 3 images
                            </label>
                            <input
                                type="file"
                                id="multiImage"
                                className="file-input file-input-bordered w-full max-w-xs"
                                accept="image/*"
                                multiple
                                max={4}
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        setMultiImage(files[0]);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </motion.div>
        </>
    );
}
