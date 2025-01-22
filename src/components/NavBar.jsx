import { Link } from "react-router-dom";
import { useState } from "react";

const NavLinks = () => {
    return (
        <>
            <Link className="hover:text-blue-600" to="/home">Home</Link>
            <Link className="hover:text-blue-600" to="/grid">Grid</Link>
            <a
                className="hover:text-blue-600"
                href="https://www.linkedin.com/in/ajitesh-singh-790095276/"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>
        </>
    );
};

const NavBar = ({children}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <nav className="w-full top-0 left-0 shadow-lg bg-white">
                <div className="p-5 flex justify-end">
                    <div className="hidden md:flex gap-x-16">
                        <NavLinks/>
                    </div>

                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>)
                        }
                    </button>
                </div>

                <div className={`
                    md:hidden
                    flex flex-col items-center gap-y-4
                    transition-all duration-500 ease-in-out
                    overflow-hidden
                    ${isMenuOpen ? 'max-h-64 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}
                `}>
                    <NavLinks/>
                </div>
            </nav>
        {children}
    </>
    );
};

export default NavBar;