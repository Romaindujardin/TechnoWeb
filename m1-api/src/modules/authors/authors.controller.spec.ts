import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorPresenter } from './presenters/author.presenter';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let mockAuthorsService;

  const mockAuthor = {
    id: 1,
    name: 'Test Author',
    photo: 'test.jpg',
    biography: 'Bio here',
    books: [],
  };

  const authorPresenter = new AuthorPresenter(mockAuthor);

  beforeEach(async () => {
    mockAuthorsService = {
      create: jest.fn().mockResolvedValue(authorPresenter),
      findAll: jest.fn().mockResolvedValue([authorPresenter]),
      findOne: jest.fn().mockResolvedValue(authorPresenter),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should create an author', async () => {
    const AuthorCreateModel = {
      name: 'Author Test',
      photo: 'photo_url',
      biography: 'Sample biography',
    };
    expect(await controller.create(AuthorCreateModel)).toEqual(authorPresenter);
    expect(mockAuthorsService.create).toHaveBeenCalledWith(AuthorCreateModel);
  });

  it('should retrieve all authors', async () => {
    expect(await controller.findAll()).toEqual([authorPresenter]);
    expect(mockAuthorsService.findAll).toHaveBeenCalled();
  });

  it('should find one author', async () => {
    expect(await controller.findOne('1')).toEqual(authorPresenter);
    expect(mockAuthorsService.findOne).toHaveBeenCalledWith(1);
  });

  // Ajoutez d'autres tests pour update et remove...
});
