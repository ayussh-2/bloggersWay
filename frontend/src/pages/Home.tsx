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
            // console.log(count);
            if (count !== null) {
                const pages = Math.ceil(count / pagination.blogPerPage);
                setNoOfPages(pages);
                // console.log(pages);
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
                // console.log(selectedPage);
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
            initial={{opacity: 0, y: "100vh"}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, ease: [0.2, 1, 0.2, 1]}}
            className=""
        >
            <div className="mt-0 md:mt-10 relative">
                <div className="overflow-hidden md:h-[40rem] h-screen md:w-auto md:px-20">

                    <img
                        src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        className="object-cover w-full h-full md:rounded-lg"
                        alt=""
                    />
                </div>
                <div
                    className="absolute bg-black bg-opacity-60 px-10 z-10 top-0 bottom-0 flex items-center justify-center w-full text-white md:px-5">
                    <div className="flex flex-col items-center md:items-start">
                        <motion.div
                            initial={{opacity: 0, x: "-100vw"}}
                            animate={{opacity: 1, x: 0}}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: [0.2, 1, 0.2, 1],
                            }}
                        >
                            <h1 className="capitalize text-[#dca54c] text-center md:text-left font-lemonBld text-3xl md:text-5xl">
                                Start Travelling!
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, x: "-20vw"}}
                            animate={{opacity: 1, x: 0}}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: [0.2, 1, 0.2, 1],
                            }}
                            className="flex flex-col md:flex-row md:items-start items-center justify-between gap-5 mt-5 "
                        >
                            <p className="font-poppins text-center text-sm md:text-base md:max-w-md">
                                Planning your next journey? Get to the right destination by
                                reading blogs of fellow travellers!
                            </p>
                            <button
                                className="btn"
                                onClick={() => scrollToSection("explore")}
                            >
                                Explore!
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="md:p-20 my-10" id="explore">
                <h1 className="text-3xl font-lemonBld mb-10 px-5">Explore!</h1>
                <div className="grid px-5 place-content-between md:grid-cols-3 grid-cols-1  md:gap-5 gap-2 gap-y-10">
                    {blogs.length !== 0 ? (
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
                        )
                    ) : (
                        <div className="flex flex-col gap-4 w-30 md:w-80">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    )}
                </div>
                <div className="join flex items-center justify-center mt-20">
                    {renderPageButtons()}
                </div>
            </div>

            <div className="md:p-20 my-20" id="newFeatures">
                <h1 className="text-3xl font-lemonBld mb-10 px-5 text-center ">Stay Tuned Something is cooking!</h1>
                <figure className="text-center">
                    <i className="fa-solid fa-mug-hot text-9xl move"></i>
                </figure>
            </div>
        </motion.div>
    );
}
