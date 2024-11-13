import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage"; // Importer la page de détails du livre
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage"; // Importer la page de détails de l'auteur

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route pour la liste des livres */}
          <Route path="/books" element={<BooksPage />} />
          
          {/* Route pour la liste des auteurs */}
          <Route path="/authors" element={<AuthorsPage />} />
          
          {/* Route pour les détails d'un livre avec un id dynamique */}
          <Route path="/books/:id" element={<BookDetailPage />} />
          
          {/* Route pour les détails d'un auteur avec un id dynamique */}
          <Route path="/author/:id" element={<AuthorDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
