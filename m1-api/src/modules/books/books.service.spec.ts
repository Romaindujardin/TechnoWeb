import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BookPresenter } from './presenters/book.presenter'; // Importez BookPresenter

describe('BooksService', () => {
  let service: BooksService;

  const mockBookRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'BookRepository', // Utilisez le bon identifiant de fournisseur
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return an array of books', async () => {
    const book = new Book();
    const result = [book];
    mockBookRepository.find.mockReturnValue(result);

    // Utilisez BookPresenter ici
    const expected = result.map((b) => new BookPresenter(b));
    expect(await service.findAll()).toEqual(expected); // Changer .toBe en .toEqual
    expect(mockBookRepository.find).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const createBookDto = {
      title: 'Test Book',
      publicationDate: '2024-10-29',
      authorId: 1,
    };
    const book = new Book();
    mockBookRepository.create.mockReturnValue(book);
    mockBookRepository.save.mockReturnValue(book);

    // Utilisez BookPresenter ici
    const expected = new BookPresenter(book);
    expect(await service.create(createBookDto)).toEqual(expected); // Changer .toBe en .toEqual
    expect(mockBookRepository.create).toHaveBeenCalledWith(createBookDto);
    expect(mockBookRepository.save).toHaveBeenCalledWith(book);
  });

  // Ajoutez d'autres tests pour update et remove...
});
