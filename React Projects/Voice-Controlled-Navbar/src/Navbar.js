import { NavLink } from "react-router-dom";

export default function Navbar() {
    let activeClassName = "text-black";

    return (
        <nav className="flex justify-between px-12 py-6 bg-blue-500 font-bold text-white">
            <div>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                    }
                >
                    Home
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="about"
                    className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                    }
                >
                    About
                </NavLink>
            </div>
            <div>
                <NavLink to="contact">
                    {({ isActive }) => (
                        <span
                            className={isActive ? activeClassName : undefined}
                        >
                            Contact
                        </span>
                    )}
                </NavLink>
            </div>
            <div>
                <NavLink to="experience">
                    {({ isActive }) => (
                        <span
                            className={isActive ? activeClassName : undefined}
                        >
                            Experience
                        </span>
                    )}
                </NavLink>
            </div>
        </nav>
    );
}
