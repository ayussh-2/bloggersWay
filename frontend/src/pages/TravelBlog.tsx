import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function TravelBlog() {
    const [params] = useSearchParams();
    useEffect(() => {
        const bid = params.get("bid");
        console.log(bid);
    }, []);

    return (
        <div>
            <div className="relative">
                <div className="overflow-hidden h-96 w-full">
                    <img
                        src="https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="object-fill"
                    />
                </div>
                <div className="absolute -bottom-24 flex items-center justify-center w-full">
                    <div className="bg-white h-40 gap-x-10 gap-y-5 rounded-md font-poppins px-10 py-5 grid grid-cols-2 drop-shadow-xl">
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-cloud text-3xl"></i>
                            <p>Windy</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-temperature-half text-3xl"></i>
                            <p>25&deg;</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-earth-asia text-3xl"></i>
                            <p>Kolkata, India</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <i className="fa-solid fa-briefcase text-3xl"></i>
                            <p>Cheap Hotels</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-32 px-20 flex items-center justify-center">
                <div className="w-2/3 flex flex-col">
                    <h1 className=" text-3xl">Awesome Title</h1>
                    <p className="w-96 text-lg my-5">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Enim neque sed, magni porro rerum labore pariatur
                        vitae sunt. Impedit quis molestiae placeat, quam ad at
                        ipsam iure exercitationem aliquam perspiciatis!
                    </p>
                    <button className="btn w-32 btn-info">CheckOut</button>
                </div>
                <div className="w-1/3">
                    <div className="overflow-hidden h-[500px]  w-full relative">
                        <img
                            src="https://images.pexels.com/photos/19946465/pexels-photo-19946465/free-photo-of-character-standing-in-the-meadow-of-fields-lostintespace-by-amaan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
