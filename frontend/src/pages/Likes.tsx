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
        <div className="p-20">
            {loading ? (
                <div className="flex h-screen font-poppins items-center justify-center w-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {" "}
                    {blogs.length > 0 ? (
                        <div className="gap-10 grid place-content-center grid-cols-3">
                            {blogs.map(
                                (blog: {
                                    title: string;
                                    cover: string;
                                    author: string;
                                    _id: string;
                                }) => (
                                    <div>
                                        <motion.div
                                            key={blog._id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <HorizontalCard
                                                title={blog.title}
                                                img={blog.cover}
                                                author={blog.author}
                                                bid={blog._id}
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
