import { useEffect, useState } from "react";
import Card from "../components/Card";
type Props = {
    handleGetBlogs: (details: { page: number; blogPerPage: number }) => void;
};
export default function Home({ handleGetBlogs }: Props) {
    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState({
        blogPerPage: 3,
        page: 1,
    });
    useEffect(() => {
        async function getData() {
            const data = await handleGetBlogs(pagination);
            setBlogs(data);
        }
        getData();
    }, []);
    return (
        <div className="grid grid-cols-3 px-20 py-20 gap-5">
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
                        />
                    )
                )}
        </div>
    );
}
