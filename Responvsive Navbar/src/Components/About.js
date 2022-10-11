import React from "react";
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./Theme";
import '../assets/style.css';

const About = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function scrollToBottom() {
        const node = document.getElementById("contact-me");
        ReactDOM.findDOMNode(node).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <ThemeProvider theme={Theme}>
       <h1>About Page.</h1>
        </ThemeProvider>
    );
}
export default About;