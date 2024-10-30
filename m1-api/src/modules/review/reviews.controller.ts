// src/modules/review/reviews.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { UpdateReviewDto } from './dtos/Update-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    findAll(): Promise<Review[]> {
        return this.reviewsService.findAll(); // Appellez findAll() du service
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Review> {
        return this.reviewsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto): Promise<Review> {
        return this.reviewsService.update(id, updateReviewDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.reviewsService.delete(id);
    }
}
