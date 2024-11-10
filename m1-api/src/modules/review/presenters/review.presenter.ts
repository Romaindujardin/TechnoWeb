// src/modules/review/presenters/review.presenter.ts
import { Review } from '../entities/review.entity';
import { Book } from '../../books/entities/book.entity';

export class ReviewPresenter {
  id: number;
  comment: string;
  stars: number;
  book: Partial<Book>; // Inclure un objet complet de type Book en utilisant `Partial` pour une flexibilité

  constructor(review: Review) {
    this.id = review.id;
    this.comment = review.comment;
    this.stars = review.stars;
    this.book = review.book
      ? {
          id: review.book.id,
          title: review.book.title,
          publicationDate: review.book.publicationDate,
          price: review.book.price,
          // Ajoute d'autres propriétés de Book si nécessaire
        }
      : null;
  }
}
