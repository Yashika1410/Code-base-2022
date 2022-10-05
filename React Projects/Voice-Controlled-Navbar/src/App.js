import { Routes, Route, useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Experience from "./Pages/Experience";
import Navbar from "./Navbar";

function App() {
    let navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: "YOUR_ALAN_API_KEY",
            onCommand: (commandData) => {
                console.log("ROUTE : " + commandData.command);
                switch (commandData.command) {
                    case "home":
                        navigate("/");
                        break;
                    case "about":
                        navigate("/about");
                        break;
                    case "contact":
                        navigate("/contact");
                        break;
                    case "experience":
                        navigate("/experience");
                        break;
                    default:
                        console.log("UNKNOWN ROUTE");
                }
            },
        });
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/experience" element={<Experience />} />
            </Routes>
        </div>
    );
}

export default App;
