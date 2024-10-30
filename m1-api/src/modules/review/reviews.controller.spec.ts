// src/modules/review/reviews.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

describe('ReviewsController', () => {
    let reviewsController: ReviewsController;
    let reviewsService: ReviewsService;

    const mockReview = {
        id: 1,
        comment: 'I really enjoyed this book!',
        stars: 5, // Assurez-vous que c'est bien "stars" ici
        bookId: 1,
    };

    const mockReviewsService = {
        create: jest.fn().mockResolvedValue(mockReview),
        findAll: jest.fn().mockResolvedValue([mockReview]),
        findOne: jest.fn().mockResolvedValue(mockReview),
        update: jest.fn().mockResolvedValue(mockReview),
        remove: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewsController],
            providers: [
                {
                    provide: ReviewsService,
                    useValue: mockReviewsService,
                },
            ],
        }).compile();

        reviewsController = module.get<ReviewsController>(ReviewsController);
        reviewsService = module.get<ReviewsService>(ReviewsService);
    });

    describe('create', () => {
        it('should create a review', async () => {
            const result = await reviewsController.create(mockReview);
            expect(result).toEqual(mockReview);
            expect(reviewsService.create).toHaveBeenCalledWith(mockReview);
        });
    });

    describe('findAll', () => {
        it('should return an array of reviews', async () => {
            const result = await reviewsController.findAll();
            expect(result).toEqual([mockReview]);
            expect(reviewsService.findAll).toHaveBeenCalled();
        });
    });

    // Ajoutez d'autres tests pour findOne, update, et remove ici
});
