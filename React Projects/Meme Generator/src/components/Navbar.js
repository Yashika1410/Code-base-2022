import './Navbar.css'
import TrollFace from '../images/TrollFace.jpg';

export default function Navbar() {
    return (
        <ul>
            <img src={TrollFace} alt="memegace" className="navbar-meme"></img>
             <li><a href="#">MemeGenerator</a></li>
        </ul>
    )
}