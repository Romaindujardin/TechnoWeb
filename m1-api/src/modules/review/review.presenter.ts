// src/modules/review/review.presenter.ts
import { Review } from './entities/review.entity';

export class ReviewPresenter {
  id: number;
  comment: string;
  stars: number;
  bookTitle: string;

  constructor(review: Review) {
    this.id = review.id;
    this.comment = review.comment;
    this.stars = review.stars;
    this.bookTitle = review.book ? review.book.title : 'Unknown';
  }
}
