// Importation des modules nécessaires pour les tests NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service'; // Service à tester
import { AuthorsRepository } from './authors.repository'; // Repository des auteurs
import { AuthorPresenter } from './presenters/author.presenter'; // Présentateur pour formater la sortie des auteurs

// Bloc de test pour le service AuthorsService
describe('AuthorsService', () => {
  let service: AuthorsService; // Déclaration du service à tester
  let authorsRepository: AuthorsRepository; // Déclaration du repository des auteurs

  // Création d'un mock d'un auteur à utiliser dans les tests
  const mockAuthor = {
    id: 1,
    name: 'Author Test',
    photo: 'photo_url',
    biography: 'Sample biography',
    books: [],
  };

  // Définition du repository mocké avec des méthodes simulées pour les tests
  const mockAuthorsRepository = {
    create: jest.fn().mockResolvedValue(mockAuthor), // Simule la méthode create
    findAll: jest.fn().mockResolvedValue([mockAuthor]), // Simule la méthode findAll
    findOne: jest.fn().mockResolvedValue(mockAuthor), // Simule la méthode findOne
    update: jest.fn().mockResolvedValue(undefined), // Simule la méthode update
    delete: jest.fn().mockResolvedValue(undefined), // Simule la méthode delete
  };

  // Initialisation du module de test avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService, // Le service AuthorsService à tester
        {
          provide: AuthorsRepository, // Fournisseur du repository des auteurs mocké
          useValue: mockAuthorsRepository, // Utilisation du mock de repository
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService); // Récupération du service AuthorsService
    authorsRepository = module.get<AuthorsRepository>(AuthorsRepository); // Récupération du repository mocké
  });

  // Test de la méthode create pour vérifier la création d'un auteur
  it('should create an author', async () => {
    const createAuthorDto = {
      name: 'Author Test',
      photo: 'photo_url',
      biography: 'Sample biography',
    };

    // Vérification que la méthode create du service appelle bien le repository avec les bons paramètres
    const result = await service.create(createAuthorDto);
    expect(authorsRepository.create).toHaveBeenCalledWith(createAuthorDto);
    // Vérification que le résultat renvoyé correspond à l'auteur formaté avec AuthorPresenter
    expect(result).toEqual(new AuthorPresenter(mockAuthor));
  });

  // Test de la méthode findAll pour vérifier la récupération de tous les auteurs
  it('should retrieve all authors', async () => {
    // Vérification que findAll du service appelle bien le repository et renvoie la bonne valeur
    const result = await service.findAll();
    expect(authorsRepository.findAll).toHaveBeenCalled();
    // Vérification que la réponse est une liste formatée avec AuthorPresenter
    expect(result).toEqual([new AuthorPresenter(mockAuthor)]);
  });

  // Test de la méthode findOne pour vérifier la récupération d'un auteur par son ID
  it('should retrieve one author by ID', async () => {
    // Vérification que findOne du service appelle bien le repository avec le bon ID
    const result = await service.findOne(1);
    expect(authorsRepository.findOne).toHaveBeenCalledWith(1);
    // Vérification que la réponse est l'auteur formaté avec AuthorPresenter
    expect(result).toEqual(new AuthorPresenter(mockAuthor));
  });

  // Test de la méthode update pour vérifier la mise à jour d'un auteur par son ID
  it('should update an author by ID', async () => {
    const updateAuthorDto = {
      name: 'Updated Author Name',
      biography: 'Updated biography',
    };

    // Vérification que update du service appelle bien le repository avec le bon ID et les nouvelles données
    const result = await service.update(1, updateAuthorDto);
    expect(authorsRepository.update).toHaveBeenCalledWith(1, updateAuthorDto);
    // Vérification que la réponse est l'auteur mis à jour et formaté avec AuthorPresenter
    expect(result).toEqual(new AuthorPresenter(mockAuthor));
  });

  // Test de la méthode remove pour vérifier la suppression d'un auteur par son ID
  it('should delete an author by ID', async () => {
    // Vérification que delete du service appelle bien le repository avec le bon ID
    await service.remove(1);
    expect(authorsRepository.delete).toHaveBeenCalledWith(1);
  });
});
