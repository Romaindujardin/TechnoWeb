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
import { ReviewPresenter } from './presenters/review.presenter';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewPresenter> {
    const createReviewModel = new CreateReviewModel(createReviewDto); // Conversion en modèle
    const review = await this.reviewsService.create(createReviewModel);
    return new ReviewPresenter(review);
  }

  @Get()
  async findAll(): Promise<ReviewPresenter[]> {
    const reviews = await this.reviewsService.findAll();
    return reviews.map((review) => new ReviewPresenter(review));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReviewPresenter> {
    const review = await this.reviewsService.findOne(id);
    return new ReviewPresenter(review);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewPresenter> {
    const updateReviewModel = new UpdateReviewModel(updateReviewDto); // Conversion en modèle
    const review = await this.reviewsService.update(id, updateReviewModel);
    return new ReviewPresenter(review);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.reviewsService.delete(id);
  }
}
