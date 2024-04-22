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
        <div
            className="card hover:bg-[#c28642] hover:text-black hover:shadow-2xl shadow-amber-300 group cursor-pointer bg-base-100 shadow-sm duration-500 active:scale-90 font-noto"
            onClick={() => handleChangeBlog(blogId)}
        >
            <figure className="overflow-hidden">
                <img
                    src={cover}
                    alt="Cover-img"
                    loading="lazy"
                    className="w-full md:h-60 h-40 object-cover group-hover:scale-110 duration-500"
                />
            </figure>
            <div className="p-5 md:p-10  md:gap-y-5 gap-y-2 flex flex-col">
                <h2
                    className={`text-xl font-lato font-bold md:text-2xl ${
                        title === "" ? "skeleton" : ""
                    }`}
                >
                    {title}
                </h2>
                <p className="md:text-base text-gray-300 text-sm mb-5 mt-2">
                    {limitWords(info, 20)}
                </p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline text-gray-500 bg-[#dca54c] font-poppins text-sm font-medium"><span className="text-black">{author}</span></div>
                </div>
            </div>
        </div>
    );
}

export default Card;
