import { useEffect, useState } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
type Props = {
    handleGetBlogs: (details: { page: number; blogPerPage: number }) => any;
    totalBlogs: () => any;
    handleChangeBlog: (blogId: string) => void;
};
export default function Home({
    handleGetBlogs,
    totalBlogs,
    handleChangeBlog,
}: Props) {
    const [blogs, setBlogs] = useState<any[]>([]);

    const [noOfPages, setNoOfPages] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);

    const [pagination, setPagination] = useState({
        blogPerPage: 6,
        page: selectedPage,
    });
    useEffect(() => {
        async function getData() {
            const details = await handleGetBlogs(pagination);
            setBlogs(details);
            const countRes = await totalBlogs();
            const count = countRes.data.count;
            console.log(count);
            if (count !== null) {
                const pages = Math.ceil(count / pagination.blogPerPage);
                setNoOfPages(pages);
                console.log(pages);
                setSelectedPage(1);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        async function fetch() {
            try {
                const details = await handleGetBlogs(pagination);
                setBlogs(details);
                console.log(selectedPage);
            } catch (err) {
                console.log(err);
                toast.error("Some error occured!");
            }
        }
        fetch();
    }, [selectedPage]);
    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= noOfPages; i++) {
            buttons.push(
                <button
                    className={`join-item btn ${
                        i === selectedPage && "btn-active"
                    }`}
                    key={i}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };
    function handlePageChange(n: number) {
        setSelectedPage(n);
        setPagination({ ...pagination, page: n });
    }
    function scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.warn(`Section with id '${sectionId}' not found.`);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
        >
            <div className="mt-10 relative">
                <div className="overflow-hidden h-[40rem] w-auto px-20">
                    <img
                        src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        className=""
                        alt=""
                    />
                </div>
                <div className="absolute z-10 top-0 bottom-0 flex items-center justify-center w-full text-white">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: "100vh" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.2, 1, 0.2, 1],
                            }}
                        >
                            <h1 className="capitalize font-lemonBld text-5xl">
                                Start Travelling!
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: "-20vh" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: [0.2, 1, 0.2, 1],
                            }}
                            className="flex items-center justify-between"
                        >
                            {" "}
                            <p className="font-poppins text-lg mt-5 w-96">
                                Planning your next journey? Get to the right
                                destination by blogs of fellow travellers!
                            </p>
                            <button
                                className="bg-[#9f7a60] outline-none text-white px-3 py-3 rounded-md font-poppins active:scale-95 duration-300 hover:bg-[#c28642]"
                                onClick={() => scrollToSection("explore")}
                            >
                                Explore!
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="p-20" id="explore">
                <h1 className="text-3xl font-lemonBld mb-10">Explore!</h1>
                <div className="grid grid-cols-3 gap-5 gap-y-10">
                    {blogs &&
                        blogs.map(
                            (blog: {
                                cover: string;
                                title: string;
                                stories: string;
                                author: string;
                                _id: string;
                            }) => (
                                <Card
                                    cover={blog.cover}
                                    title={blog.title}
                                    info={blog.stories}
                                    author={blog.author}
                                    key={blog._id}
                                    blogId={blog._id}
                                    handleChangeBlog={handleChangeBlog}
                                />
                            )
                        )}
                </div>
                <div className="join flex items-center justify-center mt-20">
                    {renderPageButtons()}
                </div>
            </div>
        </motion.div>
    );
}
