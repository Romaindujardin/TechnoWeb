// src/modules/review/reviews.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewPresenter } from './presenters/review.presenter';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dtos/Create-review.dto';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;

  const mockReview: Review = {
    id: 1,
    comment: 'I really enjoyed this book!',
    stars: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    book: null, // Assurez-vous que `book` correspond bien aux attentes dans Review
  };

  const mockCreateReviewDto: CreateReviewDto = {
    comment: 'I really enjoyed this book!',
    stars: 5,
    bookId: 1, // Nécessaire dans CreateReviewDto
  };

  const mockReviewsService = {
    create: jest.fn().mockResolvedValue(new ReviewPresenter(mockReview)),
    findAll: jest.fn().mockResolvedValue([new ReviewPresenter(mockReview)]),
    findOne: jest.fn().mockResolvedValue(new ReviewPresenter(mockReview)),
    update: jest.fn().mockResolvedValue(new ReviewPresenter(mockReview)),
    delete: jest.fn().mockResolvedValue(undefined),
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
    it('should create a review and return a ReviewPresenter', async () => {
      const result = await reviewsController.create(mockCreateReviewDto); // Utilisez mockCreateReviewDto ici
      expect(result).toEqual(new ReviewPresenter(mockReview));
      expect(reviewsService.create).toHaveBeenCalledWith(mockCreateReviewDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of ReviewPresenters', async () => {
      const result = await reviewsController.findAll();
      expect(result).toEqual([new ReviewPresenter(mockReview)]);
      expect(reviewsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single ReviewPresenter', async () => {
      const result = await reviewsController.findOne(1);
      expect(result).toEqual(new ReviewPresenter(mockReview));
      expect(reviewsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a review and return a ReviewPresenter', async () => {
      const result = await reviewsController.update(1, mockCreateReviewDto); // Utilisez mockCreateReviewDto ici pour l'update
      expect(result).toEqual(new ReviewPresenter(mockReview));
      expect(reviewsService.update).toHaveBeenCalledWith(
        1,
        mockCreateReviewDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a review', async () => {
      await reviewsController.delete(1);
      expect(reviewsService.delete).toHaveBeenCalledWith(1);
    });
  });
});
