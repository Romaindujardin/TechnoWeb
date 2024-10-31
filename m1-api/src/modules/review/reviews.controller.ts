// src/modules/review/reviews.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { UpdateReviewDto } from './dtos/Update-review.dto';
import { ReviewPresenter } from './presenters/review.presenter'; // Import du presenter

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewPresenter> {
    const review = await this.reviewsService.create(createReviewDto);
    return new ReviewPresenter(review); // Retourne le presenter
  }

  @Get()
  async findAll(): Promise<ReviewPresenter[]> {
    const reviews = await this.reviewsService.findAll();
    return reviews.map((review) => new ReviewPresenter(review)); // Transformation de chaque review avec le presenter
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReviewPresenter> {
    const review = await this.reviewsService.findOne(id);
    return new ReviewPresenter(review); // Transformation en presenter
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewPresenter> {
    const review = await this.reviewsService.update(id, updateReviewDto);
    return new ReviewPresenter(review); // Transformation en presenter
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.reviewsService.delete(id);
  }
}
