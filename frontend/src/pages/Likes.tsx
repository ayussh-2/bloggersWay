import HorizontalCard from "../components/HorizontalCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Likes({ findUser, getBlog }: any) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getUserLikes() {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user") || "").uid;
            const userDetails = await findUser(user);
            const likesArr = userDetails.user.likes;
            const fetchedBlogs: any = await Promise.all(
                likesArr.map((id: string) => getBlog(id))
            );
            setBlogs(fetchedBlogs);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserLikes();
    }, []);
    return (
        <div className="md:p-20 p-5">
            <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-10 text-center">
                Likes <i className="fa-solid fa-heart"></i>
            </h1>
            {loading ? (
                <div className="flex h-screen font-poppins items-center justify-center w-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {" "}
                    {blogs.length > 0 ? (
                        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 place-content-center">
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
                                    <div key={blog._id} className="mb-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                            }}
                                        >
                                            <HorizontalCard
                                                title={blog.title}
                                                img={blog.cover}
                                                author={blog.author}
                                                bid={blog._id}
                                                delete={false}
                                                deleteBlogFn={() => {}}
                                            />
                                        </motion.div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="flex h-screen font-poppins items-center justify-center w-full">
                            <h1 className="text-xl text-white text-center capitalize">
                                You have not liked any post!
                            </h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
