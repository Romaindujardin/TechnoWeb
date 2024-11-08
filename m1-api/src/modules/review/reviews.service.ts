// src/modules/review/reviews.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model'; // Import des modèles
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  create(createReviewModel: CreateReviewModel): Promise<Review> {
    return this.reviewsRepository.create(createReviewModel);
  }

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.findAllReviews();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOneReview(id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  update(id: number, updateReviewModel: UpdateReviewModel): Promise<Review> {
    return this.reviewsRepository.updateReview(id, updateReviewModel);
  }

  async delete(id: number): Promise<void> {
    const review = await this.findOne(id);
    if (review) {
      await this.reviewsRepository.deleteReview(id);
    }
  }
}
