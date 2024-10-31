// modules/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { AuthorPresenter } from './presenters/author.presenter'; // Assurez-vous d'importer le Presenter

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    const author = this.authorsRepository.create(createAuthorDto);
    await this.authorsRepository.save(author);
    return new AuthorPresenter(author); // Retourner un AuthorPresenter
  }

  async findAll(): Promise<AuthorPresenter[]> {
    const authors = await this.authorsRepository.find();
    return authors.map((author) => new AuthorPresenter(author)); // Mapper à AuthorPresenter
  }

  async findOne(id: number): Promise<AuthorPresenter> {
    const author = await this.authorsRepository.findOneBy({ id });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return new AuthorPresenter(author); // Retourner un AuthorPresenter
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorPresenter> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id); // La méthode findOne retournera déjà un AuthorPresenter
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
