import { useNavigate } from "react-router-dom";

export default function HorizontalCard({
    title = "title",
    author = "John Doe",
    bid = "1",
    img = "https://images.pexels.com/photos/20782484/pexels-photo-20782484/free-photo-of-silhouettes-of-electricity-poles-during-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
}: {
    title: string;
    author: string;
    bid: string;
    img: string;
}) {
    const navigate = useNavigate();
    function navigateToBlog() {
        navigate("/travel?bid=" + bid);
    }
    return (
        <div className="card z-10 w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={img} alt="image cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="font-poppins">{author}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary font-poppins"
                        onClick={navigateToBlog}
                    >
                        Visit!
                    </button>
                </div>
            </div>
        </div>
    );
}
