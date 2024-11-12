import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Pour appeler l'API

const AuthorDetailsPage = ({ match }) => {
  const [author, setAuthor] = useState(null); // Contient les données de l'auteur
  const [books, setBooks] = useState([]); // Contient la liste des livres
  const authorId = match.params.id; // Récupère l'id de l'auteur depuis l'URL

  useEffect(() => {
    // Appel à l'API pour récupérer l'auteur et ses livres
    const fetchAuthorDetails = async () => {
      try {
        const authorResponse = await axios.get(`/api/authors/${authorId}`);
        setAuthor(authorResponse.data);

        const booksResponse = await axios.get(`/api/books?authorId=${authorId}`);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'auteur', error);
      }
    };

    fetchAuthorDetails();
  }, [authorId]); // Récupérer les données quand l'ID de l'auteur change

  if (!author) return <div>Chargement...</div>; // Affichage pendant le chargement

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image de l'auteur */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src={author.photoUrl}
            alt={author.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Infos de l'auteur */}
        <div className="w-full md:w-2/3 md:pl-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{author.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{author.bio}</p>
        </div>
      </div>

      {/* Liste des livres de l'auteur */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Livres de {author.name}</h2>
        <ul className="list-disc pl-6 space-y-2">
          {books.length === 0 ? (
            <li>Aucun livre trouvé.</li>
          ) : (
            books.map((book) => (
              <li key={book.id} className="text-lg text-gray-700">
                {book.title} ({book.publicationDate})
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
