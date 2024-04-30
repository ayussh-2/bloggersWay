import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function HorizontalCard({
    title = "title",
    author = "John Doe",
    bid = "1",
    delete: deleteBlog = false,
    img = "https://images.pexels.com/photos/20782484/pexels-photo-20782484/free-photo-of-silhouettes-of-electricity-poles-during-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    deleteBlogFn,
}: {
    title: string;
    author: string;
    bid: string;
    img: string;
    delete: boolean;
    deleteBlogFn: (bid: string) => void;
}) {
    console.log(bid);

    const navigate = useNavigate();
    function navigateToBlog() {
        navigate("/travel?bid=" + bid);
    }
    function deleteThisBlog() {
        // const confirmBool =  confirm("Are you sure you want to delete this blog?")
        deleteBlogFn(bid);
    }
    function modal(title: string) {
        Swal.fire({
            title: "Do you want to delete this blog: " + title,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteThisBlog();
            }
        });
    }
    return (
        <div className="card md:w-96 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={img} alt="image cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">{title}</h2>
                <p className="font-poppins capitalize">{author}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary font-poppins"
                        onClick={navigateToBlog}
                    >
                        Visit!
                    </button>
                    {deleteBlog && (
                        <>
                            <button
                                className="btn btn-error"
                                onClick={() => modal(title)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
