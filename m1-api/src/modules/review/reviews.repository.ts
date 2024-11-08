// src/modules/review/reviews.repository.ts

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model'; // Import des modèles

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
  ) {}

  create(createReviewModel: CreateReviewModel): Promise<Review> {
    const review = this.repository.create(createReviewModel);
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
