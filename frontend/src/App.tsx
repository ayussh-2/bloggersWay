import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Fallback from "./pages/Fallback";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";

export default function App() {
    const location = useLocation();

    return (
        <>
            <Suspense fallback={<Fallback />}>
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}
