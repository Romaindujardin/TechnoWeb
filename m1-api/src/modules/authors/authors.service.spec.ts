import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repo: Repository<Author>;

  const mockAuthor = { 
    id: 1, 
    name: 'Author Test', 
    photo: 'photo_url', 
    biography: 'Sample biography', 
    books: []
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repo = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an author', async () => {
    jest.spyOn(repo, 'create').mockReturnValue(mockAuthor as any);
    jest.spyOn(repo, 'save').mockResolvedValue(mockAuthor);

    const result = await service.create({ name: 'Author Test', photo: 'photo_url', biography: 'Sample biography' });
    expect(result).toEqual(mockAuthor);
  });

  it('should retrieve all authors', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([mockAuthor]);

    const result = await service.findAll();
    expect(result).toEqual([mockAuthor]);
  });

  it('should retrieve one author by ID', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockAuthor);

    const result = await service.findOne(1);
    expect(result).toEqual(mockAuthor);
  });

  it('should update an author', async () => {
    const updateResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };

    jest.spyOn(repo, 'update').mockResolvedValue(updateResult);
    jest.spyOn(repo, 'findOneBy').mockResolvedValue({ ...mockAuthor, name: 'Updated Author' });

    const result = await service.update(1, { name: 'Updated Author' });
    expect(result.name).toBe('Updated Author');
  });

  it('should delete an author', async () => {
    // Simulez un objet DeleteResult
    const deleteResult: DeleteResult = {
      affected: 1,
      raw: {},
    };

    jest.spyOn(repo, 'delete').mockResolvedValue(deleteResult);

    const result = await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
