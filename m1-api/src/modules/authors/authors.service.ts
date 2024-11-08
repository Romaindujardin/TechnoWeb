// src/modules/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { AuthorModel } from './models/author.model';
import { AuthorPresenter } from './presenters/author.presenter';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { CreateAuthorDto } from './dtos/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    const authorData = new AuthorModel(createAuthorDto); // Transformation en modèle
    const author = this.authorsRepository.create(authorData);
    await this.authorsRepository.save(author);
    return new AuthorPresenter(author);
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
    const authorData = new AuthorModel(updateAuthorDto); // Transformation en modèle
    await this.authorsRepository.update(id, authorData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
