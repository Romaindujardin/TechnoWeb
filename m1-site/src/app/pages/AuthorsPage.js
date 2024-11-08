// src/app/pages/AuthorsPage.js
import React from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

const AuthorsPage = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <h1 className="text-2xl font-bold text-center mt-4">Liste des auteurs</h1>
    </div>
  );
};

export default AuthorsPage;
