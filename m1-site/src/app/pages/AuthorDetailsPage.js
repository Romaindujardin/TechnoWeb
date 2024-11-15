// src/app/pages/AuthorDetailsPage.js
import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]); // État pour les livres de l'auteur
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAuthor, setUpdatedAuthor] = useState({ name: "", photoUrl: "", biography: "" });

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await axios.get(`http://127.0.0.1:3001/authors/${id}`);
        setAuthor(authorResponse.data);
        setUpdatedAuthor(authorResponse.data);
        
        // Récupérer les livres de l'auteur
        const booksResponse = await axios.get(`http://127.0.0.1:3001/books?author_id=${id}`);
        setBooks(booksResponse.data); // Mettre à jour l'état des livres

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'auteur:", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:3001/authors/${id}`, updatedAuthor);
      setAuthor(updatedAuthor);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'auteur:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet auteur ?")) {
      try {
        await axios.delete(`http://127.0.0.1:3001/authors/${id}`);
        alert("Auteur supprimé avec succès.");
        navigate("/authors"); // Redirection vers la page des auteurs après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de l'auteur:", error);
      }
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Breadcrumb />
      <div className="max-w-4xl mx-auto p-6">
        {author ? (
          <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
            {!isEditing ? (
              <>
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={author.photoUrl || "https://via.placeholder.com/150"}
                    alt={author.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="pl-6 flex-grow">
                  <h1 className="text-3xl font-semibold mb-4">{author.name}</h1>
                  <p className="text-gray-700">{author.biography || "Aucune biographie disponible."}</p>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifier l'auteur
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Supprimer l'auteur
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedAuthor.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">URL de la Photo</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={updatedAuthor.photoUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Biographie</label>
                  <textarea
                    name="biography"
                    value={updatedAuthor.biography}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Annuler
                </button>
              </form>
            )}
          </div>
        ) : (
          <p>Auteur non trouvé.</p>
        )}

        {/* Liste des livres de l'auteur */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Livres de {author.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.length > 0 ? (
              books
                .filter((book) => book.authorId === author.id)
                .map((book) => (
                  <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-blue-500 text-xl hover:underline"><Link to={`/books/${book.id}`} >
                      {book.title}
                    </Link></h3>
                    
                    <p className="text-gray-600">Description : {book.description || "Pas de description."}</p>
                  </div>
                ))
               
            ) : (
              <p>Aucun livre trouvé pour cet auteur.</p>
            )}
          </div>
        </div>

        {/* Bouton de retour */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
