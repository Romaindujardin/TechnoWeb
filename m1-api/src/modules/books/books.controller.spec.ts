import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity'; // Ajoute cette ligne pour importer Book
import { UpdateBookDto } from './dtos/update-book.dto';

describe('BooksController', () => {
    let controller: BooksController;
    let service: BooksService;

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
        service = module.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return an array of books', async () => {
        const result = [new Book()]; // Assurez-vous que 'Book' est défini ici
        mockBooksService.findAll.mockReturnValue(result);

        expect(await controller.findAll()).toBe(result);
        expect(mockBooksService.findAll).toHaveBeenCalled();
    });

    it('should create a book', async () => {
        const createBookDto: CreateBookDto = { title: 'Test Book', publicationDate: '2024-10-29', authorId: 1 };
        const book = new Book(); // Assurez-vous que 'Book' est défini ici
        mockBooksService.create.mockReturnValue(book);

        expect(await controller.create(createBookDto)).toBe(book);
        expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
    });

    // Ajoute d'autres tests pour update et remove...
});
