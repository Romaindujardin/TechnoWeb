import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity'; 

describe('BooksController', () => {
  let controller: BooksController;

  const mockBooksService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of books', async () => {
    const result: Book[] = [new Book()]; // Créer une instance de Book sans authorId
    result[0].id = 1;
    result[0].title = 'Test Book';
    result[0].publicationDate = '2024-10-29';
    result[0].author = new Author(); 
    mockBooksService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(mockBooksService.findAll).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      publicationDate: '2024-10-29',
      price: 20, // Add the price property
      authorId: 1, // Conserver authorId ici pour le DTO
    };
    const book = new Book();
    book.id = 1;
    book.title = 'Test Book';
    book.publicationDate = '2024-10-29';
    book.author = new Author(); 
    mockBooksService.create.mockResolvedValue(book);

    expect(await controller.create(createBookDto)).toBe(book);
    expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
  });

  
});