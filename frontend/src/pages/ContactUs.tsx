import { motion } from "framer-motion";
function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 1, 0.2, 1] }}
            className="container mx-auto py-8"
        >
            <div className="card max-w-3xl mx-auto p-8 bg-white rounded-lg">
                <h1 className="text-3xl font-bold mb-4 font-lemonMed">
                    Contact Us
                </h1>
                <p className="text-lg mb-4 font-poppins">
                    Have questions or feedback? We'd love to hear from you!
                </p>
                <form className="space-y-4 font-poppins">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="name" className="text-lg">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-lg">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="message" className="text-lg">
                            Message
                        </label>
                        <textarea
                            id="message"
                            className="textarea textarea-bordered"
                            rows={5}
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline">
                        Send Message
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default Contact;
