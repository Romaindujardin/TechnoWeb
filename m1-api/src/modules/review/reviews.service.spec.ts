// src/modules/review/reviews.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsService', () => {
    let service: ReviewsService;
    let repository: Partial<ReviewsRepository>;

    const mockReview: Partial<Review> = {
        id: 1,
        comment: 'I really enjoyed this book!',
        stars: 5,
        book: { id: 1, title: 'Mock Book Title' } as any,
    };

    // Typage du mock pour chaque méthode
    const mockReviewsRepository = {
        create: jest.fn().mockResolvedValue(mockReview as Review),
        findAllReviews: jest.fn().mockResolvedValue([mockReview as Review]),
        findOneReview: jest.fn().mockResolvedValue(mockReview as Review),
        updateReview: jest.fn().mockResolvedValue(mockReview as Review),
        deleteReview: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<Partial<ReviewsRepository>>; // Ici on cast le mock

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewsService,
                { provide: ReviewsRepository, useValue: mockReviewsRepository },
            ],
        }).compile();

        service = module.get<ReviewsService>(ReviewsService);
        repository = module.get<Partial<ReviewsRepository>>(ReviewsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a review', async () => {
        const createReviewDto: CreateReviewDto = {
            comment: 'Great book!',
            stars: 5,
            bookId: 1,
        };
        const result = await service.create(createReviewDto);
        expect(result).toEqual(mockReview);
        expect(repository.create).toHaveBeenCalledWith(createReviewDto);
    });

    it('should find all reviews', async () => {
        const result = await service.findAll();
        expect(result).toEqual([mockReview]);
        expect(repository.findAllReviews).toHaveBeenCalled();
    });

    it('should find one review', async () => {
        const result = await service.findOne(1);
        expect(result).toEqual(mockReview);
        expect(repository.findOneReview).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if review not found', async () => {
        (repository.findOneReview as jest.Mock).mockResolvedValue(null); // Cast ici pour que TypeScript reconnaisse
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
});
