import HorizontalCard from "../components/HorizontalCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Profile({ fetchBlogsByUser, deleteBlog }: any) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getBlogs();
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, []);

    async function deleteTheBlog(bid: string) {
        try {
            await deleteBlog(bid);
            // setBlogs(blogs.filter((blog: any) => blog._id !== bid));
            getBlogs();
        } catch (error) {
            console.log(error);
        }
    }

    function getBlogs() {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setname(user.name);
        setLoading(true);
        fetchBlogsByUser(user.uid)
            .then((res: any) => {
                setBlogs(res);
                setLoading(false);
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });
    }
    return (
        <div className="md:p-20 p-5">
            {loading ? (
                <div className="flex h-screen font-poppins items-center justify-center w-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {" "}
                    {blogs.length > 0 ? (
                        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 z-0 xl:grid-cols-3 place-content-center">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-[#dca54c] text-[#2a2a2a] p-5 rounded-lg space-y-6 h-full flex items-center justify-between flex-col"
                            >
                                <h1 className="capitalize font-poppins text-4xl font-bold">
                                    Hello, <span className="">{name}</span>!
                                </h1>
                                <div className="avatar">
                                    <div className="w-60 rounded-full">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfAxGV-fZxGL9elM_hQ2tp7skLeSwMyUiwo4lMm1zyA&s" />
                                    </div>
                                </div>
                                <div className="font-poppins text-lg">
                                    <p>
                                        You've been quite busy with your blogs!
                                    </p>
                                    <p>
                                        Total Blogs Written:
                                        <span className="">{blogs.length}</span>
                                    </p>
                                    <p className="mt-2">
                                        Keep up the great work! Your
                                        contributions are invaluable.
                                    </p>
                                    <div className="flex items-center justify-between  mt-4">
                                        <Link to="/create">
                                            <button className="btn">
                                                Write more!
                                            </button>
                                        </Link>
                                        <Link to={"/contact"}>
                                            <button className="btn">
                                                Need Help?
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {blogs.map(
                                (
                                    blog: {
                                        title: string;
                                        cover: string;
                                        author: string;
                                        _id: string;
                                    },
                                    index: number
                                ) => (
                                    <div key={blog._id} className="mb-4 z-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.2 + index * 0.1,
                                            }}
                                        >
                                            <HorizontalCard
                                                title={blog.title}
                                                img={blog.cover}
                                                author={blog.author}
                                                bid={blog._id}
                                                delete={true}
                                                deleteBlogFn={deleteTheBlog}
                                            />
                                        </motion.div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="flex h-screen font-poppins items-center justify-center w-full">
                            <h1 className="text-xl text-white text-center capitalize">
                                No Blogs Written Yet!
                            </h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
