// Repository pour la gestion des livres dans la base de données
import { Repository, EntityRepository } from 'typeorm';
import { Book } from './entities/book.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  // Recherche tous les livres dans la base de données
  async find(): Promise<Book[]> {
    return this.find();
  }

  // Création d'un livre avec les données partagées via DTO
  async createBook(createBookDto: Partial<Book>): Promise<Book> {
    const book = this.create(createBookDto);  // Crée une instance du livre
    return this.save(book);  // Sauvegarde dans la base de données
  }

  // Mise à jour d'un livre existant selon son ID
  async updateBook(id: number, updateBookDto: Partial<Book>): Promise<Book> {
    await this.update(id, updateBookDto);  // Met à jour les données du livre
    return this.findOne({ where: { id } });  // Récupère le livre mis à jour
  }

  // Suppression d'un livre par son ID
  async deleteBook(id: number): Promise<void> {
    await this.delete(id);  // Supprime le livre de la base de données
  }
}
