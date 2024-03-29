export default function CreateBlog() {
    return (
        <div className="container mx-auto mt-10 p-5 font-poppins">
            <h1 className="text-2xl font-bold mb-5">Create New Blog</h1>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="A trip to Hawaii"
                            className="input-med"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="locations"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Locations
                        </label>
                        <input
                            type="text"
                            id="locations"
                            placeholder="Some intresting locations"
                            className="input-med"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="hotspots"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Hotspots
                        </label>
                        <textarea
                            id="hotspots"
                            placeholder="What are the things to do?"
                            className="txtArea"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="route"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Route
                        </label>
                        <textarea
                            id="route"
                            placeholder="How do we reach there?"
                            className="txtArea"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                    >
                        About
                    </label>
                    <textarea
                        id="about"
                        placeholder="Tell us something about the place"
                        className="txtArea"
                    />
                </div>
                <div>
                    <label
                        htmlFor="stories"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Stories
                    </label>
                    <textarea
                        id="stories"
                        placeholder="Some intresting stories"
                        className="txtArea"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <label
                            htmlFor="cover"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Cover Image
                        </label>
                        <input
                            type="file"
                            id="cover"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="multiImage"
                            className="block text-sm font-medium text-gray-700"
                        >
                            More images upto 4 images
                        </label>
                        <input
                            type="file"
                            id="multiImage"
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
