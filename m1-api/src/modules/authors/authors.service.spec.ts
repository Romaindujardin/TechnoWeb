import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { AuthorsRepository } from './authors.repository';
import { AuthorPresenter } from './presenters/author.presenter';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let authorsRepository: AuthorsRepository;

  const mockAuthor = {
    id: 1,
    name: 'Author Test',
    photo: 'photo_url',
    biography: 'Sample biography',
    books: [],
  };

  const mockAuthorsRepository = {
    create: jest.fn().mockResolvedValue(mockAuthor),
    findAll: jest.fn().mockResolvedValue([mockAuthor]),
    findOne: jest.fn().mockResolvedValue(mockAuthor),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: AuthorsRepository,
          useValue: mockAuthorsRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    authorsRepository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should create an author', async () => {
    const createAuthorDto = {
      name: 'Author Test',
      photo: 'photo_url',
      biography: 'Sample biography',
    };

    const result = await service.create(createAuthorDto);
    expect(authorsRepository.create).toHaveBeenCalledWith(createAuthorDto);
    expect(result).toEqual(new AuthorPresenter(mockAuthor)); // Utiliser AuthorPresenter ici
  });

  it('should retrieve all authors', async () => {
    const result = await service.findAll();
    expect(authorsRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([new AuthorPresenter(mockAuthor)]); // Utiliser AuthorPresenter ici
  });

  it('should retrieve one author by ID', async () => {
    const result = await service.findOne(1);
    expect(authorsRepository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(new AuthorPresenter(mockAuthor)); // Utiliser AuthorPresenter ici
  });

  it('should update an author by ID', async () => {
    const updateAuthorDto = {
      name: 'Updated Author Name',
      biography: 'Updated biography',
    };

    const result = await service.update(1, updateAuthorDto);
    expect(authorsRepository.update).toHaveBeenCalledWith(1, updateAuthorDto);
    expect(result).toEqual(new AuthorPresenter(mockAuthor)); // Retourne l'auteur mis à jour
  });

  it('should delete an author by ID', async () => {
    await service.remove(1);
    expect(authorsRepository.delete).toHaveBeenCalledWith(1);
  });
});
