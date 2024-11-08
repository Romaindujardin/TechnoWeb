import axios from "axios";

const API_URL = "http://127.0.0.1:3001"; // L'URL back-end NestJS

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
    throw error;
  }
};

export const getAuthors = async () => {
  try {
    const response = await axios.get(`${API_URL}/authors`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des auteurs:", error);
    throw error;
  }
};