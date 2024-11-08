// src/modules/review/models/review.model.ts

export class CreateReviewModel {
  stars: number;
  comment?: string;
  bookId: number;

  constructor(createReviewDto: {
    stars: number;
    comment?: string;
    bookId: number;
  }) {
    this.stars = createReviewDto.stars;
    this.comment = createReviewDto.comment;
    this.bookId = createReviewDto.bookId;
  }
}

export class UpdateReviewModel {
  stars?: number;
  comment?: string;

  constructor(updateReviewDto: { stars?: number; comment?: string }) {
    this.stars = updateReviewDto.stars;
    this.comment = updateReviewDto.comment;
  }
}
