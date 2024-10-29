import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksService', () => {
    let service: BooksService;
    let repository: Repository<Book>;

    const mockBookRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findOne: jest.fn(),
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
        repository = module.get<Repository<Book>>(getRepositoryToken(Book));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an array of books', async () => {
        const result = [new Book()];
        mockBookRepository.find.mockReturnValue(result);

        expect(await service.findAll()).toBe(result);
        expect(mockBookRepository.find).toHaveBeenCalled();
    });

    it('should create a book', async () => {
        const createBookDto = { title: 'Test Book', publicationDate: '2024-10-29', authorId: 1 };
        const book = new Book();
        mockBookRepository.create.mockReturnValue(book);
        mockBookRepository.save.mockReturnValue(book);

        expect(await service.create(createBookDto)).toBe(book);
        expect(mockBookRepository.create).toHaveBeenCalledWith(createBookDto);
        expect(mockBookRepository.save).toHaveBeenCalledWith(book);
    });

    // Ajoute d'autres tests pour update et remove...
});
