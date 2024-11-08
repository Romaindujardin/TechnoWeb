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

  const mockBookRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
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
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = [new Book()];
      mockBookRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(
        result.map((book) => new BookPresenter(book)),
      );
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const id = 1;
      const book = new Book();
      mockBookRepository.findOne.mockResolvedValue(book);

      expect(await service.findOne(id)).toEqual(book);
    });

    it('should throw a NotFoundException if book not found', async () => {
      const id = 1;
      mockBookRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        publicationDate: '2023-01-01',
        authorId: 1,
      };
      const book = new Book();
      mockBookRepository.create.mockReturnValue(book);
      mockBookRepository.save.mockResolvedValue(book);

      expect(await service.create(createBookDto)).toEqual(
        new BookPresenter(book),
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated book', async () => {
      const id = 1;
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      const book = new Book();
      mockBookRepository.findOne.mockResolvedValue(book);
      mockBookRepository.save.mockResolvedValue(book);

      expect(await service.update(id, updateBookDto)).toEqual(
        new BookPresenter(book),
      );
    });

    it('should throw a NotFoundException if book not found', async () => {
      const id = 1;
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      mockBookRepository.findOne.mockResolvedValue(null);

      await expect(service.update(id, updateBookDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the book', async () => {
      const id = 1;
      mockBookRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove(id)).resolves.toBeUndefined();
    });
  });
});
