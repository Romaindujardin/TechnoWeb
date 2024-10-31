// src/modules/review/reviews.repository.ts
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { UpdateReviewDto } from './dtos/Update-review.dto';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.repository.create(createReviewDto);
    return this.repository.save(review);
  }

  findAllReviews(): Promise<Review[]> {
    return this.repository.find({ relations: ['book'] }); // Utilisation correcte ici
  }

  findOneReview(id: number): Promise<Review> {
    return this.repository.findOne({ where: { id }, relations: ['book'] });
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    await this.repository.update(id, updateReviewDto);
    return this.findOneReview(id);
  }

  deleteReview(id: number): Promise<void> {
    return this.repository.delete(id).then(() => undefined);
  }
}
