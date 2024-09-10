import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const linkClass = "text-white text-xl md:p-2 p-4 border-b border-white hover:border-yellow-100 md:border-0 md:hover:border-0 md:hover:scale-105"

const Nav = () => (
  <>
    <NavLink to="/" className={linkClass}>Home</NavLink>
    <NavLink to="/about" className={linkClass}>About</NavLink>
    <NavLink to="/events" className={linkClass}>Events</NavLink>
    <NavLink to="/team" className={linkClass}>Team</NavLink>
    <NavLink to="/involve" className={`${linkClass} md:border-l`}>Get Involved</NavLink>
  </>
);

const Navlink = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex left-0 right-0 h-full justify-between md:justify-end">
        <div className="hidden w-full justify-between md:flex">
          <Nav />
        </div>
        <div className=" ease-in-out duration-500 md:hidden">
          <button onClick={toggleNavbar} className="">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center basis-full  md:hidden">
          <Nav />
        </div>
      )}
    </>
  );
};

export default Navlink;
