// src/modules/review/reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { UpdateReviewDto } from './dtos/Update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
    constructor(private readonly reviewsRepository: ReviewsRepository) {}

    create(createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsRepository.create(createReviewDto);
    }

    findAll(): Promise<Review[]> {
        return this.reviewsRepository.findAllReviews(); // Utilisez la méthode définie
    }

    async findOne(id: number): Promise<Review> {
        const review = await this.reviewsRepository.findOneReview(id);
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        return this.reviewsRepository.updateReview(id, updateReviewDto);
    }

    async delete(id: number): Promise<void> {
        const review = await this.findOne(id);
        if (review) {
            await this.reviewsRepository.deleteReview(id);
        }
    }
}
