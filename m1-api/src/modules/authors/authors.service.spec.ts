import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { AuthorPresenter } from './presenters/author.presenter';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const mockAuthor = {
    id: 1,
    name: 'Author Test',
    photo: 'photo_url',
    biography: 'Sample biography',
    books: [],
  };

  const mockAuthorsRepository = {
    create: jest.fn().mockReturnValue(mockAuthor),
    save: jest.fn().mockResolvedValue(mockAuthor),
    find: jest.fn().mockResolvedValue([mockAuthor]),
    findOneBy: jest.fn().mockResolvedValue(mockAuthor),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockAuthorsRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should create an author', async () => {
    const result = await service.create({
      name: 'Author Test',
      photo: 'photo_url',
      biography: 'Sample biography',
    });
    expect(result).toEqual(new AuthorPresenter(mockAuthor)); // Utiliser AuthorPresenter ici
  });

  it('should retrieve all authors', async () => {
    const result = await service.findAll();
    expect(result).toEqual([new AuthorPresenter(mockAuthor)]); // Utiliser AuthorPresenter ici
  });

  it('should retrieve one author by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(new AuthorPresenter(mockAuthor)); // Utiliser AuthorPresenter ici
  });

  // Ajoutez d'autres tests pour update et remove...
});
