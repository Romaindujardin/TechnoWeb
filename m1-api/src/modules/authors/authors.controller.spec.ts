// Importation des modules nécessaires pour les tests NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller'; // Le contrôleur des auteurs
import { AuthorsService } from './authors.service'; // Le service des auteurs
import { AuthorPresenter } from './presenters/author.presenter'; // Le présentateur des auteurs

// Bloc de test pour le contrôleur AuthorsController
describe('AuthorsController', () => {
  let controller: AuthorsController; // Déclaration du contrôleur à tester
  let mockAuthorsService; // Déclaration du service mocké pour les tests

  // Création d'un mock d'un auteur à utiliser dans les tests
  const mockAuthor = {
    id: 1,
    name: 'Test Author',
    photo: 'test.jpg',
    biography: 'Bio here',
    books: [],
  };

  // Création d'une instance de AuthorPresenter avec le mock d'auteur
  const authorPresenter = new AuthorPresenter(mockAuthor);

  // Initialisation du module de test avant chaque test
  beforeEach(async () => {
    // Création d'un service mocké avec des méthodes simulées
    mockAuthorsService = {
      create: jest.fn().mockResolvedValue(authorPresenter), // Simule la méthode create
      findAll: jest.fn().mockResolvedValue([authorPresenter]), // Simule la méthode findAll
      findOne: jest.fn().mockResolvedValue(authorPresenter), // Simule la méthode findOne
    };

    // Création du module de test avec le contrôleur et le service mocké
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController], // Le contrôleur à tester
      providers: [
        {
          provide: AuthorsService, // Fournisseur pour le service des auteurs
          useValue: mockAuthorsService, // Utilisation du service mocké
        },
      ],
    }).compile();

    // Récupération de l'instance du contrôleur pour les tests
    controller = module.get<AuthorsController>(AuthorsController);
  });

  // Test de la méthode create pour vérifier la création d'un auteur
  it('should create an author', async () => {
    const AuthorCreateModel = {
      name: 'Author Test',
      photo: 'photo_url',
      biography: 'Sample biography',
    };
    // Vérification que la méthode create renvoie le bon résultat
    expect(await controller.create(AuthorCreateModel)).toEqual(authorPresenter);
    // Vérification que la méthode create du service a été appelée avec les bons paramètres
    expect(mockAuthorsService.create).toHaveBeenCalledWith(AuthorCreateModel);
  });

  // Test de la méthode findAll pour vérifier la récupération de tous les auteurs
  it('should retrieve all authors', async () => {
    // Vérification que findAll renvoie la liste des auteurs attendue
    expect(await controller.findAll()).toEqual([authorPresenter]);
    // Vérification que la méthode findAll du service a été appelée
    expect(mockAuthorsService.findAll).toHaveBeenCalled();
  });

  // Test de la méthode findOne pour vérifier la récupération d'un auteur par son ID
  it('should find one author', async () => {
    // Vérification que findOne renvoie l'auteur attendu pour l'ID 1
    expect(await controller.findOne('1')).toEqual(authorPresenter);
    // Vérification que la méthode findOne du service a été appelée avec le bon ID
    expect(mockAuthorsService.findOne).toHaveBeenCalledWith(1);
  });

  // Ajout d'autres tests pour les méthodes update et remove si nécessaire
});
