// src/modules/review/reviews.repository.ts

import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model'; // Import des modèles
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createReviewModel: CreateReviewModel): Promise<Review> {
    // 1. Vérifiez si le Book existe
    const book = await this.bookRepository.findOne({
      where: { id: createReviewModel.bookId },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // 2. Créez la Review en liant le Book trouvé
    const review = this.repository.create({
      ...createReviewModel,
      book,
    });
    return this.repository.save(review);
  }

  findAllReviews(): Promise<Review[]> {
    return this.repository.find({ relations: ['book'] });
  }

  findOneReview(id: number): Promise<Review> {
    return this.repository.findOne({ where: { id }, relations: ['book'] });
  }

  async updateReview(
    id: number,
    updateReviewModel: UpdateReviewModel,
  ): Promise<Review> {
    await this.repository.update(id, updateReviewModel);
    return this.findOneReview(id);
  }

  deleteReview(id: number): Promise<void> {
    return this.repository.delete(id).then(() => undefined);
  }
}
