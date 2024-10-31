// src/modules/books/presenters/book.presenter.ts
import { Book } from '../entities/book.entity';

export class BookPresenter {
  id: number;
  title: string;
  publicationDate: string;
  price: number;
  authorId: number;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.publicationDate = book.publicationDate;
    this.price = book.price;
    this.authorId = book.author?.id ?? null; // Assurez-vous d'extraire l'ID de l'auteur
  }
}
