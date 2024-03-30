function Card({
    cover,
    title,
    info,
    author,
}: {
    cover: string;
    title: string;
    info: string;
    author: string;
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
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="overflow-hidden w-96 h-60">
                <img src={cover} alt="Cover-img" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{limitWords(info, 20)}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{author}</div>
                </div>
            </div>
        </div>
    );
}

export default Card;
