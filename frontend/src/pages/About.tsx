import { motion } from "framer-motion";
function AboutUs() {
    return (
        <motion.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
            className="container mx-auto py-8 px-10 font-poppins"
        >
            <div className="max-w-3xl mx-auto p-8 bg-[#dca54c] text-[#09090b] rounded-lg">
                <h1 className="text-3xl font-bold mb-4 font-lemonBld">
                    about us
                </h1>
                <p className="mt-16 mb-4">
                    Welcome to Bloggers Way, your ultimate destination for
                    travel inspiration and advice! Established in 2024, we are
                    passionate about exploring the world and sharing our
                    experiences with fellow travelers like you.
                </p>
                <p className=" mb-4">
                    At Bloggers Way, we believe that travel is not just about
                    visiting new places, but also about immersing yourself in
                    different cultures, trying new cuisines, and creating
                    unforgettable memories. Whether you're a seasoned
                    globetrotter or planning your first trip abroad, we've got
                    you covered.
                </p>
                <p className=" mb-4">
                    Our team of experienced travel bloggers is dedicated to
                    bringing you informative articles, stunning photography, and
                    practical tips to help you plan your next adventure. From
                    off-the-beaten-path destinations to luxury getaways, we
                    strive to inspire wanderlust and empower you to make the
                    most of your travels.
                </p>
                <p className=" mb-16">
                    Join us on our journey as we explore the world one
                    destination at a time. Let Bloggers Way be your guide to
                    unlocking the wonders of travel and discovering the beauty
                    of our planet.
                </p>
                <div className="flex flex-wrap justify-center">
                    <p className="m-1 badge">Travel</p>
                    <p className="m-1 badge">Adventure</p>
                    <p className="m-1 badge">Culture</p>
                    <p className="m-1 badge">Inspiration</p>
                    <p className="m-1 badge">Tips</p>
                </div>
            </div>
        </motion.div>
    );
}

export default AboutUs;
