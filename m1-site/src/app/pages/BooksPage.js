// src/app/pages/BooksPage.js
import React from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

const BooksPage = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <h1 className="text-2xl font-bold text-center mt-4">Liste des livres</h1>
    </div>
  );
};

export default BooksPage;
