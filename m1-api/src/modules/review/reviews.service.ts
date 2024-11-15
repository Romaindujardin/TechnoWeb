// Service pour gérer les reviews
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewModel, UpdateReviewModel } from './models/review.model'; // Import des modèles
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  // Crée une nouvelle review
  create(createReviewModel: CreateReviewModel): Promise<Review> {
    return this.reviewsRepository.create(createReviewModel);  // Appel au repository pour créer la review
  }

  // Récupère toutes les reviews
  findAll(): Promise<Review[]> {
    return this.reviewsRepository.findAllReviews();  // Appel au repository pour trouver toutes les reviews
  }

  // Récupère une review par son ID
  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOneReview(id);  // Recherche de la review par ID
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);  // Lance une exception si la review n'est pas trouvée
    }
    return review;
  }

  // Met à jour une review existante
  update(id: number, updateReviewModel: UpdateReviewModel): Promise<Review> {
    return this.reviewsRepository.updateReview(id, updateReviewModel);  // Appel au repository pour mettre à jour la review
  }

  // Supprime une review par son ID
  async delete(id: number): Promise<void> {
    const review = await this.findOne(id);  // Vérifie si la review existe
    if (review) {
      await this.reviewsRepository.deleteReview(id);  // Appel au repository pour supprimer la review
    }
  }
}
