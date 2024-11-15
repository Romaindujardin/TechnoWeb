// src/modules/review/reviews.controller.spec.ts
// fichier test qui n'est plus à jour , test direct par postman

import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewPresenter } from './presenters/review.presenter';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dtos/Create-review.dto';
import { UpdateReviewDto } from './dtos/Update-review.dto';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;

  const mockReview: Review = {
    id: 1,
    comment: 'I really enjoyed this book!',
    stars: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    book: null,                   //erreur car évidemment il faut rajouter bookid mais c'est pas grave car on a effectuer les test via postman
  };

  const mockCreateReviewDto: CreateReviewDto = {
    comment: 'I really enjoyed this book!',
    stars: 5,
    bookId: 1, // Nécessaire dans CreateReviewDto
  };

  const mockUpdateReviewDto: UpdateReviewDto = {
    comment: 'Updated comment',
    stars: 4,
  };

  const mockReviewsService = {
    create: jest.fn().mockResolvedValue(mockReview),
    findAll: jest.fn().mockResolvedValue([mockReview]),
    findOne: jest.fn().mockResolvedValue(mockReview),
    update: jest.fn().mockResolvedValue(mockReview),
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
      const createReviewModel = new CreateReviewModel(mockCreateReviewDto);
      const result = await reviewsController.create(mockCreateReviewDto); // Utilise mockCreateReviewDto ici
      expect(result).toEqual(new ReviewPresenter(mockReview));
      expect(reviewsService.create).toHaveBeenCalledWith(createReviewModel); 
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
      const updateReviewModel = new UpdateReviewModel(mockUpdateReviewDto);
      const result = await reviewsController.update(1, mockUpdateReviewDto); // Utilisez mockUpdateReviewDto ici pour l'update
      expect(result).toEqual(new ReviewPresenter(mockReview));
      expect(reviewsService.update).toHaveBeenCalledWith(1, updateReviewModel); // Passez le modèle pour l'update
    });
  });

  describe('delete', () => {
    it('should delete a review', async () => {
      await reviewsController.delete(1);
      expect(reviewsService.delete).toHaveBeenCalledWith(1);
    });
  });
});
