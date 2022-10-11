import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import './assets/style.css';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import About from './Components/About';
import Projects from "./Components/Projects";
const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <Home />
                    } />
                    <Route path="/about" element={
                        <About />
                    } />
                    <Route path="/projects" element={
                        <Projects />
                    } />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;