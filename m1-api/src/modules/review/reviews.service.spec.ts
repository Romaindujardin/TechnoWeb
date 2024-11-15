// Tests unitaires pour le service ReviewsService
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

    // Mock des méthodes du repository avec des valeurs de retour fictives
    const mockReviewsRepository = {
        create: jest.fn().mockResolvedValue(mockReview as Review),
        findAllReviews: jest.fn().mockResolvedValue([mockReview as Review]),
        findOneReview: jest.fn().mockResolvedValue(mockReview as Review),
        updateReview: jest.fn().mockResolvedValue(mockReview as Review),
        deleteReview: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<Partial<ReviewsRepository>>;

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

    // Teste la définition du service
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Teste la création d'une review
    it('should create a review', async () => {
        const createReviewDto: CreateReviewDto = {
            comment: 'Great book!',
            stars: 5,
            bookId: 1,
        };
        const result = await service.create(createReviewDto);
        expect(result).toEqual(mockReview);
        expect(repository.create).toHaveBeenCalledWith(createReviewDto);  // Vérifie l'appel du repository
    });

    // Teste la récupération de toutes les reviews
    it('should find all reviews', async () => {
        const result = await service.findAll();
        expect(result).toEqual([mockReview]);
        expect(repository.findAllReviews).toHaveBeenCalled();  // Vérifie l'appel du repository
    });

    // Teste la récupération d'une review par son ID
    it('should find one review', async () => {
        const result = await service.findOne(1);
        expect(result).toEqual(mockReview);
        expect(repository.findOneReview).toHaveBeenCalledWith(1);  // Vérifie l'appel du repository
    });

    // Teste si une exception est lancée lorsque la review n'est pas trouvée
    it('should throw a NotFoundException if review not found', async () => {
        (repository.findOneReview as jest.Mock).mockResolvedValue(null); // Mock du retour null
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);  // Vérifie que l'exception est levée
    });
});
