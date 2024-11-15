// Repository pour gérer les reviews
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model'; // Import des modèles
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,  // Repository pour les reviews
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,  // Repository pour les livres
  ) {}

  // Crée une nouvelle review associée à un book
  async create(createReviewModel: CreateReviewModel): Promise<Review> {
    // 1. Vérifie si le Book existe
    const book = await this.bookRepository.findOne({
      where: { id: createReviewModel.bookId },
    });
    if (!book) {
      throw new NotFoundException('Book not found');  // Si le book n'existe pas, on lance une exception
    }

    // 2. Crée la Review en liant le Book trouvé
    const review = this.repository.create({
      ...createReviewModel,
      book,
    });
    return this.repository.save(review);  // Sauvegarde la review dans la base de données
  }

  // Récupère toutes les reviews avec leur livre associé
  findAllReviews(): Promise<Review[]> {
    return this.repository.find({ relations: ['book'] });  // Recherche toutes les reviews en incluant les livres associés
  }

  // Récupère une review par son ID avec son livre associé
  findOneReview(id: number): Promise<Review> {
    return this.repository.findOne({ where: { id }, relations: ['book'] });  // Recherche de la review par ID et son livre associé
  }

  // Met à jour une review existante
  async updateReview(
    id: number,
    updateReviewModel: UpdateReviewModel,
  ): Promise<Review> {
    await this.repository.update(id, updateReviewModel);  // Mise à jour de la review
    return this.findOneReview(id);  // Retourne la review mise à jour
  }

  // Supprime une review par son ID
  deleteReview(id: number): Promise<void> {
    return this.repository.delete(id).then(() => undefined);  // Supprime la review de la base de données
  }
}
