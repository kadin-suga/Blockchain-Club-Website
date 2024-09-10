import React from "react";
import NavLinks from "./NavLinks";
import { Link,NavLink } from "react-router-dom";
import bannerImage from "../../assets/banner_luc.png";  // Import the image correctly
import clubLogo from "../../assets/LUC Club Picture.png";  // Import the image correctly
function Header() {
  return (
    <>
      <NavLink to="/" >
      <div className="hidden md:block h-[280px] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={bannerImage}
            alt="LUC Club Banner"
          />
        </div>
    </NavLink>
    <header className="bg-[rgb(114,57,73)] top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-4">
      <NavLink to="/" className="cursor-pointer">
        <img src={clubLogo} className="flex-shrink-0 md:mt-6"/>
      </NavLink>
      <div className="ml-auto ">
        <NavLinks />
      </div>
    </header>
    </>
  );
}

export default Header;
