// src/app/pages/AuthorsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import AuthorCard from "../components/AuthorCard"; // Import du composant
import { Link } from "react-router-dom"; // Import de Link pour créer des liens

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", photo: "", biography: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fonction pour récupérer la liste des auteurs
  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/authors");
      const uniqueAuthors = response.data.reduce((acc, current) => {
        const isDuplicate = acc.find(item => item.id === current.id);
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);
      setAuthors(uniqueAuthors);
    } catch (error) {
      console.error("Erreur lors de la récupération des auteurs:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Fonction pour ajouter un nouvel auteur
  const addAuthor = async () => {
    try {
      await axios.post("http://127.0.0.1:3001/authors", newAuthor);
      fetchAuthors();
      setNewAuthor({ name: "", photo: "", biography: "" });
      setIsModalOpen(false); // Fermer la modal après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'auteur:", error);
    }
  };

  // Fonction pour gérer les changements dans le formulaire d'ajout
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction pour gérer la recherche d'auteur
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrer les auteurs en fonction de la recherche
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />
      
      {/* Titre et bouton d'ajout */}
      <div className="flex justify-between items-center px-4 mt-6">
        <h1 className="text-2xl font-bold text-center w-full">Liste des auteurs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 shadow"
        >
          + Ajouter un auteur
        </button>
      </div>

      {/* Barre de recherche sous le titre */}
      <div className="flex justify-center mt-6 px-4">
        <input
          type="text"
          placeholder="Rechercher un auteur..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/3 p-2 border border-gray-300 rounded-lg shadow-md"
        />
      </div>

      {/* Modal pour le formulaire d'ajout d'auteur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Ajouter un nouvel auteur</h2>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={newAuthor.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="photo"
              placeholder="URL de la photo"
              value={newAuthor.photo}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              name="biography"
              placeholder="Biographie"
              value={newAuthor.biography}
              onChange={handleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <button
              onClick={addAuthor}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Liste des auteurs */}
      <div className="grid grid-cols-5 gap-6 p-4">
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author) => (
            <Link to={`/authors/${author.id}`} key={author.id}>
              <AuthorCard author={author} />
            </Link>
          ))
        ) : (
          <p className="col-span-5 text-center text-gray-500">Aucun auteur trouvé</p>
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;
