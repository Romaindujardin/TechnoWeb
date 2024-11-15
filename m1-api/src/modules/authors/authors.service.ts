// src/modules/authors/authors.service.ts

// Importation des modules nécessaires de NestJS
import { Injectable, NotFoundException } from '@nestjs/common'; // Injectable pour rendre cette classe injectable et NotFoundException pour gérer les erreurs
import { AuthorsRepository } from './authors.repository'; // Import du repository des auteurs pour les opérations CRUD
import { AuthorPresenter } from './presenters/author.presenter'; // Présentateur pour formater la sortie des auteurs
import { UpdateAuthorDto } from './dtos/update-author.dto'; // DTO pour la mise à jour d'un auteur
import { CreateAuthorDto } from './dtos/create-author.dto'; // DTO pour la création d'un auteur

// Décorateur Injectable pour que cette classe puisse être utilisée en tant que service
@Injectable()
export class AuthorsService {
  // Injection du repository des auteurs dans le service
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  // Méthode pour créer un auteur en utilisant le DTO CreateAuthorDto
  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    // Appel de la méthode create du repository pour créer un auteur dans la base de données
    const author = await this.authorsRepository.create(createAuthorDto);
    // Retourne l'auteur formaté avec le présentateur AuthorPresenter
    return new AuthorPresenter(author);
  }

  // Méthode pour récupérer tous les auteurs
  async findAll(): Promise<AuthorPresenter[]> {
    // Appel de la méthode findAll du repository pour obtenir tous les auteurs
    const authors = await this.authorsRepository.findAll();
    // Retourne la liste des auteurs formatée avec le présentateur AuthorPresenter
    return authors.map((author) => new AuthorPresenter(author));
  }

  // Méthode pour récupérer un auteur par son ID
  async findOne(id: number): Promise<AuthorPresenter> {
    // Recherche de l'auteur par son ID dans le repository
    const author = await this.authorsRepository.findOne(id);
    // Si l'auteur n'est pas trouvé, lance une exception NotFoundException
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    // Retourne l'auteur formaté avec le présentateur AuthorPresenter
    return new AuthorPresenter(author);
  }

  // Méthode pour mettre à jour un auteur en utilisant le DTO UpdateAuthorDto
  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorPresenter> {
    // Appel de la méthode update du repository pour mettre à jour l'auteur
    await this.authorsRepository.update(id, updateAuthorDto);
    // Retourne l'auteur mis à jour après avoir récupéré avec findOne
    return this.findOne(id);
  }

  // Méthode pour supprimer un auteur par son ID
  async remove(id: number): Promise<void> {
    // Appel de la méthode delete du repository pour supprimer l'auteur
    await this.authorsRepository.delete(id);
  }
}
