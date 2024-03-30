import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
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
        locations: "",
        hotspots: "",
        route: "",
        about: "",
        stories: "",
        cover: "",
        multiImage: Array,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.uid) {
            setBlog({ ...blog, uid: user.uid, author: user.name });
        } else {
            window.location.href = "/login";
        }
    }, []);

    const [coverImage, setCoverImage] = useState(null);
    const [multiImage, setMultiImage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function uploadImages(images: any) {
        const uploadedImages = await Promise.all(
            images.map(async (img: any) => {
                return await handleUploadImage(img, "multiImage");
            })
        );
        return uploadedImages;
    }
    async function handleSubmit(e: any) {
        e.preventDefault();
        if (
            blog.title === "" ||
            blog.locations === "" ||
            blog.hotspots === "" ||
            blog.route === "" ||
            blog.about === "" ||
            blog.stories === ""
        ) {
            toast.info("Please fill all the fields");
            return;
        }
        setLoading(true);
        const coverImgUrl = await handleUploadImage(coverImage, "cover");
        const multiImgUrls = await uploadImages(Array.from(multiImage || []));

        handleCreateBlog({
            ...blog,
            cover: coverImgUrl,
            multiImage: multiImgUrls,
        });
        setBlog({
            ...blog,
            title: "",
            locations: "",
            hotspots: "",
            route: "",
            about: "",
            stories: "",
            cover: "",
            multiImage: Array,
        });
        setLoading(false);
        toast.success("Blog Uploaded!");
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
                        <div>
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
                                onChange={(e) =>
                                    setCoverImage(e.target.files[0])
                                }
                                accept="image/*"
                                max={1}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="multiImage"
                                className="block text-sm font-medium text-gray-700"
                            >
                                More images upto 4 images
                            </label>
                            <input
                                type="file"
                                id="multiImage"
                                className="file-input file-input-bordered w-full max-w-xs"
                                accept="image/*"
                                multiple
                                max={4}
                                onChange={(e) => setMultiImage(e.target.files)}
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
