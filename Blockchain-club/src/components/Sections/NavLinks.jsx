import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const linkClass =
  "text-white text-xl md:p-2 p-4 border-b border-white hover:border-yellow-100 md:border-0 md:hover:border-0 md:hover:scale-105";

// Function to track button click and the intended destination page
const trackPageVisit = (button, destination) => {
  const user = "User1"; // You can dynamically fetch this if needed
  const timestamp = new Date().toISOString(); // Add timestamp for debugging

  const eventData = { 
    user: user, 
    buttonClicked: button,
    page: destination,
    timestamp: timestamp 
  };

  console.log("Sending event:", eventData); // Debugging

  // Send data to the backend
  fetch("http://localhost:3000/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Activity tracked:", data))
    .catch((error) => console.error("Error tracking activity:", error));
};

const Nav = () => (
  <>
    <NavLink
      to="/"
      className={linkClass}
      onClick={() => trackPageVisit("Home", "/")}
    >
      Home
    </NavLink>
    <NavLink
      to="/about"
      className={linkClass}
      onClick={() => trackPageVisit("About", "/about")}
    >
      About
    </NavLink>
    <NavLink
      to="/events"
      className={linkClass}
      onClick={() => trackPageVisit("Event", "/events")}
    >
      Events
    </NavLink>
    <NavLink
      to="/team"
      className={linkClass}
      onClick={() => trackPageVisit("Team", "/team")}
    >
      Team
    </NavLink>
    <NavLink
      to="/involve"
      className={linkClass}
      onClick={() => trackPageVisit("Contact", "/involve")}
    >
      Contact us
    </NavLink>
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
        <div className="ease-in-out duration-500 md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col items-center basis-full md:hidden">
          <Nav />
        </div>
      )}
    </>
  );
};

export default Navlink;
