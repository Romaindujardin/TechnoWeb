// Test de la classe BooksService dans un environnement NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookPresenter } from './presenters/book.presenter';

describe('BooksService', () => {
  let service: BooksService;

  // Simulation du repository des livres
  const mockBookRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    // Initialisation du module de test avec le service et le mock du repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    // Vérification que le service est correctement initialisé
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      // Simulation de la méthode find pour retourner une liste de livres
      const result = [new Book()];
      mockBookRepository.find.mockResolvedValue(result);

      // Vérification que la méthode retourne bien les livres formatés
      expect(await service.findAll()).toEqual(
        result.map((book) => new BookPresenter(book)),
      );
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const id = 1;
      const book = new Book();
      // Simulation de la méthode findOne pour retourner un livre
      mockBookRepository.findOne.mockResolvedValue(book);

      // Vérification que la méthode retourne bien le livre trouvé
      expect(await service.findOne(id)).toEqual(book);
    });

    it('should throw a NotFoundException if book not found', async () => {
      const id = 1;
      // Simulation d'un livre non trouvé
      mockBookRepository.findOne.mockResolvedValue(null);

      // Vérification que l'exception est levée si aucun livre trouvé
      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        publicationDate: '2023-01-01',
        authorId: 1,
        price: 100,
      };
      const book = new Book();
      // Simulation de la création et de la sauvegarde d'un livre
      mockBookRepository.create.mockReturnValue(book);
      mockBookRepository.save.mockResolvedValue(book);

      // Vérification que le livre créé est bien retourné formaté
      expect(await service.create(createBookDto)).toEqual(
        new BookPresenter(book),
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated book', async () => {
      const id = 1;
      const updateBookDto: UpdateBookDto = { title: 'Updated Title', price: 100, authorId: 1 };
      const book = new Book();
      // Simulation de la mise à jour et sauvegarde d'un livre
      mockBookRepository.findOne.mockResolvedValue(book);
      mockBookRepository.save.mockResolvedValue(book);

      // Vérification que le livre mis à jour est retourné correctement
      expect(await service.update(id, updateBookDto)).toEqual(
        new BookPresenter(book),
      );
    });

    it('should throw a NotFoundException if book not found', async () => {
      const id = 1;
      const updateBookDto: UpdateBookDto = { title: 'Updated Title', price: 100, authorId: 1 };
      // Simulation d'un livre non trouvé pour la mise à jour
      mockBookRepository.findOne.mockResolvedValue(null);

      // Vérification que l'exception est levée si le livre n'existe pas
      await expect(service.update(id, updateBookDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the book', async () => {
      const id = 1;
      // Simulation de la suppression d'un livre
      mockBookRepository.delete.mockResolvedValue({ affected: 1 });

      // Vérification que la suppression du livre ne retourne rien
      await expect(service.remove(id)).resolves.toBeUndefined();
    });
  });
});
