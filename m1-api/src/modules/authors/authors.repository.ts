// src/modules/authors/authors.repository.ts

// Importation des modules nécessaires pour la gestion des entités avec TypeORM
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'; // Importation du Repository de TypeORM pour interagir avec la base de données
import { InjectRepository } from '@nestjs/typeorm'; // Décorateur pour injecter le Repository dans la classe
import { Author } from './entities/author.entity'; // Entité représentant un auteur
import { CreateAuthorDto } from './dtos/create-author.dto'; // DTO pour la création d'un auteur
import { UpdateAuthorDto } from './dtos/update-author.dto'; // DTO pour la mise à jour d'un auteur

// Décorateur Injectable pour que cette classe soit injectable en tant que service
@Injectable()
export class AuthorsRepository {
  // Injection du repository Author pour interagir avec la base de données
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>, // Injection du Repository d'Author
  ) {}

  // Méthode pour créer un auteur dans la base de données
  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.repository.create(createAuthorDto); // Crée une nouvelle instance de l'entité Author à partir du DTO
    return await this.repository.save(author); // Sauvegarde l'auteur dans la base de données
  }

  // Méthode pour récupérer tous les auteurs
  async findAll(): Promise<Author[]> {
    return await this.repository.find(); // Retourne la liste de tous les auteurs
  }

  // Méthode pour récupérer un auteur par son ID
  async findOne(id: number): Promise<Author | null> {
    return await this.repository.findOneBy({ id }); // Recherche un auteur par son ID
  }

  // Méthode pour mettre à jour un auteur avec un ID donné
  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<void> {
    await this.repository.update(id, updateAuthorDto); // Met à jour les informations de l'auteur dans la base de données
  }

  // Méthode pour supprimer un auteur par son ID
  async delete(id: number): Promise<void> {
    await this.repository.delete(id); // Supprime l'auteur de la base de données
  }
}
