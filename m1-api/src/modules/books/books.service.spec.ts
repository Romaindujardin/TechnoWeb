import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import { BookPresenter } from './presenters/book.presenter';

describe('BooksService', () => {
  let service: BooksService;

  const mockBooksRepository = {
    findAllBooks: jest.fn(),
    createBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useValue: mockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return an array of books', async () => {
    const book = new Book();
    const result = [book];
    mockBooksRepository.findAllBooks.mockResolvedValue(result);

    const expected = result.map((b) => new BookPresenter(b));
    expect(await service.findAll()).toEqual(expected);
    expect(mockBooksRepository.findAllBooks).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const createBookDto = {
      title: 'Test Book',
      publicationDate: '2024-10-29',
      authorId: 1,
    };
    const book = new Book();
    mockBooksRepository.createBook.mockResolvedValue(book);

    const expected = new BookPresenter(book);
    expect(await service.create(createBookDto)).toEqual(expected);
    expect(mockBooksRepository.createBook).toHaveBeenCalledWith(createBookDto);
  });

  it('should update a book', async () => {
    const updateBookDto = {
      title: 'Updated Book',
      publicationDate: '2024-11-08',
      authorId: 1,
    };
    const book = new Book();
    mockBooksRepository.updateBook.mockResolvedValue(book);

    const expected = new BookPresenter(book);
    expect(await service.update(1, updateBookDto)).toEqual(expected);
    expect(mockBooksRepository.updateBook).toHaveBeenCalledWith(
      1,
      updateBookDto,
    );
  });

  it('should delete a book', async () => {
    mockBooksRepository.deleteBook.mockResolvedValue(undefined);

    await service.remove(1);
    expect(mockBooksRepository.deleteBook).toHaveBeenCalledWith(1);
  });
});
