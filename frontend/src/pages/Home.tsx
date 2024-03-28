import { useEffect, useState } from "react";
export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(function () {
        const uid = localStorage.getItem("id");
        if (uid !== "") {
            setLoggedIn(true);
            console.log(uid);
        }
    }, []);
    return <div>home</div>;
}
