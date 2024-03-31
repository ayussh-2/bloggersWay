import { motion } from "framer-motion";
function Card({
    cover,
    title,
    info,
    author,
    handleChangeBlog,
    blogId,
}: {
    cover: string;
    title: string;
    info: string;
    author: string;
    handleChangeBlog: (bid: string) => void;
    blogId: string;
}) {
    function limitWords(para: string, wordCount: number) {
        let paragraph = para.trim();
        const words = paragraph.split(/\s+/);
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(" ") + " ...";
        } else {
            return para;
        }
    }
    return (
        <motion.div
            initial={{ scale: 0.85 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
            className="card group cursor-pointer w-96 bg-base-100 shadow-lg hover:shadow-2xl duration-500 active:scale-110 font-noto"
            onClick={() => handleChangeBlog(blogId)}
        >
            <figure className="overflow-hidden w-96 h-60">
                <img
                    src={cover}
                    alt="Cover-img"
                    className="group-hover:scale-110 duration-500"
                />
            </figure>
            <div className="card-body">
                <h2 className={`card-title ${title === "" ? "skeleton" : ""}`}>
                    {title}
                </h2>
                <p className="text-base mb-5 mt-2">{limitWords(info, 20)}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{author}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default Card;
