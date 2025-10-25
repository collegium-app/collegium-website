import React from "react";
import Navbar from "./components/Navbar.jsx";
import Header from "./section/Header.jsx";
import Body from "./section/Body.jsx";
import Apply from "./section/Apply.jsx";
import Footer from "./section/Footer.jsx";

const App = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0f]">
            <Navbar />
            <Header />
            <Body />
            <Apply />
            <Footer />
        </div>
    );
};

export default App;
