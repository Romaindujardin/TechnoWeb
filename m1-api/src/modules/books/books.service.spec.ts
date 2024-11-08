import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BookPresenter } from './presenters/book.presenter';
import { BookModel } from './models/book.model'; // Importez BookModel

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

    const expected = result.map((b) => new BookPresenter(b));
    expect(await service.findAll()).toEqual(expected);
    expect(mockBookRepository.find).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const createBookDto = {
      title: 'Test Book',
      publicationDate: '2024-10-29',
      authorId: 1,
    };

    // Conversion de createBookDto en BookModel
    const bookModel = new BookModel(createBookDto);
    const book = new Book();
    mockBookRepository.create.mockReturnValue(book);
    mockBookRepository.save.mockReturnValue(book);

    const expected = new BookPresenter(book);
    expect(await service.create(createBookDto)).toEqual(expected);
    expect(mockBookRepository.create).toHaveBeenCalledWith(bookModel); // On utilise bookModel
    expect(mockBookRepository.save).toHaveBeenCalledWith(book);
  });

  it('should update a book', async () => {
    const updateBookDto = {
      title: 'Updated Book Title',
      publicationDate: '2024-11-01',
      price: 29.99,
      authorId: 1,
    };

    // Conversion de updateBookDto en BookModel
    const bookModel = new BookModel(updateBookDto);
    const book = new Book();
    mockBookRepository.update.mockResolvedValue({ affected: 1 });
    mockBookRepository.findOne.mockReturnValue(book);

    const expected = new BookPresenter(book);
    expect(await service.update(1, updateBookDto)).toEqual(expected);
    expect(mockBookRepository.update).toHaveBeenCalledWith(1, bookModel); // On utilise bookModel
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should delete a book', async () => {
    mockBookRepository.delete.mockResolvedValue({ affected: 1 });

    expect(await service.remove(1)).toBeUndefined();
    expect(mockBookRepository.delete).toHaveBeenCalledWith(1);
  });
});
