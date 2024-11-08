// src/app/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-red-500 shadow-md fixed w-full top-0 left-0 z-50">
      <ul className="flex justify-center space-x-4 py-4">
        <li>
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "bg-white text-pink-500" : "text-white"
            } px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-pink-500`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/books"
            className={`${
              location.pathname === "/books" ? "bg-white text-pink-500" : "text-white"
            } px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-pink-500`}
          >
            Liste des livres
          </Link>
        </li>
        <li>
          <Link
            to="/authors"
            className={`${
              location.pathname === "/authors" ? "bg-white text-pink-500" : "text-white"
            } px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-pink-500`}
          >
            Liste des auteurs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
